# Current delivery: October transition

**Status:** current. **Owns:** what is being worked on now and why.
**Last reviewed:** 2026-10-07 with Martin, after closing the September issues.
**Revisit when:** a track below ships, changes priority or gains a decision.

Business facts stay in [the foundation](../strategy/foundation.md); open work and
decisions live in GitHub issues.

## Where things stand

- **jukkai.fr is live** since 2026-09-15: `/`, `/contact/` and Crystelle's Contact
  Card Page. It was a quick sprint so magazine readers in mid-September found
  something; "magazine edition" in code and docs means this live version. It is
  centred on the Galerie and barely presents interior architecture.
- **studioterrasson.fr is still live** (WordPress with Elementor) and nothing on it
  points to Jukkai.
- Crystelle now promotes Jukkai and is uncomfortable that it does not show the
  interior-architecture side. She accepts older material being shown for now.
- Jukkai's official opening is October 2026; no exact day or public hours are given.
- The SEO research is done and was presented to Crystelle on 2026-10-01
  ([package](../working-notes/website/research-presentation-production.md)).

## Tracks

### 1. Studio Terrasson bridge (hot)

Jukkai visitors should understand the interior-architecture practice, and Studio
Terrasson visitors should find Jukkai.

- **Jukkai:** an interior-architecture section on the landing page, built from
  existing material ([Architecture draft](../working-notes/website/architecture-page-draft-fr.md),
  [old-site crawl](../reference/studioterrasson/index.md)), linking to
  studioterrasson.fr for the portfolio in the meantime.
- **Studio Terrasson:** at least a banner, current contact details and a section
  pointing to Jukkai. Exact scope and whether to edit by hand or through an
  Elementor MCP are open. Back the site up before editing.
- **Later:** redirects, Search Console move and Google Business Profile changes.
  These need their own decision once Jukkai can stand in for the old site.

Describe a continuation and expansion of Studio Terrasson, not a closed practice.

### 2. Mail and calendar transition (hot)

Move Crystelle and Laura from Studio Terrasson to Jukkai addresses without losing
correspondence. The [5 October meeting notes](../working-notes/mail-calendar-meeting-2026-10-05.md)
are the brief. Next: a design session that produces a setup and migration proposal.
Replacing Karlia is a separate question with no decision.

### 3. Content that converts (paced by Crystelle)

Make the website attract and convert leads across B2B, low-commitment B2C,
higher-commitment B2C and specialised work such as restaurants and professional
spaces. Martin runs bounded working sessions with Crystelle, using the research to
ask sharp business questions (pricing, reaching people who do not yet know they
need an interior architect). First step: structure the research into session
briefs. Until then, the [SEO log](../research/seo-research-log.md) and
[website working notes](../working-notes/website/README.md) hold the material as is.

### Also this week

A new print campaign; its scope has not been discussed yet.

## Decision status

- **Settled by Martin:** the three tracks and their priority; the magazine edition
  is the live baseline; tracks 1 and 2 are urgent.
- **Agent recommendation, not confirmed:** ship the bridge (track 1) before any
  standalone interior-architecture site, because content decisions, not code, are
  the bottleneck and they belong to track 3.
- **Open:** Studio Terrasson edit scope and method, migration timing, mail address
  format, and how research becomes session briefs.

## Constraints that still hold

- `https://jukkai.fr/c/crystelle` is printed and locked; only its target may change.
- Production is a deliberate promotion from `main`; see [production](production.md).
- No API, database or portal is in scope. A lightweight CRM or portal is a later idea.
