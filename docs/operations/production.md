# Production delivery

**Status:** release configuration in progress under [#103](https://github.com/martinmoradi/jukkai/issues/103).
**Owns:** Cloudflare Pages settings, promotion procedure and release evidence.
**Last reviewed:** 2026-09-15, initial configuration and local candidate verification.
**Revisit when:** deployment settings, branch protections, domains or analytics change.

## Release contract

Follow [ADR-0001](../adr/0001-manual-production-promotion.md). Changes reach `main`
through PRs. A supervised promotion moves `production` to an explicitly verified
commit already on `main`; it does not merge a separate production code history.
The magazine edition has `/`, `/contact/` and `/contact/crystelle/`.
The permanent printed `/c/crystelle` pointer redirects to the Contact Card Page.

## Cloudflare settings

The `jukkai` Pages project and `jukkai.fr` zone belong to Crystelle's account
(`1a6c1fb83ccc08dee35d2b11f1a67ac2`). The zone ID is
`7e87b78a8ca8b3e4bf328f2cb4573729`.

| Setting                   | Value                                                          |
| ------------------------- | -------------------------------------------------------------- |
| Git repository            | `martinmoradi/jukkai`                                          |
| Production branch         | `production`                                                   |
| Preview branches          | All non-production branches, including `main`                  |
| Root directory            | Repository root                                                |
| Build command             | `bun run fonts:prefetch && bun run --cwd apps/marketing build` |
| Output directory          | `apps/marketing/dist`                                          |
| Bun                       | `BUN_VERSION=1.3.14`                                           |
| Node                      | `NODE_VERSION=24.15.0`                                         |
| Intended production host  | `jukkai.fr`                                                    |
| Intended integration host | `preview.jukkai.fr`, targeting `main.jukkai.pages.dev`         |
| Intended www behavior     | Redirect to HTTPS apex, retaining path and query               |

Both build environments need `MM_FONTS_SERVICE_URL`, `MM_FONTS_FETCH_TOKEN`,
`MM_FONTS_ACCESS_CLIENT_ID` and `MM_FONTS_ACCESS_CLIENT_SECRET`. Store credential
values as encrypted Pages secrets. Their canonical local sources and rotation
procedure are in [fonts](fonts.md); never record values in Git or build logs.
Set selection is code-owned (`jukkai-starter@4`), not an environment override.

Only production receives `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`. The existing zone
Web Analytics site uses manual installation (`auto_install=false`); leave Pages
automatic analytics injection off too. Follow [ADR-0006](../adr/0006-cookieless-first-party-analytics.md).

## Promotion procedure

1. Fetch current refs and inspect the working tree, branch protection and Pages
   settings. Select an explicit candidate SHA on `origin/main` and record the
   previous production SHA and deployment ID.
2. Verify that exact candidate with `bun run check`, the real font prefetch and
   marketing build. Review its deployed preview, including responsive behavior,
   metadata, links, images and same-origin fonts. Previews must omit the production
   beacon and have `X-Robots-Tag: noindex`.
3. Under Martin's release authorization, move `production` to the candidate with
   a normal fast-forward push. Never force-push `main` or `production`. If the
   candidate is not a descendant of the release pointer, stop and investigate.
4. Inspect the Pages production deployment's commit, build logs and successful
   deploy stage. Verify the custom domain serves that deployment, not merely a
   successful response from another build.
5. Check HTTPS apex, www and HTTP redirects, contact links, printed pointer,
   vCard MIME, sitemap membership, same-origin assets and one working analytics
   beacon. Confirm production data in Web Analytics.
6. Record commit, deployment ID, URLs, checks and remaining human verification.
   Native phone import belongs to [#102](https://github.com/martinmoradi/jukkai/issues/102).

For an incident after a successful release, use Cloudflare Pages rollback to the
recorded previous successful production deployment. Record that the served
version then differs from the Git pointer; repair through `main` and promote a
new descendant. The first release has no previous production deployment to roll
back to.

Do not change Studio Terrasson, mail, tunnel services or Business Profile settings
as a side effect of publishing the magazine website.

## First release evidence

Candidate: `5ec5748cf6e5530879ec45d361e946d81f6e2760`.

- Fresh worktree install with Bun 1.3.14 and Node 26.8.2 succeeded.
- `bun run check` passed: 10 script tests and 56 app tests. App lint/typecheck/test
  results came from matching Turbo worktree-cache entries.
- Real font prefetch and static marketing build succeeded. Generated manifest:
  `jukkai-starter@4`, 32 fonts, snapshot digest
  `4619e572a4d3589cce7753f46dacc5e2f76ce24a61deff42f5cd5650f21c0e80`.
- Local dev browser loaded Voyage, Hatton, Frama and Frama Text from local generated
  URLs; no production beacon was present.
- Deployed candidate, domain/TLS, production promotion, collection and real-phone
  results remain pending until recorded below.
