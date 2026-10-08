# Site page files

**Status:** current. **Owns:** the target sitemap: one file per page, each holding
why the page exists, what it must prove and what is still missing.
**Last reviewed:** 2026-10-08, created for [#141](https://github.com/martinmoradi/jukkai/issues/141).
**Revisit when:** a session ticket closes, a page ships or a page is added or dropped.

The destination of the [sessions-driven site map](https://github.com/martinmoradi/jukkai/issues/139).
Every page here is either live or tied to a ticket that will ship it.

## Rules

- **The file owns the why and the gaps; the page owns the copy.** Draft French lives
  in the page or its preview branch, not here.
- **Link evidence, never restate it.** Business facts and claims live in the
  [foundation](../strategy/foundation.md); research in the
  [SEO log](../research/seo-research-log.md) and the
  [carry-over inventory](../research/carry-over-proof.md).
- **Nothing private.** This repo is public. Segments appear only by their site job
  and fee-to-effort economics: fees are a percentage of works, while effort follows
  complexity and client involvement.
- **One screen per file.** If a file grows past that, split a section into its own file.

## Segments

Settled by Martin on 2026-10-08 (see the map):

| Segment                                    | The site's job                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------- |
| Ceiling: B2B and higher-budget residential | Attract and reassure with responsibility proof and projects                           |
| Mid-budget full missions                   | Welcome, and set budget and fee expectations before the first meeting                 |
| Advice / sourcing                          | Promote as a named, bounded offer, placed after the proof and never as the front door |

## Working principles

**Tentative: Martin, 2026-10-08.** These are a direction, not decisions.

1. **The homepage tells the Jukkai story:** how it came to be and what it does, with
   architecture carried inside it. It is not a catalogue of offers. It may get its
   own grilling session.
2. **Every other page answers one visitor question,** written for that visitor and
   for search together.
3. **Projects get two passes.** [#142](https://github.com/martinmoradi/jukkai/issues/142)
   picks the strongest work; later sessions reframe each project as a case study
   answering a visitor question.

Settled in the map: Jukkai shows its curated past projects itself and does not link
back to studioterrasson.fr.

## Status legend

- **live**: published on jukkai.fr (possibly in a weaker form than the target).
- **buildable now**: inputs are settled; waiting only on build work.
- **waiting on #N**: a named ticket supplies the missing decision or content.
- **untracked**: a gap no ticket owns yet.

## Page tree

| File                                                           | Page                    | Status                                                                                                                               |
| -------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [home](home.md)                                                | `/`                     | live (magazine edition); target story **untracked**                                                                                  |
| [architecture](architecture/index.md)                          | Architecture intérieure | waiting on [#142](https://github.com/martinmoradi/jukkai/issues/142)                                                                 |
| · [missions](architecture/missions.md)                         | section                 | buildable now, in #142's slice                                                                                                       |
| · [budget et honoraires](architecture/budget-et-honoraires.md) | section                 | fee basis buildable now; budget story waiting on [#146](https://github.com/martinmoradi/jukkai/issues/146)                           |
| · [conseil / mission déco](architecture/conseil.md)            | section                 | waiting on [#145](https://github.com/martinmoradi/jukkai/issues/145)                                                                 |
| [espaces professionnels](espaces-professionnels.md)            | page or section         | waiting on [#147](https://github.com/martinmoradi/jukkai/issues/147), then [#148](https://github.com/martinmoradi/jukkai/issues/148) |
| [projets](projets/index.md)                                    | project stories         | selection waiting on #142                                                                                                            |
| · [Le Capri](projets/le-capri.md)                              | project story           | waiting on [#149](https://github.com/martinmoradi/jukkai/issues/149)                                                                 |
| [galerie](galerie.md)                                          | `/galerie/` (proposed)  | live as homepage content; page waiting on [#150](https://github.com/martinmoradi/jukkai/issues/150)                                  |
| [contact](contact.md)                                          | `/contact/`             | live                                                                                                                                 |

**Outside these files:** Crystelle's Contact Card Page (`/contact/crystelle/`, live)
follows the [contact-card guide](../operations/crystelle-contact-card.md). The site has
no legal notice (mentions légales) page yet, and no ticket owns one: **untracked**.

## File template

Each page file has a status line (status, URL, last reviewed) and these sections:
**Goal and segment**, **Visitor question**, **What it must prove**, **Evidence**
(links only), **Constraints** (claims canon, proof rules), **Open gaps** (each with
its owner: Martin, a ticket or a session). Project files add **Questions it can
answer**: the visitor's question and the search question.
