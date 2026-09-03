# Business card — 65 × 65 mm

> **Status:** candidate application proof, non-canonical. Built to exercise the
> requirements in [`docs/working-notes/visual-foundations.SPEC.md`](../../docs/working-notes/visual-foundations.SPEC.md)
> §11.1. Presence here does not mean approved.

> **Stale below:** the card has been revised since the _Typography_,
> _Composition_ and _Known deviations_ sections were written. In the current
> file the role runs `FONDATRICE · ARCHITECTE D’INTÉRIEUR`, `jukkai.fr` sits
> bottom-left rather than right-aligned above the QR, the verso rule and contact
> rows have moved, and the cuts in use are PP Hatton Ultralight and PP Frama
> Text Light. Those three sections describe an earlier revision and need
> rewriting against the file. _Files_, _Document setup_, _Printer template_,
> _Bare-paper variant_, _Chosen layout_, _Grid_ and _Colour_ are current.

## Files

- `jukkai-carte-visite-65x65.afpub` — Affinity master, 2 pages (recto / verso).
  **Now one revision behind:** it still carries the looser verso spacing and the
  bare `FONDATRICE` title. Folding the compact file back into it is a pending
  decision, not an oversight.
- `jukkai-carte-visite-65x65-impression.pdf` — press-ready export of that
  master, CMYK, MediaBox 71 mm, TrimBox 65 mm (3 mm bleed), fonts
  subset-embedded, gradients as native `/Shading`, no rasters, no DeviceRGB.
  Superseded for printing; kept because it is the 3 mm reference export.
- `jukkai-carte-visite-65x65-compact.afpub` — **the live working file.**
  Crystelle chose the compact verso over the master's spacing, and her job title
  now runs `FONDATRICE · ARCHITECTE D’INTÉRIEUR`. Both changes live here and not
  in the master. See [Chosen layout](#chosen-layout).
- `…-impression-69mm-compact.pdf` — press-ready, 2 pages, MediaBox 69 mm,
  TrimBox 65 mm. **This is the file to upload.** See
  [Printer template](#printer-template).
- `…-recto-69mm-compact.pdf`, `…-verso-69mm-compact.pdf` — the same two pages as
  separate single-page files, for uploads that take one file per side.
- `…-69mm-compact-fond-blanc.pdf` (impression / recto / verso) — the same three
  files with the ivory field removed, for stock that is already tinted. See
  [Bare-paper variant](#bare-paper-variant).
- `apercu-recto.png`, `apercu-verso.png`, `apercu-recto-verso.png` — 300 dpi
  trim-area previews of the chosen layout, rendered from the delivered PDF
  rather than from the working file.
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

## Printer template

A square-card printer template (_cartes de visite carrées_) specifies:

| Zone                    | Size       | Relative to trim |
| ----------------------- | ---------- | ---------------- |
| Marge perdue (bleed)    | 69 × 69 mm | +2 mm all round  |
| Zone de coupe (trim)    | 65 × 65 mm | —                |
| Zone de sécurité (safe) | 61 × 61 mm | −2 mm all round  |

The master keeps its 3 mm bleed, which is the printer-agnostic setting. The
69 mm PDF is produced by loading a copy of the master, setting its bleed to
2 mm, and exporting `PDF (press ready)` — the only preset that emits bleed.

Verified on `jukkai-carte-visite-65x65-impression-69mm-compact.pdf`:

- MediaBox 195.591 pt = 69.000 mm, TrimBox inset 5.6693 pt = 2.000 mm on every
  side, so trim is exactly 65.000 mm and the media edge _is_ the bleed edge.
- The ivory field spans −3 → 68 mm, so it overruns the 69 mm media by 1 mm on
  every side; there is no white edge anywhere in the bleed.
- Every element on both faces sits inside the 61 mm safe zone. The tightest is
  `jukkai.fr` on the verso, whose descenders stop 3.32 mm from the trim edge —
  1.32 mm of clearance inside safety.
- 2 pages, zero rasters, zero `/DeviceRGB`, colour is DeviceCMYK plus the
  FOGRA39 `/ICCBased` (`/N 4`), gradients are 5 native `/Shading` objects,
  fonts are `/FontFile3` subsets, the only `/SMask` is `/SMask /None`.
- Heaviest ink is a 227.5 % gradient stop, well inside FOGRA39's 330 % limit.

Two caveats worth knowing before uploading:

- There is no `/BleedBox`; `PDF (press ready)` writes MediaBox = bleed area and
  omits it. Every RIP treats the media edge as the bleed edge in that case, but
  a printer whose preflight demands an explicit BleedBox will flag it.
- There is no `/OutputIntent`, because this is not a PDF/X file. If the printer
  demands PDF/X-1a, re-export from the Affinity UI with _Include bleed_ ticked
  and the bleed set to 2 mm — the SDK cannot set bleed on the X presets.

## Bare-paper variant

The `-compact-fond-blanc` files are the same layout with the `Fond — ivoire`
rectangle deleted from both spreads. Nothing is painted white: in CMYK, white _is_ the
absence of ink, so the sheet shows through. On white stock the card reads white;
on a tinted stock it takes the paper's colour, which is the point.

Verified against the ivory files — the C10 M10 J20 N0 fill is gone from the PDF
entirely, leaving only N100 and the house rich black C14 M34 J38 N90 plus the
sphere's five `/Shading` gradients. Boxes, colour space, fonts and structure are
otherwise identical to the ivory 69 mm export.

Three consequences to weigh before choosing this variant over ivory:

- **Nothing bleeds any more.** The bleed area is empty, so trim variance shows
  as bare paper instead of ivory. That is invisible on the stock this variant is
  for, and it is the reason the variant exists — but it means the file is only
  correct when the sheet supplies the ground.
- **Process inks are transparent, so the paper tints the artwork.** The sphere's
  gradients were separated for FOGRA39 on white coated stock. On a cream or
  ivory sheet they land close to the original intent; on a saturated one they
  will shift, and the shift is not correctable by reprinting — it needs a
  re-separation against that stock.
- **The QR needs contrast.** It is flat N100 with a quiet zone that is now bare
  paper. Light stock is fine; a dark or strongly coloured sheet will stop it
  scanning, and at 0.3448 mm per module there is no margin to give away.

## Chosen layout

`jukkai-carte-visite-65x65-compact.afpub` is where the card actually lives now.
It is the master plus two client decisions:

1. **The compact verso**, chosen by Crystelle over the master's spacing after
   seeing the two side by side.
2. **The job title**, now `FONDATRICE · ARCHITECTE D’INTÉRIEUR`.

It keeps the master's 3 mm bleed; the 69 mm exports set 2 mm at export time, as
[Printer template](#printer-template) describes. The recto is untouched by
either decision.

### The title

Set as `FONDATRICE · ARCHITECTE D’INTÉRIEUR`, following the recto descriptor
exactly: U+2019 apostrophe (not `'`), U+00B7 middle dot with a plain space on
each side, accents kept on capitals.

The text is stored lower case in the story — `fondatrice · architecte
d’intérieur` — because the node carries a caps transform and the master already
stored `fondatrice` that way. Writing the replacement in the same case means the
new words inherit whatever that transform is rather than fighting it; the
transform is what maps `é` to `É`.

It landed on a coincidence worth keeping: the line runs to x 45.224 mm where the
name above ends at x 45.108 mm, so title and name are flush right within
0.12 mm and the identity now reads as one block rather than a name with a label
under it. Any later change to either string breaks that, so re-measure if the
title or the name is edited.

The É lifts the line's ink top by 0.34 mm, which narrows the gap under the name
from 2.25 to 1.91 mm. The accent sits at x ≈ 38 mm and the name's descender at
x ≈ 8 mm, so nothing collides — it is a bounding-box change, not an optical one.

### The rhythm

Baseline-to-baseline, in millimetres:

| Step                     | Master | Chosen | Rationale                          |
| ------------------------ | ------ | ------ | ---------------------------------- |
| Name → role              | 6.28   | 5.00   | binds the identity into one unit   |
| Role → rule              | 5.47   | 5.20   | held, so the rule still divides    |
| Rule → phone             | 6.63   | 6.30   | held, so the rule still divides    |
| Phone → e-mail → address | 6.24   | 5.20   | the tightening Crystelle asked for |
| Address wrap             | 3.38   | 3.38   | unchanged; a wrap, not a rank      |

The rule keeps its clearance on purpose. Once the rows come in to 5.20, a rule
sitting on the same rhythm stops reading as a divider and becomes just another
row, so the two steps around it are the one place the block does not tighten.

The wrap is left alone for the same reason in reverse: it has to stay clearly
tighter than the row step or the address reads as two entries. Current contrast
is 6.24 / 3.38 = 1.85; compact is 5.20 / 3.38 = 1.54, which is thinner but still
holds. Tightening the wrap as well would have collapsed it.

Applied as pure vertical translations, so no type was re-set and no icon
re-optically-sized. Deltas in millimetres, positive = down: name +1.500, role
+0.225, rule −0.045, phone row −0.375, e-mail row −1.4105, address block −2.446;
each icon moves with its row. QR and `jukkai.fr` do not move — they are pinned
to the bottom margins.

That collapses 3.95 mm out of the block, and the whole block is then nudged
1.5 mm down so the card does not go top-heavy. The result keeps roughly the
original optical balance: 8.59 mm of air above the name against 15.31 mm below
the address, a ratio of 1.78 where the current card is 1.81.

**The one open trade.** The void between the address and `jukkai.fr` grew from
12.86 mm to 15.31 mm. That reinforces the two-blocks-on-opposite-corners logic
the verso is built on, but it also makes `jukkai.fr` and the QR read more like a
detached footer. Crystelle accepted the layout without raising it. If it comes
up later, the 1.5 mm nudge is the knob — raising it moves the block down and
closes the gap without touching the rhythm.

Every element on both faces was re-checked against the 61 mm safe zone after the
title change. Nothing is outside it. The tightest is still `jukkai.fr` at
1.324 mm of clearance; the new title line has 2.232 mm, and the QR sits exactly
on the 61 mm line at 2.000 mm.

## What went to Crystelle

A zip was assembled for her, deliberately not kept in the repo — it is an
outbound copy, and everything in it is regenerable from the files here. Its
shape, so a later message can be matched against what she actually received:

```
carte-visite-jukkai/
  LISEZ-MOI.txt                  what to check, what to answer, what not to
                                 judge on screen
  apercus/
    carte-recto.png              300 dpi trim-area previews, one per face
    carte-verso.png
  fichiers-imprimeur/
    carte-jukkai.pdf             = …-impression-69mm-compact.pdf
    option-papier-teinte/
      carte-jukkai-sans-fond.pdf = …-impression-69mm-compact-fond-blanc.pdf
```

No `.afpub`, and no A/B any more — the choice is made, so the package carries
one card in two grounds rather than four files to compare. The per-side PDFs are
held back deliberately: they are in this folder if the printer asks for them,
and the note tells her to ask, but putting four print files in front of her
invites uploading the wrong one.

The previews are rendered from the delivered PDF rather than from the working
file, so what she sees is what the print file actually contains, already through
the CMYK separation. The note sets out the title as a literal line for her to
proof-read, since that string is the whole point of this revision.

An earlier package, sent before she chose, carried version A and version B side
by side with a `comparatif-A-vs-B.png`. Superseded.

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
