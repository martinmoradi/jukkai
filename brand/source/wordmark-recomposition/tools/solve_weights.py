"""Bisect variable-font weights to hit target stem widths (svg units)."""
from measure import load, raster_glyph, stem_width_at
import json

S_HELLIX = 0.349180
S_MAXI   = 0.371958
W0 = 41.574
TARGETS = {"current": W0, "t17": W0 * 0.83, "t26": W0 * 0.74}

def hellix_stem(wght):
    f = load("hellix", wght=round(wght, 1))
    img, b, pad = raster_glyph(f, "u", px_per_unit=2.0)
    runs = stem_width_at(img, 0.25, px_per_unit=2.0)
    return runs[0][1] * S_HELLIX

def maxi_stem(wght):
    f = load("maxi", wght=round(wght, 1))
    img, b, pad = raster_glyph(f, "i", px_per_unit=2.0)
    runs = stem_width_at(img, 0.85, px_per_unit=2.0)
    return runs[0][1] * S_MAXI

def bisect(fn, target, lo, hi, tol=0.03):
    flo, fhi = fn(lo), fn(hi)
    for _ in range(24):
        mid = (lo + hi) / 2
        fm = fn(mid)
        if abs(fm - target) < tol: return mid, fm
        if fm < target: lo = mid
        else: hi = mid
    return mid, fm

out = {}
for name, tgt in TARGETS.items():
    hw, hs = bisect(hellix_stem, tgt, 300, 700)
    mw, ms = bisect(maxi_stem, tgt, 250, 550)
    out[name] = {"target_stem": round(tgt, 3),
                 "hellix_wght": round(hw, 1), "hellix_stem": round(hs, 2),
                 "maxi_wght": round(mw, 1), "maxi_stem": round(ms, 2)}
print(json.dumps(out, indent=1))
with open("weights.json", "w") as f: json.dump(out, f)
