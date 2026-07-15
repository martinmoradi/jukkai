"""Parametric rebuild of Martin's authored K pair (National 2 Medium base).

All constants are the captured baseline path coordinates. k1(w)/k2(w)
regenerate the pair at stem width w, preserving the authored skeleton:
stem centerlines, diagonal angles, flat arm tips on the x-height line,
rounded stem cap (radius scales with weight), junction jogs (grow slightly
as the font does), the k1->k2 ligature foot, and the k2 leg bracket.
"""
import math

W0 = 41.574                    # captured baseline stem width (all letters)

# --- k1 constants (Martin's path) ---
K1_XL, K1_XR = 298.507, 340.081
K1_TOP, K1_BASE = 0.169983, 258.74
R0 = 32.3                      # stem cap corner radius at W0
ARM_TIP_Y1 = 86.7              # flat arm cut (x-height line)
# arm upper (outer) edge: tip -> junction
ARM_UP_A1, ARM_UP_B1 = (452.043, 86.7), (389.287, 166.26)
# arm inner edge, two segments (tip side first)
ARM_IN_A1, ARM_IN_M1, ARM_IN_B1 = (404.953, 86.7), (378.917, 120.02), (353.587, 152.32)
JOG_ARM0 = 353.587 - K1_XR     # 13.506
# leg (k1): outer edge junction -> foot, inner edge stem -> foot
LEG1_OUT_A, LEG1_OUT_B = (389.287, 166.26), (440.823, 239.19)
LEG1_IN_A, LEG1_IN_B = (352.907, 183.26), (398.984, 245.632)
JOG_LEG0 = 352.907 - K1_XR     # 12.826
# k1 ligature foot control points (between leg edges and baseline)
FOOT = {
    "pa": (443.713, 242.871),
    "c1": (447.819, 248.1), "c2": (454.565, 250.504), "pb": (461.053, 249.05),
    "pc": (464.963, 251.43),
    "tip_base": (464.963, 258.74),
    "heel": (424.964, 258.74),
    "c3": (414.715, 258.74), "c4": (405.074, 253.876),
}
# --- k2 constants ---
K2_XL, K2_XR = 460.584, 502.158
K2_TOP, K2_BASE = 0.255005, 258.825
ARM_TIP_Y2 = 86.785
DX2 = K2_XL - K1_XL + (298.507 + 41.574 - 340.081)  # k2 arm = k1 arm translated
ARM_SHIFT = (162.077, 0.085)   # measured: k2 arm == k1 arm + this
LEG2_OUT_A, LEG2_OUT_B = (551.364, 166.345), (619.704, 258.825)
LEG2_IN_A, LEG2_IN_B = (514.984, 183.345), (561.061, 245.717)
BRACKET = {
    "c1": (567.151, 253.961), "c2": (576.792, 258.825), "end": (587.041, 258.825),
}
OVERLAP0 = 464.963 - K2_XL     # 4.379  (k1 foot overlaps k2 stem)
JOG_GROWTH = 0.122             # from National2 Regular vs Medium

def _line(p, q):
    """Return (a,b,c) for ax+by=c through p,q, normalized."""
    (x1, y1), (x2, y2) = p, q
    a, b = y2 - y1, x1 - x2
    n = math.hypot(a, b)
    a, b = a / n, b / n
    return a, b, a * x1 + b * y1

def _offset(line, d):
    a, b, c = line
    return a, b, c + d

def _isect(l1, l2):
    a1, b1, c1 = l1; a2, b2, c2 = l2
    det = a1 * b2 - a2 * b1
    return ((c1 * b2 - c2 * b1) / det, (a1 * c2 - a2 * c1) / det)

def _perp_dist(line, p):
    a, b, c = line
    return a * p[0] + b * p[1] - c

def _at_x(line, x):
    a, b, c = line
    return (x, (c - a * x) / b)

def _fmt(v):
    return f"{v:.3f}".rstrip("0").rstrip(".")

class PathBuf:
    def __init__(self): self.d = []
    def M(self, p): self.d.append(f"M{_fmt(p[0])} {_fmt(p[1])}")
    def L(self, p): self.d.append(f"L{_fmt(p[0])} {_fmt(p[1])}")
    def H(self, x): self.d.append(f"H{_fmt(x)}")
    def V(self, y): self.d.append(f"V{_fmt(y)}")
    def C(self, c1, c2, p):
        self.d.append("C" + " ".join(f"{_fmt(a)} {_fmt(b)}" for a, b in (c1, c2, p)))
    def Z(self): self.d.append("Z")
    def get(self): return "".join(self.d)

def _arm_edges(w, tip_y, shift=(0.0, 0.0)):
    """Offset arm edge lines for stem width w. Returns (upper_line, inner_seg_tip, inner_seg_low)."""
    f = w / W0
    sh = lambda p: (p[0] + shift[0], p[1] + shift[1])
    up = _line(sh(ARM_UP_A1), sh(ARM_UP_B1))
    in_tip = _line(sh(ARM_IN_A1), sh(ARM_IN_M1))
    in_low = _line(sh(ARM_IN_M1), sh(ARM_IN_B1))
    # perpendicular thickness between upper and inner(lower seg), measured at ARM_IN_B1
    t = abs(_perp_dist(up, sh(ARM_IN_B1)))
    d = (1 - f) * t / 2
    # move upper edge toward inner (inner side sign)
    s_up = -1 if _perp_dist(up, sh(ARM_IN_B1)) > 0 else 1
    up_o = _offset(up, -s_up * -d) if False else _offset(up, _sign_towards(up, sh(ARM_IN_B1)) * d)
    in_tip_o = _offset(in_tip, _sign_towards(in_tip, sh(ARM_UP_A1)) * d)
    in_low_o = _offset(in_low, _sign_towards(in_low, sh(ARM_UP_A1)) * d)
    return up_o, in_tip_o, in_low_o

def _sign_towards(line, p):
    """+1/-1 such that offsetting by +d moves the line towards point p."""
    return 1 if _perp_dist(line, p) > 0 else -1

def _leg_edges(w, out_a, out_b, in_a, in_b):
    f = w / W0
    out = _line(out_a, out_b)
    inn = _line(in_a, in_b)
    t = abs(_perp_dist(out, in_b))
    d = (1 - f) * t / 2
    out_o = _offset(out, _sign_towards(out, in_b) * d)
    in_o = _offset(inn, _sign_towards(inn, out_b) * d)
    return out_o, in_o

def _baseline_affine(pairs, base_y, y_scale=None):
    """Affine x'=ax+by+c, y'=dy+e mapping given (src,dst) pairs; baseline y fixed.
    y_scale: explicit vertical scale about the baseline (else derived from pairs[0])."""
    if y_scale is not None:
        d = y_scale
    else:
        (sx, sy), (dx_, dy_) = pairs[0]
        d = (base_y - dy_) / (base_y - sy)
    e = base_y * (1 - d)
    # x-map: solve a,b,c from three x correspondences
    import itertools
    A, rhs = [], []
    for (s, t) in pairs:
        A.append([s[0], s[1], 1.0]); rhs.append(t[0])
    det = lambda m: (m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])
                   - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])
                   + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]))
    D = det(A)
    cols = []
    for i in range(3):
        M = [row[:] for row in A]
        for r in range(3): M[r][i] = rhs[r]
        cols.append(det(M) / D)
    a, b, c = cols
    def apply(p):
        return (a * p[0] + b * p[1] + c, d * p[1] + e)
    return apply

def k1_path(w, k2_xl=None):
    """Martin's k1 at stem width w. k2_xl: left edge of k2 stem (for ligature overlap)."""
    f = w / W0
    cx = (K1_XL + K1_XR) / 2
    xl, xr = cx - w / 2, cx + w / 2
    r = R0 * f
    up, in_tip, in_low = _arm_edges(w, ARM_TIP_Y1)
    leg_out, leg_in = _leg_edges(w, LEG1_OUT_A, LEG1_OUT_B, LEG1_IN_A, LEG1_IN_B)
    tip_line = (0.0, 1.0, ARM_TIP_Y1)
    arm_tip_out = _isect(up, tip_line)
    arm_tip_in = _isect(in_tip, tip_line)
    arm_kink = _isect(in_tip, in_low)
    junction = _isect(up, leg_out)
    jog_arm = JOG_ARM0 + JOG_GROWTH * (W0 - w)
    jog_leg = JOG_LEG0 + JOG_GROWTH * (W0 - w)
    arm_in_end = _at_x(in_low, xr + jog_arm)
    leg_in_start = _at_x(leg_in, xr + jog_leg)
    # foot: terminal scales by f about the baseline; attachments slide along new edges
    foot_out_attach = _at_y(leg_out, K1_BASE - (K1_BASE - LEG1_OUT_B[1]) * f)
    foot_in_attach = _at_y(leg_in, K1_BASE - (K1_BASE - LEG1_IN_B[1]) * f)
    k2xl = k2_xl if k2_xl is not None else K2_XL
    tip_x = k2xl + OVERLAP0 * f
    amap = _baseline_affine(
        [ (LEG1_IN_B,  foot_in_attach),
          (LEG1_OUT_B, foot_out_attach),
          (FOOT["tip_base"], (tip_x, K1_BASE)) ],
        K1_BASE, y_scale=f)
    p = PathBuf()
    p.M(arm_tip_out)
    p.L(junction)
    p.L(foot_out_attach)
    p.L(amap(FOOT["pa"]))
    p.C(amap(FOOT["c1"]), amap(FOOT["c2"]), amap(FOOT["pb"]))
    p.L(amap(FOOT["pc"]))
    p.V(K1_BASE)
    p.H(amap(FOOT["heel"])[0])
    p.C(amap(FOOT["c3"]), amap(FOOT["c4"]), foot_in_attach)
    p.L(leg_in_start)
    p.H(xr)
    p.V(K1_BASE)
    p.H(xl)
    p.V(K1_TOP)
    p.H(xr - r)
    p.C((xr - r + r * 0.5523, K1_TOP), (xr, K1_TOP + r * (1 - 0.5523)), (xr, K1_TOP + r))
    p.V(arm_in_end[1])
    p.H(arm_in_end[0])
    p.L(arm_kink)
    p.L(arm_tip_in)
    p.H(arm_tip_out[0])
    p.Z()
    return p.get(), {"xl": xl, "xr": xr}

def _at_y(line, y):
    a, b, c = line
    return ((c - b * y) / a, y)

def k2_path(w):
    f = w / W0
    cx = (K2_XL + K2_XR) / 2
    xl, xr = cx - w / 2, cx + w / 2
    r = R0 * f
    up, in_tip, in_low = _arm_edges(w, ARM_TIP_Y2, shift=ARM_SHIFT)
    leg_out, leg_in = _leg_edges(w, LEG2_OUT_A, LEG2_OUT_B, LEG2_IN_A, LEG2_IN_B)
    tip_line = (0.0, 1.0, ARM_TIP_Y2)
    base_line = (0.0, 1.0, K2_BASE)
    arm_tip_out = _isect(up, tip_line)
    arm_tip_in = _isect(in_tip, tip_line)
    arm_kink = _isect(in_tip, in_low)
    junction = _isect(up, leg_out)
    sharp = _isect(leg_out, base_line)
    jog_arm = JOG_ARM0 + JOG_GROWTH * (W0 - w)
    jog_leg = JOG_LEG0 + JOG_GROWTH * (W0 - w)
    arm_in_end = _at_x(in_low, xr + jog_arm)
    leg_in_start = _at_x(leg_in, xr + jog_leg)
    brk_in_attach = _at_y(leg_in, K2_BASE - (K2_BASE - LEG2_IN_B[1]) * f)
    sharp0 = (619.704, K2_BASE)
    end_x = sharp[0] - (sharp0[0] - BRACKET["end"][0]) * f
    amap = _baseline_affine(
        [ (LEG2_IN_B, brk_in_attach),
          (sharp0, sharp),
          (BRACKET["end"], (end_x, K2_BASE)) ],
        K2_BASE, y_scale=f)
    p = PathBuf()
    p.M(arm_tip_out)
    p.L(junction)
    p.L(sharp)
    p.H(end_x)
    p.C(amap(BRACKET["c2"]), amap(BRACKET["c1"]), brk_in_attach)
    p.L(leg_in_start)
    p.H(xr)
    p.V(K2_BASE)
    p.H(xl)
    p.V(K2_TOP)
    p.H(xr - r)
    p.C((xr - r + r * 0.5523, K2_TOP), (xr, K2_TOP + r * (1 - 0.5523)), (xr, K2_TOP + r))
    p.V(arm_in_end[1])
    p.H(arm_in_end[0])
    p.L(arm_kink)
    p.L(arm_tip_in)
    p.H(arm_tip_out[0])
    p.Z()
    return p.get(), {"xl": xl, "xr": xr}

if __name__ == "__main__":
    d1, m1 = k1_path(W0)
    d2, m2 = k2_path(W0)
    print("k1:", d1)
    print()
    print("k2:", d2)
