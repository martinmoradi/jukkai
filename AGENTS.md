# Repository Instructions

Jukkai is a client/product repo: the static Astro website for Jukkai by Crystelle
Terrasson. Start with `docs/operations/current-delivery.md` for what is being
worked on now, and `docs/README.md` for task-specific reading routes. Keep this
file short; change it in the same PR as any workflow or structure change.

## Working

- Prefer narrow changes. Read the relevant docs and current code before
  inventing structure.
- For issue-led work, read the issue, its comments and any linked spec, post a
  short preflight, then proceed. Pause only for an unsettled product or design
  contract, conflicting criteria, unexpected infra/auth/dependency work or scope
  growth: state the ambiguity, recommend a default and ask one question.
- `skill:tdd` on an issue means public-behavior red-green-refactor with the
  `tdd` skill; its acceptance criteria are the behavior plan.
- Close technical slices with a short operator note: what changed, why, what was
  verified and what Martin should know next.

## Git And PRs

- Branch and PR; never push `main`. Production is a separate, deliberate
  promotion described in `docs/operations/production.md`.
- Build coherent semantic commits as the work progresses. For non-trivial
  slices, push after the first meaningful commit, open a draft PR, and mark it
  ready once checks pass. PRs merge by rebase.

## Commands

- Bun is the package manager; see `package.json` for scripts and Node engines.
- Full gate: `bun run check`. Narrow gates: `bun run --cwd apps/marketing`
  `typecheck`, `lint`, `test` or `build`.
- Long-running processes use an owned non-default port. Check what is bound
  first, tell Martin the URL, and stop your process afterwards.
- Browser automation uses `agent-browser`, not Chrome MCP or in-app browsers.

## Marketing App

- `apps/marketing` serves `/`, `/contact/` and Crystelle's Contact Card Page.
  Keep Astro, Turbo, Stylelint, Vitest and generated-font tooling intact.
- Page styles live in `src/styles/*.css` (CSS Modules; shared tokens in
  `editorial.css`), not Astro `<style>` blocks, because Stylelint globs them.
- Astro component tests use the Container API and declare
  `@vitest-environment node`.
- `https://jukkai.fr/c/crystelle` is printed on cards and locked in
  `public/_redirects`; only its target may change. Contact details and portrait
  follow `docs/operations/crystelle-contact-card.md`.
- Analytics follows ADR-0006: one explicit beacon, production data separate from
  previews, no claims of QR-scan attribution or contact imports.
- `brand/` holds masters, not runtime assets: commit curated exports to
  `apps/marketing/src/assets/`. Photo originals live on Storage per
  `media/README.md`; `media/library/` is never a build dependency.
- Protect conversion and SEO intent, but visual work may challenge brochure-site
  conventions when it improves taste, memorability and clarity.

## Content, Strategy And Research

- `docs/strategy/foundation.md` owns business facts and public claims.
  Before research, content or design work, read `docs/operations/method.md`:
  keep observations, proposals and decisions distinct. A draft or research
  finding is not approved content.
- `docs/site/` holds one page file per target page: why it exists, what it
  must prove, its evidence and its gaps. Read the page's file before content
  or design work on it, and update it in the same PR.
- SEO research follows `docs/research/seo-research-log.md` and its update
  protocol. `docs/archive/` is provenance; open it only when asked.

## Agent skills

### Issue tracker

GitHub Issues via `gh`, with native sub-issues and blocking. See
`docs/agents/issue-tracker.md`.

### Triage labels

The five default roles plus Jukkai's `spec`, `ready-for-supervised-agent`,
`deferred`, gate, area and skill labels. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `CONTEXT.md` (glossary only) plus `docs/adr/`. See
`docs/agents/domain.md`.
