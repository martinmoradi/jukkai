# Current delivery: October transition

**Status:** current. **Owns:** what is being worked on now and why.
**Last reviewed:** 2026-10-08 with Martin, after charting the sessions-driven site map.
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
- The Galerie is open but still settling in (Martin, 2026-10-08): artworks are
  installed, Crystelle is starting Saturdays, and full swing is a few weeks away.
  Hours are not confirmed. Martin: the Galerie opens on 2026-10-09. The live site
  still says it opens in October 2026; the fix ships with the MVP release.
- The SEO research is done and was presented to Crystelle on 2026-10-01
  ([package](../working-notes/website/research-presentation-production.md)).

## Tracks

### 1. Studio Terrasson bridge (hot)

Jukkai visitors should understand the interior-architecture practice, and Studio
Terrasson visitors should find Jukkai.

- **Jukkai:** a dedicated interior-design page and a curated set of past projects
  (réalisations), shown on Jukkai itself rather than linked back to
  studioterrasson.fr. Crystelle asked for interior design on Jukkai; prestations is
  the old page her clients praise. Shaped in [#142](https://github.com/martinmoradi/jukkai/issues/142),
  built in [#155](https://github.com/martinmoradi/jukkai/issues/155), aiming at an
  MVP release that also fixes the stale Galerie opening copy.
- **Studio Terrasson:** at least a banner, current contact details and a section
  pointing to Jukkai. Scope and method are decided in
  [#143](https://github.com/martinmoradi/jukkai/issues/143); the 2026-10-08 full
  backup satisfies its backup requirement (Martin).
- **Later:** redirects, Search Console move and Google Business Profile changes.
  These need their own decision once Jukkai can stand in for the old site.

Describe a continuation and expansion of Studio Terrasson, not a closed practice.

### 2. Mail and calendar transition (hot)

Move Crystelle and Laura from Studio Terrasson to Jukkai addresses without losing
correspondence. The [5 October meeting notes](../working-notes/mail-calendar-meeting-2026-10-05.md)
are the brief. The 2026-10-07 design session produced a proposed
[setup](mail.md) and [migration runbook](mail-migration-runbook.md) (#136): Martin
prepares remotely, then one office day switches mail, devices and calendar sync.
Replacing Karlia is a separate question with no decision.

### 3. Content that converts (paced by Crystelle)

Make the website attract and convert leads across B2B, low-commitment B2C,
higher-commitment B2C and specialised work such as restaurants and professional
spaces. Martin runs bounded working sessions with Crystelle, using the research to
ask sharp business questions (pricing, reaching people who do not yet know they
need an interior architect). The [sessions-driven site map](https://github.com/martinmoradi/jukkai/issues/139)
runs this track: [page files](../site/README.md) say what each page needs, and
one ticket per session ships a page, aiming for about 48 h from session to online.

### Also this week

A new print campaign; its scope has not been discussed yet.

## Decision status

- **Settled by Martin:** the three tracks and their priority; the magazine edition
  is the live baseline; tracks 1 and 2 are urgent.
- **Agent recommendation, not confirmed:** ship the bridge (track 1) before any
  standalone interior-architecture site, because content decisions, not code, are
  the bottleneck and they belong to track 3.
- **Settled by Martin (2026-10-08):** research reaches Crystelle through the
  sessions in map #139.
- **Open:** Studio Terrasson edit scope and method (#143), migration timing and
  mail address format.

## Constraints that still hold

- `https://jukkai.fr/c/crystelle` is printed and locked; only its target may change.
- Production is a deliberate promotion from `main`; see [production](production.md).
- No API, database or portal is in scope. A lightweight CRM or portal is a later idea.
