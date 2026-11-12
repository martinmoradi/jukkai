# Mlle Adèle — full page, winter issue

**Status:** v02 built and proofed on 2026-11-12. It awaits Martin's review,
Crystelle's read of the French, and Martin's own export of the file to send.
**Owns:** the brief, the decisions, the build handoff, the values as built and where
the files live.
**Last reviewed:** 2026-11-12, after the v02 proof.
**Revisit when:** Martin or Crystelle asks for changes, the file is exported and
sent, or a printed copy arrives.

![Proof](jukkai-mlle-adele-2026-12-proof.jpg)

Labels below: **Martin** means settled by him on 2026-11-12; **provisional** means an
agent recommendation he went along with; **build** means chosen by the build agent
within the brief. All public French goes to Crystelle with the proof.

## Brief

- **Publication:** [Mlle Adèle](https://www.mlle-adele.fr/), the same magazine as the
  [September chandelle](../mlle-adele-2026-09/README.md).
- **Issue:** not confirmed. The folder name assumes the winter issue, December 2026;
  rename it if that is wrong. **Material due:** as soon as it is ready (Martin).
- **Format (publisher spec, pasted by Martin):** « PAGE ENTIÈRE : Format A4 (210 mm x
  297 mm). Pas de filet ni d'hirondelles de coupe (cela pourrait se voir à
  l'impression selon calage imprimeur) + 5 mm de débord. PDF haute définition
  (300 dpi). Photos en JPEG 300 dpi. »
- **Job (Martin):** the most beautiful ad we can make. Give the Galerie momentum, and
  say, as the earlier ads did, that Jukkai is both the Galerie and interior
  architecture. A full page allows more text than before.
- **Credits (Martin):** no artist credit unless one artwork is the sole focus. The
  chosen photograph is about the Galerie, so none is needed.
- **Page side:** unknown. Text keeps at least 15 mm from both side trims so either
  binding side is safe (provisional).

## Copy

Agent draft; Martin: "the copy is nice". Crystelle validates the French.

> **Je vous réservais / quelque chose. / _Le voici._**
>
> À Châteaugiron, j'ai ouvert une galerie d'art au cœur de mon studio d'architecture
> d'intérieur. Des artistes que j'aime, des œuvres à offrir ou à s'offrir, du petit
> cadeau au grand coup de cœur. Poussez la porte : ici, on ne chuchote pas.
>
> jukkai (wordmark) · BY CRYSTELLE TERRASSON
> GALERIE D'ART & ARCHITECTURE D'INTÉRIEUR
> jukkai.fr · 26 bis rue au Prévôt · Châteaugiron

- The headline answers September's « Ici, je vous réserve quelque chose. » for the
  same readers, and still reads on its own (provisional).
- « À offrir ou à s'offrir » nods to gifts for a winter issue without dating the ad;
  « du petit cadeau au grand coup de cœur » and « on ne chuchote pas » carry the
  Tendances and October lines (provisional).
- No hours and no prices, as in November (Martin's November rule, kept).

## Photograph

- **Martin:** `PXL_20261111_200443664`, from `/mnt/storage/jukkai/photoshop-11-11/`,
  shot the evening of 2026-11-11. The Galerie wall lit by its track spots, white
  plinths with sculptures, herringbone floor, and the navy box with the orange-lit
  room through the doorway on the right. Work from `LONG_EXPOSURE-02.ORIGINAL.jpg`:
  Pixel Long Exposure mode keeps no RAW, so the source is a 3064 × 4080, 8-bit,
  Display P3 JPEG. It gives about 354 ppi across the 220 mm bled width.
- **Alternate:** `PXL_20261111_200252342`, from the same spot but tighter. Martin's
  first idea; it lacks the floor that D2 needs for text without cutting the ceiling.
- **Retouch direction (provisional):**
  - Remove most of the strong yellow cast (source wall b\* about +21 to +29), so the
    lit wall reads warm white and the artworks are true.
  - Keep the orange room as the one warm pocket.
  - Straighten verticals and tone the ceiling down.
  - Lift the plinths.
  - Burn the floor gradually to about L\* 27–32 under the text.
  - Clean only technical clutter and partial fixtures cut by the top edge.
- **Provisional, carried from November:** do not repaint, remove, move or add
  artworks; colour-correct them only towards fidelity.

## Layout

Martin chose D2 from sketch comps: B1–B3, the ivory-plate family, and D1–D2, with
the headline on the photo. He preferred B3, asked whether the headline could sit on
the photo so the image takes more of the page, then chose D2.

| Element    | Direction                                                                                                                  | Status      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Trim       | 210 × 297 mm, 5 mm bleed on every side, no crop marks or frame lines                                                       | Spec        |
| Photo      | Full bleed from the top bleed edge to 267 mm, 220 mm wide; ceiling and track lights kept; plinths centred left             | Martin      |
| Band       | House ivory C10 M10 J20 N0, full width, 267 mm to the bottom bleed edge                                                    | Martin      |
| Headline   | Ivory on the floor, three lines, left at the 16 mm inset, about 28 pt; PP Hatton Light with Light Italic for « Le voici. » | Provisional |
| Body       | Ivory on the floor in a right column from 118 mm, PP Frama Regular, last baseline shared with the headline's               | Provisional |
| Signature  | `jukkai-wordmark-primary-no-byline.svg` with live `BY CRYSTELLE TERRASSON`, left in the band                               | Provisional |
| Descriptor | `GALERIE D'ART & ARCHITECTURE D'INTÉRIEUR`, PP Frama Medium capitals, tracked, right-aligned in the band                   | Provisional |
| Address    | `jukkai.fr · 26 bis rue au Prévôt · Châteaugiron`, PP Frama Regular, right-aligned under the descriptor                    | Provisional |

- Hatton **Light**, not the September Ultralight: light type reversed out of a
  four-colour photo loses Ultralight hairlines to misregistration (provisional).
- The 9 pt reversed body over textured wood is the main legibility risk. Check it at
  300 dpi. If it fails, the fallback is D1: the body moves into an ivory band about
  45 mm tall.
- Comps were rough sketches, ImageMagick colour balance and HTML type, not design.
  They are on Storage under `comps/`. The refined comp `d2r` set the exact spec below.

## Retouch as built

Photo native v04, in Affinity 3.3.1 from the JPEG: 16-bit, with Display P3 kept until
print. Each adjustment is a live layer with an editable 16-bit mask.

- **Colour balance:**
  - Levels R gamma 1.08, B gamma 0.917 with input white 0.912.
  - Curves master (0.10, 0.115), (0.50, 0.547), (0.80, 0.852).
  - The lit wall went from L\* 84, b\* +22 to L\* 89–91, b\* +10. Painting whites read
    neutral.
- **Orange room:** protected by the inverse balance, then +0.15 EV.
- **Navy box:** +0.35 EV.
- **Ceiling:** −0.5 EV fading to −0.3 EV, balanced to b\* +8 to +9. Near-clipped
  highlights (spot lenses, wall hot spots) are neutralised; the coloured lamps are
  masked out.
- **Plinths:** +0.6 EV in the middle third, falling to +0.35 EV at their silhouettes.
- **Floor:** burnt to L\* 29–31 under the text; the burn starts below the plinth
  bases.
- **Clean-up, technical only:**
  - the top-left spot head the crop would have cut;
  - 13 dust specks inside the text zones.
- **The edge-on side of a canvas hung on the navy box:** toned −1 EV and −50 %
  saturation. It read as a bright blue line down the box edge. Agent's call, not
  removed.
- **Unchanged:** verticals measured within 0.12°, so no rotation. No artwork was
  repainted, removed, moved or added.

The print photo crops source rows 190–3978 at full width and resamples them to
2640 × 3264 px. That is 12 px/mm, so it sits pixel-exact on the layout's grid.
Sharpening is an unsharp mask of 0.8 px at 70 %. The conversion to Coated FOGRA39
used LittleCMS, relative colorimetric with black-point compensation; perceptual
measured nearly identical. Maximum ink is 327.5 % in the TIFF.

## Layout as built (v02)

Measured on Ghostscript renders of the v02 PDF. Positions in mm from the trim's
top-left corner.

| Element    | Value                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Document   | CMYK FOGRA39 at 304.8 dpi (12 px/mm), so the trim (2520 × 3564 px) and the 60 px bleed are whole pixels                                                |
| Photo      | −5 to 215 mm across, −5 to 267 mm down                                                                                                                 |
| Band       | Ivory C10 M10 J20 N0, from 267 mm to the bottom bleed edge                                                                                             |
| Headline   | PP Hatton Light and Light Italic, 28 / 30 pt, ivory; the J's ink at x 16.0; baselines 236.83, 247.42 and 258.00                                        |
| Body       | PP Frama Regular 9.5 / 12.4 pt, ivory, column 118.0–195.5, five lines, last baseline 258.00; no line ends on « à »                                     |
| Wordmark   | Native curves, house rich black C14 M34 J38 N90, 40.0 mm wide at x 16.0, j foot at 290.00                                                              |
| Byline     | PP Frama Regular 7.031 pt, tracking +80, N100; B stem on the u's left stem, N's right edge on the i stem, baseline on the j foot                       |
| Descriptor | PP Frama Medium 6.8 pt capitals, tracking +80, N100, ink ending at 194.0, baseline 285.96 on the wordmark's baseline                                   |
| Address    | PP Frama Regular 8.5 pt, N100, ink ending at 194.0, baseline 290.00                                                                                    |
| Clearances | Headline cap top to the front plinth 7.6 mm; text to the band 8.3 mm or more; side text 16 mm from the trim; address descenders 6.3 mm from the bottom |
| Legibility | On the FOGRA39 proof the floor reads L\* 34–36 behind the text, and the text reads L\* 91                                                              |

### Changes from the handoff

- **Body bottom-aligned, not top-aligned (provisional).** The body's last line
  « Poussez la porte : ici, on ne chuchote pas. » shares its baseline with « Le
  voici. », so the two invitations end together.
- **Headline 28 pt, last baseline 258 (provisional).** At 29 pt the cap top came
  within 4 mm of the front plinth.
- **Wordmark 40 mm and byline refitted (build).**
  - The handoff's ~30 mm wordmark looked timid on a full page.
  - The byline's ~6.5 pt was an art-direction error: it forced +134 tracking. At +80,
    matching the descriptor, it fits at 7.03 pt.
- **Body column widened to 195.5 mm, with a break after « d'intérieur. » (build).**
  No-break spaces after both « à » pushed « cœur. » to the last line in a 76 mm
  column. Only the hanging period of line 4 passes 194 mm, by 0.74 mm.

## Delivery

- **The file to send** is exported by Martin from Affinity's PDF/X-1a:2003 preset,
  with "Include bleed" ticked and every printer mark off. Affinity's scripting cannot
  reach the bleed tickbox. The v01 and v02 review PDFs had their bleed boxes added
  after export by the build agent, and still carry an ArtBox the size of the media
  box. That is fine for proofing but not for sending.
- **Expected page boxes:** MediaBox and BleedBox 623.622 × 870.236 pt, with the
  TrimBox inset 14.173 pt on each side. Coated FOGRA39 output intent, fonts embedded,
  no RGB.
- **Photo inks:** on export Affinity re-separates the placed CMYK photo with less
  black, as in November. The floor's K drops from about 57 % to 46 % and maximum ink
  falls from 327.5 % to 297 %. The proof is rendered from the PDF, so it shows what
  prints.
- **Rendering artefact:** Ghostscript at exactly 300 dpi draws 1 px white lines across
  the photo. They are not in the file; render at 304.8 or 600 dpi.
- **Colour profile:** FOGRA39 is an assumption; Mlle Adèle named no profile. In CMYK
  the orange room loses some saturation and the navy lifts to about L\* 15.

## Files

In this folder:

| File                                  | Role                                                        | SHA-256     |
| ------------------------------------- | ----------------------------------------------------------- | ----------- |
| `jukkai-mlle-adele-2026-12-proof.jpg` | 1131 × 1600 px render of the v02 review PDF through FOGRA39 | `feec0592…` |

The Affinity session is `~/Desktop/jukkai-mlle-adele-full-page/` until the file is
sent. It holds the layout natives v01–v02, photo natives v01 (alternate) and
443-v01–v04, print photos v01–v02, review PDFs, `review/` renders and `build/`
masks, scripts and parameters. It is mirrored to Storage with SHA-256 sums once the
file is sent.

On Storage under `/mnt/storage/jukkai/campaigns/mlle-adele-2026-12/`:

| Path     | Role                                                                          |
| -------- | ----------------------------------------------------------------------------- |
| `comps/` | Direction comps B1–B3, D1 (both photos), D2 and the refined D2r, with sources |

## Open

- Martin's review of the v02 proof.
- Crystelle's read of the French and her greenlight.
- Martin's export of the file to send, then a check of its boxes, fonts and inks
  against v02.
- Send the file to Mlle Adèle, then record the date and the file's SHA-256 here.
- Mirror the session to Storage and empty the Desktop folder.
- The issue month, page side and printing profile, if Mlle Adèle can say.
