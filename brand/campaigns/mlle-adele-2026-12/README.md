# Mlle Adèle — full page, winter issue

**Status:** in progress since 2026-11-12. The photo is being retouched in Affinity.
**Owns:** the brief, the decisions so far, the build handoff and where the files live.
**Last reviewed:** 2026-11-12, after Martin chose layout D2.
**Revisit when:** the photo or layout is accepted, the proof goes to Crystelle, or the
file is sent.

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

| Element    | Direction                                                                                                                   | Status      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Trim       | 210 × 297 mm, 5 mm bleed on every side, no crop marks or frame lines                                                        | Spec        |
| Photo      | Full bleed from the top bleed edge to 267 mm, 220 mm wide; ceiling and track lights kept; plinths centred left              | Martin      |
| Band       | House ivory C10 M10 J20 N0, full width, 267 mm to the bottom bleed edge                                                     | Martin      |
| Headline   | Ivory on the floor, three lines, left at the 16 mm inset, about 28 pt; PP Hatton Light with Light Italic for « Le voici. »  | Provisional |
| Body       | Ivory on the floor in a right column (about 118–194 mm), PP Frama Regular, about 9 / 12.8 pt, top-aligned with the headline | Provisional |
| Signature  | `jukkai-wordmark-primary-no-byline.svg` with live `BY CRYSTELLE TERRASSON`, left in the band, about 30 mm wide              | Provisional |
| Descriptor | `GALERIE D'ART & ARCHITECTURE D'INTÉRIEUR`, PP Frama Medium capitals, tracked, right-aligned in the band                    | Provisional |
| Address    | `jukkai.fr · 26 bis rue au Prévôt · Châteaugiron`, PP Frama Regular, right-aligned under the descriptor                     | Provisional |

- Hatton **Light**, not the September Ultralight: light type reversed out of a
  four-colour photo loses Ultralight hairlines to misregistration (provisional).
- The 9 pt reversed body over textured wood is the main legibility risk. Check it at
  300 dpi. If it fails, the fallback is D1: the body moves into an ivory band about
  45 mm tall.
- Comps were rough sketches, ImageMagick colour balance and HTML type, not design.
  They are on Storage under `comps/`.

## Files

On Storage under `/mnt/storage/jukkai/campaigns/mlle-adele-2026-12/`:

| Path     | Role                                                                    |
| -------- | ----------------------------------------------------------------------- |
| `comps/` | Direction comps B1–B3, D1 (both photos) and D2, with their HTML sources |

The Affinity session is `~/Desktop/jukkai-mlle-adele-full-page/` while the build runs.

## Open

- Retouch review, then the layout build, the PDF and its proof.
- Crystelle's read of the French and her greenlight.
- The issue month and page side, if Mlle Adèle can say.
