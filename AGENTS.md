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
- The homepage browser gate is suspended while `apps/marketing` has no routes.
  The first future homepage slice must reactivate and revalidate
  `docs/operations/homepage-browser-regression-gate.md` before using it as a PR
  contract.

## Marketing App

- `apps/marketing` is a configured Astro workspace shell with no pages or visual
  implementation after the July 2026 reset. Keep its Astro, Turbo, Stylelint,
  Vitest, and generated-font tooling intact while the content pipeline is rebuilt.
- Before marketing research, strategy, IA, content, or design work, read
  `docs/operations/method.md`. Keep observations, interpretations, hypotheses,
  decisions, and experiments distinct; tools and competitor patterns do not own
  Jukkai's business or creative trade-offs.
- Current strategy is limited to `docs/strategy/foundation.md` and
  `docs/strategy/questions-for-crystelle.md`. Files under
  `docs/archive/2026-07-reset/` are provenance, not implementation inputs.
- There is no current `PRODUCT.md`, `DESIGN.md`, or `docs/design/` contract. Do
  not restore the deleted homepage or promote archived design choices. New
  product/design context starts only after the reset map produces approved
  inputs.
- For substantial visual or interaction work, prefer the local `impeccable`
  skill when invoked or clearly useful.
- Protect conversion and SEO intent, but allow visual implementation to
  challenge conventional brochure-site patterns when it improves taste,
  memorability, and clarity.

## Domain Docs

- Shared language lives in `CONTEXT.md`. Keep it to glossary terms, not
  implementation details.
- ADRs live in `docs/adr/`. Read relevant ADRs before changing production,
  deployment, backend shape, generated assets, or other durable architecture.
- See `docs/agents/domain.md` for how agents should consume domain docs.
