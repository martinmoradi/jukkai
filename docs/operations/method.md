# Marketing foundation build method

How the Jukkai marketing documentation gets built. Read this before starting any
phase. It exists so each phase can run in a fresh, clean context and still produce
work that fits the whole.

## The principle

**Foundation-first, one frozen artifact bundle per phase, fresh context per phase.**

Each phase reads only the frozen artifacts above it, produces its own bundle (one or
more docs, listed in the phase map), then the context is thrown away. The artifacts
are the memory between contexts. Never carry a conversation forward; carry the
artifacts it produced.

Consequences worth stating:

- A new context is safe to open the moment the docs it depends on are frozen. The
  dependency graph below tells you when.
- Grilling is context-heavy but happens in exactly one phase (Foundation). Its only
  output is a clean doc, so the bloat dies with that session. You get the grill
  without paying for it downstream.
- Doing the top of the chain properly buys the right to be cheap and mechanical
  downstream. That is the whole point.

## Source material

The clean repo starts empty on purpose. The prior project lives in the archived
`jukkai-atelier` repo. A frozen snapshot of the five docs worth mining is copied
into `docs/source-material/` for easy referencing during grilling. Treat them as
raw material to mine, not files to edit. When they contradict this method or each
other, this method and the newer conversations win; they are a June 2026 snapshot.

- `source-material/brand-strategy.md` — the existing foundation. Genuinely good.
  Needs a v2, not a rewrite.
- `source-material/project-context.md` — ecosystem and phase context.
- `source-material/discovery-transcript.md` — the richest artifact. The March 2026
  client interview.
- `source-material/seo-digital-performance-audit.md` — the studioterrasson.fr
  baseline and the keyword clusters. Your keyword research is mostly already here.
- `source-material/decision-log.md` — **closed decisions with rationale.** Read this
  during the "settled vs open" pass so Phase 0 does not relitigate settled calls:
  one site (not two), jukkai.fr as primary domain, "Jukkai by Crystelle Terrasson"
  naming, no ecommerce/catalogue, migration requirements. Do not reopen without new
  evidence.

Deep reference, **load per phase, never in the Phase 0 context**:
`docs/reference/studioterrasson/` — a June 2026 crawl of the current site (37 pages
of text; screenshots stay in the atelier repo). Mine it for the proof bank (real
projects, types, locations, materials), the current public voice to define the new
one against (Phase 2), and the URL inventory for the Phase 4 redirect map.

One fact from that crawl is needed in Phase 0 and is inlined here so no reference
load is required: the live site claims "30 années" and "2 architectes," while the
brand docs say 14 years. Reconcile the canonical public claims in Phase 0 using these
inlined facts plus the decision log; do not open the crawl for it.

## Canonical truth and the skill adapter

`docs/strategy/foundation.md` is the single canonical source of truth. It is **versioned and
amendable**, not entombed: "freeze" means "stable enough for the next phase to
depend on," and a later phase may amend it with an explicit, dated note (see the
Phase 1 rule below).

The `marketingskills` repo expects its shared context at
`.agents/product-marketing.md`. Generate that file as a **derived adapter** from
`docs/strategy/foundation.md`: never hand-edit it, and regenerate it whenever the
foundation changes. Foundation is truth; the adapter is a projection for the tools.

## The strategic joint this method must force

Do not frame it as a binary ("architecture or Jukkai"). The resolution is two
distinct centers that must not be collapsed:

- **Commercial / site-architecture center: interior architecture.** Acquisition and
  referral validation. Owns page structure, primary navigation, conversion paths,
  SEO, and measurement. It is where the searchable, monetizable demand is (the
  `architecte d'intérieur Rennes` cluster) and what sustains the business.
- **Brand / experience center: Jukkai.** The art shop, the physical place, the
  fusion of art and interiors. Owns the opening emotional register, the visual
  world, and the differentiation that makes the architecture offer distinct from
  every other studio in the region.

The site can open with the Jukkai world and still be built, structurally, around
architecture leads. The two layers are complementary, not competing, most of the
time. Crystelle leads emotionally with the galerie; that weighting belongs to the
physical space and the voice, not the site structure.

**Tiebreak rule (use when they compete for the same slot).** The two-layer frame is
not permission to avoid deciding. When architecture and Jukkai contend for one
scarce slot — the homepage hero, the primary nav, the title tag, the first
conversion path, the primary tracked event — **architecture wins the structural,
SEO, and conversion decision; Jukkai wins the emotional opening and the
differentiator role.** If a phase cannot apply this rule to a concrete choice, that
choice is a Phase 0 gap, not a Phase 3+ detail.

### Phase 0 decides (the grill agenda)

Resolve each explicitly. Anything only Crystelle can answer goes to
`docs/strategy/questions-for-crystelle.md`, **bucketed** by what it blocks: blocking-for-sitemap,
blocking-for-copy, blocking-for-launch, later. Not a junk drawer.

1. **Primary website job** — the evidence points to qualified architecture enquiries.
2. **Secondary jobs** — validate referrals, make the shop visitable, invite
   Instagram / foot traffic, support artist credibility.
3. **Brand / name architecture** — exact public phrasing (Jukkai by Crystelle
   Terrasson), handling of the old studio name, GBP name, title-tag pattern.
4. **Audience priority** — private architecture clients, then B2B, then art visitors,
   with artists as credibility/community. Confirm or revise this order.
5. **Offer architecture** — full mission, targeted déco, pro spaces, art integration.
6. **SEO posture** — how explicitly to claim Rennes, Châteaugiron, Ille-et-Vilaine.
7. **Shop promise** — physical place and emotional world, not ecommerce unless
   Crystelle can actually operate inventory and content.
8. **Proof bank** — projects, testimonials, locations, credentials, and concrete
   art/architecture bridge examples.
9. **Public French language** — the exact French framing for "art shop, not gallery,"
   and the pre-launch shop promise: what the shop page may say before opening without
   implying ecommerce or a confirmed event program.

**Does not block the sitemap — defer to the "later" bucket in
`docs/strategy/questions-for-crystelle.md`:** exact art-buyer persona, three-year
art-shop economics, full event calendar, full artist lineup, the future client
portal. Phase 0 must not stall on these.

### How Phase 0 runs

Phase 0 is **custom and decision-led**, driven by the agenda above against the five
source docs, not by a template. Open a fresh strong-model context with this method
and the five source docs, nothing else. The external `product-marketing` skill is an
output _adapter_, not the driver: it is too SaaS-shaped and too tidy to adjudicate
this contradiction. Let the decision agenda above lead; borrow the skill only to
shape the resulting doc if useful.

## Phase map

Order is top to bottom. "Grill" = human in the loop. "Derive" = autonomous, reads
docs and produces. Model tiers and roles are defined in the next section.

| Phase                       | Reads                                       | Skills                                                                                                                                                 | Produces                                                                                 | Mode        |
| --------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ----------- |
| 0. Foundation               | the 5 source docs                           | `product-marketing` (adapter only)                                                                                                                     | `docs/strategy/foundation.md` + `docs/strategy/questions-for-crystelle.md`               | grill       |
| 1. Research refresh         | frozen foundation                           | `customer-research`, `competitor-profiling`, live SERP                                                                                                 | `docs/research/audience.md`, `docs/research/competitors.md`, `docs/research/keywords.md` | derive      |
| 2. Messaging                | foundation, audience                        | (part of `product-marketing`)                                                                                                                          | `docs/strategy/messaging.md`                                                             | derive      |
| 3. IA / Sitemap (the hinge) | foundation, audience, keywords, competitors | `site-architecture`, `marketing-plan`                                                                                                                  | `docs/strategy/sitemap.md` + `docs/strategy/content-matrix.md`                           | short grill |
| 4. Execution (parallel)     | everything above                            | `content-strategy`, `copywriting`, `copy-editing`, `ai-seo`, `schema`, `analytics`, local-citations/GBP checklist, (`programmatic-seo` if constrained) | content matrix, SEO spec, schema, redirect map, tracking plan                            | derive      |
| 5. Launch / growth (later)  | the built site                              | `launch`, `public-relations`, `social`, `cro`, `referrals`, `video`, `ab-testing`                                                                      | ongoing                                                                                  | derive      |

Notes:

- **Phase 0 before Phase 1, strictly. Do not overlap them.** Phase 0 decides from the
  existing evidence and freezes `docs/strategy/foundation.md`. Phase 1 then refreshes
  research; if it overturns something, it amends the foundation with an explicit
  dated note. Never let research "run alongside and get folded in" — that dissolves
  the freeze boundary the whole method depends on.
- **Phase 1 does live checks.** Competitor and keyword reality drifts; the 2025 audit
  is a baseline, not current truth. Re-verify SERP and competitors live.
- **Phase 3 has two co-equal outputs: the sitemap and the content-matrix skeleton.**
  The matrix is the hinge deliverable where strategy becomes buildable — page, URL,
  purpose, audience, keyword, CTA, proof, status — not admin. Fill its left half
  (strategy/IA) in Phase 3; the right half (copy, meta, schema, status) fills in
  Phase 4.
- Phase 3 is the second and last human-judgment point besides Phase 0.
- Everything in Phase 4 is pure derivation once 0 through 3 are frozen, and its items
  are independent, so they can run in parallel isolated contexts.

## Skill triage

Marketing skills library: `github.com/coreyhaines31/marketingskills`. It is
SaaS-heavy. Record the exact source and a pinned commit or date when you install, so
later agents consume a known version, not floating memory (reviewed against the repo
as of July 2026). In scope for a local service business plus art shop:

- Foundation and research: `product-marketing`, `customer-research`,
  `competitor-profiling`, `seo-audit` (baseline already done).
- Structure and content: `site-architecture`, `marketing-plan`, `content-strategy`,
  `copywriting`, `copy-editing`.
- SEO and technical: `ai-seo`, `schema`, `analytics`. Use `programmatic-seo` only if
  constrained to a few honest service-area pages (Cesson-Sévigné, Le Rheu, la région
  rennaise), never doorway-page soup. Replace `directory-submissions` (SaaS-directory
  shaped) with a **local SEO citation + Google Business Profile checklist**: NAP
  consistency, GBP completeness and reviews, local directories like Pages Jaunes.
- Launch and later: `launch`, `public-relations`, `social`, `cro`, `referrals`,
  `video`, `ab-testing`.

Skip (SaaS / product-growth, no fit): `churn-prevention`, `paywalls`, `pricing`,
`onboarding`, `signup`, `aso`, `sms`, `cold-email`, `prospecting`,
`sales-enablement`, `revops`, `lead-magnets`, `free-tools`, `offers`, `popups`,
`co-marketing`, `community-marketing`. `ads` / `ad-creative` and `emails` are "maybe
later," not foundation work. `marketing-psychology` is optional flavor for Phase 4
copy.

## Model and multi-agent allocation

Rule: **capability pays where the output is under-constrained and high-blast-radius.
Structure substitutes for capability everywhere else.** Do not spread the frontier
model evenly. It is barbell-shaped.

A scarce frontier model is usually worth more as a second-pass critic than as a
first drafter. Generation pays full token cost over a large output space; critique
reads a bounded artifact and finds what is wrong or missing, which is where the
frontier edge (seeing tension, catching blind spots) actually lives.

Roles, not just phases:

- **Drafter** — standard model. Bulk generation, tightly constrained by frozen
  upstream docs. Most of Phase 4, and first drafts everywhere.
- **Grill-partner** — frontier model, Phase 0 only. Grilling quality depends on the
  questioner, so this is the one place a frontier model helps generate. Claude
  preferred here (thinking).
- **Critic / adversary** — frontier model, second pass on the two hinges
  (Foundation, Sitemap). Reads the frozen artifact cold and attacks it: what did you
  assume, what tension did you paper over, who is missing from the audience, which
  page has no search intent.
- **Reconciler** — human or Claude, integrates the critique.

Cross-model (a second family such as GPT-5.5) buys divergent blind spots, not more
capability. Spend it only on the two hinges:

- Foundation: two divergent critics (e.g. Fable 5 and GPT-5.5) reading
  `docs/strategy/foundation.md` cold, then reconcile. Best defense against a papered-over
  center-of-gravity decision. This is the `crossed-review` pattern applied to a
  strategy doc.
- Sitemap: one divergent critic attacking the IA.
- Messaging: optional single second opinion on voice.
- Phase 4: no cross-model. Mechanical and already constrained; a second model just
  doubles cost.

Concrete default: Claude drafts and grills the judgment-heavy top; GPT-5.5 is the
divergent critic; the scarcest strongest model (Fable 5) is spent as the critic or
final reconciler on the foundation, and later on the landing-page prototype (design
and motion taste is under-constrained and high-visibility, so it earns the frontier
model too). Standard models carry the entire mechanical tail in Phase 4.

## Context hygiene checklist

Before opening a fresh context for a phase:

1. Confirm every doc that phase reads is frozen (not mid-edit).
2. Load this method doc plus only those input docs. Nothing else.
3. Produce the one output doc for that phase.
4. If the phase is a hinge (0 or 3), run the critic pass in another fresh context
   that reads only the just-produced doc.
5. Freeze the output. Discard the context. Move on.
