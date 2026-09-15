# Magazine website

**Status:** editorial proof 0.1 for Martin's review; local, not promoted to production.
**Owns:** this edition's two-page implementation and review procedure.
**Last reviewed:** 2026-09-15, for the introduction's line breaks and alignment, shared Hatton invitation typography, Voyage bridge and gentle picture parallax. The one-time letter entrance, compact identity entrance and Home/Contact transitions remain in place.
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

Martin's latest review rejects the full-screen “Studio Terrasson devient Jukkai”
composition and its following interior/artwork diptych. His new local experiment
carries the transformation through editorial text: a large Voyage interpretation
of the name, then Crystelle's thirty-year career, the studio founded in 2012 and
the arrival of the Galerie. The letters enter once on scroll, inspired by the
“Origin Objects” entrance on [The Obsidian Assembly](https://obsidianassembly.com/),
with Martin's subsequent “Explore Places” captures clarifying the scattered
letter arrivals, enlarged blurred starting forms and downward settling motion.
The following Galerie introduction pairs the supplied dog photograph with its
invitation copy. This replaces the earlier requirement to assemble both wordmarks
in the introduction. The Studio wordmark remains in the separate identity entrance.
Copy, composition and motion are a local proposal awaiting Martin's visual review.

Martin accepted the revised letter entrance and requested more space beneath the
Voyage heading, a photograph from the two Ouverture edits, and a Hatton story with
offset paragraphs like the reference's “Places and Items” passage. This local
iteration selects the tighter Ouverture crop, separates the career and new-name
sentences into two Hatton blocks, and steps the second block to the right. The
photograph sits under the first passage. The dogs and bears swap positions between
the Galerie introduction and the later “chez soi.” scene. These refinements remain
subject to Martin's visual review.

The next refinement responds to Martin's spacing and motion review: keep the names
together, align the explanatory paragraph with the Ouverture image's lower edge,
remove its visible caption, and reuse the story's Hatton settings for “Pour…”
phrases. “L’art de s’attacher.” is the proposed Voyage bridge within the existing
invitation stage; the dog caption becomes “Un seul des trois réclame des caresses.”
Both are local editorial proposals, not new brand or business facts.

## Page and factual boundaries

- `/` explains that Studio Terrasson becomes Jukkai and its architecture practice
  continues alongside the new Galerie. The introduction states that the studio
  founded in 2012 continues its interior-architecture projects. All explanatory
  copy stays fully opaque while the Voyage phrase enters.
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
smooth-scroll library is used. The existing generated fonts remain in use:
Voyage 400 for the large name interpretation, Hatton 300 for the offset career/name
statements, Galerie heading and rolling invitation, and Frama Text for reading copy.
The introduction sits on paper white, the Galerie on ivory,
the closing on muted green. These are edition-specific composition choices.

| Chapter           | Composition and motion                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero              | Inset artwork edit expanding to full bleed and complete wordmark animation. The supplied small sentence occupies the quiet area. Activity, place and Galerie opening have secondary scale.                                                                                                                                                                                               |
| Identity entrance | A compact group centres the complete Jukkai wordmark in the viewport, with the supplied Studio wordmark → rotating C seal → sphere above and “Un nouveau chapitre s’ouvre” in Voyage below. Four horizontal bands accelerate to the right, bottom first, before artwork playback begins. About 2.4 seconds plus initial script loading; deep links and reduced motion skip the identity. |
| Hero exit         | The artwork expansion completes and the hero scrolls out naturally. There is no circle wipe, transferred wordmark or additional exit pin.                                                                                                                                                                                                                                                |
| Introduction      | “Délivrer ce que le cœur gardait.” spans two large Voyage lines. Displaced, enlarged and skewed letters settle once, with scattered arrivals and blur clearing. The name reference is explicitly an editorial interpretation. The career, founding year and name-change explanation follow in ordinary flow.                                                                             |
| Galerie           | One large photograph of the two dog sculptures and real dog sits beside “Des œuvres avec lesquelles vivre.” and the café/selection copy. It drifts gently with scroll and retains the artwork viewer. On phones, image and text stack in reading order.                                                                                                                                  |
| Invitation        | “L’art de s’attacher.” introduces the stage in Voyage. Below it, the Hatton “Pour” holds while the last word rolls: “chez soi.” beside the bears, “quelqu’un.” beside the sculptural still life, then “le plaisir.” briefly alone at the centre. Scenes pass through horizontally; the line re-centres on each word.                                                                     |
| Spiral            | The paintings orbit in around “Pour le plaisir.”, which recedes under the arriving stack and leaves only once covered. The original opposing parent/child rotations keep each work upright. Bonneville closes the stack and remains available in the artwork viewer at its resting point.                                                                                                |
| Crystelle         | The painting moves into its real position in the supplied portrait. Biography covers the work with Laura and the personal artistic story; the career/founding timeline and name interpretation now live in the introduction. The mobile story remains fully readable.                                                                                                                    |
| Closing           | A concise opening statement, shared address, current architecture appointments and contact action, followed by the existing useful footer.                                                                                                                                                                                                                                               |

The hero keeps its 125svh of expansion travel (95svh on phones), for total tracks
of 225svh and 195svh respectively. The introduction has content-defined height,
no pin and no scrub. Each Voyage line starts its entrance when it reaches 82% of the viewport and
finishes within 2.25 seconds regardless of further scrolling. Each letter takes
1.5 seconds with a scattered delay between 0 and 750ms, using the inspected
reference's easing curve. Letters start at twice their final size, one em above
the baseline with a quarter-em horizontal offset and proportional blur. The second line
waits for its own arrival, so it does not finish below the fold. Afterwards,
SplitText restores natural typography for that line. Character advances are
measured before animation to preserve Voyage's kerning when its transformable
letter boxes are removed. A revealed flag survives
motion-preference changes, so returning to the phrase never replays it. Direct
fragment/history arrivals already in view read immediately. Reduced motion and
failed enhancement retain the unsplit, visible heading.

The passage after the heading leaves 14vw of breathing room, bounded between
132px and 232px (96px on phones). Its twelve-column layout offsets the second
Hatton statement and body copy to the right of Ouverture. The body paragraph's
lower edge aligns with the image frame before parallax. Intentional line breaks
keep Crystelle Terrasson and Studio Terrasson together. The photograph retains
its source crop and opens in the detail viewer, with no visible caption below it.
On phones, the order is career statement, full-width photograph, new-name statement,
then body copy. The story and rolling invitation share the same Hatton size,
weight, leading and tracking tokens; the rolling slot adds a small overshoot allowance.

The artwork stage's timeline starts when it reaches the sticky header offset,
preserving the first composition during its approach. It begins with about 172svh
of rolling invitation (152svh on phones) before the existing orbit, stack and portrait travel;
the track length and story anchor derive from the timeline's duration. The stage
clips passing scenes and incoming works so they cannot cover preceding copy.
These are scroll distances, not timed playback. The source paintings and portrait
have different lighting/perspective; the original dissolve is retained at the join.

Ouverture and the dog figure move as complete images by at most 16px either side
of their resting positions (8px on phones). The invitation pictures have the same
small vertical drift inside their existing timeline. Painting drift settles to zero
before the stack joins the portrait. The hero and Crystelle portrait receive no
additional parallax. Reduced motion removes it; short windows retain gentle
parallax on the static picture layout when motion is allowed.

`#esprit` targets the editorial introduction; its own top padding clears the header without exposing a strip of the preceding hero. `#galerie` targets the Galerie page
and `#selection` its café/works line. `#crystelle` and `#architecture` target the
final portrait reading state; enhancement temporarily moves their IDs onto a
marker at the end of the motion track. Resizing does not follow an old fragment again.

## Fallbacks and interaction

- Server-rendered content is useful without scripts: opening artwork, complete hero
  wordmark, the complete Voyage phrase and editorial introduction, the Galerie
  photograph and copy, the three-line invitation with its two scene photographs, the five-artwork grid,
  portrait and ordinary artwork/contact links. The sentence's accessible name is
  plain text; the wordmarks and the tracked verb are decorative.
- Reduced motion skips the scroll-animation import and shows a static artwork.
  Only the opening image loads. Changing the preference completes any active image
  transition, freezes playback and reverts scroll choreography. Short viewports use the
  static artwork layout (under 600px high on phones, under 720px on desktop).
- A small hero inline script reserves the sticky layout before paint; a five-second
  fallback removes the extra track if enhancement fails. A failed animation import
  restores static sections. The entrance curtain has its own failure watchdog and releases all controls on completion or failure.
- Home ↔ Contact navigation combines the four bands with the same centred Jukkai wordmark. The mark appears as the cover closes, carries across native document navigation, then fades as the bands accelerate to the right. The Studio/sphere handover and Voyage line stay exclusive to the entrance. Same-page anchors, modified clicks, external links and downloads retain browser behavior. History returns reveal without replaying the identity; direct Contact visits remain immediate.
- The entrance waits for the first hero image and fonts within a bounded budget. It freezes hero playback and temporarily makes page controls inert while covered. Reduced motion removes the curtain immediately; without JavaScript it stays hidden. A six-second watchdog releases the page if the module fails.
- The hero edits ten artwork photographs into 20 shots (about 23 seconds): 15 hard
  cuts, two horizontal wipes, two upward reveals and one dissolve. Shots last
  700–2300ms; animated transitions last 360–420ms. Gentle camera movement and
  repeated closer crops connect faces, bear silhouettes, bees and dense colour.
- The visible Pause/Lecture control freezes cuts and camera movement. Playback also
  pauses behind the curtain, offscreen and in hidden tabs, preserving its place. Enhancement decodes
  the next responsive image ahead of each cut; slow loads hold the current frame,
  and failed images are skipped. No video is imported, built or requested by the hero.
- Header wordmark and navigation retain the selected difference blending and rolling
  letter interactions. Contact uses the rounded button with curved fill. Hit areas
  stay fixed, accessible names are read once and reduced motion uses static states.
- Hidden orbit layers remain inert during choreography. The top painting/caption
  becomes inspectable while the stack rests. Every work is an ordinary link in the
  static grid. The bears, sculptural still life and dog scene use the existing viewer.
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
and animation module. `PageTransition.astro` and its CSS Module own the fixed four-band curtain and
entrance layout. `page-transition.ts` coordinates native navigation, bounded asset
readiness, scroll/focus locking and history recovery; the inline layout bootstrap
prevents a hero flash before the curtain. `studio-transition.ts` animates only the
Studio-to-sphere handover using the Web Animations API, independently of GSAP. `introduction.ts` owns only the one-time Voyage letter entrance. It uses the
SplitText and CustomEase plugins included in the installed GSAP package, after fonts are ready,
and restores natural text after completion or a motion-preference change.
`artwork-sequence.ts` prepends the rolling invitation
to its master timeline and re-centres the line on the visible word. It owns picture
drift within the stage; `picture-parallax.ts` handles complete pictures in ordinary
document flow through a motion-preference-aware GSAP context.
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
items before a separate production promotion. The Studio wordmark remains in the identity entrance, in its supplied navy and gold. The entrance phrase, composition and pacing are
Martin’s requested local iteration, awaiting his visual review.

The separate entrance pass is recorded in `.browser-evidence/entrance-curtain/`:
desktop entrance/navigation recordings, an intermediate stepped reveal, timing
samples and command logs. The local browser checks cover desktop and 390px phone
layouts, both navigation directions, history return, reduced motion, JavaScript
disabled and blocked enhancement scripts. The repository gate passes all 55
marketing tests, and the production build passes. Browser automation is Chromium;
physical-device Safari remains a release check.

The compact entrance refinement is captured in `.browser-evidence/entrance-curtain/compact/`.
The 1600ms identity handover overlaps its final fade with the 800ms staggered
reveal; the observed desktop load clears at about 2.6 seconds including local
script startup. Its easing accelerates out without a slow settling tail. The
wordmark stays at the exact viewport centre on entrance and navigation. Desktop,
390px phone and 844 × 390 landscape layouts were inspected; the wordmark remains
visible on inter-page arrival while the logos and Voyage sentence stay hidden.

### Editorial passage review

The current passage is available on the existing port 4321 preview. Refresh `/`
and scroll from the hero to review the one-time letter entrance; `/#esprit`
intentionally shows the settled passage immediately.
Evidence lives in `.browser-evidence/editorial-passage-0915/`: reference inspection,
desktop/phone layouts, letter-animation samples and fallback checks. This pass
removes the pinned name-change and photo-join tracks, moves the name interpretation
forward, and avoids repeating the career timeline in the portrait biography.
The former Belle Époque export stays in the asset catalog but is no longer used
on the landing page. No source artwork, generated font or contact detail changed.

The animation was checked at intermediate timings, including 650ms and 1100ms.
The corrected letter boxes visibly translate, scale and skew; late letters stay
hidden until their turn. A desktop measurement across the return to ordinary
text found less than 0.1px of horizontal shift per character in the first line.
Desktop and phone checks cover settled typography, no replay on returning,
independent line arrivals and switching to reduced motion during the entrance.
The scene images open their detail viewers. Earlier reduced-motion and
blocked-enhancement checks retain readable copy and working contact links.
`bun run check` (55 marketing tests plus the root checks) and the marketing
production build pass under the repository's Bun 1.3.14 toolchain.

The Hatton/Ouverture refinement is recorded in
`.browser-evidence/editorial-composition-0915/`. Review covers 1440px desktop,
390px and 320px phone layouts, the 202px desktop pause beneath the heading,
reduced-motion reading, and the Ouverture/dog detail viewers. Ouverture's complete
2000px web input is available through “Vue entière”; its source checksum matches
the catalog. The dogs appear in the Galerie introduction and the bears in the
rolling invitation. The letter-animation implementation is unchanged in this pass.

The subsequent detail review is recorded in
`.browser-evidence/editorial-polish-0915/`. An independent reviewer checked desktop
and phone composition, settled rolling-word baselines, forward/reverse entry, and
the painting-to-portrait handoff. Review caught missing spaces at the introduction's
Astro span boundaries; the markup is corrected and the existing published-copy test
now checks both complete sentences. Checks at 320px, 390px, 820px and 1440px cover
line breaks and overflow. Flow parallax was measured at two scroll positions;
short-window parallax and live reduced-motion cleanup were checked separately.
Ouverture's viewer still opens, fits the whole image and closes. The full repository
gate (10 root tests and 55 marketing tests) and production build pass. No new
browser errors were observed. The brief “Pour le plaisir.” pause remains a taste
choice for Martin's next review.
