# Manual Production Promotion

Jukkai uses `main` as the dev integration branch for the full website, a temporary `launch/teaser` release branch for the teaser landing page, and `production` as the only production release branch. Cloudflare Pages deploys the teaser landing page from `production`, and the Jukkai Proper backend Coolify service also deploys from `production`. The teaser branch may intentionally diverge from `main`; shared foundations should be cherry-picked or merged deliberately, while the full website continues on `main`. The manual release gate is branch promotion, so one promoted commit describes the frontend and backend versions that are live together.

`main` is the collaboration gate and should keep the existing pull-request CI protection. `production` is a release pointer, not a collaboration branch: humans should not push it directly during normal work, force pushes should be blocked except for a deliberate admin emergency, and the promotion script should be the normal way to move it. Do not require a separate pull request into `production` if the promotion script already performs the release check, confirmation, push, and verification.

The teaser email capture is the first vertical slice of the Jukkai Proper backend rather than an external form. It should run as a separate Coolify service from this repo and reuse the existing Coolify Postgres service by creating a separate Jukkai Proper database and role. Name these around the product boundary, such as `jukkai_prod` and `jukkai_app_prod`, not around the teaser or marketing app. Archived Jukkai Atelier data and services remain isolated.

The backend should live as a separate workspace app, `apps/api`, rather than inside the Astro marketing app. The marketing app remains a static Cloudflare Pages target, while the API has its own Coolify service, environment variables, health check, logs, and future staging path.

Current CD and backend work should stay portal-aware without creating an unused portal app. Reserve `apps/portal` as the expected future authenticated frontend for client project access and practice-console workflows, but create it only when those workflows become active. Avoid decisions that assume the public marketing app is the only frontend Jukkai Proper will ever have.

The backend should be staging-ready but should not run a staging environment yet. Configuration, migrations, health checks, logs, and deploy docs should keep production and future staging separable, but the only provisioned runtime for the teaser phase is production. Add a staging API, staging database, and staging domain once backend changes become risky enough that local verification and production health checks are no longer representative.

Production migrations may run automatically on API startup during the teaser and early product-building phase, while schema changes are additive and low-risk. Switch to explicit pre-deploy migration planning once migrations can rewrite, delete, backfill, lock, or otherwise reshape meaningful production data. The shared Postgres service has PITR, but PITR is a recovery backstop, not a reason to keep risky migrations casual once valuable data exists.

Migration robustness should grow in phases. Phase 1 uses app startup migrations and a single Jukkai Proper app role while data is low-risk and schema changes are additive. Phase 2 moves migrations into the promotion flow so failed migrations block deploy before a new API version is rolled out. Phase 3 splits migration privileges from runtime privileges with a dedicated migrator role and a restricted app role. Do not jump to Phase 3 before the API framework and deployment shape are settled unless the project deliberately chooses it as a learning exercise.

The new `jukkai_prod` database should reuse the existing PITR-backed Postgres service rather than introducing a separate backup system. When `jukkai_prod` is created, verify that it is inside the pgBackRest-covered cluster and that the Jukkai Proper app role cannot touch archived Atelier databases. Document the restore boundary clearly: cluster-level PITR can roll back every database in the shared Postgres service, so single-database recovery should use a scratch restore plus logical dump/restore rather than an in-place cluster rollback.

The production backend should use `https://api.jukkai.fr` rather than a path under the Cloudflare Pages site. Keeping the API on a subdomain lets Cloudflare Pages own the static site and Coolify/Traefik own the backend without split-host routing.

Lead capture should collect consent for Jukkai Updates, not a general newsletter. The teaser form may stay visually minimal with one email field and one button, but it must show clear nearby microcopy explaining that Jukkai will send only a few messages about the opening and first news of the place, with unsubscribe possible at any time. Store the displayed `consent_text`, `consent_version`, and purpose (for example `jukkai_updates`) with each submission so the promise remains auditable if the copy changes later. Do not require double opt-in for v1; revisit if Jukkai Updates become a regular newsletter or list quality becomes a real problem.

Keep Jukkai Updates subscribers within the low-frequency place-news promise: opening announcement, first photos, first artworks or events, and similar early Jukkai news. Do not silently repurpose the list into a broad newsletter; if the email program becomes regular architecture marketing or a broader editorial channel, create a clearer consent moment.

The teaser page does not need a standalone unsubscribe flow before any email has been sent, but the lead-capture data model should be ready for it with fields such as `unsubscribed_at` and an unsubscribe token hash. The first outbound Jukkai Update must include an unsubscribe link.

Spam protection should start invisible. V1 should use a honeypot field, server-side rate limiting keyed by IP hash, email normalization and uniqueness, a generic success response for duplicate submissions, body-size limits, and a CORS/origin allowlist for Jukkai Pages domains. Duplicate submissions should not reveal that an email already exists; keep one canonical row and optionally update `last_seen_at`. Add Cloudflare Turnstile only if abuse appears or the lead-capture endpoint becomes valuable enough to attract it.

Production observability should be wired from the first backend release, but only at the minimum useful level: `service=jukkai-api`, `env=prod`, `/healthz`, structured lead-capture success/failure logs, container-up alerting, 5xx-rate alerting, an external uptime check for `https://api.jukkai.fr/healthz`, and deploy annotations on promotion. Add deeper dashboards, tracing, staging alerts, or product analytics only when the backend grows beyond the teaser lead-capture slice.

Guard against forgotten "good enough for now" decisions with explicit upgrade triggers rather than premature infrastructure. Revisit staging and deeper observability when the backend stores more than low-risk leads, migrations can reshape meaningful production data, preview frontend branches need a deployed API, someone else depends on the live API during development, or local verification stops representing production behavior. The staging trigger checkpoint is tracked in GitHub issue #16.

Production promotion should have one boring default command rather than requiring operators to remember a pile of flags. The default should encode the normal teaser path: run checks, show the release diff, promote `launch/teaser` to `production`, then verify Cloudflare Pages and the Coolify API. Less common overrides may exist, but they should not be part of the normal command Martin has to remember. The first version should be an interactive checklist script with one explicit confirmation, not a full TUI; build a TUI only if promotion grows into a multi-step workflow that needs live panes or selectable targets. The promotion checklist is tracked in GitHub issue #17.

The Jukkai Proper promotion script should be tracked in this repo because it is product release logic, not private workstation state. Secrets, tokens, and machine-local settings stay outside git in files such as `~/.config/jukkai-promote.env`. The old infra-repo promotion script remains a reference for archived Atelier but should not be the canonical command for Jukkai Proper.

Secrets follow the runtime that uses them. API runtime secrets, `DATABASE_URL`, and future mail-provider keys live in Coolify environment variables. Cloudflare Pages settings and any Pages build-time variables live in Cloudflare. Promotion tokens, such as Coolify API and Grafana annotation credentials, live on the operator machine in `~/.config/jukkai-promote.env`. The repo may contain `.env.example` and docs that name required variables, but never real secrets.

Promotion verification should check the whole live slice, not only the surface that changed. `bun run promote` should verify the Cloudflare Pages site at `https://jukkai.fr` and the API health endpoint at `https://api.jukkai.fr/healthz`, including an expected commit or version marker. The static site should expose `/version.json`, and the API health response should include service, environment, commit, and build time metadata so the script can prove the live surfaces match the promoted commit.

Cloudflare Pages may create preview deployments for `main`, `launch/teaser`, and feature branches while visual direction is still moving quickly. Production remains limited to `production`. Notifications should be loud for `main`, `production`, and release branches such as `launch/teaser`, but quiet for ordinary feature-branch previews when the platform makes that practical.

Create the `production` branch early so protection and promotion tooling can be tested, but only point Cloudflare Pages and the Coolify API service at it when the deploy targets are ready. The intended order:

1. Create `production` from `main` or the first teaser baseline.
2. Protect `production`.
3. Build `launch/teaser`.
4. Configure Cloudflare Pages with production branch `production`.
5. Configure the Coolify API service with branch `production`.
6. Run the first real promotion through the script.
