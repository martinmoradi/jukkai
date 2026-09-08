# Claude SEO capability map for reviewing agents

**Audience:** Jukkai-aware agents helping Martin explore SEO and interpret runs.

**Status:** capability reference; no research sequence, sitemap or strategy approved.

**Updated:** 2026-09-09, including the invocation contract and limitations observed
in the independently run Maps, Images and SERP reports.

## Agent contract

- **Recommend a bare native command**, for example `/seo sxo <url> <keyword>`.
  Shorthand resolution is automatic. Do not expand the namespace or append a
  prompt wrapper, research question, location instructions, reuse paths, stopping
  rules, persistence requirements or reporting checklist.
- **Claude runs in a fresh context.** The SEO workspace already supplies its run
  instructions. Do not inject Jukkai strategy, previous conclusions or this map
  into Claude's command prompt. The separation is intentional.
- **Reason with Martin here.** Explain why a command or a different research angle
  could help, then give the command alone. After a run, review saved evidence and
  analysis here, relate them to Jukkai, discuss and update the research log.
- **Use the full capability space.** Previously unused commands are candidates,
  not lower-value tools. Explore another evidence source, analytical lens or scale
  when useful. Do not force every recommendation into the latest research branch,
  the cheapest call or the smallest remaining measurement.
- **Separate capability from progress.** This map inventories what can be done;
  [seo-research-log.md](seo-research-log.md) records what has been learned. Use both
  to zoom out, identify blind spots and avoid accidental repetition. Existing
  evidence can support comparisons here without being fed into Claude's fresh run.
- **Keep authority explicit.** Tools can generate strategy, page structures and
  creative recommendations for examination. Their outputs do not approve business
  promises, pages or designs. [Current delivery](../operations/current-delivery.md),
  [method](../operations/method.md) and [foundation](../strategy/foundation.md)
  retain their respective authority. Research can inform later work too.

## Routing index

Choose by the question or perspective worth exploring, not by whether a command
has already appeared in the log. No row is a required phase or a dismissal of
another row. Full native forms and dependency distinctions follow below.

| Lens                                     | Candidate families                                                           | What this adds                                                                             |
| ---------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Search landscape and vocabulary          | DataForSEO SERP, keywords, volume, intent, trends; Google keywords           | Searches, result composition, adjacent needs, time variation.                              |
| Page experience and editorial expression | SXO, content, page, content-brief, images                                    | How pages answer needs, establish identity and provide usable next actions.                |
| Site model and alternative strategies    | plan, cluster, FLOW, competitor-pages, programmatic                          | Different organisation and content hypotheses to compare, including unfamiliar approaches. |
| Competitors and external authority       | ranked, competitors, intersection, backlinks, traffic, content, WHOIS        | Domain/page footprints, relationships, references and discoverable content.                |
| Local discovery and reputation           | local, maps, listings                                                        | Business profiles, reviews, location-dependent visibility and nearby entities.             |
| Art, visual and video discovery          | image SERPs, images, YouTube, ecommerce products                             | Discovery beyond text organic results; commercial and inspiration contexts.                |
| AI discovery and entities                | geo, ai-scrape, ai-mentions, Google NLP/entities; Profound, SE Ranking       | AI answers/citations, entity interpretation and different visibility surfaces.             |
| Owned performance and continuity         | GSC, GA4, inspect, sitemaps, backlinks, Firecrawl                            | Actual search/audience records, source-site structure, URLs and links to preserve.         |
| Technical quality and change             | audit, technical, schema, hreflang, onpage, PSI/CrUX, drift, Unlighthouse    | Broad diagnosis, specific implementation checks, performance and regressions.              |
| Asset/content production                 | content-brief, cluster execute, sitemap generate, images optimize, image-gen | Drafts and generated/modified artifacts for review and implementation.                     |

## Source and availability baseline

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

### Limitations observed in the September 8 reports

These qualify the documented catalog below. They are saved run observations,
not a fresh runtime test by the reviewing agent or a claim about all upstream builds.

- **Maps, runs 19–20:** the runner records Business Listings search as available,
  while Maps SERP, full profile and review endpoints were not exposed. The reports
  therefore use an indexed radius/profile snapshot, with local web-SERP results
  where available. This does not exercise live Maps grids, SoLV, review velocity
  or a complete owner-profile audit. Passing a workflow's tier detector is not
  proof that its whole capability is available.
- **Google Images, run 25:** `serp_google_images_live_advanced` was recorded as
  unavailable. `/seo dataforseo serp-images` produced a web-SERP substitute;
  Google Images rankings remain unmeasured. The `/seo images serp` route may share
  that dependency. Recheck tool exposure before selecting it; neither retrying the
  same substitute nor adding an integration is automatically the next research step.
- **Listing response handling:** the Maps run saved ten-row responses despite
  larger requested limits and saw no filtering effect from `is_claimed:false`.
  The responsible layer and unclaimed population remain unknown. Do not promote
  these captures to a documented provider-wide cap or zero unclaimed businesses.

Keep nominal commands available for future selection, with these limitations
visible. An organic image pack, an organic-result thumbnail, a local profile photo
and the Google Images tab are distinct evidence surfaces. Partial runs can still
teach us something without answering the requested question completely. Source
paths and analytical implications stay in the [reviewed-run log](seo-research-log.md#reviewed-runs).

## Native workflow catalog

Syntax below uses `/seo` directly. `<…>` denotes an argument; `[…]` an optional
argument. Where a row lists several forms, select one invocation. Descriptions
summarise the source references, not locally guaranteed results. These workflows
can retrieve data and produce analysis together; even commands outside
`dataforseo` can incur API costs through integrations.

### Analysis, planning and content

| Command                                                                                                | Capability / output                                                                                                                                |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/seo audit <url>`                                                                                     | Broad site audit with specialist delegation, findings and priorities. Useful for a holistic view, including issues that a narrow query would miss. |
| `/seo page <url>`                                                                                      | Single-page analysis across metadata, structure, content, schema, images and technical signals.                                                    |
| `/seo technical <url>`                                                                                 | Crawlability, indexability, security, URLs, mobile, performance, JavaScript and related technical checks.                                          |
| `/seo content <url>`                                                                                   | Content quality, experience/expertise/authority/trust signals, freshness and citation readiness.                                                   |
| `/seo content-brief <topic or url>`                                                                    | Proposed keywords, intent, section outline, internal links and competitor angles.                                                                  |
| `/seo plan <type>`                                                                                     | Wider strategy, competitive analysis, calendar, architecture and roadmap; types: `saas`, `local`, `ecommerce`, `publisher`, `agency`.              |
| `/seo sxo <url> [keyword]`                                                                             | Page/search fit, result-type comparison, inferred visitor needs and persona scoring. Explicit keyword selects the search to evaluate.              |
| `/seo sxo wireframe <url>`                                                                             | Current/proposed page structure and wireframe recommendations.                                                                                     |
| `/seo sxo personas <url>`                                                                              | Persona-based analysis without the SERP step.                                                                                                      |
| `/seo cluster plan <seed>` or `/seo cluster <seed>`                                                    | Keyword expansion, SERP-overlap groups, intent, proposed hub/spoke structure, internal links and visualization.                                    |
| `/seo cluster plan --from strategy`                                                                    | Import an existing `/seo plan` output into clustering.                                                                                             |
| `/seo cluster execute`                                                                                 | Content creation through claude-blog when available, otherwise briefs.                                                                             |
| `/seo cluster map`                                                                                     | Regenerate the cluster visualization.                                                                                                              |
| `/seo competitor-pages <url>` or `/seo competitor-pages generate`                                      | Analyse or propose comparison/alternatives pages and comparison matrices.                                                                          |
| `/seo programmatic <url>` or `/seo programmatic plan`                                                  | Assess or plan data-driven page families, templates, URL patterns and linking.                                                                     |
| `/seo flow find <topic>`                                                                               | Discovery stage of the FLOW framework.                                                                                                             |
| `/seo flow leverage <url>`; `/seo flow optimize <url>`; `/seo flow win <url>`; `/seo flow local <url>` | Other FLOW perspectives on a campaign/page, using evidence-oriented prompts.                                                                       |
| `/seo flow prompts`; `/seo flow sync`                                                                  | Inspect the framework prompt collection or synchronise it.                                                                                         |

### Local, links, technical and commerce

| Command                                                                             | Capability / output                                                                                             |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/seo local <url>`                                                                  | Local site/profile signals, NAP consistency, reviews, local schema and map-pack context.                        |
| `/seo maps <business> <location>`                                                   | Business-centred Maps intelligence entry point.                                                                 |
| `/seo maps grid <keyword> <location>`                                               | Visibility across a geographic grid. Multiple locations mean multiple tasks.                                    |
| `/seo maps gbp <business> <location>`                                               | Public business-profile analysis.                                                                               |
| `/seo maps reviews <business> <location>`                                           | Review content, distribution and response analysis.                                                             |
| `/seo maps competitors <keyword> <location>`                                        | Nearby competitor discovery.                                                                                    |
| `/seo maps nap <business> <location>`                                               | Cross-platform name/address/phone comparison.                                                                   |
| `/seo maps schema <business> <location>`                                            | Business schema generation.                                                                                     |
| `/seo backlinks <url>`                                                              | Link profile using the documented free → signup → paid data cascade (Common Crawl, Moz/Bing, DataForSEO).       |
| `/seo backlinks gap <url> <competitor-url>`                                         | Compare link coverage.                                                                                          |
| `/seo backlinks toxic <url>`; `/seo backlinks new <url>`                            | Link-risk heuristics or new/lost-link investigation.                                                            |
| `/seo backlinks verify <url> --links <file>`; `/seo backlinks setup`                | Verify a known link list or configure sources.                                                                  |
| `/seo schema <url>`                                                                 | Detect, validate and generate structured data.                                                                  |
| `/seo sitemap <url>`; `/seo sitemap generate`                                       | Analyse an XML sitemap or generate one with proposed structure.                                                 |
| `/seo hreflang [url]`; `/seo hreflang audit <directory-or-url>`                     | International targeting checks/generation, including local builds or URL sets.                                  |
| `/seo drift baseline <url>`; `/seo drift compare <url>`; `/seo drift history <url>` | Persist and compare SEO-critical page state over time.                                                          |
| `/seo ecommerce <url>`                                                              | Product/commerce SEO and marketplace context.                                                                   |
| `/seo ecommerce products <keyword>`                                                 | Shopping-result competitive analysis; potentially useful for art-buying discovery even without building a shop. |
| `/seo ecommerce gaps <domain>`                                                      | Compare organic and Shopping visibility.                                                                        |
| `/seo ecommerce schema <url>`                                                       | Product structured-data checks and enhancements.                                                                |

### Visual and AI analysis

| Command                       | Capability / output                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `/seo images <url>`           | Page-image implementation: alt text, formats, size, responsive delivery, loading and layout stability.  |
| `/seo images serp <keyword>`  | Image/visual-search analysis.                                                                           |
| `/seo images optimize <path>` | Modify a local image, including optimization and IPTC AI labeling. Distinct from retrieval or analysis. |
| `/seo geo <url>`              | AI-search/citation-readiness analysis of content, entities, structure and authority.                    |

## DataForSEO catalog

The extension README documents **23 data commands across nine modules**, plus
cost controls in the command reference. All 23 are listed here. They are workflow
entry points, not a promise of one endpoint or one API request per invocation.

Prefix **every suffix below with `/seo dataforseo`**.

| Command suffix                                   | Evidence / capability                                                                                            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `serp <keyword>`                                 | Organic SERP and returned features; Google plus documented Bing/Yahoo support via the workflow's `se` parameter. |
| `serp-images <keyword>`                          | Google Images results.                                                                                           |
| `serp-youtube <keyword>`                         | YouTube search results.                                                                                          |
| `youtube <video_id>`                             | Video information, comments and subtitles.                                                                       |
| `keywords <seed>`                                | Keyword suggestions, ideas and related phrases.                                                                  |
| `volume <keywords>`                              | Volume and associated keyword metrics for a list.                                                                |
| `difficulty <keywords>`                          | Vendor organic-difficulty estimates.                                                                             |
| `intent <keywords>`                              | Vendor intent classification.                                                                                    |
| `trends <keyword>`                               | Google Trends series.                                                                                            |
| `backlinks <domain>`                             | Vendor-indexed link profile and spam metrics.                                                                    |
| `competitors <domain>`                           | Search-overlap competitors and estimated visibility.                                                             |
| `ranked <domain>`                                | Indexed ranking terms and associated pages.                                                                      |
| `intersection <domains>`                         | Keyword or backlink overlap; documented range 2–20 domains.                                                      |
| `traffic <domains>`                              | Bulk modelled traffic estimates.                                                                                 |
| `subdomains <domain>`                            | Subdomains represented in ranking data.                                                                          |
| `top-searches <domain>`                          | Queries mentioning a domain.                                                                                     |
| `onpage <url>`                                   | On-page analysis, Lighthouse and content parsing.                                                                |
| `tech <domain>`                                  | Detected technology stack.                                                                                       |
| `whois <domain>`                                 | Registration records.                                                                                            |
| `content <keyword/url>`                          | Content-index search, analysis and phrase trends.                                                                |
| `listings <keyword>`                             | Business-listing discovery.                                                                                      |
| `ai-scrape <query>`                              | ChatGPT web-scraper visibility capture.                                                                          |
| `ai-mentions <keyword>`                          | LLM mention tracking across supported platforms.                                                                 |
| `costs today`; `costs summary`                   | Tracking summaries; distinguish estimates from reported charges.                                                 |
| `costs config --mode threshold --threshold 0.50` | Documented example changing the cost-control threshold, not a recommended setting.                               |

Modules: `SERP`, `KEYWORDS_DATA`, `DATAFORSEO_LABS`, `BACKLINKS`, `ONPAGE`,
`DOMAIN_ANALYTICS`, `BUSINESS_DATA`, `CONTENT_ANALYSIS`, `AI_OPTIMIZATION`.
The README describes automatic DataForSEO integration with audit, technical,
content, geo and plan workflows. Its field filtering reduces response payloads;
see the evidence rules below when interpreting captures.

## Google API catalog

Prefix **every suffix below with `/seo google`**. Credential tiers are upstream
requirements, not confirmation that every service is currently authorised.

| Command suffix                                                                   | Evidence / capability                                                                                                                                   |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setup`; `quotas`                                                                | Credential setup/checks or API quota reporting.                                                                                                         |
| `report full`; `report cwv-audit`; `report gsc-performance`; `report indexation` | PDF/HTML reporting for the corresponding scope.                                                                                                         |
| `pagespeed <url>`                                                                | PageSpeed/Lighthouse lab performance.                                                                                                                   |
| `crux <url>`; `crux-history <url>`                                               | Real-user field performance and historical periods.                                                                                                     |
| `gsc <property>`                                                                 | Owned Search Console performance by supported dimensions.                                                                                               |
| `inspect <url>`; `inspect-batch <file>`                                          | Google's indexed-version inspection, single or batch.                                                                                                   |
| `sitemaps <property>`                                                            | Submitted sitemaps and their status.                                                                                                                    |
| `index <url>`; `index-batch <file>`                                              | Indexing notifications. Upstream restricts these to JobPosting or BroadcastEvent embedded in VideoObject; ordinary Jukkai URLs use inspection/sitemaps. |
| `ga4 [property-id]`; `ga4-pages [property-id]`                                   | Organic audience reporting and landing pages.                                                                                                           |
| `nlp <url-or-text>`                                                              | Natural-language content analysis.                                                                                                                      |
| `entities <url-or-text>`; `entity <query>`                                       | Entity extraction or lookup.                                                                                                                            |
| `keywords <seed>`; `volume <keywords>`                                           | Google Ads Keyword Planner ideas and volume.                                                                                                            |
| `youtube <query>`; `youtube-video <video_id>`                                    | YouTube search or video analysis.                                                                                                                       |
| `safety <url>`                                                                   | Safe Browsing check.                                                                                                                                    |

Upstream tiers: 0 = API key for PSI/CrUX; 1 = OAuth/service-account access for
GSC/inspection/indexing; 2 = GA4 property configuration; 3 = Google Ads developer
token for Keyword Planner. Studio Terrasson's data-bearing GSC property is
`https://www.studioterrasson.fr/` per the workspace and reviewed run 8.

## Extensions and runtime

Extension status is separate from analytical usefulness. DataForSEO and Firecrawl
are provisioned according to the workspace instructions. The other extensions
below are documented capabilities whose current local readiness was not established
in this refresh. Check prerequisites when selecting one; do not silently omit it
from the available approaches or promise it will run without setup.

| Command                                                                                                                                                                                                                                     | Capability / dependency                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/seo firecrawl map <url>`                                                                                                                                                                                                                  | Discover the site's URL inventory.                                                                                                                              |
| `/seo firecrawl scrape <url>`                                                                                                                                                                                                               | Retrieve one page's content.                                                                                                                                    |
| `/seo firecrawl crawl <url>`                                                                                                                                                                                                                | Retrieve content across discovered pages.                                                                                                                       |
| `/seo firecrawl search <query> <url>`                                                                                                                                                                                                       | Search within a crawled site, as described by the command reference.                                                                                            |
| `/seo ahrefs metrics <url>`                                                                                                                                                                                                                 | Domain/page strength and visibility estimates; Ahrefs extension.                                                                                                |
| `/seo ahrefs backlinks <url>`; `/seo ahrefs organic <url>`; `/seo ahrefs content <topic>`                                                                                                                                                   | Link, ranking and content-index perspectives from Ahrefs.                                                                                                       |
| `/seo bing links <url>`; `/seo bing compare <urlA> <urlB>`                                                                                                                                                                                  | Bing Webmaster link evidence; Bing extension.                                                                                                                   |
| `/seo bing submit <url> --host <host>`; `/seo bing submit-batch <file> --host <host>`; `/seo bing verify-indexnow --host <host>`                                                                                                            | IndexNow submission or key verification; submissions require a key and change external state.                                                                   |
| `/seo profound citations <brand>`; `/seo profound prompts <brand>`; `/seo profound competitors <brand>`; `/seo profound alerts <brand>`                                                                                                     | AI citations, prompt discovery, co-mentioned brands and change alerts; Profound extension.                                                                      |
| `/seo seranking ai-visibility <brand>`; `/seo seranking serp <keyword>`; `/seo seranking backlinks <url>`; `/seo seranking competitors <url>`                                                                                               | AI visibility, SERPs, links and competing domains; SE Ranking extension.                                                                                        |
| `/seo image-gen og <description>`; `/seo image-gen hero <description>`; `/seo image-gen product <description>`; `/seo image-gen infographic <description>`; `/seo image-gen custom <description>`; `/seo image-gen batch <description> [N]` | Generate assets via the Banana/Gemini extension. Generated visuals are not documentary evidence of real Jukkai work or inventory.                               |
| `/seo unlighthouse <url>`                                                                                                                                                                                                                   | Multi-page local Lighthouse runner; Unlighthouse extension/runtime. Documented options include `--device desktop`, `--max-routes 50`, `--output-dir ./reports`. |
| `/seo doctor`                                                                                                                                                                                                                               | Runtime readiness diagnostics.                                                                                                                                  |
| `/seo setup`                                                                                                                                                                                                                                | Create/refresh the managed runtime and browser.                                                                                                                 |

## Reviewing-agent evidence rules

The [SEO workspace instructions](/home/martin/src/pro/seo/AGENTS.md) own operational
rules; Claude inherits them from that workspace. Do not restate them in command
prompts. Apply the following distinctions while reviewing reports here:

- **Geography:** a city name in a keyword differs from the measurement location.
  France Labs, Rennes Google Ads and Rennes synthetic SERPs answer different
  questions. Check the recorded location against workspace defaults. Cross-city comparisons need
  a manifest of what changed; GA4 city and country-level GSC cannot substitute.
- **Coverage:** save actual requested lists and reconcile returned identities,
  not just counts. The workspace temporarily caps keyword batches at ten because
  captured responses have been shortened; this is not a documented API limit.
  Record requested depth versus saved items, duplicates and missing fields. For
  SERPs, also check `max_crawl_pages`: the city-pricing requests explicitly limited
  depth 100 to one page. September 9's kitchen-provider run saved two pages at
  depth 20/`max_crawl_pages:2`, with 19 organic placements but 18 unique URLs.
  The paired small-living-room run saved three pages at depth 30/`max_crawl_pages:3`,
  with 29 and 28 contiguous organic ranks. These demonstrate multi-page retrieval,
  not the cause of every earlier
  short response or a link to keyword-batch omissions. The [provider reference](https://docs.dataforseo.com/v3/serp/google/organic/live/advanced/)
  documents complementary depth/page limits; do not assume a missing parameter's
  effective MCP default or attribute every short capture to the same layer.
- **Unavailable values:** distinguish numeric estimates (including numeric zero),
  returned rows without a metric, and requested rows absent from the capture.
  Missing volume or difficulty is not zero; no threshold or cause is established
  merely by absence. Do not sum close variants into unique audiences.
- **Capture fidelity:** upstream documents field filtering. The workspace records
  removal of the provider task envelope, and the reviewed log includes reconstructed
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

When reviewing a run, locate its question; command/workflow; source paths; endpoint where
known; request parameters and keyword lists; capture and stored-ranking dates;
limits/pagination; captured responses and fidelity; estimated and reported costs;
and report/findings. Do not require envelope fields the wrapper did not preserve.
Do not follow upstream troubleshooting examples that print credential files;
workspace credential rules take precedence.

## Maintenance and continuation

Use the log for completed runs, evidence pointers, current synthesis and proposed
next discussion. Do not copy that changing agenda into this catalog or make it an
eligibility test for commands. Unused capabilities can reveal questions that the
existing research has not yet asked. A broad audit, alternative strategy or new
source can be useful precisely because it goes beyond a known gap.

For each recommendation, connect the capability to a concrete research purpose
in the conversation with Martin. Give the bare command separately. Review the
result with Jukkai context and record learning under the log's update protocol.
Do not add a new per-run prompt protocol.

Refresh this map for command coverage/syntax, dependencies, local capability
changes or corrections to the agent contract. Keep documented, locally configured,
and successfully exercised capabilities distinct. Existing run coverage is evidence
of use, not a ranking of tool usefulness.
