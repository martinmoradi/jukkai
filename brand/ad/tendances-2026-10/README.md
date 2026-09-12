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
headline or public promise. Martin explicitly selected the Crystelle Galerie
photograph for the ad in the subsequent September 12 instruction.

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
- **Martin's selected lead photograph:** Crystelle seated among artworks, linked
  below. Use it in the ad. The Galerie was unfinished during the shoot.
- **Martin's correction, September 12:** the ad must meaningfully represent Galerie,
  alongside architecture. He rejected “Des intérieurs qui ont du caractère.”
  The other artworks and scenes are available ingredients, not a required montage.
- **Execution:** Martin requests direct editing by subagents; the coordinator acts
  as art director and does not load or operate Affinity MCP.
- **Open:** intended reader action, final message/copy, composition/crop, contact
  details to print, chosen photo revision and publisher output profile.

## Creative working notes — coordinator proposals, not approvals

Current exploratory direction: introduce a living Galerie through Crystelle and
her chosen artworks, with “Galerie & architecture d’intérieur” explicit. Architecture
is present without making this an interiors-only advertisement. No opening date,
walk-in arrangement or new offer is implied.

The coordinator reviewed the current 21 artwork selections, all three scene
selections, Crystelle's photograph and the four available Laura portrait views.
Current selections were resolved from the asset indexes below; old intermediate
exports were not treated as additional ingredients. Strong colour, tactile surfaces
and playful figurative work are the actual visual material. Refined typography and
spacing should support that character.

Two directed studies for Martin's review, not approved advertisements:

1. **A — “L’art, en bonne compagnie.”** Large Crystelle photograph beside a calm
   ivory text column. Body: “Des œuvres à découvrir, des espaces à imaginer. Une
   galerie vivante, portée par le regard d’une architecte d’intérieur.” Preserve her
   expression, hands and held sculpture. No added artwork photograph in this study.
2. **B — “Une galerie à vivre.”** Crystelle remains dominant, with the contrasting
   bears scene as a smaller second photograph. Body: “Art et architecture
   d’intérieur se rencontrent à Châteaugiron, dans l’univers libre et coloré de
   Crystelle Terrasson.” Test whether the extra view earns its space at half-page
   size. Avoid a catalogue grid or a collection of small thumbnails.

Shared identity: real Jukkai wordmark, subordinate “by Crystelle Terrasson”,
“Galerie & architecture d’intérieur”, Châteaugiron, and jukkai.fr. Hatton and Frama
are the directed working typefaces. All proposed wording remains review copy.
The previous interiors-only headline is rejected and must not return in variants.

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
`/home/martin/Desktop/jukkai-affinity-workingdir/crystelle-galerie-tendence/`.
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

The existing blank layout is now verified at:
`/home/martin/Desktop/jukkai-affinity-workingdir/tendances-magazine/jukkai-tendances-master.affinity`.
The editor inspected it on September 12: 180 × 126 mm, 300 dpi, CMYK/8, Coated
FOGRA39, one page/spread, no layers, matching trim/bleed/media boxes and no unsaved
changes. Preserve this blank master. Its SHA-256 is
`f30422e55cb2f3e1793aac95454f6c91f121fcd1bb9648eac4d513ca426a9d92`.
Studies belong under `tendances-magazine/studies/`, separate from the photo master.

The former `Desktop/jukkai-pictures/` tree has moved to
`/home/martin/Desktop/jukkai-affinity-workingdir/`. Current artwork and scene choices
are indexed in `artworks/_art-direction-2026-09-12/INDEX.md` and
`scenes/_art-direction-2026-09-12/INDEX.md` below that root. Their selections are
previous art-director choices for Martin's review, not automatic ad selections.
The local lifecycle instructions are in `affinity-tools/README.md`; its example
paths still use the former root. Use the actual `affinity-tools/affinity-open` and
`affinity-tools/affinity-close` siblings in the current root.

The SDK documents `Document.createFromOptions()` and `NewDocumentOptions`; agent
document creation is supported by the API but was not live-tested here. The existing
blank is supplied for this work; there is no need to recreate it.

## Worker and review protocol

- **Coordinator:** owns the live-app editing slot, task scope, handoffs and this
  brief, and reviews saved images/PDFs. Per Martin, delegate all Affinity MCP use
  and lifecycle actions to the editor. Martin remains the creative/business
  decision-maker.
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
- **Blank layout master:** native properties and source hash verified by the editor.
- **Editing worker:** `tendances_affinity_editor`, sole live-app owner. Study A
  assigned; Study B waits for the first review. Parent has not used Affinity MCP.
- **Review worker:** `galerie_creative_review`, saved-file creative critique only.
- **Selected layout / approved copy / final print export:** none.
- **Next:** review A's saved native/PDF/preview, refine as needed, then produce B.
- **Fonts:** local Hatton/Frama OTFs exist under `brand/fonts/`; the editor found
  they were absent from the active Affinity font list and is preparing their
  installation in that runtime before composing.
- **Publisher input needed:** exact file deadline/edition, confirmation that the
  2024 sheet applies, preferred CMYK profile and any PDF preset/output requirements.
  No publisher contact or file submission has been authorized or performed here.
