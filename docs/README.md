# Documentation

**Status:** current documentation map. **Owns:** reading routes and document roles.
**Last reviewed:** 2026-10-08. **Revisit when:** a document moves or its role changes.

Read the route for your task, then follow specific links. Do not bulk-load folders
or historical material.

| I am working on…                          | Start here                                                 | Read next when needed                                                      |
| ----------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| What to work on now                       | [Current delivery](operations/current-delivery.md)         | The relevant GitHub issue                                                  |
| Business facts, offers or public claims   | [Foundation](strategy/foundation.md)                       | [Questions for Crystelle](strategy/questions-for-crystelle.md)             |
| A website page: its job, proof and gaps   | [Site page files](site/README.md)                          | The page's own file, then the evidence it links                            |
| Earlier website proposals and draft copy  | [Website working notes](working-notes/website/README.md)   | [Old-site crawl](reference/studioterrasson/index.md) for existing material |
| SEO research and evidence                 | [SEO research log](research/seo-research-log.md)           | The specific run it links to                                               |
| Mail and calendar transition              | [Mail setup](operations/mail.md)                           | [Migration runbook](operations/mail-migration-runbook.md)                  |
| Release and production                    | [Production](operations/production.md)                     | [CI](operations/ci.md)                                                     |
| Contact details or portrait               | [Contact-card guide](operations/crystelle-contact-card.md) |                                                                            |
| Fonts                                     | [Fonts](operations/fonts.md)                               | [ADR-0003](adr/0003-build-time-generated-font-assets.md)                   |
| Architecture or durable technical choices | [ADRs](adr/)                                               | [Domain guidance](agents/domain.md)                                        |

## Folders and authority

| Location         | Owns                                                       | Boundary                                                     |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| `strategy/`      | Business facts, brand, public claims, open business inputs | The foundation wins over any other document on these.        |
| `site/`          | The target sitemap: one file per page, its job and gaps    | Pages own their copy; files link evidence, never restate it. |
| `operations/`    | Current delivery and maintained procedures                 | Check live state before claiming it matches a guide.         |
| `adr/`           | Durable technical decisions                                | Inactive decisions stay numbered and findable.               |
| `agents/`        | Issue tracker, labels and domain-doc conventions           | Root `AGENTS.md` is the entry point.                         |
| `research/`      | SEO evidence, synthesis and imported interviews or audits  | Findings do not approve pages, offers or designs.            |
| `working-notes/` | Proposals, drafts and meeting notes                        | A draft does not become canonical by being newer or longer.  |
| `reference/`     | Dated captures such as the old-site crawl                  | Evidence about the source, not current Jukkai facts.         |
| `archive/`       | Superseded work, kept for the SEO restructuring session    | Open only when asked; nothing here is a current requirement. |

[Method](operations/method.md) explains how observations, proposals and decisions
are kept apart. The `.agents/product-marketing.md` adapter is generated from the
foundation; edit the foundation, not the adapter.

## Keeping docs useful

- Prefer updating the document that owns a subject over adding a new file.
- Keep files short: link evidence instead of restating it.
- When something is accepted, update its owner and retire the competing draft.
