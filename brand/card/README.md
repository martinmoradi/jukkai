# Business card — 65 × 65 mm

> **Status:** candidate application proof, non-canonical. Built to exercise the
> requirements in [`docs/working-notes/visual-foundations.SPEC.md`](../../docs/working-notes/visual-foundations.SPEC.md)
> §11.1. Presence here does not mean approved.

## Files

- `jukkai-carte-visite-65x65.afpub` — Affinity master, 2 pages (recto / verso).
- `jukkai-carte-visite-65x65-impression.pdf` — press-ready export, CMYK,
  MediaBox 71 mm, TrimBox 65 mm (3 mm bleed), fonts subset-embedded, gradients
  as native `/Shading`, no rasters, no DeviceRGB.
- `apercu-recto.png`, `apercu-verso.png`, `apercu-recto-verso.png` — 300 dpi
  trim-area previews.
- `sphere-fogra39-cmyk.json` — the sphere's SVG geometry with every gradient
  stop converted sRGB → Coated FOGRA39 (perceptual, black-point compensation,
  littleCMS). This is how the logo was rebuilt as native CMYK vector art rather
  than placed as RGB.

## Document setup

| Property | Value |
| -------- | ----- |
| Trim | 65 × 65 mm |
| Bleed | 3 mm all round |
| Margins (guides) | 8 mm |
| Resolution | 300 dpi |
| Colour | CMYK, Coated FOGRA39 (ISO 12647-2:2004) |

## Colour

Reused unchanged from the `mlle-adele-chandelle` ad so the two pieces separate
identically:

| Role | Value | Used for |
| ---- | ----- | -------- |
| Ivory field | C10 M10 J20 N0 | both fields, full bleed |
| House rich black | C14 M34 J38 N90 (176 % TAC) | wordmark, sphere's ink swoosh |
| Flat black | N100 | all small text and the hairline |

The sphere's chromatic layers carry their own converted gradients; the heaviest
stop is 227 % TAC, comfortably inside FOGRA39's 330 % limit. The original
`rgb(5,4,4)` swoosh was replaced with the house rich black — it converted to a
320 % four-colour black, and the house value is both lighter and consistent.

## Typography

| Role | Cut | Size | Tracking |
| ---- | --- | ---- | -------- |
| Wordmark | vector, `jukkai-wordmark-primary-no-byline.svg` | 34 mm wide | — |
| Byline `BY CRYSTELLE TERRASSON` | PP Frama Light | 5.5 pt | 12 % |
| Name `Crystelle Terrasson` | PP Hatton Light | 10.5 pt | 0 |
| Role `DIRIGEANTE` | PP Frama Light | 5.5 pt | 14 % |
| Phone, e-mail | PP Frama Light | 7 pt | 2 % |
| Address | PP Frama Light | 6.5 pt | 2 % |
| `jukkai.fr` | PP Frama Light | 7.5 pt | 6 % |

Byline and URL values are the ad's proven print values.

## Composition

- **Recto** — wordmark on the 8 mm left/top rail; byline right-flush to the
  wordmark; sphere ⌀30 mm corner-anchored bottom-right on the same 8 mm margin.
  The void runs on the opposite diagonal.
- **Verso** — 4 mm chromatic edge band bleeding off left/top/bottom, sampled
  from six real sphere colours; information on a 12 mm rail that clears the
  band; `jukkai.fr` alone bottom-right to close the diagonal. Local rhythm is
  3.5–5 mm, compositional rhythm 7–10 mm.
- Flipped about its vertical axis the card keeps its colour on one physical
  edge: the recto's sphere and the verso's band share the same side.

## Known deviations and open decisions

- The master byline geometry in
  [`visual-identity-wordmark.md`](../../docs/working-notes/visual-identity-wordmark.md)
  puts the byline cap height at `tittle × 0.4`. At 34 mm that is ≈1 mm of cap
  height — roughly 3.5 pt — well under the legibility floor. The byline is set
  at 5.5 pt instead, keeping the right-flush edge and a one-tittle gap from the
  wordmark baseline, and dropping the cap-height ratio. **Open.**
- The byline repeats Crystelle's name, which also appears on the verso. The
  alternative is a discipline line (`ARCHITECTE D'INTÉRIEUR`, as used on the
  ad). **Open — Crystelle's call.**
- The chromatic band is one candidate carrier for per-person colourway
  variation (SPEC §6.7). A second person's card can reuse this exact
  composition with a different band. Not built yet.
- Printer not selected. 3 mm bleed covers MOO (1.5 mm) and VistaPrint (2–3 mm),
  but confirm the product's own template, stock and finish before ordering.
  Screen colour is not print approval — get a physical proof.
- Export note: Affinity's PDF/X-1a preset cannot be given a bleed setting from
  the SDK. If a printer demands X-1a, re-export from the UI with *Include
  bleed* ticked.
