# July 2026 reset archive

This directory records the repository boundary executed by issue #72 as part of
the reset map in issue #71.

Archived files are historical inputs only. They must not be loaded as current
research, messaging, information architecture, or build requirements. The next
content pipeline will recreate those outputs from the canonical foundation and
new research.

## Kept as current

- `docs/strategy/foundation.md`
- `docs/strategy/questions-for-crystelle.md`
- `docs/operations/method.md`
- `docs/operations/marketing-site-content-seo-process.md`
- `docs/source-material/`
- `docs/reference/`
- `CONTEXT.md`, `docs/adr/`, and `docs/agents/`
- the `@mm/fonts` prefetch, generation, fixture, and validation scripts and their
  pipeline tests
- the Astro marketing workspace shell and the shared Turbo, TypeScript, ESLint,
  Stylelint, Prettier, Vitest, Husky, and CI tooling for the next frontend

## Archived here

- `research/`: the previous audience, competitor, keyword, GBP, and Phase 1
  outputs
- `strategy/`: the previous messaging, sitemap, content matrix, and wireframe
  brief

## Purged

- `docs/design/` and its visual-reference images
- the exploratory marketing frontend implementation, including pages,
  components, styles, motion/WebGL code, implementation-specific tests, public
  image assets, the wordmark copy, and the hero background baker
- the removed frontend's generated-font integration test; the independent font
  pipeline tests remain
- implementation-only dependencies and scripts, such as GSAP and `hero:bake`
- local `.browser-evidence`, `.impeccable`, and `.turbo` caches

The Git history and this archive remain available when provenance is useful, but
none of the purged or archived material is a contract for the future frontend.

## Issue verdicts

Closed as dead because their implementation or approval target was discarded:
#39, #40, #41, #42, #52, #57, and #58.

Closed to re-create later from post-reset inputs rather than inherit the old
contract: #45, #59, #60, #67, and #68.

## Branch cleanup

Deleted locally:

- `agent/53-conductor-v2`, `agent/54-tunables-devtools-markers`,
  `agent/55-panel-scene-model`, and `agent/57-58-galerie-choreography`
- `chore/marketing-astro-tooling` and `chore/marketing-production-basics`
- `codex/add-marketing-wordmark-asset`, `codex/remove-astro-baseurl`, and
  `codex/typed-marketing-pages`
- `design/hero`, `design/hero-exploration`,
  `design/homepage-art-direction-cleanup`, `design/mood-scroll`, and
  `design/visual-directions`
- `feat/home-hero-motion`, `feat/homepage-blockout`, and
  `feat/homepage-static-hero`
- `integration/homepage` and `issue-36-homepage-shell`

Deleted from `origin`: `agent/57-58-galerie-choreography`,
`design/hero-exploration`, `design/visual-directions`, and
`integration/homepage`. The stale `docs/marketing-asset-pipeline` remote-tracking
reference was pruned because the remote branch was already absent.
