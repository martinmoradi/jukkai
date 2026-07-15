# Recomposed wordmark + thin variants

Built 2026-07-13 from the raw letterforms, not by eroding the current outlines.
The required font files are local working assets and are not tracked. Reference:
`reference/wordmark.svg`.

By default, the tools look in `brand/fonts/` for:

- `HellixVF-Regular.woff2`
- `ABCMaxiSharpVariable-Trial.ttf`
- `TestNational2-<Weight>.otf`

Set `JUKKAI_BRAND_FONTS_DIR` to use another local font directory.

## How the current wordmark is constructed (verified)

All coordinates in the reference SVG space (887×348, baseline y = 258.789).

| Letter | Font          | Weight      | Scale (svg/em) | Notes                                                                                     |
| ------ | ------------- | ----------- | -------------- | ----------------------------------------------------------------------------------------- |
| j, i   | Maxi Sharp VF | wght 455    | 0.37196        | stems are true rectangles in the font; tittle tops snapped to the cap line (y = 0 / 0.34) |
| u, a   | Hellix VF     | wght 625    | 0.34918        | exact match to reference (IoU 0.995 / 0.998)                                              |
| k, k   | National 2    | Medium base | 0.35813        | hand-authored: see below                                                                  |

Every stem is exactly **41.574 units** wide — the weights were chosen to equalize
stem width across the three fonts. This is the invariant the variants preserve.

The authored K (vs raw National 2 Medium): stem narrowed 44.05 → 41.574 around its
centerline; stem cap rounded, radius 32.3 (standard circle kappa); arm tips cut flat
on the x-height line y = 86.7; k1 leg redrawn thinner ending in a flared foot that
lands on the baseline and overlaps k2's stem by 4.38 units (the ligature weld);
k2 leg ends in a sharp baseline point with a concave underside bracket.

## The variants

Thinning is defined as a uniform stem-width reduction, same equalization logic:

| Variant | Stem target   | Hellix wght | Maxi Sharp wght | K                                                        |
| ------- | ------------- | ----------- | --------------- | -------------------------------------------------------- |
| current | 41.574        | 625         | 455             | parametric w = 41.574 (byte-identical to Martin's paths) |
| −17     | 34.51 (−17 %) | 533         | 361             | parametric w = 34.51                                     |
| −26     | 30.77 (−26 %) | 480         | 323             | parametric w = 30.77                                     |

j/u/a/i are true variable-font instances at those weights, each placed with its
bounding-box center on the current letter's center (spacing preserved), baseline fixed.
The K pair is regenerated parametrically: Martin's skeleton (stem centerlines, diagonal
angles, 86.7 arm-tip line, junction jogs, ligature) is kept; stroke thicknesses, cap
radius, and the foot/bracket terminals scale with the stem ratio; the foot always
overlaps k2's stem so the weld stays closed.

**Provisional:** "−17 %/−26 % stem width" is an inferred reading of the Figma variant
names -17/-26 (the Figma file was not machine-readable from this session). If the
weights chosen in Figma differ, re-run with those numbers — see below.

## Regenerating at other weights

```
cd tools
python3 solve_weights.py        # stem-width → weight solver (edit TARGETS)
python3 compose.py              # writes out_*.svg (edit the compose() calls)
```

`kbuild.py` is the parametric K; `compose.py` places the letters; `compare.py`
overlays a build against the reference and reports IoU per letter.

Known sub-unit deviations from the reference (invisible at size, listed for honesty):
the reference has u/i/j stem tops manually snapped up ~1 unit to exactly 86.7,
and its j/i stems are ~0.5 unit wider than the raw font instance. The recomposed
current scores IoU 0.992 against the reference at 4× resolution.
