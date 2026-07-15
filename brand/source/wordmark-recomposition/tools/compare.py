"""Overlay raw font glyphs on the reference wordmark letters; output diff PNGs + IoU."""
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
import subprocess, io, json, re
from PIL import Image
import ref_paths
from measure import load

PX = 4  # px per svg unit
BASELINE = ref_paths.BASELINE

S_HELLIX = 0.349180
S_MAXI   = 0.371958
S_NAT    = 0.358125

def path_bbox(ds):
    # crude numeric bbox from all coords in path strings (good enough: paths use absolute coords)
    xs, ys = [], []
    for d in ds:
        # tokenize commands with coords
        for cmd, coords in re.findall(r'([MLCVHZ])([^MLCVHZ]*)', d.replace(',', ' ')):
            nums = [float(v) for v in coords.split()]
            if cmd in 'MLC':
                xs += nums[0::2]; ys += nums[1::2]
            elif cmd == 'V': ys += nums
            elif cmd == 'H': xs += nums
    return min(xs), min(ys), max(xs), max(ys)

def render(svg_body, vb, out):
    x0, y0, x1, y1 = vb
    w, h = (x1-x0), (y1-y0)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w*PX:.0f}" height="{h*PX:.0f}" '
           f'viewBox="{x0} {y0} {w} {h}">{svg_body}</svg>')
    png = subprocess.run(["rsvg-convert", "-"], input=svg.encode(), capture_output=True, check=True).stdout
    img = Image.open(io.BytesIO(png)).convert("RGBA")
    if out: img.save(out)
    return img

def glyph_path_svg(font, char, s, ox, baseline_y):
    gs = font.getGlyphSet()
    g = gs[font.getBestCmap()[ord(char)]]
    spen = SVGPathPen(gs, ntos=lambda v: f"{v:.3f}")
    g.draw(spen)
    d = spen.getCommands()
    return f'<g transform="translate({ox},{baseline_y}) scale({s},{-s})"><path d="{d}" fill="black"/></g>', g

def glyph_bbox_svgunits(font, char, s, ox, baseline_y):
    gs = font.getGlyphSet()
    g = gs[font.getBestCmap()[ord(char)]]
    bp = BoundsPen(gs); g.draw(bp)
    xmin, ymin, xmax, ymax = bp.bounds
    return (ox + xmin*s, baseline_y - ymax*s, ox + xmax*s, baseline_y - ymin*s)

def alpha_mask(img):
    # black shapes on transparent bg -> boolean mask
    return img.split()[3].point(lambda a: 255 if a > 127 else 0).convert("1")

def compare(letter, font, char, s, baseline_y=None, tag=""):
    baseline_y = baseline_y if baseline_y is not None else BASELINE
    ds = [ref_paths.REF[k] for k in ref_paths.LETTERS[letter]]
    rx0, ry0, rx1, ry1 = path_bbox(ds)
    # fit ox: align glyph bbox left with ref bbox left
    gs = font.getGlyphSet()
    g = gs[font.getBestCmap()[ord(char)]]
    bp = BoundsPen(gs); g.draw(bp)
    xmin, ymin, xmax, ymax = bp.bounds
    ox = rx0 - xmin * s
    pad = 8
    vb = (rx0-pad, ry0-pad, rx1+pad, ry1+pad)
    ref_body = "".join(f'<path d="{d}" fill="black"/>' for d in ds)
    ref_img = render(ref_body, vb, None)
    cand_body, _ = glyph_path_svg(font, char, s, ox, baseline_y)
    cand_img = render(cand_body, vb, None)
    rm, cm = alpha_mask(ref_img), alpha_mask(cand_img)
    import PIL.ImageChops as C
    inter = C.logical_and(rm, cm); union = C.logical_or(rm, cm)
    ni = sum(inter.point(lambda p: p and 1).getdata())
    nu = sum(union.point(lambda p: p and 1).getdata())
    iou = ni/nu if nu else 0
    # overlay: both=black, ref-only=red, cand-only=blue
    W, H = rm.size
    out = Image.new("RGB", (W, H), "white")
    px = out.load(); rp, cp = rm.load(), cm.load()
    for y in range(H):
        for x in range(W):
            r, c = rp[x,y], cp[x,y]
            if r and c: px[x,y] = (0,0,0)
            elif r: px[x,y] = (220,30,30)
            elif c: px[x,y] = (30,60,230)
    name = f"cmp_{letter}{('_'+tag) if tag else ''}.png"
    out.save(name)
    return {"letter": letter, "tag": tag, "iou": round(iou,4), "img": name,
            "cand_bbox": [round(v,2) for v in glyph_bbox_svgunits(font, char, s, ox, baseline_y)],
            "ref_bbox": [round(v,2) for v in (rx0,ry0,rx1,ry1)]}

if __name__ == "__main__":
    res = []
    hel = load("hellix", wght=625)
    res.append(compare("u", hel, "u", S_HELLIX))
    res.append(compare("a", hel, "a", S_HELLIX))
    maxi = load("maxi", wght=455)
    res.append(compare("j", maxi, "j", S_MAXI))
    res.append(compare("i", maxi, "i", S_MAXI))
    for nw in ["Regular", "Medium", "Bold"]:
        nat = load("national", nat_weight=nw)
        res.append(compare("k1", nat, "k", S_NAT, baseline_y=258.74, tag=nw))
    for r in res: print(json.dumps(r))
