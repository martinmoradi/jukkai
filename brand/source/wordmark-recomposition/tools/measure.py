"""Measure stem widths of glyphs by rasterizing them at high resolution."""
import os
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
import subprocess, io, json
from PIL import Image

BRAND_FONTS_DIR = Path(
    os.environ.get(
        "JUKKAI_BRAND_FONTS_DIR",
        Path(__file__).resolve().parents[3] / "fonts",
    )
)

FONTS = {
    "hellix": BRAND_FONTS_DIR / "HellixVF-Regular.woff2",
    "maxi": BRAND_FONTS_DIR / "ABCMaxiSharpVariable-Trial.ttf",
    "national": BRAND_FONTS_DIR / "TestNational2-{weight}.otf",
}

_cache = {}
def load(font_key, wght=None, nat_weight=None):
    k = (font_key, wght, nat_weight)
    if k in _cache: return _cache[k]
    if font_key == "national":
        path = str(FONTS["national"]).format(weight=nat_weight)
        f = TTFont(path)
    else:
        f = TTFont(FONTS[font_key])
        if wght is not None:
            axes = {"wght": wght}
            if font_key == "hellix": axes["slnt"] = 0
            instantiateVariableFont(f, axes, inplace=True)
    _cache[k] = f
    return f

def raster_glyph(font, char, px_per_unit=1.0):
    """Rasterize glyph filled black on white; returns (PIL image, bounds)."""
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    g = gs[cmap[ord(char)]]
    from fontTools.pens.boundsPen import BoundsPen
    bp = BoundsPen(gs); g.draw(bp)
    xmin, ymin, xmax, ymax = bp.bounds
    pad = 10
    w = (xmax - xmin) + 2*pad; h = (ymax - ymin) + 2*pad
    spen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}")
    g.draw(spen)
    path = spen.getCommands()
    # y-flip: font y-up -> svg y-down
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w*px_per_unit:.0f}" height="{h*px_per_unit:.0f}" '
           f'viewBox="0 0 {w} {h}"><rect width="100%" height="100%" fill="white"/>'
           f'<g transform="translate({pad-xmin},{ymax+pad}) scale(1,-1)"><path d="{path}" fill="black"/></g></svg>')
    png = subprocess.run(["rsvg-convert", "-"], input=svg.encode(), capture_output=True, check=True).stdout
    img = Image.open(io.BytesIO(png)).convert("L")
    return img, (xmin, ymin, xmax, ymax), pad

def stem_width_at(img, frac_y, px_per_unit=1.0):
    """Width of the first black run scanning a horizontal line at frac_y of image height."""
    w, h = img.size
    y = int(h * frac_y)
    row = [img.getpixel((x, y)) < 128 for x in range(w)]
    runs = []
    x = 0
    while x < w:
        if row[x]:
            x0 = x
            while x < w and row[x]: x += 1
            runs.append((x0, x - x0))
        else:
            x += 1
    return [(r[0]/px_per_unit, r[1]/px_per_unit) for r in runs]

if __name__ == "__main__":
    out = {}
    # Hellix u: stems at mid x-height (scan at 30% from top of glyph = upper stems region)
    for wght in [400, 450, 500, 550, 575, 600, 625, 650]:
        f = load("hellix", wght=wght)
        img, b, pad = raster_glyph(f, "u")
        runs = stem_width_at(img, 0.25)
        out[f"hellix-{wght}-u-runs@25%"] = runs
    for wght in [300, 350, 400, 455, 500]:
        f = load("maxi", wght=wght)
        img, b, pad = raster_glyph(f, "i")
        runs = stem_width_at(img, 0.85)  # stem region below tittle
        out[f"maxi-{wght}-i-runs@85%"] = runs
    for nw in ["Regular", "Medium", "Bold", "Extrabold"]:
        f = load("national", nat_weight=nw)
        img, b, pad = raster_glyph(f, "k")
        runs = stem_width_at(img, 0.5)
        out[f"national-{nw}-k-runs@50%"] = runs
    print(json.dumps(out, indent=1))
