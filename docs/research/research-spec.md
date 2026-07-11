# Phase 1 v2 research spec

**Status: draft, pending Martin's approval. Approving it resolves issue #73 and
graduates the run tickets from the reset map (#71).**

Produced July 11, 2026 from a grilling session with Martin. Inputs read:
`docs/strategy/foundation.md` v1.8, `docs/operations/method.md`, the March 2026
audit (`docs/source-material/seo-digital-performance-audit.md`), and the archived
July research (`docs/archive/2026-07-reset/research/`, provenance only).

This document specifies the research runs that replace the failed July 2026
Phase 1 engine: what runs, against what data, answering which question, with
which human touchpoints. It does not interpret findings. Interpretation happens
in the translation grill (section 9).

## 1. Why the July engine failed, and what this spec changes

The July research was archived because its method could not support its claims:

1. SERPs were fetched from a US endpoint. Local pack, AI Overviews, and People
   Also Ask were inferred, never observed, for a business whose main battleground
   is the Rennes map pack.
2. No absolute search-volume data existed anywhere. Volume claims were relative
   guesses from SERP composition.
3. Claims were one-shot and unreproducible. No raw data was saved, so nothing
   could be re-checked or diffed later.
4. Strategy conclusions were produced inside autonomous research runs and entered
   the record with the same authority as measurements.

The fix is a paid, geolocated data layer (DataForSEO plus the Google APIs, wired
through the claude-seo skill suite), discrete scripted runs instead of one big
derive pass, and a hard boundary between observing and deciding.

## 2. Standing rules

Only two rules are enforced on every run. Everything else rides on the
claude-seo skill's own machinery (structured artifacts, source labels,
cost guardrails), spot-checked on the first run.

1. **French geolocation on every SERP-based call.** The claude-seo skills
   default to US/English (`location_code=2840`, `language_code=en`), and their
   free WebSearch fallback has no location control at all. Every DataForSEO call
   must pass `language_code: "fr"` and a French location:
   `location_name: "Rennes,Brittany,France"` for organic SERPs, or
   `location_coordinate: "48.1173,-1.6778,12z"` for maps work. Verify the exact
   location codes with the `serp_locations` lookup during the #74 smoke test.
   A SERP claim without French location parameters in its provenance is invalid.
2. **Research observes, translation decides.** Runs answer their pre-declared
   question and may flag tensions with the foundation. They may not conclude
   positioning, messaging, or strategy. Meaning is made in the translation
   grill with Martin adjudicating.

One recurring correction, recorded here so it stops resurfacing: Châteaugiron is
the physical pin (NAP, GBP address, visit info), not a target market. All
acquisition research targets Rennes and la région rennaise. The interesting
Châteaugiron question is inverted: how far a Châteaugiron-pinned profile can
reach into Rennes-metro map packs (Run C).

## 3. Data layer (issue #74 contract)

- **DataForSEO: yes.** $50 minimum deposit, standard cost preset ($10/day,
  $0.50 approval threshold) via `dataforseo_costs.py`. Rationale: AFK runs must
  be able to complete unattended (a Run B day can legitimately spend a few
  dollars), and the runaway protection is already double: the daily cap plus
  the deposit itself as a hard ceiling. The full program below is estimated
  well under $20 total. Acceptance: one live
  `serp_organic_live_advanced` call for "architecte d'intérieur rennes" with
  French parameters, returning verifiably French results.
- **Google APIs: Tiers 0, 1, and 2** on the existing studioterrasson.fr
  properties (API key; service account granted in Search Console; GA4 viewer).
  Skip Tier 3 (Ads developer token): DataForSEO resells the same Google Ads
  volume data as exact numbers without the approval process.
- **Firecrawl: no subscription.** Competitor sites in this market are small and
  static; the built-in fetcher suffices. The free tier (500 credits/month) is
  the escape hatch if a specific target turns out to be an unreadable SPA.
- Credentials live in `~/.config/claude-seo/`, never in the repo. The #74
  resolution records credential locations, the budget preset, and the smoke-test
  evidence.

## 4. Keyword territories

Whole territories are the one thing machine expansion cannot invent, so they are
seeded by hand from the foundation. Coverage rule: every foundation audience and
every offer rung must map to at least one territory. Current list:

| #   | Territory       | Notes                                                                                                                                                                                                                                |
| --- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Core service    | architecte d'intérieur + rennes/agence variants                                                                                                                                                                                      |
| 2   | Décoration      | décoratrice, mission déco, conseil déco; exists because of the foundation §7 ruling; research question is whether demand justifies its own page and when                                                                             |
| 3   | Price and trust | combien coûte, tarif, honoraires, "architecte d'intérieur ou décorateur"                                                                                                                                                             |
| 4   | Project types   | rénovation maison/appartement, aménagement, regional flavors (longère, maison années 30); national-topic ban applies as a pruning rule                                                                                               |
| 5   | B2B             | aménagement bureaux, agencement commerce/restaurant, neuro-architecture niches (crèche, cabinet médical)                                                                                                                             |
| 6   | Galerie         | galerie d'art rennes + châteaugiron pin; an asymmetric bet: measure demand AND competitive weakness; if ranking is cheap the galerie page earns its keywords as bonus discoverability without competing with the architecture center |
| 7   | Local anchor    | Châteaugiron hygiene terms plus the 2-3 honest communes from foundation §8; anchor layer, not acquisition                                                                                                                            |
| 8   | Branded         | crystelle terrasson variants, jukkai; migration protection, not acquisition                                                                                                                                                          |

Expansion is the machine's job (keyword ideas, related searches, PAA harvest,
competitor `ranked_keywords`). A **surprise sweep** is mandatory: competitor
keywords falling outside all seeded territories get clustered and surfaced as
candidate territories with volume attached. If a candidate is real, the question
for Crystelle is written from the measurement ("there is demand for X and two
competitors serve it; is that work you want?"), never from a brainstorm.

## 5. Geography rings

Three rings, three different epistemic contracts. Blurring them is how research
becomes untrustworthy again.

| Ring | Scope                                                     | Question                                                                            | Findings may                    |
| ---- | --------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------- |
| 1    | Rennes métropole                                          | Who wins, at what volumes, with what pages; where are the gaps                      | Amend the foundation (evidence) |
| 2    | 3-4 larger French cities (Martin curates the list)        | What winners in harder markets do that Rennes has not seen yet; counterexample hunt | Propose hypotheses              |
| 3    | International + cross-vertical specimens (Martin curates) | What the editorial ceiling looks like; what mature versions of the category do      | Inspire only                    |

Discovery is machine work in rings 1 and 2: the geolocated SERP is the
competitor list, expanded via `competitors_domain`, `ranked_keywords`, and
`bulk_traffic_estimation`. Martin curates cities and query variants up front,
then picks teardown shortlists from evidence tables. Ring 3 is hand-curated by
design (section 8, Run E): its selection criterion is craft, which no SERP query
can surface.

## 6. Epistemic model

Ranking causes are not observable, in Rennes or anywhere. The research therefore
never claims "why" a site ranks; it classifies every candidate obligation into
three bands:

- **(a) Documented mechanism.** Google-stated or structural (title/H1 semantics,
  page-type intent match, schema, CWV). Treated as required regardless of what
  the local field does.
- **(b) Universal in sample, unproven.** Everyone in the Rennes top-10 does it,
  cause unknown. Sent to the ring 2 counterexample hunt. Survives there too:
  probably real. Contradicted by a well-ranking counterexample: demoted.
- **(c) Varies across winners.** Demonstrably free. Editorial freedom lives here.

Two confound controls are mandatory in every teardown:

- **Domain authority columns.** Every top-10 row carries backlink profile, domain
  age, and footprint size next to its on-page traits, so weak-page/strong-domain
  winners do not teach bad on-page habits.
- **Population bias.** A field that is all cheap WordPress cannot prove that a
  crafted editorial site would lose. That question is answered by rings 2 and 3,
  never by ring 1 alone.

One standing capture rule alongside them: **reviews are a column of every
competitor teardown row** (rings 1 and 2). Counts and velocity are captured as a
ranking signal; the review text is captured as customer voice, exact quotes with
sources. There is no standalone audience-research run in this pipeline: customer
voice accumulates from this column plus the question phrasings the SERP work
harvests (PAA, tarif-query composition), and the foundation's personas stay
canonical unless the translation grill amends them from that evidence or from
Crystelle's real lead handling. Run E is exempt: specimen reviews from other
markets and verticals say nothing about Rennes clients.

## 7. The runs

Each run becomes one `wayfinder:task` issue under #71, executed in a fresh
context, mostly AFK. Done means the run's question is answered with stated
confidence, not that a document was produced. All outputs land in
`docs/research/` with raw API artifacts saved alongside, dated. Each output doc
carries a one-line recheck trigger (what event or date invalidates it).

### Run A: old-site migration assets + case-study baseline

- **Question:** What exactly transfers from studioterrasson.fr (URLs, demand,
  authority), and what are the dated "before" numbers for the migration case
  study?
- **Data:** Google Tiers 0-2; a few cents of DataForSEO backlink calls; crawl.
- **Work:** URL inventory proven complete by four-source cross-check (crawl ×
  XML sitemap × GSC indexed pages × GA4 landing pages); full GSC query/page
  export (branded/non-branded split, impression inventory per cluster); backlink
  profile of the old domain; `seo-drift baseline` on key pages; case-study
  snapshots (CrUX field + lab CWV, observed geolocated SERP positions for the
  commercial cluster, GA4 export extending the 2025 baseline, dated full-page
  screenshots).
- **Explicitly not:** any re-diagnosis of the old site's content. The March audit
  verdict ("replace it") is accepted; rigor goes to what survives the migration.
- **HITL:** none.
- **Feeds:** the 301 redirect map, the post-migration drift check, the case
  study, and demand triangulation for Run B.

### Run B: demand map

- **Question:** What does search demand around the eight territories actually
  look like in the Rennes region, in numbers, and how does it cluster into
  pages?
- **Data:** DataForSEO (keyword ideas/related, volumes, difficulty, SERP overlap
  clustering), PAA harvest from geolocated SERPs, competitor `ranked_keywords`.
- **Work:** seed the eight territories; machine expansion; surprise sweep;
  volumes and difficulty on everything; `/seo cluster` with the DataForSEO path
  forced French; triangulate volume claims against Run A's own-property
  impression data where clusters overlap.
- **HITL pause:** Martin prunes the expanded list once, with volume data in
  front of him, before clustering.
- **Feeds:** the keyword architecture; Run C's money-cluster list; matrix
  keyword targets.

### Run C: Rennes field study

- **Question:** Per money cluster, what do the actual winners share (three-band
  classification), what SERP features gate each query, and how does the map
  pack behave across the metro?
- **Data:** DataForSEO SERP + Labs + maps; `/seo sxo` per cluster.
- **Work:** top-10 teardown per money cluster with domain-authority columns and
  three-band obligations; SERP-feature composition per query (does a local pack
  appear on the core query, the tarif queries, the B2B queries; AI Overview
  presence); GBP layer: geo-grid centered on Rennes (not Châteaugiron)
  measuring how peripherally-pinned competitors (Le Rheu, Cesson, Vern) reach
  into metro packs, plus a winning-profile signal table (review counts and
  velocity, categories, photos) and the review-voice harvest per the standing
  column rule in section 6. Roughly $0.10 per keyword per 7x7 grid.
- **HITL pause:** after the discovery sweep produces the candidate table, Martin
  picks the teardown shortlist; the run resumes.
- **Feeds:** matrix obligations; the website-vs-GBP investment weighting; the
  eventual GBP execution track (out of scope here, evidence only).

### Run D: cross-market playbook

- **Question:** What do winners in harder French markets do that the Rennes
  field has not seen yet, and which of Run C's band-(b) obligations survive
  contact with markets that contain counterexamples?
- **Data:** DataForSEO, geolocated per city.
- **Work:** same discovery-then-teardown shape as Run C in 3-4 French cities;
  explicit counterexample hunt: for each band-(b) obligation, do editorially
  strong sites rank without it? Promote or demote accordingly.
- **HITL pause:** Martin curates the city list before the run and the teardown
  shortlists mid-run.
- **Feeds:** hypothesis layer for the translation grill; band promotions and
  demotions for the matrix.

### Run E: editorial ceiling study

- **Question:** Can craft-heavy, editorial sites rank for local money queries,
  and when they do, how do they carry the machine layer?
- **Data:** Martin's hand-curated specimen list (10-15 sites from Awwwards, FWA,
  and similar archives; craft-heavy studios in service verticals with local
  demand; French specimens weighted; cross-vertical allowed: architecture,
  landscape, photography); DataForSEO for positions and backlinks.
- **Work per specimen:** identify its local money query; check its actual
  geolocated position; if it ranks, tear down how the machine layer carries it
  under the editorial surface; pull backlink profile and domain age to control
  the award-press authority confound (famous must not launder into "editorial
  works").
- **Scope guard:** cross-vertical specimens feed exactly one deliverable, the
  editorial-ceiling evidence file. They never feed page-type consensus or
  matrix obligations.
- **HITL:** the run starts blocked on Martin's specimen list (an evening on the
  award archives).
- **Feeds:** design conviction and the register argument in the translation
  grill.

Dependencies: A and B run independently once #74 provisions. C needs B's
clusters. D needs C's band-(b) list. E waits only on Martin's specimen list.

## 8. Matrix contract

What the content matrix may dictate per page, and what it must leave free. This
is the fix for the July matrix that prescribed block-by-block templates and
cheapened the brand.

**Binding (the obligations half):** page job, primary keyword target, page type
(from SERP consensus), entities and questions to cover, proof obligations, CTA
presence, machine layer (title pattern, URL, H1 semantics, schema).

**Free (the register half):** block order, register and tone, narrative form,
length, visual treatment. Anything in band (c) is free by measurement, not by
courtesy.

Only the acquisition surfaces (per foundation §8: the Rennes service page, the
cost guide, the B2B page) accept keyword-first obligations. Everything else
carries machine-layer hygiene only. Concentration, not saturation.

## 9. Translation grill

A separate HITL session after the runs, its own ticket. Format: the tools draft,
Martin adjudicates.

1. Load the foundation and the evidence files.
2. Use `seo-flow` (Leverage/Optimize stage prompts) and `seo-plan` as drafting
   instruments to generate candidate implications. These skills never run
   autonomously in this pipeline.
3. Grill through candidates one at a time. Each ends in exactly one state:
   accepted foundation amendment (dated, explicit), rejection with recorded
   reason, or question for Crystelle (bucketed in
   `docs/strategy/questions-for-crystelle.md`).
4. Then the messaging reassessment and matrix construction proceed per the map.

## 10. Out of scope and deferred

- GBP and citation execution (evidence gathered in Run C feeds it later).
- A standalone audience/persona study. Customer voice is a standing column of
  every competitor teardown (section 6), not a separate run; personas stay
  foundation-owned and are only revised at the translation grill.
- Messaging, sitemap, and matrix construction themselves (downstream phases).
- Anything requiring Crystelle's input beyond measured questions the runs
  generate.
