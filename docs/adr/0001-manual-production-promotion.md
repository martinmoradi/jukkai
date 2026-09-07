# Manual Production Promotion

Status: active release boundary, narrowed on 2026-09-07 to match Martin's current
static-website scope. ADR-0005 retired the teaser; the September reset also retires
its inherited backend prerequisite. Previous backend, consent, database and combined
release prescriptions are historical planning, preserved in git and the closed
[teaser/backend specification](https://github.com/martinmoradi/jukkai/issues/19).
They are not a future implementation commitment.

## Current decision

`main` is the integration branch, protected by PR checks. `production` is the
production release pointer for the static Astro website on Cloudflare Pages.
Production promotion is deliberate and manual; normal collaboration goes through
PRs to main. Do not push main directly or use a teaser branch.

Preserve unrelated live configuration. Before configuration or promotion, inspect
actual branches, protection, Pages settings and DNS; old issue descriptions are not
proof of current state. Verify the exact release candidate, show the intended change,
and use the user-authorized supervised release procedure. Record what was promoted
and prove the live website corresponds to the intended deployment.

The first magazine release includes the approved homepage and the existing Contact
Card Page together, with the general contact surface chosen during page planning.
Keep the printed `/c/crystelle` pointer permanent. The old Studio Terrasson website
stays available initially with an invitation banner; publishing Jukkai does not by
itself authorize a domain migration or changes to the Business Profile.

## Static release requirements

- Cloudflare Pages owns static production delivery; production tracks `production`,
  while main/feature previews remain separate.
- Retain the pinned font prefetch and Astro build contract (ADR-0003) and static
  image delivery (ADR-0004). Keep credentials out of git and browser runtime.
- Analytics follows ADR-0006: one explicit beacon and environment-separated data.
- Verify relevant live routes, assets, metadata/indexing choices and contact behavior.
  Native phone import and actual analytics collection require real release evidence.
- Record release settings and verification in operations docs; local tests do not
  establish deployed behavior.

The [go-live issue](https://github.com/martinmoradi/jukkai/issues/103) owns current
execution. A one-command promotion helper and standalone version-probe feature are
optional future work, not first-release blockers. No API, Coolify runtime, database,
health endpoint, migrations, staging or mail system is required for this release.
A future full-stack phase needs fresh scoping before its architecture is revived.
