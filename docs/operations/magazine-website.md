# Magazine website

**Status:** implemented first-release design for Martin's review; not a production
promotion. **Owns:** the two-page implementation and its review procedure.
**Last reviewed:** 2026-09-13. **Revisit when:** the design is accepted, the opening
has happened, contact information changes, or the full website replaces this edition.

## Scope and content

Martin's September 13 instruction selects a landing page at `/` and a general
contact page at `/contact/`. The existing `/contact/crystelle/` printed Contact
Card Page and `/contact/crystelle.vcf` remain available. Architecture and Galerie
navigation links are homepage sections; no future sitemap pages are implemented.

The [foundation](../strategy/foundation.md) owns business claims. The copy explains
the Studio Crystelle Terrasson continuity, the existing architecture practice in
Châteaugiron, and the separate official opening in October 2026. Galerie visiting
hours, an exact opening day, prices and an artist programme are not published.

The composition, headlines and colour treatment are agent-authored design proposals
for this first version, not amendments to the brand strategy. The supplied edited
photographs are documented in the [asset manifest](../../apps/marketing/src/assets/magazine/manifest.json)
and [selection notes](../../apps/marketing/src/assets/magazine/README.md).

## Implementation

- `EditorialLayout.astro` provides French metadata, a canonical URL, responsive
  social image, shared navigation/footer and the existing analytics component once.
- Page and component layouts use CSS Modules under `src/styles/`. `editorial.css`
  contains the shared reset, tokens, focus treatment and reduced-motion override.
- The pinned generated fonts remain the only font source. PP Hatton carries the
  large editorial headings, PP Frama the reading/navigation text, and Voyage a few
  expressive words. The official wordmark is used as SVG, not typeset again.
- `editorial-motion.ts` enhances the static page with a short entrance, one-time
  section reveals and modest desktop image parallax through GSAP/ScrollTrigger.
  There is no scroll interception, pinned reading sequence or loading screen.
  Reduced motion skips the animation imports; changing the preference reverts
  active animations. All copy and contact actions are server-rendered.
- Galerie photographs open in a native dialog with descriptive captions, a close
  button, Escape handling and focus restoration. Full artwork compositions are
  preserved. Ordinary image links provide the fallback when scripts are unavailable.
  Interior and portrait crops are explicit responsive design choices.
- Contact details, vCard and Instagram use `src/data/crystelle.ts`. Apple devices
  receive the Apple Maps destination; the ordinary link works without JavaScript.
- The sitemap lists only the landing and general contact pages. The printed card
  keeps its existing `noindex, follow` behavior and locked redirect.

## Review and release

Use Bun 1.3.14 through `mise`, and the current real generated fonts:

```sh
mise x bun@1.3.14 -- bun run --cwd apps/marketing dev -- status
mise x bun@1.3.14 -- bun run --cwd apps/marketing dev -- --port 4327
```

Check that this port is free first. Only stop a server you own. Review the homepage
at desktop, tablet and phone widths, plus the contact page, section links, artwork
dialog, keyboard focus and reduced-motion behavior. Real contact import and
production analytics remain the release checks in the [card guide](crystelle-contact-card.md)
and [ADR-0006](../adr/0006-cookieless-first-party-analytics.md).

Run `bun run check` and `bun run --cwd apps/marketing build`. Build-output tests
cover public route membership, canonical/social metadata, generated font links,
server-rendered contacts, section destinations and the retained card/redirect.

Accept the design/copy in review before the deliberate production promotion.
The Studio Terrasson website, domain migration and Google profile are separate
operations. Update the opening copy after October's opening; it is date-specific.

### Implementation review, September 13

The full repository gate passed (10 script tests and 49 marketing tests), and the
production build generated the expected three pages and public sitemap. Browser
review used `agent-browser` on the production preview: 320, 390, 768, 1024 and
1440 px layouts, real local font requests, section links, contact navigation,
artwork enlargement, Escape/focus restoration, reduced motion and script-blocked
contact/image fallbacks. Automated axe audits found no violations on the landing,
contact and open-image dialog. These checks do not replace a real phone or the
production release checks above.

Local review captures live in `.cache/magazine-review/` (untracked): desktop and
mobile overview screenshots, key editorial sections and machine-readable audits.
