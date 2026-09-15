# Magazine website

**Status:** prototype integration for Martin's review; not promoted to production.
**Owns:** this edition's two-page implementation and review procedure.
**Last reviewed:** 2026-09-15, for the hero, transition copy and artwork choreography.
**Revisit when:** the design/copy is accepted, the films are replaced, the opening
has happened, or the full website replaces this edition.

## Purpose and authority

This edition introduces Jukkai to magazine readers and visitors from the still-online
Studio Terrasson website. Art carries the opening; architecture establishes the
practice's continuity and expertise. [Current delivery](current-delivery.md) owns
release scope; the [foundation](../strategy/foundation.md) owns business facts.

Martin's September 15 request selects the Desktop hero and spiral prototypes as the
main motion direction: video hero, spacious Studio Terrasson-to-Jukkai explanation,
logo transition, five artworks converging into a stack, then Bonneville's painting
moving into Crystelle's photograph. This supersedes the earlier painting-first hero.
The exact French, spacing, timing and transitions are implementation choices for
review, not permanent brand decisions. Copy remains subject to Martin/Crystelle's
review before production. No production promotion is part of this implementation.

## Page and factual boundaries

- `/` explains the continuation of Studio Terrasson with the addition of art and a
  Galerie, introduces Crystelle, shows a small artistic selection, and gives the
  October 2026 opening, Châteaugiron address and contact route.
- `/contact/` provides phone/email, address, map, vCard and Instagram. Architecture
  already receives clients by appointment. No precise opening day, public hours,
  programme, artwork availability or prices are invented.
- `/contact/crystelle/`, `/contact/crystelle.vcf` and the locked printed `/c/crystelle`
  pointer remain intact. No further sitemap pages, backend or migration are added.
- Visible copy describes continuity and expansion. The ordinary Studio Terrasson
  link leads to existing projects. Its banner, redirects, domain migration and
  Google Business Profile transition remain separate work.
- Artist names come from supplied selection evidence. Unknown titles stay unknown;
  multi-object scenes use descriptive captions. Photographs/films are artistic
  selections, not evidence that the new Galerie is finished or publicly open.

## Scroll sequence

All motion follows native vertical scrolling. There is no scroll interception or
smooth-scroll library. The spiral reuses the prototype's opposing parent/child
rotations so every artwork remains upright as it circles toward the centre.

| Chapter           | Desktop                                                                                                                              | Phone                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Video hero        | Full-bleed landscape film and complete masked wordmark; the wordmark grows from 37% to full size.                                    | Portrait film; wordmark grows from 71% to full size.                                     |
| Continuity        | Spacious heading, three passages on the right and sticky identity on the left.                                                       | Sticky compact identity above the passages; copy keeps a readable single column.         |
| Identity handover | Supplied Studio wordmark contracts into the C seal; the Jukkai sphere appears, then the complete Jukkai wordmark reveals.            | Same marks, in a shorter panel.                                                          |
| Spiral            | Five works converge into one upright stack; Bonneville is last and remains on top.                                                   | Smaller orbit radius and stack size, with the same reversible progression.               |
| Human connection  | Crystelle's photograph enters on the left; the painting moves to the right, then recedes toward its real position in her photograph. | Photograph and painting connect vertically, then the introduction replaces the painting. |
| Further viewing   | Existing editorial selection, opening/address, contact and footer.                                                                   | Single-column selection and practical details.                                           |

The hero uses 225svh (195svh on phones); the combined spiral/portrait uses 380svh
(340svh on phones). These are scroll distances, not timed playback. The two artwork
photographs have different lighting/perspective: the painting dissolves during the
join, preserving the earlier branch's source-faithful transition.

The introduction anchor `#esprit` now targets the Studio/Jukkai explanation.
`#galerie` targets the spiral. `#crystelle` and `#architecture` target the final
readable portrait state; the enhancement temporarily moves those IDs onto a marker
at the end of the sticky track. Resizing never follows an old fragment again.

## Fallbacks and interaction

- Server-rendered content is useful without scripts: poster, both identity marks,
  complete five-artwork grid, portrait/copy, and ordinary artwork/contact links.
- Reduced motion skips the animation import and leaves video playback paused on
  its poster. The play control still works. Changing the preference reverts active
  choreography; enabling motion later can initialise it without reloading.
- Short viewports use static identity/artwork layouts (under 600px high on phones,
  under 720px for the desktop artwork sequence). The hero remains readable in
  short landscape with a compact wordmark.
- A small hero inline script reserves the initial sticky layout before paint; if
  enhancement fails, a five-second fallback removes the extra track. A failed
  animation import restores static sections. Below-fold sections enhance only
  after all their animation modules are available.
- Videos are muted, looped and inline. Only the selected orientation loads. A
  matching static poster remains behind the film. Playback pauses when offscreen,
  when the tab is hidden, on visitor pause and on reduced-motion preference.
  A failed film has a retry/play control and leaves the poster and links usable.
- The header uses the prototype's category over the film, then returns to the
  existing navigation/wordmark after the film. Without enhancement it scrolls away
  with the hero, avoiding white navigation stranded over a white page.
- Hidden orbit layers are inert during motion. The top Bonneville painting and
  its caption become inspectable while the stack rests; the subsequent selection
  uses the existing full artwork viewer. Static grid links work without scripts.
- The viewer retains zoom, whole-artwork view, keyboard/touch/mouse panning,
  Escape/close, focus restoration and image-failure recovery.

## Assets and implementation

The [asset manifest](../../apps/marketing/src/assets/magazine/manifest.json) records
sources and checksums. [Selection notes](../../apps/marketing/src/assets/magazine/README.md)
explain the photographs; [film notes](../../apps/marketing/src/assets/magazine/motion/README.md)
identify the provisional prototype clips and how to replace them with their posters.
The [media catalog and workflow](../../media/README.md) identify the selected
full-quality working sources and Storage masters. The manifest retains each exact
historical input, including smaller previews used for existing app exports; the
September consolidation preserves current app bytes. Do not import from ignored
`media/library/` or the mounted archive into runtime code.
Original SVGs are preserved in `brand/source/studio-terrasson/`; matching runtime
copies keep their paths/colours intact. No source artwork or photograph is edited.

The landing page composes `VideoHero.astro`, `StudioTransition.astro` and
`ArtworkSequence.astro`, followed by the existing selection and practical details.
Each sequence has its own CSS Module and animation module. `hero-film.ts` controls
playback independently of GSAP; `editorial-motion.ts` coordinates enhancement.
`main` clips horizontal overflow without creating a competing scroll container.

Generated Frama/Frama Text/Hatton fonts, Astro responsive image derivatives,
Cloudflare wiring and the existing metadata/JSON-LD remain in use. One public
Organization is described, without inferred legal entity, `sameAs`, opening hours
or a dated event. Contact data remains in `src/data/crystelle.ts`; analytics follows
[ADR-0006](../adr/0006-cookieless-first-party-analytics.md).

## Verification and release

Use Bun 1.3.14 through `mise`. Check the server before working:

```sh
mise x bun@1.3.14 -- bun run --cwd apps/marketing dev -- status
```

This pass reused Martin's running dev server at `http://localhost:4321`. Use an
owned non-default port for a separate production preview and stop only owned
processes. Browser automation uses `agent-browser`.

Run `bun run check` and `bun run --cwd apps/marketing build`. Build-output tests
cover page/section destinations, visible continuity, all five supplied artworks,
film assets/posters, metadata, generated fonts, contact, vCard and redirect. Asset
tests also verify that Studio SVG copies match the preserved originals.

Current local review captures and audit results live in
`.browser-evidence/magazine-prototypes/` (gitignored). Inspect intermediate viewport
states and recordings for the sticky sequences; full-page screenshots alone do
not show their motion. Check desktop, phone, small phone, tablet and short landscape,
reverse scrolling, orientation changes, native anchors, detail viewer, video pause,
reduced motion, failed assets and script fallback.

Physical-device Safari, real contact import and production analytics remain release
checks in the [contact-card guide](crystelle-contact-card.md). Replace/refine the
provisional film loop and obtain copy/design acceptance before a separate production
promotion. Update the date-specific opening text after October's opening.
