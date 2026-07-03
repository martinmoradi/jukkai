#!/usr/bin/env python3
"""Bake the homepage hero champagne field and print cards.

By default, this writes the production field used by `/`:

  public/home/hero/field.webp

Pass `--prints-dir` to rebuild the curated print cards from an image pool whose
files are named by their source index, for example `04.jpg`.
"""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import NamedTuple, Sequence

try:
    import numpy as np
    from PIL import Image, ImageEnhance
except ModuleNotFoundError as exc:
    raise SystemExit(
        "Missing Python dependency. Install the asset-bake tools with: "
        "python3 -m pip install numpy pillow",
    ) from exc


APP_DIR = Path(__file__).resolve().parents[1]
DEFAULT_OUT_DIR = APP_DIR / "public" / "home" / "hero"

FIELD_WIDTH = 2880
FIELD_HEIGHT = 2560
FIELD_QUALITY = 90
PRINT_QUALITY = 84
PRINT_ASPECT = 22 / 30
PRINT_HEIGHT = 900
SEED = 20260703

Rgb = tuple[int, int, int]
GradientStop = tuple[float, Rgb]


class FieldVariant(NamedTuple):
    name: str
    grain_sigma: float


class PrintSource(NamedTuple):
    pool_id: str
    slug: str


FIELD_VARIANTS = (FieldVariant("field.webp", 5.0),)
OPTIONAL_FIELD_VARIANTS = (FieldVariant("field-grain-hi.webp", 6.5),)

PRINT_SOURCES = (
    PrintSource("00", "arrondir-bleu"),
    PrintSource("04", "jardin-escalier"),
    PrintSource("10", "tournesol-jaune"),
    PrintSource("17", "vivre-grand-entree"),
    PrintSource("23", "zigzag-cuisine"),
    PrintSource("29", "caractere-courbe"),
    PrintSource("34", "geometrie-spirale"),
    PrintSource("36", "fonderie-rouge"),
    PrintSource("48", "waouh-theatre"),
)


def oklch_to_srgb(lightness: float, chroma: float, hue_degrees: float) -> Rgb:
    hue = np.radians(hue_degrees)
    lab = np.array([lightness, chroma * np.cos(hue), chroma * np.sin(hue)])
    lms_matrix = np.array(
        [
            [1.0, 0.3963377774, 0.2158037573],
            [1.0, -0.1055613458, -0.0638541728],
            [1.0, -0.0894841775, -1.2914855480],
        ],
    )
    lms = (lms_matrix @ lab) ** 3
    srgb_matrix = np.array(
        [
            [4.0767416621, -3.3077115913, 0.2309699292],
            [-1.2684380046, 2.6097574011, -0.3413193965],
            [-0.0041960863, -0.7034186147, 1.7076147010],
        ],
    )
    linear_rgb = srgb_matrix @ lms
    srgb = np.where(
        linear_rgb <= 0.0031308,
        12.92 * linear_rgb,
        1.055 * np.clip(linear_rgb, 0, None) ** (1 / 2.4) - 0.055,
    )
    return tuple(int(round(value * 255)) for value in np.clip(srgb, 0, 1))


def hex_color(value: str) -> Rgb:
    return tuple(int(value[index : index + 2], 16) for index in (1, 3, 5))


BOTTOM_CREAM = oklch_to_srgb(0.94, 0.045, 95)

LEFT_LADDER: Sequence[GradientStop] = (
    (0.00, hex_color("#7C5338")),
    (0.08, hex_color("#8E6950")),
    (0.16, hex_color("#A68871")),
    (0.25, hex_color("#B79E88")),
    (0.33, hex_color("#C4AF9B")),
    (0.40, hex_color("#D3C2B0")),
    (0.46, hex_color("#D6C7B7")),
    (0.52, hex_color("#ECE4D9")),
    (0.60, hex_color("#EFE8DC")),
    (1.00, BOTTOM_CREAM),
)
RIGHT_LADDER: Sequence[GradientStop] = (
    (0.00, hex_color("#7B5136")),
    (0.08, hex_color("#8D6850")),
    (0.16, hex_color("#A68872")),
    (0.25, hex_color("#B89F8B")),
    (0.33, hex_color("#C8B5A4")),
    (0.40, hex_color("#CEBDAB")),
    (0.46, hex_color("#CEBDAA")),
    (0.52, hex_color("#E4DACE")),
    (0.60, hex_color("#F7F1EB")),
    (1.00, BOTTOM_CREAM),
)


def ladder_column(ladder: Sequence[GradientStop], height: int) -> np.ndarray:
    positions = np.array([stop[0] for stop in ladder])
    colors = np.array([stop[1] for stop in ladder], dtype=float)
    samples = np.linspace(0, 1, height)
    column = np.stack(
        [
            np.interp(samples, positions, colors[:, channel])
            for channel in range(3)
        ],
        axis=1,
    )

    sigma = height * 0.03
    radius = int(sigma * 3)
    offsets = np.arange(-radius, radius + 1)
    kernel = np.exp(-0.5 * (offsets / sigma) ** 2)
    kernel /= kernel.sum()

    padded = np.pad(column, ((radius, radius), (0, 0)), mode="edge")
    smoothed = np.stack(
        [
            np.convolve(padded[:, channel], kernel, mode="valid")
            for channel in range(3)
        ],
        axis=1,
    )
    smoothed[-1] = column[-1]
    return smoothed


def build_field() -> np.ndarray:
    left = ladder_column(LEFT_LADDER, FIELD_HEIGHT)[:, None, :]
    right = ladder_column(RIGHT_LADDER, FIELD_HEIGHT)[:, None, :]
    horizontal_mix = np.linspace(0, 1, FIELD_WIDTH)[None, :, None]
    field = left * (1 - horizontal_mix) + right * horizontal_mix

    y_grid, x_grid = np.mgrid[0:FIELD_HEIGHT, 0:FIELD_WIDTH]
    glow = np.exp(
        -(
            ((x_grid / FIELD_WIDTH - 0.5) / 0.42) ** 2
            + ((y_grid / FIELD_HEIGHT - 0.30) / 0.34) ** 2
        ),
    )
    return field + glow[:, :, None] * 7.0


def bake_field(output_dir: Path, variants: Sequence[FieldVariant]) -> None:
    field = build_field()
    fade = np.clip((1.0 - np.linspace(0, 1, FIELD_HEIGHT)) * 40, 0, 1)
    fade = fade[:, None, None]

    output_dir.mkdir(parents=True, exist_ok=True)
    for variant in variants:
        rng = np.random.default_rng(SEED)
        grain = rng.normal(0.0, variant.grain_sigma, (FIELD_HEIGHT, FIELD_WIDTH, 1))
        field_variant = field + grain * fade
        field_variant[-4:, :, :] = np.array(BOTTOM_CREAM, dtype=float)

        image = Image.fromarray(np.clip(field_variant, 0, 255).astype(np.uint8))
        path = output_dir / variant.name
        image.save(path, quality=FIELD_QUALITY, method=6)
        print(
            f"field -> {path} ({path.stat().st_size // 1024} KB), "
            f"bottom rgb{BOTTOM_CREAM}",
        )


def grade_print(image: Image.Image) -> Image.Image:
    desaturated = ImageEnhance.Color(image).enhance(0.86)
    pixels = np.asarray(desaturated).astype(float)
    pixels *= np.array([1.03, 1.0, 0.94])
    pixels = pixels * (1 - 18 / 255) + 18
    return Image.fromarray(np.clip(pixels, 0, 255).astype(np.uint8))


def find_pool_image(pool_dir: Path, pool_id: str) -> Path | None:
    matches = sorted(pool_dir.glob(f"{pool_id}.*"))
    return matches[0] if matches else None


def crop_to_print_aspect(image: Image.Image) -> Image.Image:
    width, height = image.size
    target_width = int(min(width, height * PRINT_ASPECT))
    target_height = int(target_width / PRINT_ASPECT)
    left = (width - target_width) // 2
    top = (height - target_height) // 2
    return image.crop((left, top, left + target_width, top + target_height))


def bake_prints(pool_dir: Path, output_dir: Path) -> None:
    prints_dir = output_dir / "prints"
    prints_dir.mkdir(parents=True, exist_ok=True)

    for source in PRINT_SOURCES:
        path = find_pool_image(pool_dir, source.pool_id)
        if path is None:
            print(f"missing pool image {source.pool_id} ({source.slug})")
            continue

        image = Image.open(path).convert("RGB")
        image = crop_to_print_aspect(image)
        image = image.resize(
            (int(PRINT_HEIGHT * PRINT_ASPECT), PRINT_HEIGHT),
            Image.Resampling.LANCZOS,
        )

        output_path = prints_dir / f"{source.slug}.webp"
        grade_print(image).save(output_path, quality=PRINT_QUALITY, method=6)
        print(
            f"print {source.pool_id} -> {output_path.name} "
            f"({output_path.stat().st_size // 1024} KB)",
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Bake homepage hero field and optional print card assets.",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=DEFAULT_OUT_DIR,
        help="Output directory. Defaults to apps/marketing/public/home/hero.",
    )
    parser.add_argument(
        "--prints-dir",
        type=Path,
        help="Optional source image pool for rebuilding print cards.",
    )
    parser.add_argument(
        "--skip-field",
        action="store_true",
        help="Only bake prints. Requires --prints-dir.",
    )
    parser.add_argument(
        "--grain-hi",
        action="store_true",
        help="Also write field-grain-hi.webp for local A/B review.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    output_dir = args.out_dir.resolve()

    if args.skip_field and args.prints_dir is None:
        raise SystemExit("--skip-field needs --prints-dir; nothing would be baked.")

    if not args.skip_field:
        variants = FIELD_VARIANTS
        if args.grain_hi:
            variants = FIELD_VARIANTS + OPTIONAL_FIELD_VARIANTS
        bake_field(output_dir, variants)

    if args.prints_dir is not None:
        bake_prints(args.prints_dir.resolve(), output_dir)


if __name__ == "__main__":
    main()
