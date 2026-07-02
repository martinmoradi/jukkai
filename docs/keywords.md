# Jukkai keyword and SERP research

**Phase 1 deliverable. Live SERP refresh run July 2, 2026.** Originally read
`docs/foundation.md` v1.1 (frozen) and treats
`docs/source-material/seo-digital-performance-audit.md` (March 2026) as a stale
baseline. After reconciliation, `foundation.md` v1.2 incorporates the title-pattern
amendment flagged here. This document is evidence plus per-cluster recommendations;
it feeds Phase 3 (sitemap and content matrix). It does not write the sitemap.

**Foundation check:** nothing found in this refresh overturns `foundation.md`. The
one-canonical-Rennes-service-page rule survives contact with the live SERPs (see
section 3). One narrow title-pattern amendment was accepted after Phase 1: title tags
are keyword-first on all acquisition surfaces, not only on the core service page.

## 1. Method and confidence

- Three parallel research passes over 9 clusters, ~25 French queries, with direct
  fetches of ~30 ranking pages to capture exact titles, H1s, URL slugs, page formats,
  and published prices. All ranking sets and on-page data below were verified live on
  July 2, 2026 unless marked inferred.
- **Limitation:** searches ran through a US-endpoint tool, not a geolocated google.fr
  session. Organic result sets are reliable; **SERP features (local pack, AI
  Overviews, People Also Ask) were not directly observable.** Local-pack claims below
  are inferred from query class and result composition. Recommend a quick geolocated
  spot-check from France on the two launch clusters before the Phase 4 SEO spec
  freezes, but do not block Phase 3 on it.
- No public search-volume figures surfaced for any cluster. Volume statements are
  relative, inferred from SERP composition (thin or directory-only results signal low
  volume) and from the old site's Search Console baseline (the audit's impression
  counts remain the best absolute numbers we have).

## 2. What changed since the March 2026 baseline

The audit's picture is directionally intact but the market moved:

- **Two national programmatic networks entered the Rennes SERP:** Ynspir (a
  region/département/ville page hierarchy with a named local architect and on-page
  pricing) and Notes de Styles expanded its agency-page network (its dept and city
  pages take 3 of 10 slots on the Ille-et-Vilaine query). The SERP is being worked
  systematically, not just by local studios.
- **The pricing content play is now actively contested locally.** Olivia Ballet
  (updated Feb 2026) and Gaële Boutaud (published April 2026) both run dedicated
  "combien coûte un architecte d'intérieur à Rennes" articles that rank. In March this
  was an open opportunity; it now has incumbents.
- **New local entrants on the core query:** Atelier LŌ (dedicated
  `/architecte-interieur-rennes/` landing page with FAQ and published pricing) and
  Alchimie d'intérieur. **Slipped:** Et Maintenant Design is gone from the top set;
  Krealoft slipped off the core query top 10 (still #1 for the "agence" variant).
- **Incumbent weakness, likely temporary:** Le Coup de Crayon (current #1) serves
  injected casino spam in its page content, which reads as a hacked site; idkrea.com
  404'd to direct fetches; k-berhault.fr ranks for pricing with an under-construction
  placeholder. The top of the SERP is less solid than it looks.
- **studioterrasson.fr status unchanged:** live, indexed, absent from every
  non-branded top 10 across all clusters. "Jukkai" has zero indexed connection to the
  studio yet. The branded pipeline and the 301 map remain the migration-critical
  assets.

## 3. The foundation rule, re-tested

**One canonical Rennes service page at launch: confirmed by live evidence.**

- The winning format on the core query is exactly that page: a dedicated
  `/architecte-interieur-rennes/` landing page (Atelier LŌ, Ynspir, Notes de Styles)
  or a fully optimized homepage (solo studios). Nobody wins with page sprawl at
  launch.
- The competitors who do run commune-page networks (Subtil d'Intérieur, Homely Made)
  run them as thin templates: page-per-commune times page-per-keyword. That is the
  doorway soup the foundation bans, and none of those pages beat the honest dedicated
  pages on the core query. The foundation's post-launch tier of 2-3 honest commune
  pages, each carrying a real project, remains the right answer.
- The clusters that genuinely need their own surface (bureaux, cost content) are
  different intents, not geo duplicates, and the foundation already provides for both
  (sections 7 and 8 of foundation.md).

## 4. Cluster-by-cluster findings and rulings

### 4.1 Architecte d'intérieur Rennes (core acquisition cluster)

- **Intent:** commercial hiring, with a directory-browsing overlay (~70% studio
  sites, ~30% directories). The "meilleur architecte d'intérieur rennes" variant is
  100% directories and listicles; no individual studio ranks for it.
- **SERP type:** classic local-service query; map pack virtually certain on google.fr
  (inferred). Organic mixes studio pages with Houzz and Pages Jaunes.
- **Who ranks (July 2026):** Le Coup de Crayon (#1, compromised site), Houzz, Ynspir
  (new), Pages Jaunes, IDKREA, Gaële Boutaud, Nolwenn Kevell, Notes de Styles,
  Atelier LŌ (new), Alchimie d'intérieur (new). "Agence" variant: Krealoft #1, then
  Espaces Intérieurs, Entiité.
- **Title pattern:** keyword front-loaded, brand at the end. Examples: "Architecte
  Intérieur Rennes | NOLWENN KEVELL"; "Architecte d'intérieur Rennes | Rénovation &
  Design | Atelier LŌ"; "Architecte d'intérieur Rennes 35 - Agence Notes de Styles".
- **Content format that wins:** dedicated city service page or optimized homepage,
  with project gallery, geo-coverage section (Nolwenn Kevell names Le Rheu,
  Saint-Grégoire, Cesson-Sévigné, Bruz, Vitré...), FAQ block, and increasingly
  on-page pricing (Atelier LŌ: 80€/h, 8-12% of works; Ynspir: 30-80€/m²).
- **Page owner:** the canonical service page `/architecte-interieur-rennes/`, exactly
  as foundation section 8 specifies. Body should carry the "agence d'architecture
  intérieure" vocabulary naturally; "meilleur" queries are won via GBP reviews, not a
  page.
- **Priority: P0, launch.** This is the cluster the site is structurally built
  around.

### 4.2 Prix / tarif architecte d'intérieur Rennes

- **Intent:** informational budget research with strong pre-hiring undertone. The
  geo-modified variants behave commercially (local studios rank); the generic
  "combien coûte un architecte d'intérieur" is owned by national guides (hemea,
  Travaux.com, Camif Habitat, prix-pose.com) and is not worth chasing head-on.
- **SERP type:** textbook AI Overview / featured-snippet territory (inferred).
  Ranking pages are visibly built for answer extraction: price tables, tiered
  breakdowns, FAQ blocks, dated titles ("en 2026").
- **Who ranks locally:** Olivia Ballet (blog, updated 02/2026), Gaële Boutaud (blog,
  04/2026), Atelier LŌ (pricing on its service page), lead-gen sites, plus one stale
  index entry (k-berhault.fr, placeholder site).
- **Published price consensus for Rennes:** roughly 80-120€/h for consults, 40-120€/m²
  for études, 8-15% of works budget for mission complète. Entry offers: Olivia Ballet
  visite conseil 120€ TTC; Rhinov from 99€/room online.
- **Page owner:** a dedicated cost guide, "Combien coûte un architecte d'intérieur à
  Rennes ?", cross-linked with the service page, with real euro figures per offer
  (foundation already mandates public pricing and names this exact content). Format:
  tables, per-offer tiers, FAQ schema. URL recommendation:
  `/combien-coute-architecte-interieur-rennes/`. The Prestations page carries the
  ranges; the guide carries the query.
- **Priority: P0, launch or immediate fast-follow.** This was the only non-branded
  query the old site ever nearly ranked for (position 9-12, 459+185 impressions on
  the two tarif variants), demand is proven, and two local competitors moved into the
  gap in 2026. Every month unpublished is share ceded to them.

### 4.3 Architecte d'intérieur Ille-et-Vilaine / 35

- **Intent:** directory-browsing dominant. Hiring intent secondary.
- **SERP type:** departmental radius is too wide for a strong local pack (inferred
  weak or none). Organic is aggregator-shaped: Pages Jaunes, Notes de Styles' dept
  page network, lead-gen directories, "Top 20" listicles.
- **Who ranks:** Pages Jaunes #1, Notes de Styles (2-3 slots via its dept/city
  hierarchy), votre-architecte-interieur.fr, Archidvisor, Obat, 123Devis.
- **Page owner: nobody. No dedicated page, at launch or later.** Competing here means
  building a programmatic dept-page hierarchy, which is network and directory
  territory and doorway-adjacent for a single studio. Handle as supporting vocabulary
  in the service page body ("Ille-et-Vilaine", "35", "la région rennaise"), per
  foundation section 8, and via the GBP service area.
- **Priority: P3, in-page vocabulary only.**

### 4.4 Architecte intérieur Châteaugiron

- **Intent:** hiring, but a near-zero-volume micro-local SERP. Result slots go to
  directories, painters, and template commune pages from elsewhere. Classic thin-SERP
  signature.
- **Who ranks:** Pages Jaunes, Houzz, Travaux.com, then SAAC (a real
  Châteaugiron-based architecte, but positioned on construction/extension, not
  interior architecture), Subtil d'Intérieur (Rennes studio, template commune page),
  Homely Made (Tresbœuf décoratrice, template commune page). The only
  Châteaugiron-addressed "architecte d'intérieur" listing (AJ Décoration) is a
  directory ghost: no website, no phone, no reviews.
- **Nobody owns this SERP, and the local pack is nearly empty.** A
  Châteaugiron-addressed GBP named "Jukkai by Crystelle Terrasson" with primary
  category Architecte d'intérieur should take the map pack for this query
  essentially by default, and the physical anchor already permeates the site
  ("à Châteaugiron, à 20 minutes de Rennes").
- **Page owner at launch: the GBP plus existing pages (homepage, contact, shop), not
  a dedicated page.** Post-launch, Châteaugiron is one of the foundation's 2-3 honest
  commune pages, shipped when it can carry a real project. Given Jukkai will
  physically be there, it is the natural first commune page.
- **Priority: P1 for the GBP and citations (launch, near-free win); P2 for the
  commune page (post-launch, first in the tier).**

### 4.5 Décoratrice / décorateur d'intérieur Rennes

- **Intent:** clear hiring intent, healthy practitioner-led SERP. Google treats
  décorateur/décoratrice/décoration as one cluster but keeps it **separable from the
  architecte d'intérieur SERP**: only 3-4 of the top 10 overlap (Gaële Boutaud,
  IDKREA, Alchimie, Et Maintenant Design).
- **Who ranks:** mostly solo décoratrices with optimized homepages: Marjorie Dufée
  (exact-match domain decorateur-interieur-rennes.com), Solène Montecot, Stéphanie
  Startchenko, Nathalie Bossard (the one UFDI member), Marion Richard. Dual-positioned
  studios enter via dedicated keyword pages (Alchimie:
  `/decorateur-d-interieur-rennes.html`).
- **Title pattern:** uniformly "Décoratrice d'intérieur à Rennes [+ zone] - [Name]",
  H1 matching.
- **Competitive read:** this set is structurally weaker than the architecte set
  (solo practitioners, mostly no affiliation, no UNAID/UFDI credentials except
  Bossard). The foundation's premium-inversion frame ("une mission déco avec
  l'exigence d'une architecte d'intérieur") is precisely the differentiator nobody on
  this SERP can copy.
- **Page owner:** at launch, the mission déco offer on the Prestations page plus the
  "architecte d'intérieur ou décorateur ?" FAQ content carry the intent. Post-launch,
  a dedicated page targeting "décoratrice d'intérieur Rennes" with the
  premium-inversion frame is the single strongest new-page candidate in this whole
  document: separable SERP, weak incumbents, proven dual-positioning format, and real
  overlap with the offer ladder. It is one honest intent page, not a doorway.
- **Blocker:** the déco offer's exact name, price, and scope are blocking-for-copy
  with Crystelle, and she holds a veto on the frame. The page cannot be written
  before that clears.
- **Priority: P1, post-launch (first content sprint after the déco offer is
  validated).**

### 4.6 Conseil déco / coach déco Rennes

- **Intent:** real but small query with a partially distinct SERP. "Coach déco
  rennes" has its own result set; "conseil déco" partially folds into the décoratrice
  results, padded with paint shops and Rhinov (national, from 99€/room online).
  Padding by paint retailers is a low-volume signal.
- **Who ranks:** Amva Déco (dedicated coaching page, 350€/pièce published), Subtil
  d'Intérieur (template page), Casa Nostra Décoration, Rhinov's programmatic city
  page, plus décoratrices carrying over from 4.5. **No architecte d'intérieur frames
  conseil déco as a premium offer on this SERP.** Near-zero overlap with the core
  architecte SERP.
- **Format that wins:** dedicated service page with keyword slug and visible pricing
  (99-350€ range).
- **Page owner:** at launch, a named entry-level offer on the Prestations page
  (foundation offer #1). Post-launch, if the validated offer name matches this
  vocabulary, fold the intent into the décoratrice page (4.5) or give it a light
  dedicated page with the price published. Do not build both a "décoratrice" and a
  "conseil déco" page unless the SERPs still look distinct at that point; start with
  one and measure.
- **Priority: P2, post-launch, gated on the same offer validation as 4.5.**

### 4.7 Rénovation intérieure Rennes

- **Intent:** contractor-seeker. Structurally different buyer from "architecte
  d'intérieur rennes": zero overlap in ranking domains between the two SERPs except
  one page.
- **Who ranks:** national franchise/broker networks (illiCO travaux, La Maison Des
  Travaux, Camif Habitat, Avenir Rénovations) and local artisan groups
  (Rennes Rénovation, Renov+, BATIZH). Ranking pages sell devis 48h, €/m², RGE,
  MaPrimeRénov', multi-trade coordination. A studio service page would be an outlier
  format here and should not be attempted.
- **The one door in:** Atelier LŌ ranks top-5 on "rénovation appartement rennes" with
  a long-form guide ("Rénovation Appartement Rennes : Guide Complet, Budget et Étapes
  Clés (2026)"), not a service page. Informational entry works; commercial entry does
  not.
- **Page owner:** no service page, ever, for this cluster. Capture the adjacent
  long tail through: (a) portfolio dual naming, already canon ("Rénovation maison
  années 30, Rennes" subtitles and URLs), and (b) one post-launch guide in the
  Atelier LŌ format ("Rénover un appartement à Rennes : budget, étapes, et quand
  prendre un architecte d'intérieur") that funnels to the service page.
- **Priority: P2 for the portfolio dual naming (launch, already mandated); P3 for the
  guide (post-launch content calendar).**

### 4.8 Aménagement bureaux Rennes (B2B)

- **Intent:** B2B decision-maker seeking an office fit-out partner. A genuinely local
  SERP: Brittany firms dominate; the feared national players (Kardham, Moore Design,
  Factory, CDB) do not appear; nationals only enter via dedicated Rennes landing
  pages (Fairspace) or a region page (Tétris).
- **Who ranks:** head terms are owned by design & build and furniture-led firms
  (Fairspace, Ouest Bureau, BOS Aménagement, Spatio). But conception-side firms hold
  rankings too: Tertiaire.bzh (pure conception and maîtrise d'oeuvre) and Othéa rank
  with homepages, and the "architecte bureau rennes" variant surfaces architects with
  dedicated pages (Coquard Colleu `/architecte-bureaux-rennes.html`).
- **Title pattern:** "Aménagement de bureaux à Rennes" / "Agencement de Bureau à
  Rennes en Ille et Vilaine (35)", keyword-first. Format: dedicated B2B city service
  page with methodology steps, client references, FAQ.
- **Page owner:** the espaces professionnels page under Prestations (own URL), which
  foundation section 6 already mandates. Target "aménagement de bureaux Rennes" and
  the "architecte bureau Rennes" variant; position honestly on conception and
  prescription (the Tertiaire.bzh precedent proves that positioning ranks). Phase 3
  recommendation: use `/amenagement-bureaux-rennes/` as the public slug, grouped
  under Prestations in navigation and breadcrumbs. This gives the page the keyword
  shape the SERP rewards without creating a top-level nav slot.
- **Dependency:** nameable B2B references are pending Crystelle's selection; the page
  can launch with process and credentials and add references when cleared.
- **Priority: P1, launch** (the page exists anyway per foundation; making it target
  the cluster costs nothing extra).

### 4.9 Art shop Châteaugiron / Rennes

- **Finding: there is no search demand shaped like "art shop", and no competitor
  occupies that positioning anywhere in the area.** "Boutique d'art rennes" is
  interpreted by Google as art-supplies retail (Rougier&Plé, Le Géant des
  Beaux-Arts). "Galerie d'art rennes" is owned by established classic galleries
  (Divet, Laute, Oniris, MICA) plus marketplace aggregators (Singulart, Artmajeur).
  "Galerie d'art châteaugiron" is a tiny SERP: one weekend-only contemporary gallery
  opened in 2025 (OH! Arts etcétéra), municipal venues (Les 3 CHA, La Boutique du
  Donjon), and tourism listings.
- **SERP type:** map-pack and tourism-discovery territory. Galerie Laute ranks with a
  title tag of just "Galerie Laute": this cluster runs on entity and GBP strength,
  not on-page SEO.
- **The copy-ban tension, resolved structurally:** the words galerie/boutique are
  banned in Jukkai copy, so the shop page can never chase "galerie d'art" queries in
  its visible text. The vocabulary matching happens in the layers that are not copy:
  the GBP secondary category (art gallery equivalent, already canon), LocalBusiness/
  ArtGallery schema on the shop page (Phase 4 decision), and third-party listings
  (Pays de Châteaugiron tourism, Pages Jaunes, Mappy) which all rank on this SERP and
  will describe Jukkai in their own words.
- **Page owner:** the shop page, doing its foundation job (visitability, the scene,
  the thesis line, the artist block), optimized for the brand query and Châteaugiron
  discovery, not for art-buying keywords. No art-SEO content play at launch or
  post-launch until real demand shows in Search Console.
- **Priority: P3 for organic search; P1 within the launch citations checklist (GBP
  secondary category, tourism listing, Pages Jaunes entry), which is where this
  audience actually finds physical places.**

## 5. Launch versus later

### Launch keyword set (structures the Phase 3 sitemap)

| Cluster | Surface | Priority |
|---|---|---|
| Branded (jukkai, crystelle terrasson, studio terrasson, + "anciennement") | Homepage, à-propos, 301 map | P0 |
| architecte d'intérieur Rennes (+ agence variant) | Canonical service page `/architecte-interieur-rennes/` | P0 |
| tarif / prix / combien coûte architecte d'intérieur Rennes | Dedicated cost guide + ranges on Prestations | P0, launch if possible; immediate fast-follow at latest |
| aménagement bureaux Rennes / architecte bureau Rennes | Espaces professionnels page at `/amenagement-bureaux-rennes/`, grouped under Prestations | P1 |
| architecte intérieur Châteaugiron | GBP + physical-anchor copy sitewide (no dedicated page) | P1 |
| architecte d'intérieur ou décorateur ? | FAQ on service page / cost guide | P1 |
| Ille-et-Vilaine, 35, région rennaise | Body vocabulary on service page | P3 |
| rénovation maison/appartement Rennes (long tail) | Portfolio dual naming (subtitles + URLs) | P2 |

### Post-launch keyword set (feeds the content calendar, in order)

1. **Décoratrice d'intérieur Rennes** page with the premium-inversion frame. Gated on
   Crystelle validating the déco offer name, scope, and frame. Strongest post-launch
   opportunity in this research.
2. **Conseil déco / coach déco Rennes**: fold into the décoratrice page or a light
   priced page, once the entry offer is named. Decide on live SERP shape at that
   point.
3. **Châteaugiron commune page**, first of the honest commune tier, shipped with a
   real local project as proof. Cesson-Sévigné and Le Rheu follow under the same
   proof rule.
4. **Rénovation guide** in the Atelier LŌ format ("Rénover un appartement à Rennes:
   budget, étapes, quand prendre un architecte d'intérieur"), funneling to the
   service page.
5. **Cost-guide maintenance**: refresh the tarif article with a dated title each year
   ("en 2027"); the ranking incumbents all do this.

### Never (evidence says no)

- Ille-et-Vilaine departmental page (directory territory).
- Rénovation service page (contractor SERP, wrong buyer, wrong format).
- "Meilleur architecte d'intérieur" chasing (listicle SERP; win it via GBP reviews).
- Art-buying SEO content (no matching demand; brand, GBP, and tourism citations do
  this job).
- Commune-page networks beyond the honest 2-3 tier (the Subtil/Homely Made template
  pattern is the doorway soup the foundation bans, and it loses to honest pages
  anyway).

## 6. Notes for Phase 3

1. **Sitemap consequence:** the launch set implies exactly three keyword-bearing
   commercial surfaces (service page, cost guide, espaces professionnels) plus the
   brand pages. That matches the foundation. No new page types are needed. If the cost
   guide misses launch, Phase 3 should still reserve its URL and content-matrix row so
   it ships as the first fast-follow.
2. **Accepted foundation amendment: title pattern.** Foundation v1.2 now records the
   Phase 1 finding: keyword-first titles apply to acquisition surfaces (service page,
   cost guide, B2B page), while brand-first titles apply everywhere else. This is an
   SEO surface clarification, not a change to the brand architecture.
3. **FAQ blocks are now table stakes** on the winning pages of clusters 4.1, 4.2, and
   4.8. The content matrix should carry an FAQ row for each of the three commercial
   surfaces (and Phase 4 should pair them with FAQ schema).
4. **On-page pricing is spreading** on the core SERP (Atelier LŌ, Ynspir publish
   rates on their landing pages). The foundation's public-pricing stance is not just
   compatible with the SERP; it is becoming the norm. The service page should carry
   at least entry ranges, not push everything to the cost guide.
5. **GBP is a disproportionate lever** in this research: it wins Châteaugiron nearly
   by default, it is the only play for "meilleur" queries, and it carries the art
   shop's entire local discovery. The Phase 4 local-citations checklist should be
   treated as a launch deliverable with the same weight as a page.
6. **Watch item:** Ynspir and Notes de Styles are running programmatic plays into
   this market. If a future check shows them taking the map pack or multiple organic
   slots, the honest commune tier gains urgency. Recheck the core SERP at launch and
   at +6 months.
