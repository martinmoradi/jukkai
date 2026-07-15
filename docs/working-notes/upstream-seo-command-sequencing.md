# Upstream Claude SEO commands — parked sequencing note

**Status:** parked working note; useful when the external SEO investigation
resumes, but not a current workstream  
**Authority:** research support only; not Jukkai strategy, an approved run plan,
or an instruction to spend credits  
**Checked:** 2026-07-12  
**Primary source:** upstream `COMMANDS.md` at commit
[`6cf1ea9`](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md)

## What the upstream reference explicitly provides

- `/seo dataforseo serp <keyword>` retrieves organic SERPs. The same command
  family exposes keyword ideas, volume, difficulty, intent and trends, plus
  domain competitors, ranked keywords, intersections, traffic estimates,
  subdomains and top searches. These are the direct external-market surfaces
  that can extend an old-site audit beyond its own pages.
  [Source](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md#L498-L529)
- `/seo local <url>` analyzes GBP signals, NAP consistency, review velocity,
  review responses and sentiment, local schema, business-model factors and map
  pack visibility signals.
  [Source](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md#L281-L296)
- `/seo maps` is the more direct local-observation family: `geogrid`, GBP
  `audit`, `reviews`, and radius-based `competitors`. The reference describes a
  typical geo-grid as 49 points and competitor discovery as radius-configurable.
  [Source](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md#L300-L316)
- `/seo cluster <seed-keyword>` expands one seed to 50–200 candidates, compares
  pairwise SERP overlap, classifies cluster intent, and proposes hub-and-spoke
  architecture, links, and a visualization.
  [Source](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md#L341-L356)
- `/seo sxo <url>` works backwards from SERPs to classify page type and test
  SERP-intent/page-type alignment. `/seo backlinks` includes competitor link-gap
  analysis and documents a free-to-paid source cascade ending in DataForSEO.
  [SXO source](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md#L360-L374),
  [backlinks source](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md#L320-L337)
- `/seo plan local` promises a complete strategy, competitive analysis, content
  calendar, four-phase roadmap and site architecture. That makes it a broad
  prescription surface, not a neutral evidence-retrieval command.
  [Source](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md#L201-L217)

## What the reference does **not** establish

`COMMANDS.md` does not document DataForSEO prices, task multiplication, batch
semantics, locale/device/depth parameters, confirmation thresholds, or a
returned-cost log. It also does not say that a generated competitor set,
keyword cluster, intent label, content architecture, or local score should own
Jukkai's strategy. It is therefore a command catalog, not a sufficient paid-run
manifest or evidence-quality contract.

## Recommended order — interpretation, not upstream instruction

1. **Calibrate a small localized SERP corpus.** Run a few intentionally chosen
   Rennes queries that represent different plausible needs. The output is a
   stable query list plus observed result types, local-pack presence and
   recurring domains—not a final keyword strategy.
2. **Resolve local identity before spatial measurement.** Use the GBP audit and
   review surfaces, then one center-point Maps observation. Confirm that the
   profile being measured is actually the intended business.
3. **Pilot one small geo-grid.** Because the documented typical grid already
   means 49 observations, first price and test the smallest supported grid for
   one validated query. Expand grid size or query count only when the pilot
   produces interpretable evidence.
4. **Build the competitor set from observed SERPs and Maps.** Apply radius-based
   Maps competitors and DataForSEO domain commands to domains that recur in the
   calibrated evidence. Keep local-search competitors distinct from design,
   editorial and commercial comparators.
5. **Deepen selected competitors.** Use ranked terms, traffic estimates,
   intersections, backlinks and representative page analysis only for a bounded
   shortlist. These outputs are vendor observations or estimates, not access to
   competitors' analytics.
6. **Expand keywords in batches after the corpus is grounded.** Use ideas,
   volume, difficulty, intent and trends to test vocabulary found in the SERPs,
   Maps, old-site audit and business conversations.
7. **Delay `/seo cluster`.** Its 50–200-keyword expansion plus pairwise SERP
   comparison makes it a synthesis-stage instrument. Running it before seeds
   and local intent are calibrated risks paying to turn an arbitrary seed into
   a persuasive but premature site architecture.
8. **Use SXO and briefs only after candidate page jobs exist.** At that point
   SERP/page-type fit can challenge a page hypothesis without silently creating
   the hypothesis. Defer `/seo plan local` for the same reason as clustering:
   it generates strategy and architecture rather than merely retrieving
   evidence.

## Cost-control gate for each paid step — Jukkai run discipline

Before execution, record the exact command/tool, query or domain list,
geography, language, device, result depth, grid dimensions, number of expected
tasks, current provider estimate, maximum acceptable spend, and stop rule. Save
raw responses and returned costs separately from interpretations. If the
installed tool schema cannot expose enough information to estimate task count
and cost, stop and inspect the implementation/provider calculator before
running it.

The key expansion multipliers to price independently are:

- SERP queries × locations × devices × depths;
- geo-grid points × keywords × repeat dates;
- candidate keywords × SERP comparisons for clustering;
- competitor domains × requested datasets.

This sequencing complements the broader
[capability map](../research/claude-seo-capability-map.md); it does not replace its
provenance contract or promote upstream-generated prescriptions into Jukkai
canon.
