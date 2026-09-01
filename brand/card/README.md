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

| Property   | Value                                   |
| ---------- | --------------------------------------- |
| Trim       | 65 × 65 mm                              |
| Bleed      | 3 mm all round                          |
| Resolution | 300 dpi                                 |
| Colour     | CMYK, Coated FOGRA39 (ISO 12647-2:2004) |

## Grid

Both faces sit on one compact grid, the card's answer to SPEC §8.2:

| Property     | Value                                   |
| ------------ | --------------------------------------- |
| Margins      | 4 mm all round — live area 57 × 57 mm   |
| Columns      | 4 × 12 mm                               |
| Gutter       | 3 mm                                    |
| Column edges | 4 · 16 / 19 · 31 / 34 · 46 / 49 · 61 mm |

Every column edge lands on a whole millimetre, and the 31–34 mm gutter is
centred on the card's axis, so a centred composition and a four-column one
share the same structure.

Vertical placement uses the 4 mm base unit and 2 mm half-step from SPEC §7.2.
Local rhythm (inside a group) runs 3.4–4.5 mm; compositional rhythm (between
groups) runs 4.5–6.5 mm. The verso carries a second rail at 9 mm for contact
values, so the icon column can sit on the 4 mm rail without pushing values into
column 2.

The digital 4/8 px steps do not convert mechanically: the print grid is a
2 mm / 4 mm ladder, which is the same _relationship_ at print scale rather than
the same numbers.

## Colour

Reused unchanged from the `mlle-adele-chandelle` ad so the two pieces separate
identically:

| Role             | Value                       | Used for                            |
| ---------------- | --------------------------- | ----------------------------------- |
| Ivory field      | C10 M10 J20 N0              | both fields, full bleed             |
| House rich black | C14 M34 J38 N90 (176 % TAC) | wordmark, sphere's ink swoosh       |
| Flat black       | N100                        | all small text, the rule, icons, QR |

The sphere's chromatic layers carry their own converted gradients; the heaviest
stop is 227 % TAC, comfortably inside FOGRA39's 330 % limit.

## Typography

| Role                                                  | Cut                                             | Size       | Tracking |
| ----------------------------------------------------- | ----------------------------------------------- | ---------- | -------- |
| Wordmark                                              | vector, `jukkai-wordmark-primary-no-byline.svg` | 30 mm wide | —        |
| Descriptor `ARCHITECTURE D'INTÉRIEUR · GALERIE D'ART` | PP Frama Light                                  | 5.5 pt     | 8 %      |
| Name `Crystelle Terrasson`                            | PP Hatton Light                                 | 10.5 pt    | 0        |
| Role `DIRIGEANTE`                                     | PP Frama Light                                  | 5.5 pt     | 14 %     |
| All contact values, `jukkai.fr`                       | PP Frama Light                                  | 7 pt       | 2 %      |

The contact rows are one size, not a 7 pt / 6.5 pt mix — a two-line address is
a wrap, not a lower rank, and giving it its own size read as an accident.

## Composition

**Recto** — a centred stack, symbol-led:

| Element    | Placement                                          |
| ---------- | -------------------------------------------------- |
| Wordmark   | 30 mm wide, ink 17.5 → 47.5 mm, top edge at 5.5 mm |
| Sphere     | ⌀ 30 mm, 17.5 → 47.5 mm, top edge at 21.83 mm      |
| Descriptor | 45.6 mm wide, baseline 58.2 mm                     |

The wordmark and the sphere are set to the same 30 mm, so they share both side
edges and the mark reads as the hero rather than a device under a logo. The two
gaps are 4.5 mm each. The block spans 5.5 → 58.2 mm, leaving 5.5 mm above and
6.8 mm below — the larger void at the foot, which is the standard optical
correction for a centred stack.

The descriptor is the widest element at 45.6 mm. Matching it to the 30 mm above
would need ~3.7 pt, far under the print floor, so it is allowed to overhang
symmetrically and act as a plinth; it still clears the 4 mm margin by 5.7 mm on
each side.

**Verso** — two semantic blocks on opposite corners:

| Block           | Element                | Placement                                                |
| --------------- | ---------------------- | -------------------------------------------------------- |
| Reach Crystelle | Name                   | rail x 4 mm, baseline 11 mm (ink top on the 4 mm margin) |
|                 | Role                   | rail x 4 mm, baseline 15.5 mm                            |
|                 | Short rule             | x 4 → 16 mm (column 1), y 20.5 mm, 0.25 mm               |
|                 | Contact icons          | ink centred on x 5.5 mm                                  |
|                 | Phone, e-mail, address | rail x 9 mm, baselines 27 / 31.5 / 36 / 39.4 mm          |
| Visit jukkai    | `jukkai.fr`            | right edge on x 61 mm, baseline 47.5 mm                  |
|                 | QR                     | 10 mm square, x 51 → 61 mm, y 51 → 61 mm                 |

The URL belongs to the QR, not to the contact list: both are ways of arriving at
the site, and both are read at a glance rather than transcribed. Pulling it out
of the list — and dropping the globe icon with it — leaves the top-left block as
one idea (reach Crystelle: phone, e-mail, address) and the bottom-right as
another (visit jukkai: URL and code). The URL is right-aligned so its right edge
and the QR's sit on the same 61 mm margin, 3 mm apart.

The identity block sits on the top margin and the QR on the bottom and right
margins, so the composition is pinned at opposite corners and the void runs on
the diagonal between them — the same logic the recto's sphere and the ad share.
The value rail is 9 mm, not 10: at 10 mm the 2.9 mm gap read as two separate
columns rather than icon-plus-value pairs.

## QR code

`jukkai-crystelle-qr-ec-m.svg` from [`../qr-codes/`](../qr-codes/), rebuilt as
native vector rather than placed. Every module was parsed from the SVG path and
merged into horizontal runs, so abutting squares become single rectangles.

- 29 data modules over 10 mm → **0.3448 mm per module**
- 4-module quiet zone (1.38 mm) is clear ivory on every side
- flat N100, so it is a single-ink mark with no registration risk
- verified after export: all 441 dark modules match the SVG master bit-exactly

**0.3448 mm is small.** Common practice puts the floor for reliable phone
scanning around 0.33–0.40 mm per module, so this sits at the bottom of the
usable band — fine at normal card-reading distance on coated stock, but with no
margin for a soft print or an uncoated fibre. Scan the physical proof from
several phones before ordering. Going back to 12 mm restores 0.4138 mm.

Payload is `https://jukkai.fr/c/crystelle` and must never be re-encoded; change
the `/c/crystelle` redirect instead.

## Icons

Three minimal line pictograms (phone, envelope, pin) drawn as vector curves in
a 24-unit design box and stroked at 0.15 mm with round caps and joins. They are
sized **optically, not by bounding box**: a pin and an envelope scaled to the
same box look nothing like the same size. Targets are 2.5 mm high for the phone,
2.9 mm wide for the envelope, 2.9 mm high for the pin.

A globe icon was drawn for `jukkai.fr` and dropped when the URL moved to the QR
block. It is the one shape in the set that cannot survive 2.5 mm: a rim, an
equator and a meridian inside that circle leave ~0.5 mm gaps between 0.15 mm
strokes.

They are drawn without the mockup's enclosing rings: a ring at this size would
need a second hairline inside 4 mm and would print muddy. They are card-local
artwork, not brand marks — they do not belong in `brand/marks/`.

## Known deviations and open decisions

- **The byline is off the recto.** The master lockup's byline cannot be printed
  at any size this composition can carry: at 42 mm its stems measure 0.081 mm
  and at 30 mm they measure 0.058 mm, against a ~0.10 mm floor for a positive
  hairline. Reaching that floor needs the lockup at ~57 mm, the full live width.
  The recto therefore uses `jukkai-wordmark-primary-no-byline.svg` and the
  attribution rests on the verso, where the name is the largest element. This is
  the answer to SPEC §5.3's question about the size below which the wordmark
  should appear without its byline. **Open:** whether to commission a
  print-optimised byline in the master, or set one as live PP Frama type — at a
  legible 5.5 pt that line is ~26 mm wide and cannot hold the master's 63 %
  proportion under a 30 mm wordmark.
- **`DIRIGEANTE`.** Kept over the mockup's `Fondatrice`. In France the two are
  not interchangeable. **Crystelle's call.**
- **Châteaugiron on the recto.** Left off. The descriptor already runs 45.6 mm
  and the town appears in full on the verso. Adding it needs a second line and
  would close the bottom void. **Open.**
- **Chromatic edge band removed** from the verso to follow the mockup and to
  clear the 4 mm margin. It remains the best candidate carrier for per-person
  colourway variation (SPEC §6.7); reinstating it means moving the left rail.
- **No signature mark on the verso.** The mockup's bottom-centre `j·k` monogram
  does not exist in `brand/marks/`, and inventing one is a brand decision rather
  than a layout one. A divider rule plus a small wordmark was tried and removed:
  it crowded the foot without adding information. The 述懐 seal in
  `../marks/seal/` is the interesting alternative and is semantically right for
  a signature, but seal selection is still open.
- Printer not selected. 3 mm bleed covers MOO (1.5 mm) and VistaPrint (2–3 mm),
  but confirm the product's own template, stock and finish before ordering.
  Screen colour is not print approval — get a physical proof.
- Export note: Affinity's PDF/X-1a preset cannot be given a bleed setting from
  the SDK. If a printer demands X-1a, re-export from the UI with _Include
  bleed_ ticked.

## Rebuilding from the SDK

The Affinity connector can only read and write under the user's Desktop, so the
master has to be staged there before scripting it. Two behaviours cost real time
and are worth knowing:

- `Colour.createCMYKAf(c,m,y,k,a)` silently returns **white**; the working form
  takes a struct, `Colour.createCMYKAf({c,m,y,k,alpha})`.
- A gradient `FillDescriptor`'s transform is stored in the node's **base**
  space, and `isScaleWithObject: false` is implemented by rewriting it whenever
  the node is transformed — so resizing the sphere leaves the gradients pinned
  at their old size and every layer renders flat. Restoring the _original_
  transform values afterwards is what makes the gradients follow the object.
