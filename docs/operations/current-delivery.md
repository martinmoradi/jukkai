# Current delivery: magazine release and October transition

Status: current delivery direction, confirmed with Martin on 2026-09-07.
This file owns delivery scope and timing. Business truth stays in
[the foundation](../strategy/foundation.md); open decisions and execution work
live on GitHub. It is not a finished sitemap or an approved visual design.

## Confirmed direction

- Jukkai by Crystelle Terrasson is the settled public brand. Do not reopen the
  name while investigating Google's profile-update procedure.
- Crystelle and the practice have just moved and already receive clients at the
  new Châteaugiron office. Leads normally call first. Updating older address
  references is planned transition work, not an emergency in Martin's assessment.
- The official Jukkai opening is October 2026. This differs from the practice's
  move, which has already happened. Do not infer public Galerie hours or walk-in
  availability from the practice receiving architecture clients.
- The magazine is expected in about a week from September 7. The exact publication
  date is still to confirm; do not turn September 14 into a contractual deadline.
  Its ad points to `jukkai.fr`: [print PDF](../../brand/ad/jukkai-adele-chandelle.pdf).
- The first website must explain Jukkai and feel like an upgrade over Studio
  Terrasson in design and content. Publish a useful, polished first version and
  expand it through subsequent sprints. There is no teaser or final completion date.
- Full-stack work is outside the foreseeable scope: no API, database, Portal,
  custom publishing platform, or Jukkai Updates backend is a release prerequisite.

## Two milestones, with a separate migration decision

**Magazine release:** a beautiful homepage explaining Jukkai, a useful contact
route, and working production wiring. A separate general contact page is Martin's
working preference, not a settled sitemap. The existing Contact Card Page must
work with the homepage; it is not automatically the general contact page.

**Toward October:** add content, organise SEO work, and prepare a careful Studio
Terrasson / Google Business Profile transition. The old website initially remains
available with a banner inviting visitors to Jukkai. Banner wording is not approved
copy yet. Do not deploy a blanket redirect or Search Console domain move merely
because the magazine website is ready. Migration timing and the URL map remain open.

## Content and design

Martin expects a selected set of interior-design images and plans to photograph
newly received artworks this week. These are expected inputs, not an approved asset
inventory. Good finished-Galerie photography is currently lacking. Do not make a
photographic Galerie hero, complete portfolio, or complete future sitemap mandatory.

Extra pages may be worthwhile when their facts, images, copy and review are ready.
Cheap code generation alone does not establish readiness. Page count, navigation,
contact mechanics, image selection, exact copy and visual direction remain decisions
for Martin. Do not promote old visual studies or agent proposals to approved design.

## Research remains useful

Martin wants organised SEO research to help plan the sitemap and copy. Keep it
active and bounded by the decisions it informs; exhaustive research is not a global
prerequisite to design or implementation. The website model can extend beyond the
pages chosen for the first release.

The local Claude SEO workspace is `/home/martin/src/pro/seo`. It has a July 12
Studio Terrasson audit with saved evidence and recorded successful API runs.
Configuration checks passed on September 7; current live API access was not tested
in this reset. Its Claude-specific tooling is not automatically available to Codex.
Read that workspace's instructions before running it. Existing audits are evidence
and agent analysis, not accepted Jukkai strategy. Scope fresh calls by question,
expected output and cost; avoid repeating setup or a whole audit by default.

## Release verification

Retain the current Astro, Bun, CI, fonts and static-image tooling. Work through
branches and PRs. Production remains a deliberate promotion from integration
`main` to the protected `production` release pointer on Cloudflare Pages.

The go-live ticket owns current verification: inspect existing configuration first;
verify the approved homepage/contact experience, domains and redirects, real fonts,
mobile behavior, metadata/indexing choices, and one production analytics beacon.
The locked `/c/crystelle` pointer, real iPhone/Android contact import, and actual
analytics collection remain release checks. Local passing tests do not prove them.
Do not require an API health probe or new promotion framework for this static release.

## Decision ownership and next work

- **Settled by Martin:** the direction and business facts above, staged delivery,
  the old-site banner bridge, and care for search/profile continuity.
- **Working preference:** homepage plus a general contact page for the magazine.
- **Open:** exact release pages/content/design, focused research scope and output,
  added-page priorities, banner wording, migration timing, and profile procedure.
- **Externally governed:** Google rebranding eligibility, profile verification and
  review handling. Investigate them without treating the brand name as undecided
  or guaranteeing rankings/review transfer.
- **Agent recommendation:** use a small release/later sitemap and section briefs
  to connect research to copy and design. This format is not a settled requirement.

The active [Wayfinder map](https://github.com/martinmoradi/jukkai/issues/84)
indexes decision tickets. Implementation tickets remain separate handoffs with
explicit acceptance criteria. A completed decision does not claim a deployed result.
