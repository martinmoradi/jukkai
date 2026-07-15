"""Extract glyph outlines from the jukkai fonts and report geometry vs the reference SVG."""
import os
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
import json, sys

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

def load(font_key, wght=None, nat_weight=None):
    if font_key == "national":
        path = str(FONTS["national"]).format(weight=nat_weight)
        return TTFont(path)
    f = TTFont(FONTS[font_key])
    if wght is not None:
        axes = {"wght": wght}
        if font_key == "hellix":
            axes["slnt"] = 0
        instantiateVariableFont(f, axes, inplace=True)
    return f

def glyph_info(font, char):
    cmap = font.getBestCmap()
    gname = cmap[ord(char)]
    gs = font.getGlyphSet()
    g = gs[gname]
    bp = BoundsPen(gs)
    g.draw(bp)
    return gname, g, gs, bp.bounds, g.width

def glyph_svg_path(font, char, transform):
    """SVG path string for char under (font units -> svg units) transform."""
    gname, g, gs, bounds, width = glyph_info(font, char)
    spen = SVGPathPen(gs, ntos=lambda v: f"{v:.3f}")
    tpen = TransformPen(spen, transform)
    g.draw(tpen)
    return spen.getCommands()

if __name__ == "__main__":
    report = {}
    for label, key, wght, nat, chars in [
        ("hellix-625", "hellix", 625, None, "ua"),
        ("maxi-455", "maxi", 455, None, "ji"),
        ("national-Regular", "national", None, "Regular", "k"),
        ("national-Medium", "national", None, "Medium", "k"),
        ("national-Bold", "national", None, "Bold", "k"),
        ("national-Extrabold", "national", None, "Extrabold", "k"),
        ("national-Black", "national", None, "Black", "k"),
    ]:
        f = load(key, wght, nat)
        upem = f["head"].unitsPerEm
        entry = {"upem": upem}
        for c in chars:
            gname, g, gs, bounds, width = glyph_info(f, c)
            entry[c] = {"glyph": gname, "bounds": bounds, "advance": width}
        report[label] = entry
    print(json.dumps(report, indent=1))
