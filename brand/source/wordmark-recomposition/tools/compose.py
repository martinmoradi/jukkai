"""Compose full jukkai wordmark SVGs from raw letterforms + parametric K."""
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
from measure import load
from kbuild import k1_path, k2_path, W0
import json

S_HELLIX = 0.349180
S_MAXI   = 0.371958
BASELINE = 258.789

# captured baseline letter placement (from reference wordmark)
CENTERS = {"j": 30.361, "u": 174.745, "a": 705.633, "i": 856.643}
DOT_TOP = {"j": 0.0, "i": 0.34}
K1_BASE_Y, K2_BASE_Y = 258.74, 258.825
KAPPA_CX1, KAPPA_CX2 = 319.294, 481.371  # k stem centers

def split_contours(glyph, glyphset):
    rec = RecordingPen(); glyph.draw(rec)
    contours, cur = [], []
    for op, args in rec.value:
        if op == "moveTo" and cur:
            contours.append(cur); cur = []
        cur.append((op, args))
        if op == "closePath":
            contours.append(cur); cur = []
    if cur: contours.append(cur)
    return contours

def contour_bbox(contour):
    xs, ys = [], []
    for op, args in contour:
        for pt in args:
            xs.append(pt[0]); ys.append(pt[1])
    return min(xs), min(ys), max(xs), max(ys)

def contour_svg(contour, transform):
    spen = SVGPathPen(None, ntos=lambda v: f"{v:.3f}")
    tpen = TransformPen(spen, transform)
    for op, args in contour:
        getattr(tpen, op)(*args)
    return spen.getCommands()

def letter_paths(font, char, s, center_x, dot_top=None):
    """Place glyph: bbox-center-x at center_x, baseline at BASELINE.
    If dot_top given, the topmost contour is pinned so its top = dot_top.
    Returns list of (suffix, svg_d)."""
    gs = font.getGlyphSet()
    g = gs[font.getBestCmap()[ord(char)]]
    bp = BoundsPen(gs); g.draw(bp)
    xmin, ymin, xmax, ymax = bp.bounds
    ox = center_x - s * (xmin + xmax) / 2
    base = Transform(s, 0, 0, -s, ox, BASELINE)
    contours = split_contours(g, gs)
    if dot_top is None:
        d = "".join(contour_svg(c, base) for c in contours)
        return [("", d)]
    # find dot = contour with highest ymax
    boxes = [contour_bbox(c) for c in contours]
    dot_i = max(range(len(contours)), key=lambda i: boxes[i][3])
    out = []
    stem_d = "".join(contour_svg(c, base) for i, c in enumerate(contours) if i != dot_i)
    nat_top = BASELINE - s * boxes[dot_i][3]
    dot_t = Transform(1, 0, 0, 1, 0, dot_top - nat_top).transform(base)
    out.append(("stem", stem_d))
    out.append(("tittle", contour_svg(contours[dot_i], dot_t)))
    return out

def compose(name, hellix_wght, maxi_wght, k_w):
    hel = load("hellix", wght=hellix_wght)
    mx = load("maxi", wght=maxi_wght)
    k2_xl = KAPPA_CX2 - k_w / 2
    d_k1, _ = k1_path(k_w, k2_xl=k2_xl)
    d_k2, _ = k2_path(k_w)
    paths = []
    for suf, d in letter_paths(mx, "j", S_MAXI, CENTERS["j"], dot_top=DOT_TOP["j"]):
        paths.append((f"j / Maxi Sharp {maxi_wght} / {suf}", d))
    for suf, d in letter_paths(hel, "u", S_HELLIX, CENTERS["u"]):
        paths.append((f"u / Hellix {hellix_wght}", d))
    paths.append((f"k / National 2 mod w={k_w:.2f} / first", d_k1))
    paths.append((f"k / National 2 mod w={k_w:.2f} / second", d_k2))
    for suf, d in letter_paths(hel, "a", S_HELLIX, CENTERS["a"]):
        paths.append((f"a / Hellix {hellix_wght}", d))
    for suf, d in letter_paths(mx, "i", S_MAXI, CENTERS["i"], dot_top=DOT_TOP["i"]):
        paths.append((f"i / Maxi Sharp {maxi_wght} / {suf}", d))
    body = "\n".join(f'<path id="{pid}" d="{d}" fill="black"/>' for pid, d in paths)
    svg = (f'<svg width="887" height="348" viewBox="0 0 887 348" fill="none" '
           f'xmlns="http://www.w3.org/2000/svg">\n<g id="{name}">\n{body}\n</g>\n</svg>\n')
    fn = f"out_{name}.svg"
    with open(fn, "w") as f: f.write(svg)
    return fn

if __name__ == "__main__":
    w = json.load(open("weights.json"))
    files = [
        compose("recomposition-baseline", 625, 455, W0),
        compose("study-thin-17", 533, 361, W0 * 0.83),
        compose("study-thin-26", 480, 323, W0 * 0.74),
    ]
    print("\n".join(files))
