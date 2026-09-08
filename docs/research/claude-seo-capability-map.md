# Claude SEO capability map and prompting guide

**Status:** working tool guidance, not approved Jukkai strategy or a queued run plan.

**Updated:** 2026-09-08 against upstream documentation, local plugin source and the
[research log](seo-research-log.md), through reviewed run 18.

## Use this alongside the research log

The log owns accumulated findings, evidence paths, corrections and the next
conversation. This map helps the reviewing agent choose a tool and formulate the
next useful prompt. Read the log first, then consult the relevant row here; do not
restart July's calibration sequence. Research remains bounded by
[current delivery](../operations/current-delivery.md) and
[method](../operations/method.md), with business facts in the
[foundation](../strategy/foundation.md). Neither tool output nor this map approves
pages, offers, copy or migration actions.

Martin runs Claude SEO in `/home/martin/src/pro/seo`, usually in fresh contexts.
His September 8 preference is **native commands with necessary measurement and
scope settings, without loading Jukkai strategy into Claude**. Claude's analysis
is useful input; the Jukkai-aware reviewer interprets saved evidence, compares runs
and discusses implications here. Explain what a proposed query will resolve before
recommending it. Question quality matters more than minimising every API call.

## Documentation and local availability

Sources checked September 8:

- Upstream [Commands Reference](https://github.com/AgriciDaniel/claude-seo/blob/a1480c7e590b16001bd9dc1627eacdcd44d580f9/docs/COMMANDS.md)
  and [DataForSEO extension README](https://github.com/AgriciDaniel/claude-seo/blob/a1480c7e590b16001bd9dc1627eacdcd44d580f9/extensions/dataforseo/README.md),
  pinned to the observed `main` commit `a1480c7e590b16001bd9dc1627eacdcd44d580f9`.
  The [moving command reference](https://github.com/AgriciDaniel/claude-seo/blob/main/docs/COMMANDS.md)
  is the discovery source for later updates.
- Local [workspace instructions](/home/martin/src/pro/seo/AGENTS.md),
  [vendoring notes](/home/martin/src/pro/seo/vendor/claude-seo-marketplace/README.md)
  and [plugin manifest](/home/martin/src/pro/seo/vendor/claude-seo-marketplace/claude-seo/.claude-plugin/plugin.json):
  upstream base **2.2.5**, local manifest **2.2.5-local.1**, with workspace patches
  for MCP access, findings persistence, audit delegation and model/effort settings.
  This replaces the July v2.2.0 baseline; it does not claim local source equals
  current upstream or that a running Claude session has reloaded it.
- The [research log](seo-research-log.md#reviewed-runs) records September 8 use of
  DataForSEO SERPs, keywords, volume, ranked terms, SXO and Google Search Console.
  GA4, Firecrawl and performance smoke records are historical; not every documented
  command has been exercised today. No live API or runtime test was made for this
  documentation refresh.

The upstream `/seo` spelling is shorthand; Martin uses `/claude-seo:seo …`.
Slash commands orchestrate workflows and can make multiple calls. Before using
unfamiliar syntax, inspect the corresponding local skill under
`/home/martin/src/pro/seo/vendor/claude-seo-marketplace/claude-seo/` and the tools
available in that Claude session. These tools are not automatically exposed here.
Do not reinstall working tooling as a research prerequisite. For an actual runtime
problem, `/seo doctor` is diagnostic; `/seo setup` changes the runtime.

## Choose the surface by the question

Commands below follow the two upstream references above. Examples identify the
workflow, not guaranteed endpoint coverage, billing or approved follow-up work.

| Question                                                                  | Relevant native surface                                                                                                                 | What to retain and how to use it                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Which results and discovery surfaces appear for this phrase?              | `/seo dataforseo serp <keyword>`                                                                                                        | Fixed location, language, device and depth; organic URLs, absolute positions and returned Maps, images, PAA and AIO items. A saved SERP is a dated synthetic observation, not a traffic share or ranking explanation.                                                                        |
| What adjacent vocabulary is worth investigating?                          | `/seo dataforseo keywords <seed>`                                                                                                       | Suggestions, ideas and related terms with seeds, limits, totals and dates. Record noise and separately seeded expansions. Exhausting an endpoint result set does not exhaust the topic.                                                                                                      |
| Can a fixed phrase list be compared numerically?                          | `/seo dataforseo volume <keywords>`; `difficulty`, `intent`, `trends` when relevant                                                     | Keep each metric's source and geography separate. Ads competition is not organic difficulty; intent is vendor classification; Trends is relative interest. Missing values and close variants cannot produce a market-size total.                                                             |
| Which pages and terms appear in a domain's indexed footprint?             | `/seo dataforseo ranked <domain>`                                                                                                       | Preserve ranking dates, URLs, organic/local distinctions, limits and vendor estimates. Runs 3 and 14 are reusable examples. A Labs footprint is neither a full site inventory nor current competitor analytics.                                                                              |
| Which domains overlap, or which gaps deserve examination?                 | `/seo dataforseo competitors <domain>`, `intersection <domains>`                                                                        | Start with domains selected for the question. Distinguish keyword from backlink intersection. Search overlap does not establish commercial comparability or a page requirement. `traffic`, `subdomains` and `top-searches` are additional domain lenses, not automatic next steps.           |
| How does a particular page address a search need?                         | `/seo sxo <url> <keyword>`                                                                                                              | Pair the actual page with a specified query and a reusable SERP where suitable. Save HTML and rendered evidence for layout claims. Run 5 demonstrates reuse. Scores, personas and proposed wireframes are interpretations, not observed users or Google requirements.                        |
| Do candidate phrases suggest shared or separate content?                  | `/seo cluster plan <seed>`; bare `/seo cluster <seed>` is shorthand                                                                     | Supply the bounded comparison question and existing captures. The native workflow expands keywords and proposes architecture; it is larger than a simple overlap calculation. For two already captured queries, compare saved URL lists here first. Thresholds do not approve separate URLs. |
| What source content exists, or what does this specific page actually say? | `/seo firecrawl map <url>`, `scrape <url>`, `crawl <url>`; `/seo page <url>`, `/seo content <url>` for analysis                         | Map for inventory, scrape for a named content question, scope a crawl explicitly. Preserve source separately from audits. Open competitor pages when their content can resolve an uncertainty, not as a routine second audit.                                                                |
| What already brings visitors to Studio Terrasson?                         | `/seo google gsc <property>`; `ga4`, `ga4-pages` for audience behaviour                                                                 | Reuse run 8 first. GSC property is `https://www.studioterrasson.fr/`; the workspace records no data in its domain property. Save actual dates, dimensions, filters and coverage. GSC query omissions prevent a complete branded share; GA4 geography is audience location, not unmet demand. |
| What URLs, links and indexing state need preservation?                    | Firecrawl inventory; `/seo google inspect <url>`, `sitemaps <property>`; `/seo backlinks <url>` or `/seo dataforseo backlinks <domain>` | Combine owned performance, URL inventory and link evidence for a later mapping question. Index inspection is distinct from live-page checking; sitemap submission is not indexation. Backlink sources have coverage bias. None of these commands authorises redirects or a domain move.      |
| What is publicly visible about a local business?                          | `/seo local <url>`; `/seo maps gbp`, `reviews`, `competitors`, `nap`; `/seo dataforseo listings <keyword>`                              | Resolve identity and preserve public fields, dates and locations. Public profiles do not reveal owner-console state or grant editing access. Review counts cannot establish a ranking threshold. `maps grid` multiplies requests: scope identity, coordinates and grid size first.           |
| Are useful specimens outside text organic results?                        | `/seo dataforseo serp-images <keyword>`; `/seo images serp <keyword>`                                                                   | Run 18 already contains image destinations beyond its organic list. Inspect those saved destinations first if sufficient. Image SERP retrieval and image/search analysis are different workflows; neither measures image traffic or mandates a visual style.                                 |
| Is a selected page technically ready?                                     | `/seo technical <url>`, `schema`, `images`, `sitemap`; `/seo google pagespeed`, `crux`, `crux-history`; `/seo dataforseo onpage <url>`  | Use for an implementation or release question. Lab and field measurements differ; missing CrUX is not a pass. `/seo audit` is a broad workflow, not the default continuation of keyword research.                                                                                            |

### Analysis and generation have a different role

`/seo content-brief <topic or url>` can turn a selected topic into a proposed
outline. `/seo plan local` generates wider strategy; `/seo cluster plan --from
strategy` imports a plan, `cluster map` redraws its visualization, and `cluster
execute` proceeds toward content creation or briefs. Use these deliberately after
identifying the question and relevant inputs. They do not own Jukkai's sitemap.

SXO also offers `wireframe <url>` and `personas <url>` (the latter skips SERP
analysis). Clustering and SXO share evidence but answer different questions:
relationships among searches versus how a specific page serves a search need.
Native templates, word counts, branded-query exclusions and persona assumptions
remain tool judgments. In particular, branded-query exclusion cannot govern the
Studio Terrasson transition. Local workflow details are in
[seo-sxo](/home/martin/src/pro/seo/vendor/claude-seo-marketplace/claude-seo/skills/seo-sxo/SKILL.md)
and [seo-cluster](/home/martin/src/pro/seo/vendor/claude-seo-marketplace/claude-seo/skills/seo-cluster/SKILL.md).

The DataForSEO reference also lists `content`, `tech`, `whois`, `serp-youtube`,
`youtube`, `ai-scrape` and `ai-mentions`. These address content-index, technology,
registration, video or AI-platform questions; they are not missing mandatory
research steps. An AIO captured in Google SERPs is different evidence from a
ChatGPT scrape or LLM mention measurement. `/seo geo` adds analysis rather than
turning those observations into ranking guarantees.

Other documented workflows include FLOW, ecommerce, hreflang, programmatic pages,
competitor-comparison generation and drift monitoring. Optional Ahrefs, Bing,
Profound, SE Ranking, image-generation and Unlighthouse extensions have separate
prerequisites. Their appearance in upstream docs does not establish local readiness
or relevance to this static release.

## Prompting strategy for the next run

1. **Review here first.** Read the log's current synthesis and relevant run entries.
   Identify what remains unknown and whether existing saved evidence answers it.
2. **Explain the proposed measurement.** State the question, why it matters, the
   chosen native command, expected output and stopping point. Do not turn a
   report's automatic follow-up list into a research programme.
3. **Give Claude a compact native prompt.** Include only the necessary query/URL,
   measurement settings, reusable evidence paths and scope boundaries. Keep Jukkai
   decisions and cross-run business synthesis with the reviewer.
4. **Review and record.** Read saved data and report, reconcile material claims,
   discuss the implications and update the log in the same session. Claude's final
   commentary is optional context; do not make rebutting it the research objective.

Illustrative prompt shape, **not a request to run this now**:

```text
/claude-seo:seo dataforseo serp <chosen phrase>

Rennes, France; French (fr); desktop; depth 20.
Question: <the specific uncertainty this capture should resolve>.
Reuse <relevant existing report/data paths> where they answer the question;
identify any new capture separately. Stop after this bounded measurement.
Persist the request and captured response alongside the report under reports/.
State capture limits and separate estimated cost from API-reported charge.
```

The lines after the command are natural-language instructions, not invented flags.
For keyword discovery, specify France/French Labs and Rennes/French volume as
separate layers. For a comparison, name the phrase list and hold measurement
settings constant. For SXO, provide the actual URL, query and saved SERP path.
For clustering, scope expansion and fresh captures explicitly because its default
planning workflow can be much broader than the immediate question.

The existing workspace instructions already require evidence persistence and
result reconciliation. Do not paste this whole map or Jukkai's foundation into
every fresh Claude context. Add only constraints relevant to the chosen run.

## Evidence and cost contract

The [SEO workspace instructions](/home/martin/src/pro/seo/AGENTS.md) own operational
rules. These September 8 lessons must survive prompt and report handoffs:

- **Geography:** a city name in a keyword differs from the measurement location.
  France Labs, Rennes Google Ads and Rennes synthetic SERPs answer different
  questions. Override US/English defaults explicitly. Cross-city comparisons need
  a manifest of what changed; GA4 city and country-level GSC cannot substitute.
- **Coverage:** save actual requested lists and reconcile returned identities,
  not just counts. The workspace temporarily caps keyword batches at ten because
  captured responses have been shortened; this is not a documented API limit.
  Record requested depth versus saved items, duplicates and missing fields.
- **Unavailable values:** distinguish numeric estimates (including numeric zero),
  returned rows without a metric, and requested rows absent from the capture.
  Missing volume or difficulty is not zero; no threshold or cause is established
  merely by absence. Do not sum close variants into unique audiences.
- **Capture fidelity:** upstream documents field filtering. The workspace records
  removal of the provider task envelope, and today's log includes reconstructed
  extracts, omitted PAA answers, placeholder images and incomplete AIO citations.
  A file named `raw.json` is not proof of an unfiltered provider response. Retain
  what was captured and label omissions; do not reconstruct missing evidence as fact.
- **Costs:** use the existing pre-call cost controls and agreed scope. Upstream
  `costs today` and `costs summary` expose tracking, not necessarily an invoice.
  The wrapper currently prevents recovering per-call charges: record
  `cost_usd_reported_by_api: null` when unavailable and keep the cost-tier estimate
  separate. Price tables in READMEs are not current billing evidence. Integration
  means analysis commands may also make paid calls; a command is not one request.
  Run 10 reused a SERP but added volume measurement, so reuse alone does not mean
  no new spend.
- **Interpretation:** separate retrieved data, vendor metrics, agent analysis and
  recommendations. PAA/AIO topics, low KD, review counts, estimated traffic and
  recurring page types do not establish unmet demand, easy rankings, lead value,
  ranking causes or mandatory page formats. Reuse is not independent corroboration.

For each run retain the question; command/workflow; source paths; endpoint where
known; request parameters and keyword lists; capture and stored-ranking dates;
limits/pagination; captured responses and fidelity; estimated and reported costs;
and report/findings. Do not require envelope fields the wrapper did not preserve.
Do not follow upstream troubleshooting examples that print credential files;
workspace credential rules take precedence.

## Where today's work leaves the tool choice

Runs 1–18 already provide reusable architecture/Galerie SERPs, vocabulary, domain
footprints, one SXO specimen, owned GSC performance and restaurant, office, medical
and childcare evidence. July's ownership checks, generic SERP calibration and
first competitor probe are no longer a prerequisite sequence.

The log's current recommendation is a **discussion of B2B content** grounded in
actual missions and project proof, with further measurements only for named gaps.
Galerie buying vocabulary, closer combined-business examples and the later
preservation/migration map remain open. Those are discussion inputs, not a new
ordered run list; the log owns changes to that status. No B2B sector URL or final
sitemap follows from this capability refresh.

Update this map when command syntax, local capabilities, evidence handling or
Martin's prompting preference changes. Update findings and the next discussion in
the research log instead; approved decisions remain in GitHub.
