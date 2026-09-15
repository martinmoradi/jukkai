# Magazine website

**Status:** editorial proof 0.1 for Martin's review; local, not promoted to production.
**Owns:** this edition's two-page implementation and review procedure.
**Last reviewed:** 2026-09-15, for the supplied editorial copy, full-page composition and retained animation anchors.
**Revisit when:** Martin reviews the composition, the films are replaced, the opening happens, or the full website replaces this edition.

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

## Page and factual boundaries

- `/` explains that Studio Terrasson becomes Jukkai and its architecture practice
  continues alongside the new Galerie. The introduction keeps both paragraphs
  together, without scroll-triggered text reveals.
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
families remain in use. The proof uses gallery white and ivory, with a muted green
closing field; this is an edition-specific composition choice.

| Chapter           | Composition and motion                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hero              | Original inset film expanding to full bleed and complete wordmark animation. The supplied small sentence occupies the quiet area. Activity, place and Galerie opening have secondary scale.                                                      |
| Identity entrance | The supplied Studio wordmark, C seal and Jukkai sphere form a short, approximately 2.15-second entrance into the complete hero wordmark. Scrolling settles it immediately; deep links skip it. This first timing is provisional.                 |
| Introduction      | One large direct heading and two readable paragraphs, side by side on desktop and stacked on phones. All content is available together.                                                                                                          |
| Artworks          | Stable three-line heading and paragraph, then two still scenes: the sculpted dogs with a real dog, and the sculptural still life. These add humour and differences of scale before the five-painting spiral.                                     |
| Spiral            | The original opposing parent/child rotations keep each work upright. Bonneville closes the stack and remains available in the artwork viewer at its resting point.                                                                               |
| Crystelle         | The painting moves into its real position in the supplied portrait. The portrait and complete biography settle together on desktop. On phones, the stage accommodates the full story and releases into ordinary scrolling so no text is clipped. |
| Name reference    | One Hatton typographic moment follows the personal story: the supplied Japanese reference, French phrase and explicit interpretation note.                                                                                                       |
| Closing           | A concise opening statement, shared address, current architecture appointments and contact action, followed by the existing useful footer.                                                                                                       |

The hero retains 225svh (195svh on phones). The artwork choreography has 280svh
of travel after the stage reaches its sticky position (240svh on phones), plus
its measured natural story height. The orbit begins during approach to the stage.
These are scroll distances, not timed playback. The source paintings and portrait
have different lighting/perspective; the original dissolve is retained at the join.

`#esprit` targets the unified introduction; `#galerie` targets the stable artwork
copy. `#crystelle` and `#architecture` target the final portrait reading state;
enhancement temporarily moves their IDs onto a marker at the end of the motion
track. `#selection` stays with the two still scenes. Resizing does not follow an
old fragment again.

## Fallbacks and interaction

- Server-rendered content is useful without scripts: film poster, complete hero
  wordmark, all copy, five-artwork grid, portrait and ordinary artwork/contact links.
- Reduced motion skips the animation import and pauses the film on its poster.
  Changing the preference reverts active choreography. Short viewports use the
  static artwork layout (under 600px high on phones, under 720px on desktop).
- A small hero inline script reserves the sticky layout before paint; a five-second
  fallback removes the extra track if enhancement fails. A failed animation import
  restores static sections. The identity entrance never gates navigation or reading.
- Videos are muted, looped and inline; only the selected orientation loads. Playback
  pauses offscreen, when the tab is hidden and for reduced motion. A failed film
  leaves its matching poster and links usable.
- Header wordmark and navigation retain the selected difference blending and rolling
  letter interactions. Contact uses the rounded button with curved fill. Hit areas
  stay fixed, accessible names are read once and reduced motion uses static states.
- Hidden orbit layers remain inert during choreography. The top painting/caption
  becomes inspectable while the stack rests. Every work is an ordinary link in the
  static grid. Both additional still scenes use the existing viewer.
- The viewer retains zoom, whole-artwork view, keyboard/touch/mouse panning,
  Escape/close, focus restoration and image-failure recovery.

## Assets and implementation

The [asset manifest](../../apps/marketing/src/assets/magazine/manifest.json) records
sources/checksums. [Selection notes](../../apps/marketing/src/assets/magazine/README.md)
and [film notes](../../apps/marketing/src/assets/magazine/motion/README.md) explain
provenance. The [media workflow](../../media/README.md) and catalog own current
library/Storage locations. No original, photograph or artwork was edited for this
proof; runtime imports remain committed assets, independent of mounted Storage.

**Asset gap:** the current catalog and app manifest do not explicitly identify a
numbered edition. The supplied copy is retained, but no pictured work is presented
as proof of that claim. Reviewers should identify a suitable numbered-edition image
if that possibility needs direct visual support.

`index.astro` composes `VideoHero.astro`, the unified `StudioTransition.astro`,
`ArtworkSequence.astro`, closing and viewer. Each sequence retains its CSS Module
and animation module. `studio-transition.ts` now handles the short hero entrance.
`hero-film.ts` controls playback independently of GSAP; `editorial-motion.ts`
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

This proof is isolated on `feat/editorial-proof-0-1`, starting at `43fe824`, in
`/home/martin/src/pro/jukkai-editorial-proof`. The original working tree and its
server on port 4321 are preserved. The proof's owned review server uses port 4339.
Do not stop another worktree's server. Local proof review does not authorize
publishing or changing permanent strategy documents.

Run `bun run check` and `bun run --cwd apps/marketing build`. The existing published
output tests cover continuity, films/posters, all five works, section/contact
links, metadata, generated fonts, vCard and redirect; their content expectations
now follow the supplied proof copy.

Browser review uses `agent-browser`. Local evidence and the delivery note are in
`.browser-evidence/editorial-proof/`. Full-page captures use reduced motion to
show the entire composition. Separate desktop/phone recordings and intermediate
captures demonstrate the spiral and portrait join. Check normal and reverse
scrolling, small phone, tablet, short landscape, native anchors, viewer, reduced
motion and fallback content. A full-page screenshot alone cannot validate a sticky
sequence.

Physical-device Safari, real contact import and production analytics remain release
checks in the [contact-card guide](crystelle-contact-card.md). Film-loop quality,
entrance timing, final scroll distance and copy/design acceptance remain review
items before a separate production promotion.
