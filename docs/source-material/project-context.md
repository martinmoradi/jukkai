# Jukkai Project Context

_Archive status, issue #262: this document lives in the old prototype/tooling
repo being archived as Atelier. It records historical strategy, Studio, Galerie,
Mock Pipeline, and case-study context. Future real-product Jukkai work should
start from the clean `martinmoradi/jukkai` repo after the slug is freed, not from
this repo's old tooling assumptions._

_Last updated: June 11, 2026. Current operating context for agents and future case-study writing._

---

## What This Is

Jukkai is the new brand and digital ecosystem for Crystelle Terrasson, an interior architect near
Rennes who is opening an art shop inside the same physical space as her studio.

This repo is not only the build. It is also the memory of Martin's first real professional project:
strategy, SEO audit, naming work, visual exploration, product tooling, launch work, and case-study
evidence should live close enough to the code that agents can keep them current.

The current brand truth is in [brand-strategy.md](brand-strategy.md). Closed decisions are in
[decision-log.md](decision-log.md). When product, design, copy, naming, SEO, or launch questions come
up, read those before inventing new direction.

---

## People And Roles

**Crystelle Terrasson** is the client and final creative decision-maker. She has run Studio Crystelle
Terrasson for 14+ years, with residential and professional interior architecture work around Rennes.
Her name and referral network are the existing commercial asset.

**Martin Moradi** is acting as strategist, PM, creative director, developer, and documentation owner.
This is both a real client project and a portfolio/client-acquisition case study. The documents need
to preserve the thinking, not just the polished result.

**Laura Corbel** is the second interior architect at the studio.

---

## Brand Shape

The public brand is **Jukkai by Crystelle Terrasson** at launch. Jukkai is the art shop and the new
brand world around the existing architecture practice.

The physical opening is currently scheduled around October 1, 2026.

The core strategic idea is the fusion between art and interior architecture. The studio sustains the
business; Jukkai carries the brand. The website and identity must make the bridge visible without
requiring Crystelle to explain it in person.

The brand philosophy is locked:

> Chaque contrainte est un terrain de jeu.

The tone is warm but not soft, colourful but not loud, accessible but not cheap, expert but not
academic, rock but not punk.

Jukkai is not a traditional gallery, not a decor boutique, not all-white, not cold, not intimidating,
and not safe. It should feel alive.

---

## Digital Ecosystem

There are several apps and phases. Do not collapse them into one deployable for convenience.

Public status as of June 8, 2026: `jukkai.fr` exists but is empty. `lab.jukkai.fr` exists but is
already abandoned/replaced by Studio. `jukkai-atelier.martinmoradi.com` is the active internal tool. Neither Lab nor
Studio is a public marketing surface.

### Teaser Landing Page

Future public teaser site for jukkai.fr. It should be a simple, beautiful Astro page with email capture
wired to the existing database instance on the VPS. Its first job is to give Crystelle a credible
surface when she starts communicating and distributing business cards to artists. The artist pipeline
becomes real before the client marketing push, so the teaser supports early artist interest more than
client acquisition. Email capture is cheap upside, not the strategic heart of the page.

This is one of the next public deliverables, alongside the Studio-driven mock landing page. It is
separate from `apps/lab`, `apps/studio`, and `apps/studio-api`.

### Lab

`apps/lab` is the original Astro + Preact identity lab. It began as the teaser direction, then became a
wordmark/font exploration tool when the identity work got blocked by font and logo decisions. Keep it
deployable as reference material.

### Studio

`apps/studio` is the newer React/Vite identity studio. It exists to help Martin and Crystelle explore,
save, compare, and mock visual identity directions. It is currently jukkai-scoped for velocity, but the
architecture should stay clean enough to become more general later.

`apps/studio-api` is the Bun/Hono API for Studio persistence and sync. It is not the future public API
or client portal API.

Studio is being rushed to a useful state for Jukkai because Crystelle needs real mockups before the
identity can move into final design production. The useful product shape is now narrower than the
old atelier board arc: Studio keeps the existing favorite pool, the local Mock Pipeline turns favorites
into Photoshop-ready placement assets and finished maquettes, and Galerie becomes the internal review
surface for choosing a wordmark.

- **Sélection** remains the source pool: favorites and member context are the inputs.
- **Mock Pipeline** is local production: pull favorites from Studio API, generate canonical SVG/PNG
  placement assets, run Photoshop scripts, then publish finished maquettes back through Studio API.
- **Galerie** is review: compare one mock template across favorites, or one favorite across mock
  templates, with hidden Galerie Groups for non-destructive pruning.

The old atelier, board, camera, tile, la table, and fonderie plans are parked. They are useful only
as salvage material when they directly help Galerie or the Mock Pipeline.

The ideal downstream path is that Studio reduces manual production work without pretending to replace
Figma refinement or Photoshop smart-object rendering. The main job is still decision leverage: choose,
test, brief, then produce properly.

It may become useful for future identity projects, but that generalization comes after Jukkai proves
the workflow.

**Studio outlives Jukkai (decided 2026-06-11).** Whatever happens with future clients (a maybe),
Studio is a case study and portfolio project and will eventually become its own repo. The design bar
is therefore portfolio-grade, not internal-tool-grade. Current Studio product truth lives in
[../../../CONTEXT.md](../../../CONTEXT.md), the Galerie pivot ADR, and the current PRD/issues. The
archived roadmaps are historical evidence, not active instructions.

### Mock Landing Page

Near-term proof surface using Studio tokens. The goal is not the final marketing website; it is a quick
landing-page context that shows how candidate identity choices behave in a real public surface.

### Marketing Website

The full marketing website comes after the teaser and identity consolidation. Current intent: Astro,
static output, deployed through Cloudflare Pages. It should preserve the referral/search validation
pipeline from studioterrasson.fr while building better acquisition pages for the
"architecte d'interieur Rennes" cluster.

Before building the full marketing site, Martin needs a focused thinking/content session with AI to
tune the content strategy, page architecture, and copy angle. This should happen as its own documented
phase, not as incidental copywriting during implementation.

### Future Client Portal

The portal is explicitly later. It may become a React app for client document sharing, project files,
contact details, interaction history, calendar sync, and a light CMS surface for art-related content
Crystelle can manage. Keep this as strategic context only; do not build it into current teaser,
marketing, lab, or Studio work unless explicitly requested.

When it becomes active, it needs a proper PRD before implementation.

---

## Infrastructure Reality

jukkai.fr exists. The VPS is online. Cloudflare is set up. A database instance is already online on the
VPS.

Current repo infrastructure includes Bun workspaces, the Studio API, Postgres/Drizzle integration, and
container/Coolify-oriented deployment. Older docs that mention Next.js, Sanity, or a generic
VPS/nginx/Cloudflare stack are historical or stale unless this context has been updated again.

---

## SEO And Migration

The old public site is studioterrasson.fr. Its 2025 baseline is documented in
[../research/seo-digital-performance-audit.md](../research/seo-digital-performance-audit.md):

- 2,420 sessions/year
- 93% of search clicks from branded queries
- almost no non-branded acquisition
- mobile LCP 12.4s
- conversion tracking based on contact-page views, not real form submissions

The strategic SEO job is unchanged: preserve branded validation traffic through redirects and external
profile updates, then build proper acquisition foundations on jukkai.fr.

The domain changed from the original Megalaya plan to Jukkai. Any current launch or migration plan
should target jukkai.fr, not megalaya.fr.

---

## Case-Study Job

The case study is not an afterthought. It is one of the project outputs.

This project should become proof that Martin can:

- find the real strategic problem, not just build requested pages
- run discovery and turn it into usable positioning
- audit an existing site with business consequences
- identify when a chosen name is structurally failing
- build internal tools when the identity process needs them
- ship client-facing digital work with performance, SEO, and conversion tracking

Capture evidence as the project evolves. Screenshots, decision moments, rejected directions, rough
prototypes, before metrics, infrastructure milestones, and client reactions all matter.

Case-study notes live in [../case-study](../case-study).

---

## Open Context

Known open items:

- brand identity consolidation: wordmark, type system, color palette, usage rules
- Studio useful-enough milestone for Galerie and real maquettes
- Mock Pipeline PRD and issues
- Galerie review surface PRD and issues
- transparent PNG rendering in wordmark-svc
- Figma-authored mock recipes and Photoshop production workflow
- mock landing page using Studio tokens
- teaser landing page scope and app location
- marketing content strategy session with AI
- marketing site information architecture and content plan
- jukkai.fr analytics, Search Console, and real conversion tracking
- redirect map from studioterrasson.fr to jukkai.fr
- physical-space renders or photos for launch storytelling
- artist pipeline and event program
- future portal PRD, parked until after marketing launch

When any of these change, update this file and the relevant decision/process document.
