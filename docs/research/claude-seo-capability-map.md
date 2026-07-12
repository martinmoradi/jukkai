# Claude SEO capability map for the site-planning inquiry

**Status:** provisional tool calibration note, not Jukkai strategy or a research-run plan  
**Checked:** 2026-07-12  
**Installed suite:** AgriciDaniel/claude-seo v2.2.0, commit `6cf1ea9fe4c2088b2ad3089797f846850fd66164`

## Bottom line

The installed suite can retrieve most of the evidence needed to begin the
site-planning inquiry: the current site's public pages, owned GSC/GA4 data,
localized synthetic SERPs, keyword datasets, public Maps/GBP/review data, and
vendor-indexed competitor and backlink data. It can also derive comparisons,
scores, clusters, geo-grids, and action lists.

Those are not the same kind of claim. The suite's audit reports routinely mix:

- **Retrieved data:** API responses, rendered pages, GSC rows, public reviews.
- **Derived analysis:** health scores, difficulty, intent, traffic estimates,
  sentiment, Share of Local Voice, overlap and clustering.
- **Prescriptions:** proposed fixes, priorities, pages, briefs and roadmaps.

For Jukkai, persist the retrieved response and its parameters first. Keep the
derived layer labelled. Do not let the suite's prescriptions decide strategy,
page architecture, comparison cities, editorial direction, or business fit.

The plugin and its DataForSEO and Firecrawl MCP servers are currently wired in
the dedicated `/home/martin/src/pro/seo` workspace, not this repository. Its
[smoke-test log](/home/martin/src/pro/seo/smoke-tests.md) records successful live
calls for a Rennes/French organic SERP, GSC, GA4, PSI/CrUX fallback and a
Firecrawl scrape. The installed commit matches current upstream `main`.
[Upstream commands](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/docs/COMMANDS.md)

## Capability map

| Need                                                   | Smallest relevant surface                                                                                                     | Retrieved                                                                                                                                           | Derived or prescribed                                                                                                                          | Required scope and provenance                                                                                                                                                                                                                                 | Cost, risk and inability                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Existing-site inventory and crawl                      | `/seo firecrawl map`, `crawl`, `scrape`; `/seo page`; `/seo audit` only after calibration                                     | URLs, rendered Markdown/HTML, metadata, links, screenshots; raw fetch/render results                                                                | URL-pattern counts, thin/duplicate-content flags, health scores, priorities                                                                    | URL; for crawl: limit, depth, include/exclude paths, formats. Save raw URL inventory and crawl payload with timestamp and parameters before an audit report. Full audit writes `{domain}-audit/`; individual Firecrawl calls do not promise repo persistence. | Firecrawl is credit-metered. Map before crawl; target a small sample. A crawl sees public/renderable pages, not CMS truth, analytics, indexation or business value. DataForSEO `/onpage` is page analysis, not proven exhaustive domain crawling. JS/interactions and crawl blocks can produce gaps. [Firecrawl skill](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/extensions/firecrawl/skills/seo-firecrawl/SKILL.md)                                                        |
| Owned search performance                               | `/seo google gsc`; `inspect`; `sitemaps`                                                                                      | Clicks, impressions, CTR, average position grouped by query/page; indexed-version status; submitted sitemap status                                  | “Quick wins”, anomaly labels and recommended fixes                                                                                             | Correct GSC property, date range, search type, dimensions, filters and row pagination. Default suite query is 28 days, `query,page`, web, 1,000 rows. Save JSON plus property form and dates.                                                                 | Free API quota. Search Analytics returns top rows, not guaranteed exhaustive data; country is its geographic dimension, not city. URL Inspection describes Google's indexed version, not a live test. It cannot establish Rennes-vs-other-city demand or SERP composition. [Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query), [URL Inspection](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)                                                  |
| Owned audience behaviour                               | `/seo google ga4`; `ga4-pages`                                                                                                | Organic sessions/users/pageviews and landing pages; further GA4 dimensions can be queried directly                                                  | Engagement interpretations and page priorities                                                                                                 | Authorized GA4 property, date range, channel filter, dimensions and metrics. Save request and response, including sampling/quota metadata where present.                                                                                                      | Free, token-quota based; high-cardinality or complex reports cost more quota and data can be sampled or thresholded. GA4 city describes visitor/event geography, not the location of a simulated SERP and not unmet demand. [GA4 reporting](https://developers.google.com/analytics/devguides/reporting/data/v1/basics), [data expectations](https://developers.google.com/analytics/devguides/reporting/data/v1/reporting-data-expectations)                                                                              |
| Real-user performance                                  | `/seo google pagespeed`, `crux`, `crux-history`                                                                               | Lighthouse lab data plus CrUX LCP/INP/CLS at URL or origin level and historical collection periods                                                  | Good/poor ratings, trend direction and performance recommendations                                                                             | URL/origin, form factor and collection dates. Save raw JSON and state whether URL or origin data was returned.                                                                                                                                                | Free API quota. Small sites may have no eligible CrUX data; that is absence of field data, not good performance. CrUX is 28-day aggregated experience data and cannot establish demand, ranking causation or content value. History defaults to 25 periods but supports 1–40. [CrUX API](https://developer.chrome.com/docs/crux/guides/crux-api), [History API](https://developer.chrome.com/docs/crux/history-api)                                                                                                        |
| Keyword discovery, volume, trends and difficulty       | `/seo dataforseo keywords`, `volume`, `difficulty`, `intent`, `trends`; Google Ads commands only at suite Tier 3              | Vendor keyword ideas; approximate monthly volume/CPC/paid competition; monthly history; Trends series                                               | DataForSEO organic difficulty and intent are proprietary estimates/classifications; trend direction and opportunity labels are interpretations | Explicit France/French and the intended location code for every call; seed/list; date range for trends. Never accept suite defaults (`US`, `en`). Save returned update timestamps and raw rows.                                                               | Paid per API task/batch. Batch first. Ads competition is paid competition, not organic difficulty; Trends is relative, not volume; small/local phrases may be zero or absent. Vendor coverage and update cadence limit conclusions. [DataForSEO Labs overview](https://docs.dataforseo.com/v3/dataforseo_labs-google-overview/), [Google Ads volume](https://docs.dataforseo.com/v3/keywords_data-google_ads-search_volume-live/), [Trends overview](https://docs.dataforseo.com/v3/keywords_data-google_trends-overview/) |
| Localized organic SERPs                                | `/seo dataforseo serp <keyword>` using `serp_organic_live_advanced`                                                           | Ordered organic items and SERP features, including local pack/PAA/featured elements when returned                                                   | Intent/page-type summaries, domain dominance and “opportunity” conclusions                                                                     | Keyword, Rennes location code/name or coordinate, `fr`, device, depth, timestamp and endpoint/method. Hold all parameters constant across comparisons. Save the complete response, including `check_url`, task id and returned cost.                          | Paid per task; depth and operators can multiply price. It is a controlled, non-personalized synthetic snapshot, not every resident's SERP and not stable rank truth. It can show result composition, not why Google ranked it or which Jukkai page should exist. [Organic Live Advanced](https://docs.dataforseo.com/v3/serp-se-type-live-advanced/)                                                                                                                                                                       |
| Maps, public GBP, reviews and nearby entities          | `/seo maps gbp`, `reviews`, `competitors`; DataForSEO Maps SERP, My Business Info and Google Reviews                          | Public profile fields, categories, address/contact/hours, rating distribution, review text/timestamps/responses, and location-specific Maps results | Completeness score, sentiment, velocity, competitor density, fake-review flags and recommendations                                             | Resolve target identity by CID/place ID first. For each call record keyword, coordinates/location, language, device, depth/sort, timestamp and target identifier. Save raw profiles/reviews separately from scoring.                                          | Paid; public observation is not authenticated GBP management/performance data. Reviews are incomplete social evidence; sentiment/fake flags are heuristics. A public profile audit cannot reveal owner-console settings, actions or edits. [Business Data overview](https://docs.dataforseo.com/v3/business_data-google-overview/), [Google Business Profile APIs](https://developers.google.com/my-business/content/overview)                                                                                             |
| Geo-grid visibility                                    | `/seo maps grid`; repeated Maps SERP calls using coordinates                                                                  | Target position returned at each coordinate for a fixed query/time                                                                                  | Grid generation, average rank and Share of Local Voice are suite calculations                                                                  | Verified CID/place ID, one keyword, center, radius/grid, zoom, language, device and collection window. Save every point-level response.                                                                                                                       | Potentially many paid tasks: a 7x7 grid means 49 tasks per keyword. Bundled price examples have drifted, so use the suite's pre-call cost guard and current provider calculator/returned cost. One grid is a volatile diagnostic, not a durable market boundary or ranking cause. [Maps task parameters](https://docs.dataforseo.com/v3/serp/google/maps/task_post/), [suite Maps method](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/skills/seo-maps/SKILL.md)               |
| Competitor domains, ranked terms and estimated traffic | `/seo dataforseo competitors`, `ranked`, `traffic`, `subdomains`, `top-searches`; use `relevant_pages` utility where useful   | Vendor-indexed ranking keywords/pages, overlap, positions, SERP features and estimated traffic                                                      | Competitor designation, traffic value and opportunity/gap conclusions                                                                          | Domain plus explicit France/French database/location, result limit and timestamp. Candidate domains should come from the calibrated local SERPs/Maps or business knowledge, not from the tool alone. Save raw records and vendor update times.                | Paid. “Competitor” means search-result overlap, not commercial or creative comparability. Traffic is an estimate, not competitor analytics. Weakly indexed domains can look falsely unimportant. [DataForSEO Labs capabilities](https://docs.dataforseo.com/v3/dataforseo_labs-google-overview/)                                                                                                                                                                                                                           |
| Keyword/backlink intersections                         | `/seo dataforseo intersection`; domain/page intersection utilities                                                            | Shared/unique vendor-indexed keywords or referring sources                                                                                          | Gap, relevance, attainability and priority are interpretations                                                                                 | Two or more evidence-selected domains/pages, France/French for keyword intersections, filters/limits and timestamp. Persist domain sets and raw rows.                                                                                                         | Paid; backlink intersection is an always-confirm operation in the suite. Overlap does not prove topical authority, link quality, attainable coverage, or a page requirement. [Domain intersection](https://docs.dataforseo.com/v3/dataforseo_labs-google-domain_intersection-live/), [page intersection](https://docs.dataforseo.com/v3/dataforseo_labs-google-page_intersection-live/)                                                                                                                                    |
| Backlinks                                              | `/seo dataforseo backlinks`; `/seo backlinks` has Common Crawl/Moz/Bing alternatives                                          | Vendor index summary, referring domains/pages, anchors and new/lost records                                                                         | Domain rank, spam/toxicity and link-priority judgments                                                                                         | Exact domain/URL mode, filters/limits, timestamp and data source. Save the actual links behind summaries.                                                                                                                                                     | Paid multi-call workflow; full backlink retrieval requires confirmation. Every index has coverage bias; vendor rank/spam metrics are heuristics. It cannot establish relationship quality, editorial endorsement or whether a link is realistically obtainable. [Backlinks API overview](https://docs.dataforseo.com/v3/backlinks-overview/)                                                                                                                                                                               |
| Cross-city comparable queries                          | Repeat the localized SERP and keyword calls; no special command is needed                                                     | Like-for-like SERP composition and, where supported, location-specific keyword rows                                                                 | Differences in dominant page types, entities, local-pack presence and intent pattern                                                           | One stable query corpus; same French language, device, depth, endpoint and collection window; only location changes. Store a comparison manifest.                                                                                                             | Each city multiplies paid tasks. GSC cannot do city comparison; GA4 city is audience location. Separate Trends requests are not directly comparable. The instrument can reveal differences, but cannot select the right comparison cities or prove Rennes will evolve like them.                                                                                                                                                                                                                                           |
| Editorial specimens and domain checks                  | Firecrawl `scrape`/`search`; `/seo page`, `content`, `sxo`; DataForSEO `ranked`, `relevant_pages`, `content`, `tech`, `whois` | Page content/structure/media/metadata; search visibility; vendor content metrics; detected technology and WHOIS fields                              | Specimen coding, quality/readability/sentiment, editorial lessons and recommendations                                                          | Choose specimens from recurring SERP domains plus intentional non-search references. Save rendered source and a human observation sheet separately from vendor scores. Record URL and capture date.                                                           | Scraping and some vendor calls consume credits. WHOIS is not domain-history or editorial-provenance proof; the suite has no documented archive/Wayback workflow. A visible or high-scoring specimen cannot establish Jukkai's voice, production capacity, business relevance or page architecture. [suite DataForSEO surface](https://github.com/AgriciDaniel/claude-seo/blob/6cf1ea9fe4c2088b2ad3089797f846850fd66164/skills/seo-dataforseo/SKILL.md)                                                                     |

## Provenance contract for any paid or comparative call

Save a small manifest beside the raw result:

```yaml
instrument: dataforseo | firecrawl | google
endpoint_or_command: ...
collected_at: ...
target_or_query: ...
location: { method: code|name|coordinate, value: ... }
language: fr
device: mobile|desktop|null
depth_or_limit: ...
date_range: ...
provider_task_id: ...
returned_cost_usd: ...
source_kind: retrieved
```

Then put interpretations and recommendations in separate sections or files.
The suite's DataForSEO guardrail must estimate before every call and log the
returned cost afterwards. Its bundled cost tables are useful guardrails, not a
current tariff; use provider-returned cost as the execution record.

## Smallest justified calibration probes

These probes test the instruments. They are not fixed research runs and do not
close strategy questions.

1. **Ownership and no-cost check.** Run Google credential detection; list the
   accessible GSC properties and confirm the intended property has data. Run
   one 28-day GSC query/page export, one GA4 organic summary and PSI/CrUX for the
   current origin. Stop if property identity or attribution is ambiguous.
2. **Old-site shape before an audit.** Firecrawl-map the current public site,
   then scrape only the homepage and one representative project/service page.
   Compare rendered content with the suite's free raw fetch. Stop and resolve
   rendering/link-extraction gaps before any full crawl.
3. **Two-query Rennes SERP calibration.** Use two already plausible but
   differently shaped French queries, including the previously smoke-tested
   `architecte d'intérieur rennes`; run Rennes, `fr`, one fixed device, depth 10. Look for response coverage, result/page types, local-pack presence,
   recurring domains and actual cost—not “the winning keyword.”
4. **One batched keyword check.** Submit 5–10 terms from the observed SERPs in
   one volume call, then difficulty/intent only if the batch has usable French
   coverage. Test the finest supported Rennes geography against France once;
   retain null/rounded results as a finding rather than broadening silently.
5. **Identity before geo-grid.** Resolve Jukkai's existing public business to a
   CID/place ID; fetch one public profile and a small newest-review sample. Run
   one Maps SERP at the business center. Only if identity matching is reliable,
   price a 3x3 one-keyword grid; do not start with the 7x7 default.
6. **One evidence-discovered competitor.** From the two Rennes SERPs/Maps—not
   from reputation alone—choose one recurring domain and request its top ranked
   terms/relevant pages. Add the target domain only if it has enough vendor
   coverage for an intersection to be meaningful. This tests database coverage,
   not competitive strategy.
7. **One temporary cross-city control.** Repeat the exact two SERP queries in a
   single explicitly temporary comparison city, holding every other parameter
   constant. Judge whether the instrument exposes intelligible differences in
   result types and domains. Do not treat that city as an approved comparator.
8. **Two direct editorial specimens.** Scrape two pages from one recurring
   search-visible domain and two pages from one deliberately chosen editorial
   reference. Record observable structure, evidence, media, CTA and freshness.
   Use vendor content scores only as annotations; use WHOIS only for narrow
   registration facts, never as provenance proof.

After these probes, the next planning session should review coverage, ambiguity,
actual cost and evidential usefulness. Only then is it reasonable to size or
order broader SEO investigations.

## Source and implementation cautions

- The installed v2.2.0 commit matches upstream `main`, but suite prose contains
  internal drift in module/tool counts and some cost examples. Treat slash
  commands as workflow recipes over MCP tools; verify the installed tool schema
  before committing a run manifest.
- The suite defaults many DataForSEO commands to US/English. Every Jukkai call
  must set France/French and the intended geographic resolution explicitly.
- The plugin's audit, Maps and content skills embed benchmarks and recommended
  actions. Those are agent-authored analysis layers, not provider-returned facts.
- Provider APIs and pricing change. The primary current references are the
  [upstream repository](https://github.com/AgriciDaniel/claude-seo),
  [DataForSEO API documentation](https://docs.dataforseo.com/v3/),
  [Google Search Console API](https://developers.google.com/webmaster-tools/v1/api_reference_index),
  [GA4 Data API](https://developers.google.com/analytics/devguides/reporting/data/v1),
  and [CrUX documentation](https://developer.chrome.com/docs/crux/).
