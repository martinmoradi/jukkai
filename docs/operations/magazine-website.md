# Magazine website

**Status:** implemented second pass for Martin's review; not promoted to production.
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

The composition, headlines, image choices and lilac/plum/citron treatment are
agent-authored choices for review in this edition. They are not permanent brand
rules or a replacement for the future website's sitemap and content work.

## Page and factual boundaries

- `/` introduces Jukkai by Crystelle Terrasson with a painting and the October 2026
  opening; offers a small artistic selection; introduces Crystelle and Studio
  Terrasson; closes with the Châteaugiron address and contact route.
- `/contact/` provides direct phone/email links, the address, map, vCard and
  Instagram. Architecture already receives clients by appointment. The official
  Jukkai/Galerie opening is October 2026, with no invented day, hours or programme.
- `/contact/crystelle/` and `/contact/crystelle.vcf` retain the printed Contact Card
  Page contract. The printed `/c/crystelle` pointer is unchanged. No new services,
  catalogue, newsletter, pricing or future sitemap pages are added.
- The ordinary `https://www.studioterrasson.fr/` link was verified in a browser and
  returned HTTP 200. Its banner is an incoming journey, outside this implementation.
- The Le Capri image is explicitly captioned as a Studio Terrasson project. It is
  not represented as the new Jukkai premises or as evidence of artwork installed
  in a client project.
- Artist names use supplied selection evidence. No work titles, inventory,
  availability or prices are inferred. Multiple-object scenes retain descriptive
  captions instead of speculative attribution.

## Composition and motion storyboard

The reference sites Drop Edition, Félix Nieto, OFF ESCAC and Creative Giants were
viewed and scrolled in a browser. Their useful principles were image/type
relationships, shifts in scale, opening frames and changes of colour field. The
resulting composition is specific to Jukkai and keeps native vertical scrolling.

The signature sequence has three poses:

| Pose          | Laptop and desktop                                                                                                                       | Phone                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Arrival       | Readable identity, introduction and opening date on lilac; Yoann Bonneville's painted eyes fill the right side.                          | Compact wordmark and contact, introduction/date, then a close view of the painted eyes within the first screen. |
| Opening frame | The mask opens left while the painting moves inward and reduces in scale. The introductory copy recedes; “La Galerie” emerges behind it. | The crop opens upward and the painting recedes from a full-width detail. “La Galerie” emerges above it.         |
| Destination   | The complete square painting sits centrally, with its credit and enlargement link below.                                                 | The complete painting is framed with lateral space, title above, credit/action below.                           |

A CSS sticky stage and GSAP/ScrollTrigger share approximately 80svh of additional
scroll. There is no wheel interception, horizontal journey or automatic carousel.
Supporting photographs open their frames; Crystelle's portrait settles from the
left; the official sphere gently turns in the opening section. Reading text is
not hidden for repeated section reveals. Artwork captions and enlargement controls
sit outside the images, preserving borders, signatures and subject composition.

Reduced motion presents the complete painting in normal flow and skips animation
imports. Changing to reduced motion reverts an active sequence. Very short viewports
(under 600px high, including phone landscape) use the static composition to avoid
an oversized sticky stage. Native scrolling, information and contact work without
animation. Initially reduced-motion visitors stay static if they later change the
preference; reloading enables the sequence.

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
Crystelle's complete 4:3 photograph provides the human connection; one Le Capri
material photograph establishes the architectural eye.

- Astro's image pipeline creates responsive WebPs with explicit dimensions. The
  hero is eager/high priority; subsequent homepage photographs are lazy loaded.
  Enlargement links point to the curated complete export and enhance into a native
  dialog with Escape, close button and focus restoration.
- Page/component styles remain CSS Modules under `src/styles/`; `editorial.css`
  owns shared tokens, resets and focus/reduced-motion treatment. Official SVG
  wordmarks and the pinned generated fonts remain in use. Hatton and Frama carry
  the main hierarchy; the existing generated-font tooling is unchanged.
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

Local review evidence lives in `.browser-evidence/magazine-second-pass/`
(gitignored). It includes the scrolled references, actual first/intermediate/final
sequence states, normal viewport section captures, contact/dialog views, static
fallbacks, machine-readable interaction audits and the production-build logs.
A full-page screenshot alone does not represent the sticky sequence: use its three
viewport captures or recording to assess the motion, and the reduced-motion full
page to assess the complete static layout.

Production-build review covered laptop (1366×768), large desktop (1920×1080) and
phone (390×844), plus narrower/shorter responsive layouts. Artwork opening,
keyboard navigation, Escape/close, focus/scroll restoration, contact navigation
and retained card links were exercised. Reduced-motion changes, disabled JavaScript
and failed script requests were checked. Automated axe audits reported no
violations on the landing, reduced-motion landing, contact and open-artwork dialog;
manual review checked the decorative arrows that axe could not evaluate. The
Schema.org validator reported zero errors and warnings for the actual JSON-LD.

The initial local load check caught a CLS of 0.41 before the pre-paint reservation;
the revised opening measured below 0.001 in that laptop run. These are local
Chromium observations, not mobile-network field performance or production metrics.
Physical-device Safari, real contact import and production analytics remain release
checks in the [card guide](crystelle-contact-card.md) and
[ADR-0006](../adr/0006-cookieless-first-party-analytics.md).

Review and accept this edition before a separate, deliberate production promotion.
Update the date-specific opening copy when October's opening has happened.
