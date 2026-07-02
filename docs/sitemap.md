# Jukkai sitemap (Phase 3, IA)

**Phase 3 deliverable, produced July 2, 2026.** Reads the frozen `docs/foundation.md`
(v1.5), `docs/audience.md`, `docs/messaging.md`, `docs/keywords.md`,
`docs/competitors.md`, and `docs/questions-for-crystelle.md`. Mines the old-site
crawl (`docs/reference/studioterrasson/`) and the March 2026 SEO audit as
provisional inventory only, never as independent truth.

Companion deliverable: `docs/content-matrix.md` (the per-page skeleton Phase 4
executes against). This document decides structure; the matrix carries the rows.

Status: **draft pending the Phase 3 short grill** (Martin review, then the critic
pass per the method). Section 9 lists every decision that needs review before this
freezes. Crystelle's launch-portfolio answer (questions file, sitemap bucket #1)
fills matrix rows but does not change this structure: project pages are modular
proof rows, not structural pillars.

Rules inherited and applied throughout:

- `foundation.md` is truth; the §5 tiebreak rule decides every contested slot:
  architecture owns structure, SEO, conversion paths, primary CTA, measurement;
  Jukkai owns the emotional opening, the visual world, place, differentiation.
- `messaging.md` §3 register assignments bind each page brief; its
  [VALIDATION-NEEDED] items never freeze silently.
- No final page copy here. Title patterns and H1 territories are patterns, not
  strings.
- Everything sourced from the old site is provisional until Crystelle validates
  publishability and representativeness.

---

## 0. The shape, in one paragraph

Ten real pages at launch. Three of them are keyword-bearing commercial surfaces
(the Rennes service page, the cost guide, the espaces-professionnels page), which
is exactly what `keywords.md` §6 says the launch demands, and no more. The
homepage serves the branded searcher, the service page serves the stranger; both
exist, neither does the other's job (foundation §8). The shop page is a brand and
place surface, not an SEO acquisition page. Portfolio is one hub plus modular
project pages that can grow, shrink, or be swapped without touching the IA.
Everything else is utility.

## 1. Primary navigation

Frozen by foundation §5, restated, not reopened:

**Projets · Prestations · L'art shop · À propos · Contact**

- Flat five items, no dropdowns (proposed default; see decision 9.7). The
  espaces-professionnels page is reached through the Prestations page, the
  footer, and internal links, not a nav slot (foundation §6: B2B gets no
  top-level slot).
- Header carries the primary CTA as a styled button in the « Parlons de votre
  projet » register, pointing to `/contact/`. It sits beside the nav, visually
  distinct from it. Architecture wins this slot (tiebreak rule); the shop's
  invitation never competes at this weight.
- « L'art shop » as nav label is canonical direction pending Crystelle's French
  validation (messaging §9 item 1). The slot itself is frozen.
- Footer: full page list, NAP block (Jukkai by Crystelle Terrasson, Châteaugiron
  address, phone), « à 20 minutes de Rennes » anchor line, Instagram link
  (tracked), legal links. During the migration window the footer or à-propos
  carries « anciennement Studio Crystelle Terrasson »; meta descriptions carry it
  too (foundation §4).

## 2. Page tree with proposed URLs

```
jukkai.fr
├── /                                             Accueil
├── /architecte-interieur-rennes/                 Page service canonique (P0)
├── /prestations/                                 Offres, tarifs, process
├── /amenagement-bureaux-rennes/                  Espaces professionnels (B2B, P1)
│                                                 (nav + breadcrumb under Prestations)
├── /combien-coute-architecte-interieur-rennes/   Guide coût (P0, launch or first fast-follow)
├── /projets/                                     Hub portfolio (filtre habitat / pro)
│   └── /projets/{slug-descriptif}/               Pages projet, dual naming, modulaires
├── /art-shop/                                    L'art shop
├── /a-propos/                                    À propos
├── /contact/                                     Contact + formulaire (conversion primaire)
│   └── /contact/merci/                           Confirmation (tracking + Calendly)
├── /mentions-legales/
├── /politique-de-confidentialite/
├── /conditions-generales/
└── 404 (page réelle, avec issue de secours vers projets + contact)
```

Reserved URLs, **not built at launch**, rows kept in the content matrix so Phase 4
ships them without re-deciding structure:

```
├── /decoratrice-interieur-rennes/                P1 post-launch. Premium-inversion page.
│                                                 Gated on the déco offer validation (C1/C2).
├── /architecte-interieur-chateaugiron/           P2. First honest commune page; ships only
│                                                 with a real local project as proof.
├── /renover-appartement-rennes/                  P3. Guide (Atelier LŌ format), funnels to
│                                                 the service page.
└── (conseil déco)                                No URL reserved. Fold into the décoratrice
                                                  page or give it a light priced page; decide
                                                  on live SERP shape when the offer is named
                                                  (keywords §4.6).
```

Cesson-Sévigné and Le Rheu commune pages: later tier, same real-project rule, no
URLs reserved yet (keywords §5, never more than the honest 2-3).

URL conventions: lowercase, hyphenated, no accents in slugs, trailing slash,
French. Project slugs are descriptive (type + commune), never the creative title
(foundation §8 dual naming); exact slugs wait for Crystelle's project list (S1)
because communes must be real, not invented.

## 3. Page purpose and primary audience

| Page                   | Purpose (the one job)                                                                                                       | Primary audience                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Accueil                | Validate the referral in seconds; open the Jukkai world; route to service, projets, shop                                    | Referred private clients (branded searchers)                        |
| Service page Rennes    | Give the stranger a complete, credible answer to « architecte d'intérieur Rennes » and carry them to the form               | Non-branded private searchers                                       |
| Prestations            | Make the offer ladder and its prices legible; show the process incl. contrat de mission; catch « is my project too small? » | Private clients comparing and scoping                               |
| Espaces professionnels | Convert office fit-out demand with process and references, not QVT clichés                                                  | B2B decision-makers                                                 |
| Guide coût             | Own the proven tarif query with real figures; feed the service page                                                         | Price-researching private clients (pre-hiring)                      |
| Projets (hub)          | Proof by transformation; browse by habitat / espaces pro                                                                    | Private clients + B2B validating her eye                            |
| Pages projet           | One transformation story each: photos, location, type, écoute + budget register, closing art move                           | Referred + researching clients                                      |
| L'art shop             | Make the place visitable and desirable before opening; carry the artist block; hold the thesis line                         | Art visitors; artists (block); referred clients absorbing the world |
| À propos               | Her story and the umbrella (« Jukkai est l'ensemble »); credentials in precision; transition from the old name              | Referred clients doing diligence; press                             |
| Contact                | Convert: qualification form, no budget floor; the warm door                                                                 | All enquirers, private first                                        |
| /contact/merci/        | Confirm, track the conversion, offer the Calendly accelerator                                                               | Just-converted enquirers                                            |
| Legal ×3, 404          | Compliance and dead-end recovery                                                                                            | Everyone, rarely                                                    |

## 4. CTA logic

**Primary CTA, sitewide, always architecture** (foundation §5): the enquiry in
« Parlons de votre projet » register, leading to the `/contact/` form. One primary
CTA per page, no exceptions, including the shop page.

**Secondary CTA per page** (never at primary visual weight):

| Page                       | Secondary CTA                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Accueil                    | « Venez pousser la porte » register → /art-shop/ (the world); tertiary: voir les projets                                                      |
| Service page               | Voir les projets / le guide coût (deepen before converting)                                                                                   |
| Prestations                | Guide coût; per-offer anchor into the form with project type prefilled (Phase 4 detail)                                                       |
| Espaces professionnels     | Click-to-call / click-to-email (B2B moves by phone); voir les projets pro                                                                     |
| Guide coût                 | Service page, then the form                                                                                                                   |
| Projets hub + pages projet | Next project / service page; closing art move links to /art-shop/ as a quiet note                                                             |
| L'art shop                 | This page's own jobs run on secondary weight: itinerary click, Instagram follow, newsletter signup; artist block has its direct contact route |
| À propos                   | Voir les projets                                                                                                                              |
| Contact                    | None (the form is the page)                                                                                                                   |
| /contact/merci/            | Calendly booking (« choisissez un créneau si vous voulez avancer tout de suite »)                                                             |

**Measurement** (foundation §3, restated because it is a sitemap constraint, not
an afterthought): the primary tracked event is the enquiry form submission,
counted on `/contact/merci/` (or an equivalent submit event; Phase 4 analytics
decides the mechanism, the conversion definition is frozen). Secondary tracked
events: click-to-call, click-to-email, itinerary click on the shop page, outbound
Instagram click. GA4 + Search Console live from day one. Calendly is never the
only door.

**Form contract** (frozen, foundation §3): project type (rénovation complète /
transformation ciblée / espace professionnel / conseil déco / artiste), commune,
budget band with « je ne sais pas encore ». Phone optional. No budget floor.

## 5. Register assignment per page

From messaging §3, which binds these briefs; new pages assigned by the same rule
(architecture owns the structural sentence, Jukkai owns the atmosphere around it):

| Page                                     | Lead register                                                        | Guest moments                                                |
| ---------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ |
| Accueil                                  | Fusion: Jukkai frame, architecture anchor                            | Both, per the frozen hero ruling                             |
| Service page Rennes                      | Architecture                                                         | One Jukkai closing note at most                              |
| Prestations                              | Architecture                                                         | Art woven into offer descriptions                            |
| Espaces professionnels                   | Architecture, rational path leads                                    | Jukkai present but secondary                                 |
| Guide coût                               | Architecture                                                         | None                                                         |
| Projets hub + pages projet               | Architecture structure, dual naming                                  | Creative titles + closing art move are Jukkai                |
| L'art shop                               | Jukkai                                                               | Structural blocks: visit info, artist block, studio solidity |
| À propos                                 | Blend: story in Jukkai warmth, credentials in architecture precision | « anciennement » line; neuro-architecture as lens only       |
| Contact + merci                          | Architecture, warm                                                   | None                                                         |
| Legal, 404                               | Utility (404 may carry one line of Jukkai warmth)                    | —                                                            |
| Reserved: décoratrice page               | Architecture (premium inversion is an architecture claim)            | Jukkai colour in examples                                    |
| Reserved: commune page, guide rénovation | Architecture                                                         | Local texture                                                |

Homepage hero, restated because it is the model for every shared surface: Jukkai
sets the register in the frame; the architecture kicker is the real, visible H1
(« Architecte d'intérieur à Rennes & Châteaugiron » territory); primary CTA and a
proof cue anchor the same viewport; the emotional headline is display text, not a
heading. The H1 guardrail travels (messaging §10.3).

## 6. SEO role per page

| Page                   | SEO role                                                                                                                                                                                                        | Title pattern rule                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Accueil                | Branded validation (jukkai, crystelle terrasson, studio terrasson)                                                                                                                                              | Frozen: « Jukkai by Crystelle Terrasson — Architecte d'intérieur, Rennes & Châteaugiron » |
| Service page Rennes    | **Local acquisition, P0.** « architecte d'intérieur rennes » + agence variant; Ille-et-Vilaine / 35 / région rennaise as body vocabulary only                                                                   | Keyword-first                                                                             |
| Guide coût             | **Cost / search intent, P0.** « combien coûte / tarif architecte d'intérieur rennes »; dated title, refreshed yearly                                                                                            | Keyword-first                                                                             |
| Espaces professionnels | **B2B acquisition, P1.** « aménagement bureaux rennes », « architecte bureau rennes »                                                                                                                           | Keyword-first                                                                             |
| Prestations            | Proof/support: carries the public ranges and the process; supports the tarif cluster via cross-links, does not chase it                                                                                         | Brand-first                                                                               |
| Projets + pages projet | Proof/support + long tail: dual naming catches « rénovation maison/appartement {commune} »                                                                                                                      | Brand-first, descriptive subtitle in title                                                |
| L'art shop             | Shop visitability: branded + Châteaugiron discovery. Never chases « galerie d'art » in copy (banned words); the vocabulary matching lives in GBP secondary category, schema (Phase 4), and third-party listings | Brand-first                                                                               |
| À propos               | Branded validation + « anciennement Studio Crystelle Terrasson » migration queries                                                                                                                              | Brand-first                                                                               |
| Contact                | Branded/utility (the old /contact/ sat at position 10; keep it indexable)                                                                                                                                       | Brand-first                                                                               |
| Legal, merci, 404      | Legal/utility; merci and 404 noindex                                                                                                                                                                            | Brand-first                                                                               |

FAQ blocks are table stakes on the three acquisition surfaces (keywords §6.3):
service page, guide coût, espaces professionnels each carry one; « architecte
d'intérieur ou décorateur ? » lives on the service page and guide, answering the
documented fork. No standalone FAQ page (decision 9.6). Phase 4 pairs the blocks
with FAQ schema.

On-page pricing appears on the service page too, at least entry ranges, because
the SERP now rewards it (keywords §6.4); the guide carries the query, Prestations
carries the full ranges.

**Not a page but carrying page-level SEO weight** (keywords §6.5): the GBP
(« Jukkai by Crystelle Terrasson », primary category Architecte d'intérieur,
secondary art-gallery equivalent, Châteaugiron address) plus the citations
checklist (Pages Jaunes, tourism listing, Linktr.ee, social bios, directories).
It wins Châteaugiron nearly by default, is the only play for « meilleur » queries,
and carries the art shop's local discovery. Phase 4 treats it as a launch
deliverable with the same weight as a page.

## 7. Old-site URL handling (planning level)

Baseline pressure, from the audit: 93% of clicks are branded; the homepage takes
88% of all clicks; the only non-branded near-rank is the tarif cluster (position
9-12). So the 301 map protects the branded pipeline above all, and nothing in the
old IA earns the right to dictate the new one. Per-URL final mapping is Phase 4;
these are the planning rulings:

| Old URL(s)                                                                                     | Handling                                                                                              | Destination                                                                                                |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `/`                                                                                            | Migrate                                                                                               | `jukkai.fr/`                                                                                               |
| `/prestations/` (2,551 impressions)                                                            | Merge into new offer page                                                                             | `/prestations/`                                                                                            |
| `/contact/` (position ~10)                                                                     | Keep equivalent                                                                                       | `/contact/`                                                                                                |
| `/particulier/`                                                                                | Merge                                                                                                 | `/projets/`                                                                                                |
| `/professionnel/`                                                                              | Merge                                                                                                 | `/projets/` (pro view); see decision 9.2                                                                   |
| `/realisations` (already redirects)                                                            | Re-point                                                                                              | `/projets/`                                                                                                |
| `/particulier/belle-epoque/` (852 impr., 7 clicks: the one project page with search value)     | Keep as project page if selected (strong candidate)                                                   | `/projets/{new-slug}/`                                                                                     |
| Other kept project pages                                                                       | Keep, renamed                                                                                         | Per-page 301 to `/projets/{new-slug}/`                                                                     |
| Dropped project pages                                                                          | Merge                                                                                                 | 301 to `/projets/` (parent, per audit rule)                                                                |
| `/conseils/`                                                                                   | Retire                                                                                                | 301 to the guide coût (closest advice successor)                                                           |
| `/concevoir-une-cuisine-ecologique/` (5,317 impr., 0 clicks), `/7-regles-dor-cuisine-moderne/` | Retire. National-topic content is dead (foundation §8); eco positioning banned (§10). Do not recreate | 301 to `/projets/` (kitchen proof) or 410; see decision 9.5                                                |
| `/renover-une-vieille-salle-de-bain/`                                                          | Retire                                                                                                | 301 to guide coût (renovation-cost adjacent)                                                               |
| `/comment-creer-un-espace-bureau/`                                                             | Retire                                                                                                | 301 to `/amenagement-bureaux-rennes/` (loose topical heir)                                                 |
| `/comment-decorer-ses-toilettes/`, `/comment-mettre-en-valeur-un-couloir/`                     | Retire                                                                                                | 301 to `/projets/` or 410                                                                                  |
| Legal pages (mentions légales, confidentialité, CGPS, présentation)                            | Keep equivalents                                                                                      | New legal URLs; `/presentation` equivalent → `/a-propos/`                                                  |
| Current jukkai.fr teaser page(s)                                                               | Absorb                                                                                                | Newsletter + Instagram + artist CTAs move into `/art-shop/`; teaser URLs 301 into the new IA (Phase 4 map) |

Non-negotiables carried from foundation §8: page-by-page 301 map, GBP update,
external profile updates (Linktr.ee, Pages Jaunes, social bios, Houzz, Pinterest)
in launch week, since none of those follow the 301.

## 8. Where provisional portfolio pages fit

Principle (the ruling this phase applies everywhere): **project pages are modular
proof rows under `/projets/`, not structural pillars.** The hub, the URL pattern,
the dual-naming rule, and the page template are frozen by this document; the set
of rows is Crystelle's (S1) and may be kept, merged, renamed, extended, or cut in
later phases without touching the IA.

- Old-site inventory: 12 residential + 13 professional project pages, all
  catalogued with proof value and redirect notes in `docs/content-matrix.md`
  (provisional inventory table). Every one is **provisional: publication
  permission and representativeness are validation-needed** with Crystelle.
- Recommended launch slate shape (not a list of names): 6-10 projects total.
  Residential coverage must prove the offer ladder: one full renovation
  (Isabelle), one modernisation (Bernard), one targeted/déco transformation (the
  déco client, proving « no project too small »). Professional coverage: 2-4
  projects, office fit-outs first (they prove the B2B page), breadth second.
- Each project page: creative title (Jukkai register) + descriptive subtitle and
  URL (architecture register), commune, project type, the transformation story in
  écoute/budget register, before/after or 3D where they exist, and the closing
  art move in vision framing only (never past-tense bridge claims).
- The B2B page cites professional projects as references only where naming is
  permitted (S1); until then it runs on process made visible, with reference
  slots explicit in the matrix.
- If Crystelle's slate is smaller than the old set, dropped pages 301 to
  `/projets/`; if she adds new work the old site never showed, new rows slot in
  with zero structural change.

## 9. Decisions needing Martin/Crystelle review before freeze

Each with a proposed default so a « yes, fine » is cheap.

1. **Shop URL slug.** Proposed `/art-shop/` (clean, unaccented, elision-free).
   The nav label and running-copy referent stay « L'art shop » pending
   Crystelle's French validation (C8); the slug can freeze independently.
2. **Projets hub structure.** Proposed: one `/projets/` hub with a habitat /
   espaces professionnels filter, no separately indexable segment URLs at launch
   (avoids thin pages); both old hubs 301 to `/projets/`. Alternative if the
   launch slate is large: indexable `/projets/habitat/` and
   `/projets/espaces-professionnels/` views. Decide at freeze; default no.
3. **Guide coût at launch vs fast-follow.** Proposed: launch. It is P0, demand is
   proven (the old site's only near-rank), and two local incumbents moved into
   the gap in 2026. If it slips, the URL and matrix row are reserved and it ships
   first post-launch.
4. **B2B slug at root while nav-grouped under Prestations.** Proposed: accept
   `/amenagement-bureaux-rennes/` (keywords §4.8: the keyword shape the SERP
   rewards, no top-level nav slot). The breadcrumb reads Prestations › Espaces
   professionnels while the URL sits at root; confirm that mismatch is
   acceptable. Alternative: `/prestations/amenagement-bureaux-rennes/`.
5. **Retired blog posts: 301 vs 410.** Proposed: 301 to the nearest honest parent
   as tabled in §7, accepting that Google may treat weak matches as soft 404s;
   410 is the honest alternative for the two toilettes/couloir posts. Low stakes
   (zero clicks today).
6. **No standalone FAQ page.** Proposed: confirmed; FAQ blocks live on the three
   acquisition surfaces. A dedicated FAQ page would compete with them.
7. **Flat nav, no dropdown.** Proposed: five flat items plus the header CTA
   button; espaces professionnels reachable in two clicks via Prestations.
   Alternative: a Prestations dropdown exposing the B2B page; adds nav weight for
   one B2B convenience.
8. **Launch portfolio slate (S1, Crystelle).** The one input that fills rows:
   which projects, locations, photos, permissions; which B2B references may be
   named. Structure does not wait on it, but Phase 4 copy and the redirect map do.
9. **Entry-offer slot ships with placeholder.** Proposed: the Prestations page
   reserves the conseil/mission déco slot structurally now; its name, price, and
   scope stay [VALIDATION-NEEDED] (C1/C2) and cannot freeze as copy. The
   décoratrice page (reserved URL) is gated on the same validation.
10. **Newsletter mechanics.** The shop page's pre-opening CTA assumes a working
    newsletter signup (carried over from the teaser). Confirm the tool and list
    ownership before Phase 4 wires the form; otherwise the CTA degrades to
    Instagram-only.
11. **/contact/merci/ as the conversion URL.** Proposed: yes, a real confirmation
    page (noindex) hosting the Calendly accelerator and the conversion event.
    Alternative: in-page submit event without URL change; Phase 4 analytics
    decides the mechanism, not the definition.

Per the method, once Martin settles these, this document freezes and the critic
pass runs in a fresh context (one divergent critic attacking the IA), then
Phase 4 opens.
