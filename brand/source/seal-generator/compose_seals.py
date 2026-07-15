"""Compose the Jukkai 述懐 seal marks from real mincho outlines.

Self-contained: extracts 述/懐 from Shippori Mincho B1 Bold via fontTools,
fits the stacked pair into each frame by binary-searching the largest scale
whose full ink point-cloud keeps MARGIN clearance inside the frame interior
(true optical fit — empty block corners may pass under a circular ring).

Two frame styles:
  classic — heavy outer line + inner hairline (parent-and-child frame)
  minimal — single thin line, no inner frame

Usage:
    python3 compose_seals.py --fonts-dir <dir with ShipporiMinchoB1-Bold.ttf> \
        --out <output dir> [--color currentColor]

Requires: fontTools, numpy, Pillow, rsvg-convert (only for fitting).
Font: Shippori Mincho B1 (SIL OFL 1.1)
      https://github.com/google/fonts/tree/main/ofl/shipporiminchob1
"""
import argparse, math, os, subprocess, tempfile

import numpy as np
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

CHARS = ("述", "懐")

GAP_EM = 0.045   # gap between the two characters' ink boxes, in em
MARGIN = 7.5     # ink clearance to the innermost frame line, viewBox units

STYLES = dict(
    classic=dict(outer_w=7, inner_w=2.2, ring_gap=4.5, sq_radius=10, oct_cut=34),
    minimal=dict(outer_w=3, inner_w=None, ring_gap=0, sq_radius=8, oct_cut=34),
)


class Glyph:
    """Outline in y-down SVG coords, 1 unit = 1 em."""

    def __init__(self, font, char):
        upm = font["head"].unitsPerEm
        gs = font.getGlyphSet()
        g = gs[font.getBestCmap()[ord(char)]]
        t = Transform(1 / upm, 0, 0, -1 / upm, 0, 0)
        spen = SVGPathPen(gs, ntos=lambda v: f"{v:.4f}")
        g.draw(TransformPen(spen, t))
        self.d = spen.getCommands()
        bpen = BoundsPen(gs)
        g.draw(TransformPen(bpen, t))
        self.xmin, self.ymin, self.xmax, self.ymax = bpen.bounds
        self.w, self.h = self.xmax - self.xmin, self.ymax - self.ymin


def ink_points(glyph, res=400):
    """Rasterize the glyph alone; ink pixel coords in em, origin = ink top-left."""
    pad = 8
    W, H = int(glyph.w * res) + 2 * pad, int(glyph.h * res) + 2 * pad
    tx, ty = pad - glyph.xmin * res, pad - glyph.ymin * res
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}">'
           f'<path transform="translate({tx},{ty}) scale({res})" d="{glyph.d}" fill="#000"/></svg>')
    with tempfile.TemporaryDirectory() as td:
        s, p = os.path.join(td, "g.svg"), os.path.join(td, "g.png")
        with open(s, "w") as f:
            f.write(svg)
        subprocess.run(["rsvg-convert", s, "-o", p], check=True)
        a = np.array(Image.open(p).convert("L"))
    ys, xs = np.where(a < 200)
    return (xs - pad) / res, (ys - pad) / res


def stacked_cloud(g1, g2, gap_em):
    """Both glyphs stacked (em-centered horizontally), origin = block center."""
    x1, y1 = ink_points(g1)
    x2, y2 = ink_points(g2)
    bh = g1.h + gap_em + g2.h
    return np.concatenate([
        np.stack([x1 + g1.xmin - 0.5, y1 - bh / 2], axis=1),
        np.stack([x2 + g2.xmin - 0.5, y2 - bh / 2 + g1.h + gap_em], axis=1),
    ])


def max_scale(pts, inside, lo=1.0, hi=500.0, iters=40):
    for _ in range(iters):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if inside(pts * mid) else (lo, mid)
    return lo


def in_circle(r):
    return lambda p: bool(np.all(p[:, 0] ** 2 + p[:, 1] ** 2 <= r * r))


def in_rect(hw, hh):
    return lambda p: bool(np.all((np.abs(p[:, 0]) <= hw) & (np.abs(p[:, 1]) <= hh)))


def in_octagon(hw, hh, cut):
    def f(p):
        ax, ay = np.abs(p[:, 0]), np.abs(p[:, 1])
        return bool(np.all((ax <= hw) & (ay <= hh) & (ax + ay <= hw + hh - cut)))
    return f


def in_stadium(hw, hh):
    def f(p):
        ax, ay = np.abs(p[:, 0]), np.abs(p[:, 1])
        return bool(np.all((ax <= hw) &
                           ((ay <= hh - hw) | (ax ** 2 + (ay - (hh - hw)) ** 2 <= hw ** 2))))
    return f


def octagon_path(cx, cy, w, h, cut):
    x0, y0, x1, y1 = cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2
    pts = [(x0 + cut, y0), (x1 - cut, y0), (x1, y0 + cut), (x1, y1 - cut),
           (x1 - cut, y1), (x0 + cut, y1), (x0, y1 - cut), (x0, y0 + cut)]
    return "M" + " L".join(f"{x:.2f},{y:.2f}" for x, y in pts) + " Z"


def stadium_path(cx, cy, w, h, inset):
    w, h = w - 2 * inset, h - 2 * inset
    r = w / 2
    x0, x1, yt, yb = cx - r, cx + r, cy - h / 2 + r, cy + h / 2 - r
    return (f"M{x0:.2f},{yt:.2f} A{r:.2f},{r:.2f} 0 0 1 {x1:.2f},{yt:.2f} "
            f"L{x1:.2f},{yb:.2f} A{r:.2f},{r:.2f} 0 0 1 {x0:.2f},{yb:.2f} Z")


def glyph_elems(g1, g2, cx, cy, em, gap_em, fill):
    h1, gappx = g1.h * em, gap_em * em
    top = cy - (h1 + gappx + g2.h * em) / 2
    out = []
    for g, ink_top in ((g1, top), (g2, top + h1 + gappx)):
        tx, ty = cx - em / 2, ink_top - g.ymin * em
        out.append(f'<path transform="translate({tx:.3f},{ty:.3f}) scale({em:.4f})" d="{g.d}" fill="{fill}"/>')
    return out


def build(shape, g1, g2, pts, color, st, solid=False):
    """Return SVG string. st: style dict. solid: filled shape, knocked-out chars."""
    has_inner = st["inner_w"] is not None
    # offset from outer line center to inner line center (0 if no inner line)
    d_in = (st["outer_w"] / 2 + st["ring_gap"] + st["inner_w"] / 2) if has_inner else 0.0
    innermost_w = st["inner_w"] if has_inner else st["outer_w"]

    if shape == "circle":
        W = H = 240
        cx = cy = 120
        r_outer = 120 - st["outer_w"] / 2 - 1
        r_in = r_outer - d_in
        em = max_scale(pts, in_circle(r_in - innermost_w / 2 - MARGIN))
        frame = [f'<circle cx="{cx}" cy="{cy}" r="{r_outer:.2f}" fill="none" stroke="{color}" stroke-width="{st["outer_w"]}"/>']
        if has_inner:
            frame.append(f'<circle cx="{cx}" cy="{cy}" r="{r_in:.2f}" fill="none" stroke="{color}" stroke-width="{st["inner_w"]}"/>')
        solid_outer = f'<circle cx="{cx}" cy="{cy}" r="{r_outer + st["outer_w"] / 2:.2f}"'
        solid_inner_line = (f'<circle cx="{cx}" cy="{cy}" r="{r_in:.2f}" fill="none" stroke="#000" stroke-width="{st["inner_w"]}"/>'
                            if has_inner else "")

    elif shape == "square":
        W = H = 240
        cx = cy = 120
        o = st["outer_w"] / 2 + 1
        i = o + d_in
        ir = max(st["sq_radius"] - d_in, 1)
        em = max_scale(pts, in_rect(*[120 - (i + innermost_w / 2 + MARGIN)] * 2))
        frame = [f'<rect x="{o:.2f}" y="{o:.2f}" width="{240 - 2 * o:.2f}" height="{240 - 2 * o:.2f}" rx="{st["sq_radius"]}" fill="none" stroke="{color}" stroke-width="{st["outer_w"]}"/>']
        if has_inner:
            frame.append(f'<rect x="{i:.2f}" y="{i:.2f}" width="{240 - 2 * i:.2f}" height="{240 - 2 * i:.2f}" rx="{ir:.2f}" fill="none" stroke="{color}" stroke-width="{st["inner_w"]}"/>')
        oo = o - st["outer_w"] / 2
        solid_outer = f'<rect x="{oo:.2f}" y="{oo:.2f}" width="{240 - 2 * oo:.2f}" height="{240 - 2 * oo:.2f}" rx="{st["sq_radius"] + st["outer_w"] / 2:.2f}"'
        solid_inner_line = (f'<rect x="{i:.2f}" y="{i:.2f}" width="{240 - 2 * i:.2f}" height="{240 - 2 * i:.2f}" rx="{ir:.2f}" fill="none" stroke="#000" stroke-width="{st["inner_w"]}"/>'
                            if has_inner else "")

    elif shape == "oval":
        W, H = 168, 240
        cx, cy = 84, 120
        o = st["outer_w"] / 2 + 1
        i2 = o + d_in
        inset = i2 + innermost_w / 2 + MARGIN
        em = max_scale(pts, in_stadium((W - 2) / 2 - inset, (H - 2) / 2 - inset))
        frame = [f'<path d="{stadium_path(cx, cy, W - 2, H - 2, o)}" fill="none" stroke="{color}" stroke-width="{st["outer_w"]}"/>']
        if has_inner:
            frame.append(f'<path d="{stadium_path(cx, cy, W - 2, H - 2, i2)}" fill="none" stroke="{color}" stroke-width="{st["inner_w"]}"/>')
        solid_outer = f'<path d="{stadium_path(cx, cy, W - 2, H - 2, o - st["outer_w"] / 2)}"'
        solid_inner_line = (f'<path d="{stadium_path(cx, cy, W - 2, H - 2, i2)}" fill="none" stroke="#000" stroke-width="{st["inner_w"]}"/>'
                            if has_inner else "")

    elif shape == "octagon":
        W, H = 200, 240
        cx, cy = 100, 120
        o = st["outer_w"] / 2 + 1
        cut = st["oct_cut"]
        ow, oh = W - 2 * o - 2, H - 2 * o - 2
        iw, ih = ow - 2 * d_in, oh - 2 * d_in
        icut = cut - d_in * (2 - math.sqrt(2))
        m = innermost_w / 2 + MARGIN
        em = max_scale(pts, in_octagon(iw / 2 - m, ih / 2 - m, icut - m * (2 - math.sqrt(2))))
        frame = [f'<path d="{octagon_path(cx, cy, ow, oh, cut)}" fill="none" stroke="{color}" stroke-width="{st["outer_w"]}" stroke-linejoin="miter"/>']
        if has_inner:
            frame.append(f'<path d="{octagon_path(cx, cy, iw, ih, icut)}" fill="none" stroke="{color}" stroke-width="{st["inner_w"]}" stroke-linejoin="miter"/>')
        ow2, oh2 = ow + st["outer_w"], oh + st["outer_w"]
        solid_outer = f'<path d="{octagon_path(cx, cy, ow2, oh2, cut + st["outer_w"] * (math.sqrt(2) - 1))}"'
        solid_inner_line = (f'<path d="{octagon_path(cx, cy, iw, ih, icut)}" fill="none" stroke="#000" stroke-width="{st["inner_w"]}" stroke-linejoin="miter"/>'
                            if has_inner else "")

    desc = ('<desc>Jukkai 述懐 seal — Shippori Mincho B1 Bold (SIL OFL 1.1), '
            'parametric composition</desc>')
    if solid:
        knock = solid_inner_line + "".join(glyph_elems(g1, g2, cx, cy, em, GAP_EM, "#000"))
        body = (f'<mask id="k"><rect width="{W}" height="{H}" fill="#fff"/>{knock}</mask>'
                f'{solid_outer} fill="{color}" mask="url(#k)"/>')
    else:
        body = "".join(frame) + "".join(glyph_elems(g1, g2, cx, cy, em, GAP_EM, color))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
            f'viewBox="0 0 {W} {H}">{desc}{body}</svg>')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fonts-dir", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--color", default="currentColor")
    a = ap.parse_args()

    font = TTFont(os.path.join(a.fonts_dir, "ShipporiMinchoB1-Bold.ttf"))
    g1, g2 = Glyph(font, CHARS[0]), Glyph(font, CHARS[1])
    pts = stacked_cloud(g1, g2, GAP_EM)
    os.makedirs(a.out, exist_ok=True)

    for style, st in STYLES.items():
        suffix = "" if style == "classic" else f"-{style}"
        for shape, solid in [("circle", False), ("square", False), ("oval", False),
                             ("octagon", False), ("octagon", True)]:
            svg = build(shape, g1, g2, pts, a.color, st, solid)
            name = f"seal-{shape}{'-solid' if solid else ''}{suffix}.svg"
            with open(os.path.join(a.out, name), "w") as f:
                f.write(svg)
            print("wrote", name)


if __name__ == "__main__":
    main()
