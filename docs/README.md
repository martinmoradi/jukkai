# Documentation

**Status:** current documentation map. **Owns:** reading routes, document roles
and maintenance rules. **Last reviewed:** 2026-09-10 for organization and authority;
this is not a fresh verification of every business fact or technical guide.
**Revisit when:** a document moves, a working proposal is accepted, or delivery changes.

## Start with the task

Read the relevant route, then follow specific evidence links. Do not load the
whole folder or historical material for routine orientation.

| I am working on…                                | Start here                                                                            | Read next when needed                                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Delivery or release scope                       | [Current delivery](operations/current-delivery.md)                                    | The relevant implementation issue and [CI](operations/ci.md)                                                             |
| Business facts, offers or public claims         | [Foundation](strategy/foundation.md)                                                  | [Unresolved inputs](strategy/questions-for-crystelle.md)                                                                 |
| Planning or design decisions                    | [Current delivery](operations/current-delivery.md) and [method](operations/method.md) | The relevant decision in the [Wayfinder map](https://github.com/martinmoradi/jukkai/issues/84)                           |
| Continuing SEO research                         | [SEO research log](research/seo-research-log.md)                                      | Relevant reviewed runs and saved evidence; [capability map](research/claude-seo-capability-map.md) for command selection |
| Website explanations, page models or draft copy | [Website working notes](working-notes/website/README.md)                              | Visitor brief → working content plan → relevant draft; alternatives and proof notes as needed                            |
| Contact details or portrait                     | [Contact-card guide](operations/crystelle-contact-card.md)                            | The relevant data/assets and release checks                                                                              |
| Technical implementation                        | The relevant [operational guide](#folders-and-authority)                              | [Domain guidance](agents/domain.md) and relevant [ADRs](adr/)                                                            |

## Folders and authority

| Location           | Owns                                                                                  | Boundary                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `strategy/`        | Business facts, brand, public claims and unresolved business inputs                   | Foundation is authoritative within that scope; delivery timing belongs elsewhere.                 |
| `operations/`      | Active delivery scope and maintained procedures                                       | Start with the guide for the actual task; inspect live state before claiming it matches a guide.  |
| `adr/`             | Durable technical decisions and their status                                          | Keep numbered records discoverable, including inactive decisions; inactive does not mean planned. |
| `agents/`          | Agent workflow, domain-doc usage and tracker conventions                              | Root `AGENTS.md` is the agent entry point and points here for detail.                             |
| `research/`        | Reviewed observations, evidence, synthesis and tool capabilities                      | Findings and recommendations do not approve pages, offers or designs.                             |
| `working-notes/`   | Proposals, alternatives and drafts for discussion                                     | A newer or more detailed draft does not become canonical by itself.                               |
| `source-material/` | [Frozen imports from the previous project](source-material/README.md)                 | Historical “decisions” and instructions may be superseded.                                        |
| `reference/`       | Dated captures, such as the [old-site text crawl](reference/studioterrasson/index.md) | Evidence about the captured source, not current Jukkai facts or approved copy.                    |
| `archive/`         | [Superseded work and historical sessions](archive/README.md)                          | Consult intentionally for provenance; do not resume old requirements automatically.               |

Open decisions and implementation acceptance criteria live in GitHub. Once a
decision is accepted, update the document that owns the subject and link the
decision record. A proposal, research result or imported source cannot override
that authority merely because its wording sounds more definite. Surface unresolved
conflicts instead of silently choosing a new business or design direction.

Technical guides currently cover [CI](operations/ci.md),
[fonts](operations/fonts.md) and [Crystelle's contact card](operations/crystelle-contact-card.md).
The foundation's generated `.agents/product-marketing.md` adapter is a derived
view, not a second place to edit business truth.

## Keep docs fresh

- Give new or substantially revised maintained docs a short header: **Status**,
  **Owns** (or purpose), **Last reviewed** with review scope, and **Revisit when**.
  Existing explicit authority headers can serve this purpose without a mechanical rewrite.
- Use **current**, **proposal**, **parked** or **historical** deliberately. A parked
  note needs a reason to resume; a historical note points to its replacement or
  current entry point. ADRs retain their own decision-status vocabulary.
- A review date records what was actually checked. Formatting and relocation do
  not revalidate technical behavior, live services, business facts or old measurements.
  Keep original capture dates and source limitations.
- Update the owning document when a relevant decision, workflow or fact changes.
  Add a new file only when it has a distinct job; use links for shared explanations.
  No periodic paperwork is required merely because a file was written in July.
- When a draft is accepted or superseded, record where the accepted content went
  and retire the competing draft. Preserve useful unresolved alternatives explicitly.
- When moving or splitting files, update inbound links and agent entry points in
  the same change. Preserve useful anchors, source paths and unique evidence;
  label historical imports without rewriting their original claims as current truth.
