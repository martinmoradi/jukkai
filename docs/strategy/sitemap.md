# Jukkai sitemap (Phase 3, IA)

**Phase 3 deliverable, produced July 2, 2026 and reconciled July 10.** Reads
`docs/strategy/foundation.md` (v1.8), `docs/research/audience.md`,
`docs/strategy/messaging.md`, `docs/research/keywords.md`,
`docs/research/competitors.md`, and `docs/strategy/questions-for-crystelle.md`. Mines the old-site
crawl (`docs/reference/studioterrasson/`) and the March 2026 SEO audit as
provisional inventory only, never as independent truth.

Companion deliverable: `docs/strategy/content-matrix.md` (the per-page skeleton Phase 4
executes against). This document decides structure; the matrix carries the rows.

Status: **provisional hypothesis pending the IA / SEO confidence review**. The July
10 grill confirmed new business and content truths but explicitly reopened the
mechanical page split, primary navigation, homepage H1, B2B visibility, cost-guide
priority, and contact architecture. Section 9 now defines the comparison required
before this document may freeze.

Rules inherited and applied throughout:

- `docs/strategy/foundation.md` is truth. Architecture remains the commercial
  priority and Jukkai the emotional/differentiating world, but v1.7 withdraws the
  assumption that this automatically decides navigation, page count, homepage H1,
  or contact mechanism.
- `docs/strategy/messaging.md` §3 register assignments bind each page brief; its
  [VALIDATION-NEEDED] items never freeze silently.
- No final page copy here. Title patterns and H1 territories are patterns, not
  strings.
- Old-site projects are presumptively reusable because they are already public.
  Their selection remains provisional, and any new privacy or asset constraint wins.

---

## 0. The current candidate, in one paragraph

The current candidate has ten real pages at launch. Three are keyword-bearing commercial surfaces
(the Rennes service page, the cost guide, the espaces-professionnels page), which
is exactly what `docs/research/keywords.md` §6 says the launch demands, and no more. The
homepage serves the branded searcher, the service page serves the stranger; both
exist, neither does the other's job (foundation §8). The Galerie page is a brand and
place surface, not an SEO acquisition page. Portfolio is one hub plus modular
project pages that can grow, shrink, or be swapped without touching the IA.
Everything else is utility. The IA confidence review must compare this candidate with
an integrated studio model and a hybrid model where acquisition pages exist without
controlling navigation or homepage storytelling.

## 1. Primary navigation candidate

Provisional until the IA confidence review:

**Projets · Prestations · Galerie · À propos · Contact**

- Flat five items, no dropdowns (current candidate). In this model the
  espaces-professionnels page is reached through Prestations, the footer, and
  internal links. The review must test whether that visibility matches B2B's
  explicit growth role.
- Header currently carries a styled architecture-contact CTA. Its copy, destination,
  and relationship to phone/booking/form are part of the contact review; Galerie
  visit actions remain a different intent.
- `Galerie` is the settled category/nav noun. Its slot and the visibility of B2B or
  acquisition pages remain part of the IA comparison.
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
├── /galerie/                                     Galerie
├── /a-propos/                                    À propos
├── /contact/                                     Contact paths, exact model under review
│   └── /contact/merci/                           Reserved only if the chosen form flow needs it
├── /mentions-legales/
├── /politique-de-confidentialite/
├── /conditions-generales/
└── 404 (page réelle, avec issue de secours vers projets + contact)
```

Reserved URL ideas, **not built at launch**, kept in the matrix so the selected IA
can retain, merge, rename, or discard them deliberately:

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
(foundation §8 dual naming); exact slugs wait for the final project list
because communes must be real, not invented.

## 3. Page purpose and primary audience

| Page                   | Purpose (the one job)                                                                                                       | Primary audience                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Accueil                | Validate the referral in seconds; open the Jukkai world; route to services, projets, Galerie                                | Referred private clients (branded searchers)                            |
| Service page Rennes    | Give the stranger a complete, credible answer to « architecte d'intérieur Rennes » and carry them toward contact            | Non-branded private searchers                                           |
| Prestations            | Make the offer ladder and its prices legible; show the process incl. contrat de mission; catch « is my project too small? » | Private clients comparing and scoping                                   |
| Espaces professionnels | Convert office fit-out demand with process and references, not QVT clichés                                                  | B2B decision-makers                                                     |
| Guide coût             | Own the proven tarif query with real figures; feed the service page                                                         | Price-researching private clients (pre-hiring)                          |
| Projets (hub)          | Proof by transformation; browse by habitat / espaces pro                                                                    | Private clients + B2B validating her eye                                |
| Pages projet           | One transformation story each: photos, location, scope, choices, constraints, and budget where permitted                    | Referred + researching clients                                          |
| Galerie                | Make the place visitable and desirable; carry the thesis line and quiet artist route                                        | Art visitors; referred clients absorbing the world; artists secondarily |
| À propos               | Her story and the umbrella (« Jukkai est l'ensemble »); credentials in precision; transition from the old name              | Referred clients doing diligence; press                                 |
| Contact                | Present the appropriate contact paths and the warm door; exact hierarchy remains open                                       | All enquirers, private first                                            |
| /contact/merci/        | Optional form-confirmation surface if retained by the contact review                                                        | Form submitters only                                                    |
| Legal ×3, 404          | Compliance and dead-end recovery                                                                                            | Everyone, rarely                                                        |

## 4. CTA logic

**Commercial CTA direction:** a warm invitation to discuss an architecture project.
The destination and hierarchy are not frozen: direct phone, booking, email, form, or
a contact-choice surface must be compared against actual lead behaviour. Do not force
a form merely for cleaner analytics.

**Secondary CTA per page** (never at primary visual weight):

| Page                       | Secondary CTA                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------- |
| Accueil                    | « Venez pousser la porte » register → /galerie/ (the world); tertiary: voir les projets |
| Service page               | Voir les projets / le guide coût (deepen before converting)                             |
| Prestations                | Guide coût; a contact action per offer, with mechanism decided by the contact review    |
| Espaces professionnels     | Click-to-call / click-to-email (B2B moves by phone); voir les projets pro               |
| Guide coût                 | Service page, then the chosen contact action                                            |
| Projets hub + pages projet | Next project / service page; optional Galerie link where the story makes it natural     |
| Galerie                    | Itinerary, Instagram, newsletter if operated, and a quiet artist contact route          |
| À propos                   | Voir les projets                                                                        |
| Contact                    | Channel hierarchy remains open; place/map information stays distinct                    |
| /contact/merci/            | Confirmation only if a form remains; booking placement is open                          |

**Measurement** (foundation §3): contact intent across channels is the website-level
conversion proxy: completed booking, form submission, click-to-call, and
click-to-email, plus GBP interaction data. Contact-page views and calculator
completion are consideration only. Actual qualified conversations require light
manual reconciliation. Exact event and contact-field design belongs to the focused
contact/conversion review.

## 5. Register assignment per page

From messaging §3, which binds these briefs; architecture remains quickly
understandable while Jukkai may lead the felt experience:

| Page                                     | Lead register                                                        | Guest moments                                                        |
| ---------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Accueil                                  | Fusion direction; exact hierarchy pending IA review                  | Both, without a frozen exact-match H1                                |
| Service page Rennes                      | Architecture                                                         | One Jukkai closing note at most                                      |
| Prestations                              | Architecture                                                         | Art woven into offer descriptions                                    |
| Espaces professionnels                   | Architecture, rational path leads                                    | Jukkai present but secondary                                         |
| Guide coût                               | Architecture                                                         | None                                                                 |
| Projets hub + pages projet               | Architecture structure, dual naming                                  | Creative titles; art connection only where natural                   |
| Galerie                                  | Jukkai                                                               | Structural blocks: visit info, quiet artist route, studio continuity |
| À propos                                 | Blend: story in Jukkai warmth, credentials in architecture precision | « anciennement » line; neuro-architecture as lens only               |
| Contact + optional merci                 | Architecture, warm                                                   | Channel choice pending contact/conversion review                     |
| Legal, 404                               | Utility (404 may carry one line of Jukkai warmth)                    | —                                                                    |
| Reserved: décoratrice page               | Architecture (premium inversion is an architecture claim)            | Jukkai colour in examples                                            |
| Reserved: commune page, guide rénovation | Architecture                                                         | Local texture                                                        |

Homepage direction: Jukkai may set the felt register while architecture remains
quickly understandable. The final H1 must be visible, descriptive, and semantically
real, but exact-match « Architecte d'intérieur à Rennes » and the display-text/H1
split are candidates to test, not frozen composition rules.

## 6. SEO role per page

| Page                   | SEO role                                                                                                                                                                                                                             | Title pattern rule                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Accueil                | Branded validation plus clear business/category understanding; exact acquisition role pending IA review                                                                                                                              | Descriptive and brand-led; exact pattern pending review |
| Service page Rennes    | **Local acquisition, P0.** « architecte d'intérieur rennes » + agence variant; Ille-et-Vilaine (35) / région rennaise as body vocabulary only                                                                                        | Keyword-first                                           |
| Guide coût             | **Cost / search intent, P0.** « combien coûte / tarif architecte d'intérieur rennes »; dated title, refreshed yearly                                                                                                                 | Keyword-first                                           |
| Espaces professionnels | **B2B acquisition, P1.** « aménagement bureaux rennes », « architecte bureau rennes »                                                                                                                                                | Keyword-first                                           |
| Prestations            | Proof/support: carries the public ranges and the process; supports the tarif cluster via cross-links, does not chase it                                                                                                              | Brand-first                                             |
| Projets + pages projet | Proof/support + long tail: dual naming catches « rénovation maison/appartement {commune} »                                                                                                                                           | Brand-first, descriptive subtitle in title              |
| Galerie                | Galerie visitability: branded + Châteaugiron discovery. `Galerie` is the real category; surrounding copy makes the Jukkai version warm, living, and purchasable. GBP secondary category, schema, and listings carry category fluency | Brand-first                                             |
| À propos               | Branded validation + « anciennement Studio Crystelle Terrasson » migration queries                                                                                                                                                   | Brand-first                                             |
| Contact                | Branded/utility (the old /contact/ sat at position 10; keep it indexable)                                                                                                                                                            | Brand-first                                             |
| Legal, merci, 404      | Legal/utility; merci and 404 noindex                                                                                                                                                                                                 | Brand-first                                             |

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
and carries the Galerie's local discovery. Phase 4 treats it as a launch
deliverable with the same weight as a page.

## 7. Old-site URL handling (planning level)

Baseline pressure, from the audit: 93% of clicks are branded; the homepage takes
88% of all clicks; the only non-branded near-rank is the tarif cluster (position
9-12). So the 301 map protects the branded pipeline above all, and nothing in the
old IA earns the right to dictate the new one. Per-URL final mapping is Phase 4;
these are the planning rulings:

| Old URL(s)                                                                                     | Handling                                                                                                                                                     | Destination                                                                                           |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `/`                                                                                            | Migrate                                                                                                                                                      | `jukkai.fr/`                                                                                          |
| `/prestations/` (2,551 impressions)                                                            | Merge into new offer page                                                                                                                                    | `/prestations/`                                                                                       |
| `/contact/` (position ~10)                                                                     | Keep equivalent                                                                                                                                              | `/contact/`                                                                                           |
| `/particulier/`                                                                                | Merge                                                                                                                                                        | `/projets/`                                                                                           |
| `/professionnel/`                                                                              | Merge                                                                                                                                                        | `/projets/` (pro view); see decision 9.2                                                              |
| `/realisations` (already redirects)                                                            | Re-point                                                                                                                                                     | `/projets/`                                                                                           |
| `/particulier/belle-epoque/` (852 impr., 7 clicks: the one project page with search value)     | Keep as project page if selected (strong candidate)                                                                                                          | `/projets/{new-slug}/`                                                                                |
| Other kept project pages                                                                       | Keep, renamed                                                                                                                                                | Per-page 301 to `/projets/{new-slug}/`                                                                |
| Dropped project pages                                                                          | Merge                                                                                                                                                        | 301 to `/projets/` (parent, per audit rule)                                                           |
| `/conseils/`                                                                                   | Retire                                                                                                                                                       | 301 to the guide coût (closest advice successor)                                                      |
| `/concevoir-une-cuisine-ecologique/` (5,317 impr., 0 clicks), `/7-regles-dor-cuisine-moderne/` | Retire. National-topic content is dead (foundation §8); do not recreate as generic SEO articles. The verified eco label may still appear as supporting proof | 301 to `/projets/` (kitchen proof) or 410; see decision 9.5                                           |
| `/renover-une-vieille-salle-de-bain/`                                                          | Retire                                                                                                                                                       | 301 to guide coût (renovation-cost adjacent)                                                          |
| `/comment-creer-un-espace-bureau/`                                                             | Retire                                                                                                                                                       | 301 to `/amenagement-bureaux-rennes/` (loose topical heir)                                            |
| `/comment-decorer-ses-toilettes/`, `/comment-mettre-en-valeur-un-couloir/`                     | Retire                                                                                                                                                       | 301 to `/projets/` or 410                                                                             |
| Legal pages (mentions légales, confidentialité, CGPS, présentation)                            | Keep equivalents                                                                                                                                             | New legal URLs; `/presentation` equivalent → `/a-propos/`                                             |
| Current jukkai.fr teaser page(s)                                                               | Absorb                                                                                                                                                       | Newsletter + Instagram + quiet artist route move into `/galerie/`; only real teaser URLs need mapping |

Non-negotiables carried from foundation §8: page-by-page 301 map, GBP update,
external profile updates (Linktr.ee, Pages Jaunes, social bios, Houzz, Pinterest)
in launch week, since none of those follow the 301.

## 8. Where provisional portfolio pages fit

Principle (the ruling this phase applies everywhere): **project pages are modular
proof rows under `/projets/`, not structural pillars.** The hub, the URL pattern,
the dual-naming rule and the page template are working constants in every model; the set
of rows is Crystelle's and may be kept, merged, renamed, extended, or cut in
later phases without touching the IA.

- Old-site inventory: 12 residential + 13 professional project pages, all
  catalogued with proof value and redirect notes in `docs/strategy/content-matrix.md`
  (provisional inventory table). Existing publication makes them presumptively
  reusable; selection and any new privacy or asset constraint remain Crystelle's.
- Recommended launch slate shape (not a list of names): 6-10 projects total.
  Residential coverage must prove the offer ladder: one full renovation
  (Isabelle), one modernisation (Bernard), one targeted/déco transformation (the
  déco client, proving « no project too small »). Professional coverage: 2-4
  projects, office fit-outs first (they prove the B2B page), breadth second.
- Each project page: creative title (Jukkai register) + descriptive subtitle and
  URL (architecture register), commune, project type, the transformation story in
  scope/constraint/budget register, and before/after or 3D where they exist. A
  Galerie connection appears only when the project or story makes it natural.
- The B2B page cites professional projects as references only where naming is
  permitted; until then it runs on process made visible, with reference
  slots explicit in the matrix.
- If Crystelle's slate is smaller than the old set, dropped pages 301 to
  `/projets/`; if she adds new work the old site never showed, new rows slot in
  with zero structural change.

## 9. Confidence review required before freeze

The next IA session must map the same Jukkai content into three complete alternatives:

1. **Current separated candidate:** homepage validation plus dedicated Rennes, cost,
   and B2B acquisition pages.
2. **Integrated studio model:** residential and professional work share a simpler
   service/portfolio structure closer to strong category references.
3. **Hybrid model:** dedicated acquisition URLs exist for search, while navigation
   and homepage storytelling stay integrated and brand-led.

Judge each against branded/referral validation, non-branded acquisition, visitor
comprehension, residential/B2B discoverability, Galerie fit, portfolio storytelling,
conversion, migration, maintenance burden, and visual freedom.

The review must explicitly decide:

- homepage H1 and title hierarchy;
- primary navigation and whether B2B needs a visible slot;
- service-page role and internal-link path;
- whether the cost guide is launch-critical, later, or folded into stronger pricing
  content and case studies;
- projects hub/filter structure;
- FAQ distribution;
- B2B URL/breadcrumb model;
- contact path and CTA hierarchy;
- whether `/contact/merci/` exists at all;
- retired-blog 301/410 handling.

Already settled and not reopened by that review:

- `Galerie` is the category/nav noun and `/galerie/` the proposed URL;
- dropped old project URLs map honestly to retained projects or `/projets/`;
- project rows remain modular;
- entry-offer copy cannot freeze before its name, price, and scope are real;
- a newsletter CTA appears only if an owned, operated list exists;
- contact-page views never count as conversion.

After Martin chooses a model, run the divergent critic pass, reconcile the selected
model through these documents, refine the new comparison gate in
`docs/operations/method.md` if needed, and only then freeze Phase 3.
