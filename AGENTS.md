# Repository Instructions

Jukkai is a client/product repo. Keep this file short, current, and practical:
add rules when they prevent repeated agent mistakes or encode real workflow, and
remove them when the convention changes.

## Operating Posture

- Prefer narrow, contract-faithful changes. Read the relevant docs and current
  code before inventing structure.
- Update `AGENTS.md` or linked agent docs in the same PR when agent workflow,
  app structure, or verification gates change.
- For technical or workflow-heavy slices, close with a brief operator note:
  what changed, why that shape was chosen, what was verified, and what Martin
  should understand next.

## Git And PRs

- Branch and PR by default. Never push `main` directly in this repo.
- Build work as coherent semantic commits. Do not save everything for one final
  commit and reconstruct history afterward unless cleanup is genuinely needed.
- For `ready-for-agent` issues and other non-trivial specified slices, push
  after the first meaningful commit and open a draft PR early. Keep pushing
  incremental commits. When the slice is complete and checks pass, mark the PR
  ready for review.
- Freeform exploration, tiny fixes, and conversational iteration can use lighter
  judgment.

## Issue-Led Work

- Issues and PRDs live in GitHub. Use `gh` and follow
  `docs/agents/issue-tracker.md`.
- Triage labels are mapped in `docs/agents/triage-labels.md`.
- For issue-led work, fetch the issue, labels, comments, and linked PRD before
  coding. Treat `ready-for-agent` issues as already scoped for execution.
- Post a short execution preflight, then proceed without waiting unless a real
  decision is uncovered.
- If an issue has `skill:tdd`, load the `tdd` skill and use public-behavior
  red-green-refactor. For `ready-for-agent` + `skill:tdd`, the issue acceptance
  criteria are the approved behavior plan unless the issue or code contradicts
  them.
- Pause implementation only when the issue reveals an unsettled
  product/design/API contract, conflicting acceptance criteria, a public
  interface that cannot be named, unexpected infra/auth/storage/dependency work,
  or scope expansion. When pausing, state the ambiguity, recommend a default,
  and ask one decisive question.

## Commands And Running Things

- Bun is the package manager. Read `package.json` for the full script list.
- Use a Node version supported by `package.json` engines; jsdom 30 sets the
  minimum supported Node patch versions for the test toolchain.
- Full repo gate: `bun run check`.
- Marketing app narrow gates: `bun run --cwd apps/marketing typecheck`,
  `bun run --cwd apps/marketing lint`, `bun run --cwd apps/marketing test`, and
  `bun run --cwd apps/marketing build`, as relevant.
- For long-running local processes, use an owned non-default port. Check what is
  already bound first, tell Martin the URL, and clean up your process.
- Astro dev server coordination for the marketing app:
  `bun run --cwd apps/marketing dev -- status` before starting, and
  `bun run --cwd apps/marketing dev -- stop` only for a server you own.

## Browser Automation

- Use `agent-browser` for browser automation. Do not use Chrome MCP or the Codex
  in-app browser for this repo.

## Marketing App

- Use `docs/README.md` to choose a task-specific reading route. It owns document
  roles and maintenance rules. Read relevant current guidance and targeted evidence;
  do not bulk-load historical sources or treat a newer proposal as accepted truth.

- Start delivery, research, design, and planning work with
  `docs/operations/current-delivery.md`. The magazine release and October opening
  are separate milestones. No teaser or full-stack work is on the current path.
  Keep focused SEO work active; do not require exhaustive research before building.
  The brand name is settled; the exact first-release sitemap remains open.

- `apps/marketing` is an Astro workspace whose only route so far is Crystelle's
  Contact Card Page at `/contact/crystelle`. Keep its Astro, Turbo, Stylelint,
  Vitest, and generated-font tooling intact as design and implementation resume.
- Contact details and portrait edits follow
  `docs/operations/crystelle-contact-card.md`; keep the page portrait and social
  preview on the shared image source in `src/data/crystelle-portrait.ts`.
- Cloudflare Pages reads `public/_redirects` and `public/_headers`. Printed
  pointer paths live in `_redirects`. Crystelle's cards have been sent to print:
  `https://jukkai.fr/c/crystelle` is locked; only the redirect target may change.
- Analytics follows ADR-0006: retain one explicit beacon, keep production data
  separate from previews, and describe contact-page views without claiming QR
  scan attribution or successful contact imports.
- `brand/` holds durable masters and is not the app's runtime asset directory.
  Commit the curated web export into `apps/marketing/src/assets/` and import it
  from there; a test holds the copy to its master.
- Page-level styles belong in `src/styles/*.css` rather than an Astro `<style>`
  block, because Stylelint globs `src/**/*.css`.
- Astro components render in tests through the Container API, which needs
  Vitest's SSR transform. Those files declare `@vitest-environment node`.
- Before marketing research, strategy, IA, content, or design work, read
  `docs/operations/method.md`. Keep observations, interpretations, hypotheses,
  decisions, and experiments distinct; tools and competitor patterns do not own
  Jukkai's business or creative trade-offs.
- Current strategy is limited to `docs/strategy/foundation.md` and
  `docs/strategy/questions-for-crystelle.md`. Working notes can inform active
  sessions, while files under `docs/archive/` are provenance to consult only
  when intentionally requested.
- Website proposals and draft copy are indexed in
  `docs/working-notes/website/README.md`. Keep their business context, research
  observations and proposed copy distinct; organization does not approve their content.
- For continuing SEO research, read `docs/research/seo-research-log.md` and update
  it after each reviewed run, following its update protocol. It holds provisional
  synthesis, a linked run index and open questions; read only the relevant entries
  in `docs/research/seo-runs/` for detailed findings, corrections and source paths.
  Keep new records in groups of at most ten runs and update the index and changed
  synthesis in the same session. Approved decisions stay in GitHub.
  Use `docs/research/claude-seo-capability-map.md` alongside it for native command
  selection across the full capability space. Recommend bare `/seo` commands; the
  SEO workspace owns run instructions. Keep findings and next-run discussion in the log.
- Brand masters and supporting source material live under `brand/`; see its
  README before adding assets or committing font binaries.
- For substantial visual or interaction work, prefer the local `impeccable`
  skill when invoked or clearly useful.
- Protect conversion and SEO intent, but allow visual implementation to
  challenge conventional brochure-site patterns when it improves taste,
  memorability, and clarity.

## Print Advertising

- For the current print commission, start with
  `brand/ad/tendances-2026-10/README.md`; it holds the working brief, source paths,
  master setup and worker handoffs. The previous ad lives in `brand/ad/mlle-adele/`.
- Martin uses the coordinating conversation for thinking and review, with bounded
  editing subagents. Only one worker may control the shared Affinity instance at
  a time; reviewers use saved files/previews. A working proposal is not approved copy.
- The coordinating agent delegates Affinity MCP and app lifecycle actions to the
  editing worker; it directs the work and reviews saved artifacts.

## Domain Docs

- Shared language lives in `CONTEXT.md`. Keep it to glossary terms, not
  implementation details.
- ADRs live in `docs/adr/`. Read relevant ADRs before changing production,
  deployment, backend shape, generated assets, or other durable architecture.
- See `docs/agents/domain.md` for how agents should consume domain docs.
