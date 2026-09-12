# Tendances — October 2026 half-page advertisement

**Status:** active coordination brief; creative direction remains provisional.
**Owns:** this print commission's inputs, working notes, handoffs and current state.
**Last reviewed:** 2026-09-12, from Martin's instructions, local assets, the supplied
technical sheet and Affinity SDK/profile inspection.
**Revisit when:** Martin settles a choice, a worker hands back a revision, or the
publisher supplies production details. Update this brief; do not add a parallel plan.

## Start here

Martin uses the coordinating conversation for thinking, decisions and review.
The coordinator dispatches bounded subagents for direct Affinity work and separate
reviews. This workflow was requested on 2026-09-12; it does not approve a layout,
headline, image selection or public promise.

Read this brief and the exact assigned asset/preview first. Load the Affinity skill
and relevant SDK topics for editing. Consult the [foundation](../../../docs/strategy/foundation.md)
for new business claims and the [method](../../../docs/operations/method.md)
for strategic questions. Website code, SEO logs and archived planning are not
default reading for a bounded print edit. The [delivery guide](../../../docs/operations/current-delivery.md)
describes the separate first-magazine website milestone; it is not the deadline
record for this later Tendances insertion.

## Confirmed inputs and open decisions

- **Martin, 2026-09-12:** Tendances publishes October 1; files are due in a few days.
  The exact delivery date/time and booked edition remain to record.
- **Martin:** Jukkai aims to be ready/open in October, with no exact public opening
  day to advertise. A larger inauguration campaign is a later possibility.
  Do not infer walk-in hours or publish “open now” from this working timeline.
- **Business context:** Jukkai by Crystelle Terrasson brings together interior
  architecture and Galerie. Architecture is the commercial center; the job of
  this particular advertisement still needs an explicit choice.
- **Martin's leading image candidate:** Crystelle seated among artworks, linked
  below. The Galerie was unfinished during the shoot; postproduction is ongoing.
- **Open:** intended reader action, final message/copy, composition/crop, contact
  details to print, chosen photo revision and publisher output profile.

## Creative working notes — coordinator proposals, not approvals

Starting recommendation: introduce Crystelle and her eye for interiors through
the art around her. Let readers remember Jukkai and want to discover more, while
making “Architecture d'intérieur & Galerie” readily understandable.

The previous ad created anticipation. This one can reveal the person and her world,
and must work for readers who never saw that ad. The photograph conveys warmth and
colour; alone, it could be read as an artist/gallery-owner portrait. Copy must make
interior architecture legible. Typography and spacing can carry refinement while
the artworks retain their playfulness.

Two proposed studies, not yet assigned or approved:

1. Photo with an adjoining warm, quiet text panel: preserve Crystelle's seated
   gesture and the sculpture in her hands; test the loss of some peripheral art.
2. Broad photo with a compact text band: test immersion against the shallower crop
   and possible loss of hands, sculpture or posture.

“Des intérieurs qui ont du caractère.” is an exploratory headline only. Hatton and
Frama are continuity candidates from the previous ad. Neither the headline nor the
typographic hierarchy is settled. Review crop and copy together before further
photo finishing. Artwork-only scenes are possible supporting website/later assets;
their presence here does not authorize a batch of edits.

## Sources and references

- [Publisher's supplied technical PDF](references/print-specifications-2024.pdf).
- [Supplied cover screenshot](references/tendances-covers-2026.png).
- [Dated candidate photo preview](references/crystelle-galerie-reference-1600.jpg),
  copied on September 12; not the print source or proof of final selection.
- [Reference manifest](references/manifest.json): source paths, sizes and SHA-256.
- [Previous Mlle Adèle ad](../mlle-adele/README.md).
- [Local fonts](../../fonts/README.md); original ad PDF uses Hatton and Frama.
  Current mark exports live in `brand/marks/`, not `brand/source/`.

Photo source directory (outside Git):
`/home/martin/Desktop/jukkai-pictures/crystelle-galerie-tendence/`.
Read its `README.md` and verify the files when resuming:

| File in that directory              | Role                                                       |
| ----------------------------------- | ---------------------------------------------------------- |
| `crystelle-galerie-master.affinity` | Editable photographic master; preserve it.                 |
| `crystelle-galerie-print-rgb16.tif` | Placement source, verified 7600 × 5700 pixels, RGB 16-bit. |
| `crystelle-galerie-web-1600.jpg`    | Lightweight discussion preview.                            |
| `originals/`                        | Preserved capture files; never overwrite.                  |

Tendances' [advertiser page](https://www.tendances-magazine.com/devenir-annonceur-papier-2/)
was checked on September 12: it positions the publication around home/design and
a CSP+ readership, and lists October 1 publication. These are publisher statements;
the public schedule does not replace Martin's agreed file deadline. Other material
on that page does not change this booking's supplied technical instructions.

## Blank Affinity layout — exact starting settings

| Setting                                          | Value                                      | Authority                                                          |
| ------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------ |
| Type                                             | Custom print document; one page            | Working setup                                                      |
| Units and dimensions                             | Millimetres; **180 mm wide × 126 mm high** | Publisher sheet                                                    |
| Orientation                                      | Landscape                                  | Follows dimensions                                                 |
| Resolution                                       | **300 dpi**                                | Sheet specifies 300 dpi for JPEG; adopted for layout rasterization |
| Colour format                                    | **CMYK/8**                                 | CMYK output required; 8-bit layout is our setup choice             |
| Colour profile                                   | **Coated FOGRA39 (ISO 12647-2:2004)**      | Provisional working profile, verified installed in Affinity        |
| Bleed                                            | **0 mm on all four sides**                 | Publisher explicitly specifies no bleed for half-page              |
| Margins                                          | **5 mm on all four sides**                 | Our nonprinting guides, not a half-page publisher requirement      |
| Facing pages / artboards / automatic master page | Off, if offered                            | Working setup                                                      |
| Transparent background                           | Off                                        | Working setup                                                      |
| Image placement                                  | Prefer Embedded, if offered                | Keep the eventual layout self-contained                            |

**The profile is provisional.** The publisher PDF does not specify an ICC profile,
ink limit, or PDF/X standard. Coated FOGRA39 was selected to begin layout with an
installed profile; it is not evidence of the magazine's press or paper. Obtain the
publisher's output specification before final colour approval/export. Retain the
tagged RGB image source; a CMYK document alone does not prove a compliant PDF.

Create a blank page, save, and leave it open. The prepared execution folder is:
`/home/martin/Desktop/jukkai-tendances-2026-10/`.
Use `jukkai-tendances-master.affinity` as the initial filename. No assets or text
need to be placed yet. This is the **layout** master, separate from the photo master.

The SDK documents `Document.createFromOptions()` and `NewDocumentOptions`; agent
document creation is supported by the API but was not live-tested here. Manual
creation is Martin's current preference, not an assumed API limitation.

## Worker and review protocol

- **Coordinator:** owns the live-app editing slot, task scope, handoffs and this
  brief. Martin remains the creative/business decision-maker.
- **Editing worker:** one at a time across this shared Affinity instance. Other
  agents must not switch documents, selections or app state while it is editing.
  Read-only reviewers use saved previews/files, not the editor's live app.
- **Each assignment states:** input master and revision, one objective, allowed
  changes, fixed copy/assets, output filenames, preview size, and stopping point.
  Do not give an editor the whole strategy to re-decide.
- **Before editing:** verify the exact document, dimensions/profile and layer
  stack; render a baseline; save a separate named working revision. Preserve
  originals, previous work and unrelated open documents. No batch scope implied.
- **Handoff:** save the native revision plus a lightweight sRGB preview (about
  1600 px on the long edge), render-check the exact saved result, and report paths,
  changes, uncertainty and verification. The reviewer evaluates that revision;
  Martin reviews the proposed result before it becomes the selected direction.
- **Shared storage:** the Desktop directory is the execution workspace because
  Affinity's SDK restricts file access to Desktop. Under Wine use
  `app.userDesktopPath`, rather than assuming a `Z:` path will save successfully.
  The coordinator copies/hash-verifies selected checkpoints and final deliverables
  into this campaign folder and records which revision is current. Avoid committing
  large transient photo/native working files; keep their exact local paths here.
- **Finish:** test one small PDF export early. For delivery, inspect the actual
  saved PDF: one 180 × 126 mm page, no added bleed/crop-mark canvas, correct output
  colour/profile, fonts, image resolution and visible content. Review a 100% size
  paper proof for legibility; this is not a calibrated colour proof. Check the
  printed contact destination before approval. A preview is not press approval.

## Current handoff state

- Coordination workspace and reference snapshots prepared on 2026-09-12.
- **Blank layout master:** not yet created or inspected; awaiting Martin's setup.
- **Editing worker:** none assigned. The SDK setup audit was read-only and finished.
- **Selected layout / copy / final export:** none.
- **Next:** inspect the saved blank master, then discuss a bounded first study.
- **Publisher input needed:** exact file deadline/edition, confirmation that the
  2024 sheet applies, preferred CMYK profile and any PDF preset/output requirements.
  No publisher contact or file submission has been authorized or performed here.
