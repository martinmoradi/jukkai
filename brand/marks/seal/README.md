# Jukkai 述懐 seal

Hanko-style seal marks of 述懐 (jukkai). The SVGs beside this README are the
current export set. Their presence here makes them available for identity work;
final symbol selection remains a design decision.

## Current exports

Each shape ships in two frame styles: **classic** (heavy outer line + inner
hairline, the traditional parent-and-child 子持ち枠 frame) and **minimal**
(`-minimal` suffix — single thin line, no inner frame).

| File                               | Shape                     | Style                                       |
| ---------------------------------- | ------------------------- | ------------------------------------------- |
| `seal-circle[-minimal].svg`        | 240×240 circle            | outline                                     |
| `seal-square[-minimal].svg`        | 240×240 rounded square    | outline                                     |
| `seal-oval[-minimal].svg`          | 168×240 capsule           | outline                                     |
| `seal-octagon[-minimal].svg`       | 200×240 elongated octagon | outline                                     |
| `seal-octagon-solid[-minimal].svg` | 200×240 octagon           | solid, knocked-out characters (transparent) |

All marks are painted with `currentColor`: they render black by default and
inherit CSS `color` from their context (verified by render test), so one file
serves any brand color. Regenerate with `--color` for a fixed color.

## Construction

- Typeface: **Shippori Mincho B1 Bold** (SIL OFL 1.1) — mincho is the
  serif class for kanji; B1 chosen over Noto Serif JP (too corporate) and
  Zen Old Mincho (horizontals too thin at seal sizes) for its inky,
  brush-flavored terminals that match the mock refs.
- Glyph outlines extracted from the font with fontTools (no text elements,
  fully self-contained SVGs).
- Characters stacked vertically, em-centered horizontally (preserves the type
  designer's optical centering; measured ink-center delta is only 0.007 em),
  ink-gap between characters 0.045 em.
- Character size per frame is solved numerically: the largest scale whose
  entire rasterized ink point-cloud keeps a 7.5-unit clearance inside the
  inner frame line. This lets empty block corners pass under the circle ring
  the way a real hanko is cut, instead of conservative bbox fitting.
- Frames: classic = heavy outer line (7) + hairline inner (2.2); minimal =
  single thin line (3), sitting quieter than the character stems.
- The solid octagons knock the characters out via mask, so the negative space
  is transparent, not white.

## Regenerating

```
python3 brand/source/seal-generator/compose_seals.py \
  --fonts-dir brand/fonts \
  --out brand/marks/seal \
  --color currentColor
```

Requires `fontTools`, `numpy`, `Pillow`, `rsvg-convert`. The font is not
committed (15 MB); download from
<https://github.com/google/fonts/tree/main/ofl/shipporiminchob1>.
All layout parameters (gap, margin, frame weights per style, octagon cut) are
in `GAP_EM`, `MARGIN`, and `STYLES` at the top of `tools/compose_seals.py`.

## Usage notes

- Legible down to ~48 px height. Below that, prefer the solid octagons,
  which still read as a mark at favicon sizes; the outline seals' 16-stroke
  懐 fills in.
- When a seal color is chosen for a composition, either set `color:` on the
  SVG's container or bake it in with `--color`. A traditional hanko vermillion
  that worked well in earlier drafts is `#C03A2B`.
