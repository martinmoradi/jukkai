# Fonts

Jukkai consumes fonts from pinned `@mm/fonts` Set versions. The registry is the
source of truth, and this repo materializes generated font assets before local
development, preview, or production builds.

See [ADR-0003](../adr/0003-build-time-generated-font-assets.md) for the durable
source-of-truth decision.

## Pipeline Contract

- Pin the approved marketing Set slug and version in repo-owned code.
- Prefetch the pinned Set before the marketing app needs font files.
- Write generated cache and served output directories to gitignored paths.
- Serve generated font files from Jukkai-owned assets.
- Do not commit `.woff2` font binaries.
- Do not fetch private registry font bytes from the browser at runtime.
- Treat broad starter Sets as exploratory and narrowed Set versions as typography
  lock-in.

## Current Set

The starter Set is intentionally broad while typography is exploratory:

- Set slug: `jukkai-starter`
- Set version: `1`
- Snapshot digest:
  `3629dc2a7305b505806d924a9e49276865ede10de291954a67a569c42a0fd664`
- Snapshot count: `1927` Fonts

Issue #20 owns the later narrowed Set version after typography is locked.
The repo-owned source of truth is `APPROVED_MARKETING_FONT_SET` in
`scripts/generated-font-assets.ts`; both `fonts:prefetch` and `fonts:check`
consume that contract.

## Environment

The font prefetch path reads configuration from `MM_FONTS_*` variables:

- `MM_FONTS_SERVICE_URL`
- `MM_FONTS_FETCH_TOKEN`
- `MM_FONTS_ACCESS_CLIENT_ID`
- `MM_FONTS_ACCESS_CLIENT_SECRET`
- `MM_FONTS_CACHE_DIR`
- `MM_FONTS_OUTPUT_DIR`

The approved Set slug and version are not operator environment variables. They
live in `scripts/generated-font-assets.ts` so font Set changes happen through a
reviewable repo change.

Real values must stay outside git. On Martin's machine, the canonical local
secret files are:

- `~/.config/fonts/jukkai.env`
- `~/.config/fonts/jukkai-cloudflare-access.env`

The repo may contain `.env.example`, docs, and scripts that name required
variables, but never real secret values.

## Local Development

The default operator command is:

```sh
bun run fonts:prefetch
```

On Martin's workstation, source the canonical local secret files first:

```sh
set -a
source ~/.config/fonts/jukkai.env
source ~/.config/fonts/jukkai-cloudflare-access.env
set +a
bun run fonts:prefetch
```

The repo also contains `.env.example` with variable names and non-secret
defaults. Real token values must stay in `~/.config/fonts/`, local secret
stores, or deployment secrets.

The default generated paths are:

```sh
MM_FONTS_CACHE_DIR=.cache/mm-fonts
MM_FONTS_OUTPUT_DIR=apps/marketing/public/fonts/generated
```

The generated output should include font files plus stable metadata for the
marketing app:

```text
apps/marketing/public/fonts/generated/
|-- fonts/
|   `-- *.woff2
|-- fonts.css
`-- manifest.json
```

The generated output can be checked without contacting `@mm/fonts`:

```sh
bun run fonts:check
```

That check verifies the generated manifest is for `jukkai-starter@1`, then
checks that `fonts.css`, `manifest.json`, and the referenced `.woff2` files are
present.

The marketing app's local dev and build commands run this check before Astro
starts. If generated files are absent, they fail with an actionable message to
run `bun run fonts:prefetch`.

PR CI uses `bun run fonts:fixture` before the build job. That command writes a
tiny generated fixture for hermetic build verification only; production and
local typography checks should use `bun run fonts:prefetch`.

The marketing app links generated `fonts.css` and uses its exported
`--jukkai-generated-font-family` variable in the page font stack. That proves
local dev and builds run against Jukkai-owned generated font URLs without making
the browser contact `fonts.martinmoradi.com`.

`fonts.css` is the primary marketing-app contract. It should contain the
generated `@font-face` declarations and the selected generated-family variable.
`manifest.json` is for tests, diagnostics, and later tooling; app styling should
not need to know registry internals to use the generated fonts.

Issue #12 owns the final typography choices and should consume `fonts.css` or
`manifest.json` rather than scan the generated directory or guess font
filenames.

The expected local flow is:

1. Source the local `~/.config/fonts/` environment files or project them into an
   ignored `.env.local`.
2. Run `bun run fonts:prefetch`.
3. Start the marketing app.
4. Verify the browser requests font bytes from Jukkai-owned local asset URLs,
   not from `fonts.martinmoradi.com`.

A fresh checkout without generated fonts should fail with a clear message that
points to the prefetch command.

Once issue #12 wires marketing typography to generated fonts, missing generated
files must not silently fall back to system fonts. Local development should fail
with an actionable message such as "run `bun run fonts:prefetch`"; production
and CI builds should fail hard when required generated font files are absent.

## Cloudflare Pages

Cloudflare Pages should store the same required values as environment variables
or secrets. Production builds should run font prefetch before the marketing
build, and logs must not print secret values.

The deployed page should serve generated font files from the Jukkai domain. A
runtime browser request to `fonts.martinmoradi.com` for font bytes is a pipeline
failure.

Issue #13 is a human-in-the-loop operator slice, not a `skill:tdd` slice. Its
meaningful proof is real Cloudflare Pages secret configuration, production or
preview build logs, and deployed browser verification without leaking secrets.

## Verification

Use the linked issue suite as the verification ladder:

- #11: config, prefetch command, generated dirs, and clear local failure modes.
- #12: marketing typography consumes generated output and uses self-hosted URLs.
- #13: Cloudflare Pages secrets and production build prefetch are verified as a
  human-in-the-loop operator step.
- #14: fresh checkout, local dev, Cloudflare build, deployed browser, and
  registry authorization are verified end to end.
- #20: narrowed Set version is published and pinned after typography lock-in.

Issue #14 should start as an operator checklist. It may add scriptable smoke
helpers after #11 and #12 exist, but the first proof should explicitly walk the
real local secret files, Cloudflare Pages build path, deployed browser requests,
and negative registry authorization check.

## Test Boundary

Issue #11 should use red-green tests for the public command and config contract
without depending on the live registry, Cloudflare Access, or real secrets.

The first test cycles should cover:

- missing required environment variables fail with a clear message
- successful prefetch writes generated output and cache files into temp dirs
- generated output includes a small manifest or CSS entry for the marketing app
  to consume
- logs do not print fetch tokens or Cloudflare Access credentials

Use a fake local server or mock the network at the command's public fetch
boundary. Keep live registry access for the HITL verification slices.

Issue #12 is also TDD-friendly. It should use generated fixture output rather
than the real registry and test the public marketing-app contract:

- the marketing app imports or links generated `fonts.css`
- missing required generated files fail with a clear message
- the marketing build passes when fixture font output exists
- source and built output do not reference `fonts.martinmoradi.com` for font
  bytes

Keep browser-level verification as a smoke or manual check until the #14
operator pass.

## Rotation And Version Bumps

Rotate the scoped `@mm/fonts` fetch token or Cloudflare Access service token in
the secret store that uses it:

- Local operator credentials live under `~/.config/fonts/`.
- Production build credentials live in Cloudflare Pages.

When typography changes but the Set slug stays the same, publish a new Set
version in `@mm/fonts`, update `APPROVED_MARKETING_FONT_SET` in
`scripts/generated-font-assets.ts`, prefetch again, and verify local and
deployed font URLs. If the Set slug changes, also check whether Consumer
Authorization or token rotation is required.

Do not narrow the Set only because the pipeline works. Issue #20 should remain
blocked until the actual marketing typography direction is locked. The broad
`jukkai-starter@1` version is acceptable during exploration; the narrowed Set is
the design lock-in step.
