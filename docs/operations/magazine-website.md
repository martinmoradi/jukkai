# Magazine website

**Status:** editorial proof 0.1 for Martin's review; local, not promoted to production.
**Owns:** this edition's two-page implementation and review procedure.
**Last reviewed:** 2026-09-15, for the editorial rework of the hero exit, introduction and spiral entrance.
**Revisit when:** Martin reviews the composition, the artwork edit changes, the opening happens, or the full website replaces this edition.

## Purpose and authority

This edition introduces Jukkai to magazine readers and visitors from the still-online
Studio Terrasson website. Art carries the opening; architecture establishes the
practice's continuity and expertise. [Current delivery](current-delivery.md) owns
release scope; the [foundation](../strategy/foundation.md) owns business facts.

Martin's September 15 **editorial proof 0.1** brief supplies the French copy and
asks for one local composition: hero → unified introduction → artworks → Crystelle
and the name reference → practical invitation. This proof replaces the earlier
three-chapter explanation. Its wording and composition are proposals for review,
not permanent strategy or approved public copy. The childhood story, numbered
editions and gift possibilities are supplied by Martin's brief. The Japanese
reference is explicitly an editorial interpretation. The tattoo reference is not
public copy and does not appear on the page.

Martin's subsequent screen review authorizes rewriting and restructuring the
introduction and artwork invitation. The current local revision gives the name
change, continuity of the studio and arrival of the Galerie a larger typographic
composition, with supplied photographs and scroll motion. This revision remains
a working direction, with the hero and spiral retained as anchors.

Martin’s artwork-sequence request replaces the provisional hero films with ten
supplied artwork photographs. The integration retains this proof’s identity
entrance and current French copy.

Martin's later rework brief rejects the plum introduction, its angled photographs
and typed brand names: both names must appear as their wordmarks, typography
must carry scale, real imagery must give air, and the motion between the hero
and the spiral must be deliberate rather than generic. The current composition
answers that brief: a paper page wipes in from the dot of the hero wordmark, the
sentence “Studio Terrasson devient Jukkai.” assembles from the two wordmarks and
one Hatton verb, the studio and the Galerie meet as a photographic diptych, and
a rolling “Pour …” invitation leads into the spiral. Copy, image choices and
pacing remain implementation proposals for review.

## Page and factual boundaries

- `/` explains that Studio Terrasson becomes Jukkai and its architecture practice
  continues alongside the new Galerie. The introduction states “Le studio
  continue. Une Galerie le rejoint.” All explanatory copy stays fully opaque
  while the name and photographs move into place.
- The Galerie opens in October 2026. Architecture already receives clients by
  appointment. No precise opening day, public hours, stock, prices or programme
  is invented. The address and footer contact details use the shared contact data.
- `/contact/` retains phone/email, address, map, vCard and Instagram.
- `/contact/crystelle/`, `/contact/crystelle.vcf` and the locked printed `/c/crystelle`
  pointer remain intact. No new sitemap page, backend or migration is added.
- The project link points to `https://www.studioterrasson.fr/`. The old site's banner,
  redirects, domain migration and Google profile remain separate work.
- Artist names come from supplied selection evidence. Unknown titles stay unknown;
  scene captions are descriptions. Photographs/films do not establish that the new
  Galerie is finished or already open to the public.

## Composition and scroll sequence

All motion follows native vertical scrolling. No scroll interception or
smooth-scroll library is used. The existing generated Frama/Frama Text/Hatton
families remain in use: Frama for statements, Hatton italic 300 for the two
emotional words (“devient”, then “chez soi / quelqu’un / le plaisir”), Frama Text
for reading copy. The introduction sits on paper white, the Galerie on ivory,
the closing on muted green. These are edition-specific composition choices.

| Chapter           | Composition and motion                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero              | Inset artwork edit expanding to full bleed and complete wordmark animation. The supplied small sentence occupies the quiet area. Activity, place and Galerie opening have secondary scale.                                                                                                                                                           |
| Identity entrance | The supplied Studio wordmark, C seal and Jukkai sphere form a short, approximately 2.15-second entrance into the complete hero wordmark. Scrolling settles it immediately; deep links skip it. This first timing is provisional.                                                                                                                     |
| Hero exit         | The artwork stays pinned one more viewport while a paper circle grows from the dot of the j. Inside the circle the same wordmark is ink on paper, so the wipe reads as the name turning from light to print.                                                                                                                                         |
| Introduction      | The ink wordmark shrinks into the bottom-right of the sentence and loses its byline. “devient” is revealed from the centre outwards as its letters tighten from wide tracking into place; the real Studio Crystelle Terrasson wordmark slides in top-left. The settled page reads “Studio Terrasson devient Jukkai.” with both names as their marks. |
| Join              | Free-flowing, not pinned. “Le studio continue.” rides in with the Belle Époque interior from the left, “Une Galerie le rejoint.” with the two bears from the right; the two photographs meet edge to edge as they pass the middle of the viewport. The explanatory sentence follows at the seam.                                                     |
| Galerie           | A quiet page: “La Galerie” eyebrow, the café/works line in Hatton, and the selection copy set small to the right. No motion, by design, between two choreographed beats.                                                                                                                                                                             |
| Invitation        | Inside the spiral stage, “Pour” holds while the last word rolls: “chez soi.” beside the dog scene, “quelqu’un.” beside the sculptural still life, then “le plaisir.” alone at the centre. Scenes pass through horizontally; the line re-centres on each word.                                                                                        |
| Spiral            | The paintings orbit in around “Pour le plaisir.”, which recedes under the arriving stack and leaves only once covered. The original opposing parent/child rotations keep each work upright. Bonneville closes the stack and remains available in the artwork viewer at its resting point.                                                            |
| Crystelle         | The painting moves into its real position in the supplied portrait. The portrait and complete biography settle together on desktop. On phones, the stage accommodates the full story and releases into ordinary scrolling so no text is clipped.                                                                                                     |
| Name reference    | One Hatton typographic moment follows the personal story: the supplied Japanese reference, French phrase and explicit interpretation note.                                                                                                                                                                                                           |
| Closing           | A concise opening statement, shared address, current architecture appointments and contact action, followed by the existing useful footer.                                                                                                                                                                                                           |

The hero's own animation keeps its 125svh of travel (95svh on phones). When the
introduction can pin, it marks the hero with `data-exit` and the hero grows to
325svh (295svh on phones) so the artwork stays pinned under the 100svh wipe. The
introduction's track is 390svh: 100svh wipe, 160svh sentence assembly, 30svh hold,
then the stage releases and the join scrolls in normal flow. On viewports under
700px high, or with reduced motion, the hero keeps 225svh and the settled sentence
reads in flow. The artwork stage's timeline now starts with about 185svh of rolling
invitation (165svh on phones) before the existing orbit, stack and portrait travel;
the track length and story anchor derive from the timeline's duration. The stage
clips passing scenes and incoming works so they cannot cover preceding copy.
These are scroll distances, not timed playback. The source paintings and portrait
have different lighting/perspective; the original dissolve is retained at the join.

`#esprit` targets the introduction sentence; `#galerie` targets the Galerie page
and `#selection` its café/works line. `#crystelle` and `#architecture` target the
final portrait reading state; enhancement temporarily moves their IDs onto a
marker at the end of the motion track. Resizing does not follow an old fragment again.

## Fallbacks and interaction

- Server-rendered content is useful without scripts: opening artwork, complete hero
  wordmark, the settled sentence with both wordmarks, the joined diptych, the
  three-line invitation with its two scene photographs, the five-artwork grid,
  portrait and ordinary artwork/contact links. The sentence's accessible name is
  plain text; the wordmarks and the tracked verb are decorative.
- Reduced motion skips the scroll-animation import and shows a static artwork.
  Only the opening image loads. Changing the preference completes any active image
  transition, freezes playback and reverts scroll choreography. Short viewports use the
  static artwork layout (under 600px high on phones, under 720px on desktop).
- A small hero inline script reserves the sticky layout before paint; a five-second
  fallback removes the extra track if enhancement fails. A failed animation import
  restores static sections. The identity entrance never gates navigation or reading.
- The hero edits ten artwork photographs into 20 shots (about 23 seconds): 15 hard
  cuts, two horizontal wipes, two upward reveals and one dissolve. Shots last
  700–2300ms; animated transitions last 360–420ms. Gentle camera movement and
  repeated closer crops connect faces, bear silhouettes, bees and dense colour.
- The visible Pause/Lecture control freezes cuts and camera movement. Playback also
  pauses offscreen and in hidden tabs, preserving its place. Enhancement decodes
  the next responsive image ahead of each cut; slow loads hold the current frame,
  and failed images are skipped. No video is imported, built or requested by the hero.
- Header wordmark and navigation retain the selected difference blending and rolling
  letter interactions. Contact uses the rounded button with curved fill. Hit areas
  stay fixed, accessible names are read once and reduced motion uses static states.
- Hidden orbit layers remain inert during choreography. The top painting/caption
  becomes inspectable while the stack rests. Every work is an ordinary link in the
  static grid. The sculptural still life and dog scene use the existing viewer.
- The viewer retains zoom, whole-artwork view, keyboard/touch/mouse panning,
  Escape/close, focus restoration and image-failure recovery.

## Assets and implementation

The [asset manifest](../../apps/marketing/src/assets/magazine/manifest.json) records
sources/checksums. [Selection notes](../../apps/marketing/src/assets/magazine/README.md)
and [hero notes](../../apps/marketing/src/assets/magazine/hero/README.md) explain
provenance. The old film files remain unused prototype inputs. The [media workflow](../../media/README.md) and catalog own current
library/Storage locations. No original, photograph or artwork was edited for this
proof; runtime imports remain committed assets, independent of mounted Storage.

**Asset gap:** the current catalog and app manifest do not explicitly identify a
numbered edition. The supplied copy is retained, but no pictured work is presented
as proof of that claim. Reviewers should identify a suitable numbered-edition image
if that possibility needs direct visual support.

`index.astro` composes `ArtworkHero.astro`, `Introduction.astro`,
`ArtworkSequence.astro`, closing and viewer. Each sequence retains its CSS Module
and animation module. `studio-transition.ts` handles the short hero identity
entrance. `introduction.ts` owns the hero exit wipe (geometry computed from the
hero wordmark's known box and the dot position inside the SVG), the sentence
assembly and the diptych join; it sets `data-exit` on the hero and cleans up when
reduced motion is selected. `artwork-sequence.ts` prepends the rolling invitation
to its master timeline and re-centres the line on the visible word.
`hero-sequence.ts` controls image playback independently of GSAP;
`data/hero-sequence.ts` owns shot timing and crops; `editorial-motion.ts`
coordinates enhancement. The artwork story's natural height owns its track size;
`--scene-height` separately positions the moving painting within the visible stage.

Generated fonts, Astro responsive derivatives, Cloudflare wiring, metadata and
JSON-LD remain intact. One public Organization is described, without inferred
legal entity, `sameAs`, hours or a dated event. Contact data remains in
`src/data/crystelle.ts`; analytics follows
[ADR-0006](../adr/0006-cookieless-first-party-analytics.md).

## Local verification and review

Use Bun 1.3.14 through `mise`. Check the relevant worktree before starting a server:

```sh
mise x bun@1.3.14 -- bun run --cwd apps/marketing dev -- status
```

This proof was prepared on `feat/editorial-proof-0-1`, starting at `43fe824`, in
`/home/martin/src/pro/jukkai-editorial-proof`. At Martin's request, its six commits
through `247e2f1` were fast-forwarded onto `feat/magazine-landing` in the main working
directory, `/home/martin/src/pro/jukkai`. The current preview there uses port 4321;
the isolated proof and its port 4339 preview remain available. Review captures
were copied into the main working directory's ignored `.browser-evidence/` folder.
Do not stop another worktree's server. This local integration does not authorize
publishing or changing permanent strategy documents.

The artwork hero branch through `9bea10d` is merged into the same main worktree,
preserving the editorial proof’s newer layout, copy and identity entrance. Its
source assets and catalog records are part of the merge.

Run `bun run check` and `bun run --cwd apps/marketing build`. The existing published
output tests cover continuity, responsive hero frames and static fallback, all five works, section/contact
links, metadata, generated fonts, vCard and redirect; their content expectations
now follow the supplied proof and authorized revision copy.

Browser review uses `agent-browser`. The rework's evidence and delivery note are
in `.browser-evidence/editorial-rework/`; the superseded plum introduction is in
`.browser-evidence/editorial-sequence/`, artwork integration checks in
`.browser-evidence/artwork-hero-merge/` and the earlier proof in
`.browser-evidence/editorial-proof/`. Full-page captures use reduced motion to
show the entire composition. Separate desktop/phone recordings and intermediate
captures demonstrate the spiral and portrait join. Check normal and reverse
scrolling, small phone, tablet, short landscape, native anchors, viewer, reduced
motion and fallback content. A full-page screenshot alone cannot validate a sticky
sequence.

Physical-device Safari, real contact import and production analytics remain release
checks in the [contact-card guide](crystelle-contact-card.md). Artwork-edit pacing,
entrance timing, final scroll distance and copy/design acceptance remain review
items before a separate production promotion. Two points from the rework need
Martin's eye: the Studio wordmark now appears twice (in the provisional identity
entrance and in the sentence), and it is shown in its own navy and gold rather
than re-inked, so the “before” reads as the real letterhead.
