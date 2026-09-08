# SEO research log

Updated: 2026-09-08. **Working synthesis, not an approved sitemap, copy brief or
SEO strategy.** Requested by Martin as the continuing agent's research entry point.

## Start here

**Goal:** use sound evidence to shape Jukkai's pages and copy and improve relevant
search visibility. Studio Terrasson is the previous website; Jukkai brings interior
architecture and the Galerie into one identity. Preserve useful search continuity
while explaining the new business clearly.

Read [current delivery](../operations/current-delivery.md),
[method](../operations/method.md) and [foundation](../strategy/foundation.md) for
scope, business facts and claim boundaries. This log records learning and uncertainty;
decisions belong in the existing
[Scope the SEO research that helps plan Jukkai pages and copy](https://github.com/martinmoradi/jukkai/issues/86)
ticket, under the [Wayfinder map](https://github.com/martinmoradi/jukkai/issues/84).
The research scope and first-release sitemap remain open.

**Working loop:** Martin runs native Claude SEO commands, usually in fresh contexts.
As clarified September 8, Claude works without Jukkai context: prefer native commands
with necessary measurement/scope settings; comparisons and Jukkai synthesis happen
with the reviewing agent here. Claude's report analysis remains useful input.
The Jukkai-aware reviewing agent reads reports AND evidence, discusses implications
with Martin, and updates this log. Explain the next query before recommending it.
Competitor recommendations are not Jukkai instructions; this log authorises no paid calls.

**Evidence:** run folders below are under `/home/martin/src/pro/seo/reports/`, local
and gitignored in that workspace. This log is not their backup. Read that workspace's
`AGENTS.md` before using it; never inspect secret-bearing configuration.

## Current synthesis and next discussion

- **Supported:** architecture has relevant local search activity and overlapping
  service vocabulary. Galerie discovery mixes buying and cultural visits; the
  street-art query favours public-art discovery. Studio Terrasson's recorded search
  clicks concentrate on its homepage; query visibility is too incomplete to quantify
  branded traffic. Nantes adds another homepage-heavy architecture sample, with
  more directory/editorial organic results and a multi-city collective on a city
  domain. These are samples, not whole markets or ranking-cause evidence.
- **Martin's context:** both activities target the wider Rennes audience from
  Châteaugiron. Crystelle's authorship connects them. Galerie character discussed:
  colourful, approachable street/pop/urban art, for buying as well as viewing.
  Tentative small-piece/gift price examples do not replace public-price rules.
- **Open:** service/B2B coverage; art-buying vocabulary; shared-brand presentation;
  old-site queries, pages, links and proof to preserve. Retain Martin's interest in
  selected regional/larger-city and combined art/interiors examples. Research should
  inform later pages too, without becoming an exhaustive magazine-release gate.
- **Latest recommendation, not agreed sequence:** run 9 supplies the Nantes
  comparison. Inspect CKTFC with SXO next: its retrieved homepage combines
  residential/B2B work, process and project examples. Use that to explore content
  organisation, then relate it to Jukkai's actual services and proof. Closer
  combined-business/Galerie examples remain a gap. Do not automatically pursue
  Nantes geo-grids/commune volumes or repeat the completed GSC baseline.
- **Proposed eventual output:** connect each candidate page to visitor needs, related
  searches, truthful message/proof and next action. No sitemap or brief is approved.

### Candidate content purposes after run 8

**Agent proposal for discussion, not five approved URLs or release commitments.**
The foundation supplies business intent; the research informs discovery and limits.

| Candidate surface        | Visitor job and evidence basis                                                                                                                                          | Open page/content decision                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Jukkai homepage          | Recognise Crystelle, understand architecture + Galerie, choose a path. Old-site search entry is concentrated on the homepage.                                           | How much service explanation and project proof belongs here?                                    |
| Interior architecture    | Understand suitable missions, process, scope and how to enquire. Foundation plus local query research support this need.                                                | Separate page versus homepage sections; residential/B2B treatment; fees only when supported.    |
| Selected project stories | Judge taste, range and ability through real briefs, constraints and outcomes. Supported by the business proof bank; low direct search clicks do not measure persuasion. | Which stories/assets are ready; case pages versus compact features?                             |
| Galerie                  | Understand the selection, possibility of buying and actual visit arrangements. Broad gallery SERP plus business intent; no agenda obligation.                           | Content available before opening; clearer buying vocabulary and relevant references.            |
| Contact / visit          | Reach the practice or plan a Galerie visit with truthful information. Existing contact-page clicks and known lead behaviour support accessibility.                      | General contact page versus shared sections; distinguish appointment and public opening states. |

Next discussion: use selected competitor pages to examine architecture explanations
and project proof before developing the candidate content outline. Old-site URL preservation/migration needs a later
mapping pass; these proposed surfaces are not redirect targets yet.

## Reviewed runs

All nine runs below were captured on **2026-09-08**. Commands use the documented
`/seo` shorthand; Martin invokes them as `/claude-seo:seo …`. Reviewer corrections
below qualify the original reports, some of which still contain rejected conclusions.

### 1. Architecture SERP — who appears locally?

`/seo dataforseo serp architecte d'intérieur rennes`

- **Evidence:** `serp-architecte-interieur-rennes-2026-09-08/findings.md` and
  `data/serp-organic-extract.json`. Rennes / fr / desktop; depth 100 requested,
  ten organic results saved in a structured extract.
- **Learned:** architecture competitors, local results, directories and visitor questions.
  Ranking homepages are useful specimens.
- **Jukkai implication:** investigate service clarity and real project proof; these
  results do not choose between an umbrella homepage and a dedicated service page.
- **Limits/corrections:** three local entries precede organic results and three follow;
  not six before the first link. The comparison carousel is separate from organic
  listings. No measured review threshold or ranking cause.

### 2. Architecture keywords — what vocabulary and demand appear?

`/seo dataforseo keywords architecte d'intérieur`

- **Evidence:** `keywords-architecte-interieur-2026-09-08/report.md` and `data/`.
  France Labs: 70/4,842 suggestions, 40/58 related terms; Rennes Google Ads layer.
- **Learned:** estimated monthly `architecte d'intérieur rennes`: 1,000 nationally,
  390 at Rennes city geo; offer vocabulary is incompletely sampled, with substantial
  career-query noise.
- **Jukkai implication:** Rennes acquisition remains relevant; investigate service,
  décoration and B2B needs without making one page per phrase or summing variants.
- **Limits/corrections:** no established 700–900 total local market or 90-day ranking
  promise from KD 0. Series is Aug 2025–Jul 2026. Three batches of ten were recorded,
  but only 29 rows saved; missing keyword unrecoverable because request lists were
  not retained. Two returned rows have unavailable volume, not zero.

### 3. Le Coup de Crayon footprint — which pages rank for which needs?

`/seo dataforseo ranked lecoupdecrayon.com`

- **Evidence:** `ranked-lecoupdecrayon-2026-09-08/report.md`,
  `data/provenance.md`, ranked-keyword and relevant-page JSON/CSV files. France Labs.
- **Learned:** 15 keyword rows show homepage visibility across architecture,
  décoration and aménagement; the latter two phrases include organic #2 results.
- **Jukkai implication:** related needs can share a ranking page. This does not settle
  the architecture/art relationship or require separate décoration pages.
- **Limits/corrections:** database footprint is not site inventory: `/agence/` and
  `/projets/` were verified in the prior session. ETV is modelled traffic, not measured
  visits or money. Homepage retrieval contained unrelated gambling links; cause
  uninvestigated. Do not copy or follow them, or equate rank with quality.

### 4. Galerie SERP — what does broad local discovery include?

`/seo dataforseo serp galerie d'art rennes`

- **Evidence:** `serp-galerie-art-rennes-2026-09-08/findings.md` and
  `data/serp-organic-extract.json`. Rennes / fr / desktop / depth 30 / one page.
- **Learned:** ten organic results mix galleries, editorial/directories, tourism and
  a museum. Divet #2; Laute #3; Oniris #4, also visible through Maps and third parties.
- **Jukkai implication:** explain the selection, buying possibility and visit clearly;
  distinguish commercial-gallery discovery from general cultural outings.
- **Limits/corrections:** no evidence for cheap/easy third-party inclusion, a review
  target, a Divet GBP defect, or an obligatory agenda. PAA questions do not measure
  intent shares; expanded answers/citations were not captured. Root URLs ranking does
  not dictate Jukkai's homepage role.

### 5. Divet SXO — how does a ranking page serve visitors?

`/seo sxo https://www.galeriedivet.com/ "galerie d'art rennes"`

- **Evidence:** `sxo-galeriedivet-2026-09-08/findings.md`, saved HTML and desktop/mobile
  screenshots. Reused run 4's SERP; report records no new API spend.
- **Learned:** saved HTML confirms contradictory hours, substantial imagery and a
  specific artistic specialism. History and actual works provide concrete identity.
- **Jukkai implication:** keep visit facts consistent, make actions accessible, and
  use real authorship/selection as proof. Decide visual priorities deliberately.
- **Limits/corrections:** 37/100 is a plugin judgement, not ranking difficulty;
  Divet already ranked #2. “Achat/vente” addresses buyers AND sellers. Mobile screenshot
  starts the address paragraph. Embedded-map/schema checklist is not a universal
  Google ranking requirement. Reused agenda assumptions are not independent evidence.

### 6. Galerie keywords — how broad is the discovery vocabulary?

`/seo dataforseo keywords galerie d'art`

- **Evidence:** `keywords-galerie-art-2026-09-08/findings.md` and `data/`: suggestions,
  related terms, discarded ideas, Rennes volume, France difficulty, CSVs/provenance.
- **Learned:** 60/561 suggestions and 36 related terms; city phrases are prominent.
  Rennes head term: 260/month France Labs, 70 Rennes Google Ads. Style/medium terms
  do exist in the sample (céramique 1,300; contemporain 260 nationally); precise
  intent still needs checking. Unrelated keyword-ideas output was discarded.
- **Jukkai implication:** retain local gallery discovery and investigate vocabulary
  closer to the actual selection. National discovery is not national targeting.
- **Limits/corrections:** 260 minus 70 is not a measured outside-city audience share.
  Of 20 requested local terms, only the first ten were captured;
  `acheter tableau rennes` is returned WITHOUT volume, not zero. Difficulty has 14 rows, four without
  scores. Local months are Aug 2025–Jul 2026, some sparse. Negative Labs trends do
  not prove art-market contraction or an AI/Maps cause; search loss differs from click
  loss. The 720 local estimate for `exposition rennes` does not establish commercial
  value or its SERP type. No zero-demand exclusion or required agenda is supported.

### 7. Street-art Galerie SERP — does style narrow commercial intent?

`/seo dataforseo serp galerie street art rennes`

- **Evidence:** `serp-galerie-street-art-rennes-2026-09-08/findings.md` and
  `data/serp-organic-extract.json`. Same location/device/depth as run 4.
- **Learned:** public art, tourism and itineraries dominate this capture; no commercial
  gallery-owned organic result in the top ten. M.U.R appears in Maps and organic.
  Two exact organic URLs overlap with run 4 (Beaux Arts and Singulart), verified.
- **Jukkai implication:** artistic style does not automatically identify buying intent.
  Find closer commercial needs/examples before targeting this phrase directly.
- **Limits/corrections:** low overlap suggests different needs, not mandatory separate
  pages. A mural itinerary must earn its business purpose. No ranking-cause or cheaper
  Maps route established; no demand measurement made for this phrase.

### 8. Studio Terrasson GSC — what already attracts search visits?

`/seo google gsc https://www.studioterrasson.fr/`

- **Evidence:** `gsc-studioterrasson-2026-09-08/GOOGLE-API-REPORT-studioterrasson.fr.md`
  and `data/gsc-*.json`. URL-prefix property, web search. Actual inclusive periods
  are 26/88/478 days, despite filenames labelled 28/90/480.
- **Learned:** Aug 11–Sep 5: 14 property clicks / 479 impressions; homepage 12 clicks,
  contact and Waouh one each. Long window: homepage 390 clicks; all page rows total
  447 versus 444 at property level (different aggregation). Apr–Aug monthly clicks
  fall 40→31→24→23→10; cause unestablished. May–Aug impressions fall 938→496.
- **Jukkai implication:** preserve brand recognition and a useful homepage/contact
  route while developing service acquisition and real project proof. Search entry
  and on-site persuasion are different jobs; GSC does not measure enquiry conversion.
- **Limits/corrections:** short-window visible queries explain 0/14 clicks; longer
  query export explains 8/54, all branded. This cannot establish the brand share of
  remaining clicks (privacy omissions and other query limitations). “Converts
  nothing”, “national audience cannot become local clients”, desktop/referral and US
  bot diagnoses are unsupported. 24/37 page rows have zero clicks, but several B2B
  pages do have clicks; the entire professional gallery is not unclicked. Submitted
  sitemap counts are not indexation, nor does zero clicks imply not indexed. Google
  confirms impressions/CTR/position logging problems May 13, 2025–Apr 27, 2026;
  clicks unaffected. Avoid historical CTR/position comparisons spanning that period.
  Current indexation and causes of decline remain open; no technical emergency proved.
- **References checked:** [aggregation](https://support.google.com/webmasters/answer/17011364?hl=en),
  [query omissions](https://support.google.com/webmasters/answer/17011259?hl=en),
  [logging issue](https://support.google.com/webmasters/answer/6211453?hl=en).

### 9. Nantes architecture SERP — what changes in another city?

`/seo dataforseo serp architecte d'intérieur nantes`

- **Evidence:** `serp-architecte-interieur-nantes-2026-09-08/findings.md` and
  `data/serp-organic-extract.json`. Nantes (`1006285`) / fr / desktop; depth 100
  requested, ten organic results saved. Metadata records the location override and
  lookup task; extract states it preserves the wrapper's items, not the full API
  envelope. Cost $0.002 is estimated; reported API charge unavailable.
- **Learned:** carousel at absolute 1, three local entries at 2–4, first organic
  at 5; three further local entries at 8–10. Five business root URLs and five
  directory/editorial organic results, versus three directory results in Rennes.
  Two price questions recur, alongside profession-definition questions; answers
  were not captured. CKTFC appears in both local (#4) and organic (#8) results.
- **Jukkai implication:** homepages are viable search entry pages, but a ranking
  URL does not reveal a site's full architecture or settle Jukkai's page split.
  Pricing/scope explanations remain useful content questions, not mandatory URLs.
  Reviewer retrieved [CKTFC](https://www.lagence-cktfc.com/) on September 8:
  its homepage presents process, residential/professional sections and projects;
  this makes it a useful next SXO specimen, not a validated design model.
- **Limits/corrections (September 8):** fewer displayed reviews do not establish a
  lower entry barrier or isolate proximity's weight. Missing phone/hours in a
  snippet does not establish an incomplete profile. No demand, click distribution,
  first-viewport measurement, or ranking causes were measured. A directory listing
  does not guarantee a visible sitelink. The carousel includes Facebook, so it is
  not nine directory listings. Related searches contain five communes plus the
  department (six geographic extensions); tie-breaking psychology is conjecture.
- **Business classification correction:** the #1 root URL,
  [Créateurs d'intérieur Nantes](https://www.architectes-interieur-nantes.com/),
  links under its own intervention list to Paris, Lyon, Bordeaux and many other
  city domains. The three named Rennes location-page providers are absent from
  this top ten; “no national/multi-city players” and “five local independents”
  are unsupported. Root URL shape is not evidence of a single-city business.
- **Rules checked:** [Google local ranking](https://support.google.com/business/answer/7091?hl=en)
  names relevance, distance and prominence without establishing a review threshold.
  [Doorway policy](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse)
  supplies no safe page-count or unique-content percentage: reject the report's
  “5–8 commune pages is safe” inference. A later service page ranking would show
  another viable type, not falsify the observation that homepages can rank.

## Evidence rules and tool roles

- DataForSEO gathers focused evidence; SXO examines page/search fit; clustering tests
  possible page boundaries. They can share data. Scores, personas, article templates,
  word counts and overlap thresholds are tool judgements, not Google rules. Cluster's
  branded-query exclusion cannot govern the Studio Terrasson transition.
- Geography inside a phrase differs from measurement geography: country-level Labs,
  city SERPs and local Google Ads volumes answer different questions. Missing values
  are not zero. Follow the SEO workspace's request/response reconciliation and cost
  rules; estimated charges are not billed amounts.
- Saved “raw” files may be filtered/reconstructed extracts. Preserve that boundary
  and measurement dates. Reusing a capture is not independent corroboration. Standard
  GSC geography is country-level, not city-level; impressions also depend on visibility.
- Check the [command reference](https://github.com/AgriciDaniel/claude-seo/blob/main/docs/COMMANDS.md)
  and installed workflows under
  `/home/martin/src/pro/seo/vendor/claude-seo-marketplace/claude-seo/`
  before recommending unfamiliar syntax. Do not assume a documented endpoint works.

## Updating this log

After each reviewed run, **in the same session before handoff**:

1. Read report and supporting evidence; reconcile material claims.
2. Add a short entry: question/command, source/scope, learning, Jukkai implication,
   limits/corrections. Mark unreviewed runs explicitly.
3. Refresh the synthesis and next discussion. Separate Martin's decisions from agent
   recommendations. Correct existing entries rather than leaving competing claims;
   date later corrections. Link approved decisions to their tracker records.
4. Keep detail in reports and superseded wording in git history. Keep this an index,
   not a full report collection or a second strategy document.

**Earlier source:** `audit-studioterrasson-2026-07-12/FULL-AUDIT-REPORT.md`, with
`findings/` and `data/`, is historical evidence, not Jukkai strategy. The
[site-planning inquiry](site-planning-inquiry.md) holds the broader framing and
old-site source pointers; this log holds continuing research status.
