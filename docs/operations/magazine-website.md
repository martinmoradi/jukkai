# Magazine website

**Status:** refined second pass for Martin's review; not promoted to production.
**Owns:** this edition's two-page implementation and review procedure.
**Last reviewed:** 2026-09-13. **Revisit when:** the design is accepted, the opening
has happened, contact information changes, or the full website replaces this edition.

## Purpose and authority

Martin's September 13 second-pass brief defines this edition as a first expression
of Jukkai for magazine readers and visitors from the still-online Studio Terrasson
website. It introduces Crystelle's artistic world, the Galerie, the architecture
practice and their shared place. Art carries the opening and emotional emphasis;
architecture explains continuity and expertise. This edition does not mechanically
apply the longer-term architecture revenue priority to its visual hierarchy.

The [current delivery](current-delivery.md) records that edition-specific scope.
The [foundation](../strategy/foundation.md) continues to own broader business
strategy. Martin's explicit transition clarification takes precedence over older
migration wording: Studio Terrasson still exists; Jukkai encompasses the practice,
Galerie and place; no completed migration or disappearance is announced.

The composition, headlines, image choices and gallery-white/near-black/vermilion
treatment are agent-authored choices for review in this edition. Martin’s follow-up
sets the working direction: hero, compact Crystelle introduction, artistic selection,
then practical information. These choices are not permanent brand
rules or a replacement for the future website's sitemap and content work.

## Page and factual boundaries

- `/` introduces Jukkai by Crystelle Terrasson with a painting and the October 2026
  opening; immediately introduces Crystelle and Studio Terrasson; offers a small
  artistic selection; closes with the Châteaugiron address and contact route.
- `/contact/` provides direct phone/email links, the address, map, vCard and
  Instagram. Architecture already receives clients by appointment. The official
  Jukkai/Galerie opening is October 2026, with no invented day, hours or programme.
- `/contact/crystelle/` and `/contact/crystelle.vcf` retain the printed Contact Card
  Page contract. The printed `/c/crystelle` pointer is unchanged. No new services,
  catalogue, newsletter, pricing or future sitemap pages are added.
- The ordinary `https://www.studioterrasson.fr/` link was verified in a browser and
  returned HTTP 200. Its banner is an incoming journey, outside this implementation.
- The compact introduction explains the architecture practice and links to Studio
  Terrasson’s existing projects. This refinement removes the separate Le Capri
  photograph from the page; its curated export remains preserved. No client
  interior is represented as the new premises or an artwork installation.
- Artist names use supplied selection evidence. No work titles, inventory,
  availability or prices are inferred. Multiple-object scenes retain descriptive
  captions instead of speculative attribution.

## Composition and motion storyboard

The reference sites Drop Edition, Félix Nieto, OFF ESCAC and Creative Giants were
viewed and scrolled in a browser. Their useful principles were image/type
relationships, shifts in scale, opening frames and changes of colour field. The
resulting composition is specific to Jukkai and keeps native vertical scrolling.

Three colour studies were tested on the actual hero and Crystelle section: white
with vermilion, cool white with cobalt, and a pale/deep green composition. The
implemented study uses gallery white (`#f8f8f5`), warm near-black (`#1b1c1a`) and
vermilion (`#c3422d`). White frames the paintings and portrait; one dark field holds
the selection; vermilion marks the date and interactive states. The green study
added a competing cast, while cobalt had less connection to the red objects and
paintings in Crystelle’s photograph. These are design judgments for this edition.

The signature sequence has three poses:

| Pose        | Laptop and desktop                                                                                                                                    | Phone                                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Arrival     | “L’art prend place”, a clear introduction and October date face a close view of Yoann Bonneville’s painting.                                          | Compact wordmark/contact, headline and date above the painted eyes; the introduction sits directly below the image.  |
| Connection  | The complete square painting and Crystelle’s original photograph share the frame.                                                                     | The portrait appears above the complete painting, composing the connection vertically.                               |
| Destination | The enlarged artwork moves toward its real position in the supplied portrait and dissolves; Crystelle’s concise introduction occupies the right side. | The artwork recedes toward the same painting in the portrait; Crystelle’s introduction appears below her photograph. |

The two photographs have different lighting and perspective. The artwork dissolves
before the join instead of fabricating an installation or distorting the painting.
A CSS sticky stage and GSAP/ScrollTrigger use approximately 95svh of additional
scroll. There is no wheel interception, horizontal journey or automatic carousel.
Supporting gallery images open their frames slightly; reading text is not hidden
for repeated section reveals. The official sphere is still. Artwork captions and
enlargement controls sit outside the images, preserving edges and signatures.

Reduced motion presents the complete painting, then the portrait and introduction
in normal flow, and skips animation imports. Changing to reduced motion reverts an
active sequence. Viewports under 600px high, and desktop layouts under 720px high,
use the static composition. On tablets the portrait’s size is bounded by viewport
height so its introduction remains visible. Native section anchors land at the
readable destination; a later resize does not revisit an old URL fragment.
Initially reduced-motion visitors stay static if they later change the preference;
reloading enables the sequence. Information and contact do not depend on animation.

A small inline script reserves and measures the initial pose before paint, avoiding
a layout jump when the animation bundle arrives. The initial measurements and the
ScrollTrigger first pose must stay aligned. A bundle failure restores static flow;
a five-second fallback also handles failure of the enhancement module itself.
With JavaScript disabled, the server-rendered complete artwork is the default.

## Assets and implementation

The [asset manifest](../../apps/marketing/src/assets/magazine/manifest.json) and
[selection notes](../../apps/marketing/src/assets/magazine/README.md) identify the
selected exports, source/output checksums and dimensions. Originals and superseded
edits remain untouched. The opening preserves a complete view of its detail image;
Nina Bruneau, the sculptural still life and dog scene add distinct visual distances.
Crystelle’s complete 4:3 photograph provides the human connection and contains the
same painting as the opening. Architecture is explained in her introduction.

- Astro's image pipeline creates responsive WebPs with explicit dimensions. The
  hero is eager/high priority; the portrait is eager because it participates in the
  opening sequence. Gallery photographs are lazy loaded. Enlargement links point
  to the curated export and enhance into a native fullscreen dialog. It opens at
  a useful detail scale, bounded by the real source resolution. Zoom controls,
  “Vue entière”, native touch panning, mouse dragging and keyboard arrows/+/-/0
  provide exploration. Escape and the close button restore the opener’s focus
  without moving the underlying page. Loading and failed images remain closable.
- Page/component styles remain CSS Modules under `src/styles/`; `editorial.css`
  owns shared tokens, resets and focus/reduced-motion treatment. Official SVG
  wordmarks and the pinned generated fonts remain in use. The loaded reading font
  is Frama Text 400; display text uses Frama 400. Hatton 500 is reserved for “L’art”.
  Requested weights match the actual fonts; synthetic styles are disabled. The
  uppercase navigation uses measured tracking, while body copy uses normal word
  and letter spacing. The generated-font tooling is unchanged.
- `EditorialLayout.astro` supplies accurate French metadata, route-specific
  canonicals, Crystelle's social image and one existing analytics component.
  Its JSON-LD graph describes one public Organization, its WebSite and the current
  WebPage/ContactPage. It does not assert a separate legal entity, `sameAs` brand
  equivalence, opening hours or a dated event. Visible copy carries the Studio
  Terrasson relationship. Markup does not promise search interpretation or rankings.
- Shared contact data remains in `src/data/crystelle.ts`. Apple devices receive the
  Apple Maps destination; the ordinary maps link works without scripts.
- The sitemap lists the homepage and general contact page. The printed card keeps
  `noindex, follow`. No redirects, cross-domain canonicals, domain migration,
  Search Console or Google Business Profile changes are part of this pass.

## Review and release

Use Bun 1.3.14 through `mise` and the real generated fonts. Inspect the branch and
server before working:

```sh
mise x bun@1.3.14 -- bun run --cwd apps/marketing dev -- status
```

The second pass reused Martin's existing development server on port 4327. Check
port availability before creating a separate owned server; stop only your own
processes. Browser automation uses `agent-browser`.

Run `bun run check` and `bun run --cwd apps/marketing build`. Build-output tests
cover route membership, canonical/social metadata, factual structured data,
visible introduction/continuity, generated fonts, contact links and the retained
card/redirect. The full gate passed with 10 script tests and 52 marketing tests.

Local evidence for the refinement lives in `.browser-evidence/magazine-refinement/`
(gitignored): colour studies, production viewport captures, actual intermediate
scroll states, laptop/phone wheel recordings, contact/detail views, and interaction
and accessibility audits. The earlier `.browser-evidence/magazine-second-pass/`
retains the scrolled references and original selection review. A full-page capture
alone does not represent a sticky sequence: use the viewport states and recordings
for motion, and the reduced-motion full page for static pacing.

Review covers laptop (1366×768), large desktop (1920×1080), phone (390×844), small
phone (320×640), tablet and short landscape compositions. The evidence README
records the final browser checks and their results, including enlargement, whole
views, keyboard/touch/mouse interaction, closing, focus restoration, anchors,
contact/card links, reduced motion and script fallbacks.

Local production-build laptop observations measured CLS between 0 and 0.01. The
last run reused cached assets. This is local Chromium evidence, not mobile-network
field performance or production metrics.
Physical-device Safari, real contact import and production analytics remain release
checks in the [card guide](crystelle-contact-card.md) and
[ADR-0006](../adr/0006-cookieless-first-party-analytics.md).

AI video is deferred. One possible later experiment is a locked-camera, two-second
change of raking light over the painted relief, with the actual artwork held fixed.
Test it against the real source for changed marks, colour and lettering before any
integration; no generated footage belongs to this refinement.

Review and accept this edition before a separate, deliberate production promotion.
Update the date-specific opening copy when October's opening has happened.
