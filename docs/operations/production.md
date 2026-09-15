# Production delivery

**Status:** first production release live; remaining native iPhone verification is tracked in [#102](https://github.com/martinmoradi/jukkai/issues/102).
**Owns:** Cloudflare Pages settings, promotion procedure and release evidence.
**Last reviewed:** 2026-09-15, live Pages deployment, domains, fonts, analytics and Android report.
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

| Setting           | Value                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| Git repository    | `martinmoradi/jukkai`                                                                           |
| Production branch | `production`                                                                                    |
| Preview branches  | All non-production branches, including `main`                                                   |
| Root directory    | Repository root                                                                                 |
| Build command     | `bun install --frozen-lockfile && bun run fonts:prefetch && bun run --cwd apps/marketing build` |
| Output directory  | `apps/marketing/dist`                                                                           |
| Bun               | `BUN_VERSION=1.3.14`                                                                            |
| Node              | `NODE_VERSION=24.15.0`                                                                          |
| Production host   | `jukkai.fr`                                                                                     |
| Integration host  | `preview.jukkai.fr`, targeting `main.jukkai.pages.dev`                                          |
| www behavior      | Redirect to HTTPS apex, retaining path and query                                                |

Both build environments need `MM_FONTS_SERVICE_URL`, `MM_FONTS_FETCH_TOKEN`,
`MM_FONTS_ACCESS_CLIENT_ID` and `MM_FONTS_ACCESS_CLIENT_SECRET`. Store credential
values as encrypted Pages secrets. Their canonical local sources and rotation
procedure are in [fonts](fonts.md); never record values in Git or build logs.
Set selection is code-owned (`jukkai-starter@4`), not an environment override.

Only production receives `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`. The existing zone
Web Analytics site uses manual installation (`auto_install=false`, zone RUM status
`manual`); leave Pages automatic analytics injection off too. Follow [ADR-0006](../adr/0006-cookieless-first-party-analytics.md).

Both environments use Pages build image v3. Dependency installation is explicit:
the initial Pages build fetched fonts but skipped package installation, leaving
`astro` unavailable. Keep `bun install --frozen-lockfile` in the build command.

The `production` branch has two active GitHub rulesets. Integrity rules block
deletion and non-fast-forward updates and require linear history, with no bypass.
A separate operator ruleset restricts branch creation and updates to repository
administrators. `main` retains its existing PR and `ci / required` protections.

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

### Deployed result

- Production deployment: `2b331bbf-d178-4ed0-8a0c-b386e35641fc`, successful at
  2026-09-15 10:15:51 UTC (12:15 Paris), triggered by creation of `production` at
  the candidate SHA. Pages' canonical deployment and Git release pointer both
  identify this exact commit.
- Verified main preview: `7695e9a4-3aaf-448a-a31a-1bd6acf07e63`, same commit.
- [Production](https://jukkai.fr/) and [integration preview](https://preview.jukkai.fr/)
  are active Pages custom domains with verified HTTPS. Apex and www DNS are
  proxied CNAMEs to `jukkai.pages.dev`; preview is a proxied CNAME to
  `main.jukkai.pages.dev`.
- `www` is a redirect-only hostname using the zone's HTTPS certificate and Single
  Redirect rule; it does not need a separate Pages custom-domain binding. Its
  initial Pages binding was removed because the redirect intercepted domain
  validation. HTTP apex and HTTP/HTTPS www return 301 to HTTPS apex while retaining
  path/query. Existing mail and tunnel DNS records were preserved.
- Homepage, general contact, Contact Card Page, vCard, sitemap and generated font
  manifest return 200. `/c/crystelle` returns 302 to `/contact/crystelle/`;
  the vCard has `text/vcard; charset=utf-8`.
- Homepage/contact canonical URLs use the HTTPS apex and are indexable. Sitemap
  contains only `/` and `/contact/`. The card has `noindex, follow`.
- Deployed homepage/contact smoke checks passed at 390×844 and 1440×900, with
  matching document/viewport width, loaded fonts and no failed requested images
  or JavaScript errors. All 18 contact-card layout checks passed against the
  deployed candidate. Browser calls, email and internal contact links were checked.
- Production manifest matches the same Set/version/count/digest as the fresh local
  build. Browser font requests use Jukkai's origin; sampled font bytes have a
  genuine `wOF2` signature and match the expected generated asset path.
- Local and Pages build logs prove real prefetch. Credential values were copied
  directly from local secret files to encrypted Pages build variables and were
  not printed. The ungranted probe slug `jukkai-release-authorization-probe`
  returned HTTP 403 with `Fetch token cannot access this Set.` through the same
  authenticated Bun fetch path. This proves rejection of that slug; it is not
  an inventory of other Sets or a full authorization audit.

### Analytics and indexing verification

Cloudflare Web Analytics site tag: `c43db72ac7f94f2498ccd635f6308d2c`.
The token is intentionally omitted from this document; its value is public in
production page source and configured only in the production build environment.

The first browser pass exposed duplicate injection even after `auto_install=false`.
The old wildcard injection rule was paused and the zone RUM switch was disabled;
after configuration propagation, the zone reports `manual`. The final fresh-browser
check saw one explicit production beacon, successful 204 measurement requests, and
zero beacons on `preview.jukkai.fr`. Verify rendered browser results after changes;
an API setting alone is insufficient.

The custom preview hostname did not inherit Pages' default preview `noindex`
header. A zone response-header rule now sets `X-Robots-Tag: noindex` only for
`preview.jukkai.fr`. Native deployment/branch URLs retain Pages' default header.

The GraphQL `rumPageloadEventsAdaptiveGroups` dataset returned production-host
records for `/contact/crystelle/` and `/contact/` in the 10:20–10:30 UTC verification
window. These are operator-generated test page views, not customer traffic,
QR-scan counts or successful-import analytics. Always filter by `requestHost:
"jukkai.fr"`; initial setup also generated a `jukkai.pages.dev` test view.

Relevant zone rule IDs:

- Canonical redirects ruleset: `dfd12cc6f2374b579c4cadf0f09e765c`.
- Preview noindex ruleset: `e106051a84cb422d93a0fd775c012a5b`.
- Paused legacy analytics injection rule:
  `d2d2a314-935c-4b8b-83bc-130c61258d55` in ruleset
  `5b5a4b40-9fd7-4fa1-b2b1-345d76859680`.
- GitHub production integrity ruleset: `23433876`; administrator promotion
  ruleset: `23433877`.

### Human verification and remaining limits

Martin reported successful Android use of the live card: the browser downloads
its `.vcf`, then opening it in Contacts shows all fields correctly. Device model,
OS and browser version were not supplied; the report does not establish one-tap
native import or independently verify a physical printed scan.

Real iPhone import and a recorded physical printed-QR scan remain open in #102.
Keep #103 open until its remaining linked human verification is recorded. The
website is already live; no deployment, build or DNS step is waiting on those
reports. No Google indexing result or domain-migration outcome is claimed.
