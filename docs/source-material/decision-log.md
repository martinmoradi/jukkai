# Jukkai — Decision Log

_Decisions made, with rationale. Updated June 8, 2026 — reflects completed discovery, brand strategy, SEO audit, student workshop, naming exploration, name decision, and current repo/infrastructure context. Don't relitigate closed decisions without new evidence._

---

## One site, not two

**Decision:** Studio Crystelle Terrasson and Jukkai live on one website, not separate digital presences.

**Rationale:** The strategic value of Jukkai is the funnel between the two activities. A residential client discovers Jukkai at a vernissage, absorbs Crystelle's taste, eventually hires her for their apartment. A Jukkai visitor sees architecture projects on the screens, enters a conversation, becomes a studio client. Two separate sites kill that loop. The marketing and branding power of the art shop must feed interior design revenue, not exist in isolation.

**Status:** Closed.

---

## jukkai.fr as primary domain

**Decision:** New site lives on jukkai.fr. studioterrasson.fr 301 redirects to it.

**Rationale (original, for megalaya.fr):** The rebrand is real — a fresh domain signals the new chapter cleanly.

**Updated April 15, 2026:** Name changed from Megalaya to Jukkai. Domain strategy carries over — same logic, new domain. jukkai.fr available at time of decision. megalaya.fr no longer relevant.

**Updated June 8, 2026:** jukkai.fr exists. VPS, Cloudflare, and the database instance are online.

**Confirmed by SEO data:** 93% of search clicks come from branded queries (people Googling her name). Non-branded rankings sit on pages 4-6 with near-zero traffic — 284 non-branded queries generated only 10 clicks in a full year. There is almost nothing to lose in SEO terms and everything to gain by building proper foundations from scratch on the new domain. The "tarif" variant already ranking position 9-12 shows Google can find the site for commercial queries when a page is reasonably structured.

**Migration requirements (non-negotiable):**

- Page-by-page 301 redirect map (not just domain-level)
- GA4 + Search Console setup with proper conversion tracking from day one
- Google Business Profile update (name, URL, address to Châteaugiron)
- External profile URL updates (Linktr.ee, directories, social bios, Pages Jaunes)

**Status:** Closed. Domain registered; launch/migration execution pending.

---

## "Jukkai by Crystelle Terrasson" — keep her name at launch

**Decision:** Her name stays attached to Jukkai at launch. Not just Jukkai.

**Rationale:** Her name is 14 years of credibility and word of mouth in the territory. Jukkai has zero brand recognition today. The "by Crystelle Terrasson" is a credibility bridge while Jukkai builds its own equity. Long term she wants the option to detach her name — that's valid but it's a future problem. Build equity first, detach progressively. In 3 years when Jukkai is known in Ille-et-Vilaine, the "by" can quietly drop.

**Status:** Closed.

---

## Art is a brand signal on the website, not a shop

**Decision:** No e-commerce, no gallery catalogue on the website. Megalaya's art presence on the site exists to elevate the studio positioning, not to sell work.

**Rationale:** The primary website audiences are interior design clients (private and B2B). The art audience is served via Instagram and the physical space. On the website, Megalaya communicates "this woman has a whole world — she thinks about art, culture, and how people inhabit space." That's a positioning signal, not a sales channel. Adding e-commerce or a gallery catalogue would dilute the message and serve an audience that isn't the site's primary job.

**Status:** Closed.

---

## Crystelle is the narrative hero of the site

**Decision:** The site is built around her philosophy and point of view, not around a service list or a gallery concept.

**Rationale:** Both the studio and Megalaya are expressions of the same brain and the same instinct — "chaque contrainte est un terrain de jeu." That philosophy is what makes someone trust her with their space or their taste. Centering the site on her point of view makes both entities coherent under one roof and creates the emotional connection that converts visitors into clients.

**Note:** "Crystelle is the hero" is a narrative frame, not a design instruction. It does not mean her face at 80vh.

**Status:** Closed.

---

## Two real audiences on the site

**Decision:** Private clients and B2B clients. Everything else is secondary or not in scope for the website.

**Private clients:** Isabelle (40, full renovation, 150k budget, needs weight off her shoulders), Bernard (60, modernisation, 100k, has opinions but needs a translator), the young couple (first-time buyers, guidance within constraints), the déco client (targeted transformation, 40-50k). What they share: referral-driven, emotional before rational, the question is "can I trust her eye?"

**B2B:** Companies renovating or creating offices. Conception, material specification, decoration. Rational + emotional. Need credentials, process, references, scale.

**Art audience:** Not a primary website audience. Handled via Instagram and the physical space. The Megalaya visitor is not a collector — they see something, they want it in their home. Aesthetic and emotional decision, not investment-driven.

**Status:** Closed.

---

## The fusion is the differentiator — brand must carry it

**Decision:** The connection between art and interior architecture must be structurally visible in every brand touchpoint, not dependent on Crystelle explaining it.

**Rationale:** Discovery revealed that Crystelle naturally leads with the art shop when describing Megalaya. The studio is established, second nature. The art shop is the new energy — "un vœu de petite fille." This is natural, but it means the fusion needs to be built into the brand, the site, and the visual identity explicitly. Nobody else in the territory does both. That's the differentiator, and it only works if visitors see it without being told. The environment tells the story.

**Implication for the site:** The architecture practice must be visible from any art-facing page, and the art must be visible from any architecture-facing page. Screens in the physical space show architecture projects. The website needs the same logic: the two activities are always co-present.

**Status:** Closed.

---

## Brand philosophy locked

**Decision:** "Chaque contrainte est un terrain de jeu."

**Rationale:** Came directly from Crystelle in the discovery session. Applies to both entities: the studio takes a boring brief and makes it surprising, Megalaya takes intimidating art and makes it land in your living room. Same instinct, two expressions. The reaction she works toward: "On n'aurait jamais fait ça." This is the single line that governs every brand decision.

**Status:** Closed.

---

## Tone of voice defined

**Decision:** Five axes, each with its shadow side.

- **Warm but not soft.** Conviction, generosity, openness. Not tentative, not apologetic.
- **Colourful but not loud.** Energy, personality, density. Not shouting, not performative.
- **Accessible but not cheap.** Simple, direct, human. No jargon. But there is craft here.
- **Expert but not academic.** 14 years of depth. Never lectures, never condescends.
- **Rock but not punk.** Edge, personality, enigma. Controlled, intentional, curated. Not chaotic.

**Source:** Crystelle's own description of Jukkai as a person at a party: "colorée, un peu rock, très souriante, un peu énigmatique."

**Status:** Closed.

---

## "What Jukkai is never" — the non-negotiable list

**Decision:** Directly from Crystelle. Non-negotiable for every brand decision:

Not a boutique déco. Not a distribution store. Not "objects." Not pure concept art. Not all-white, not cold, not minimal for the sake of minimal. Not expensive-feeling. Not intimidating. Not a gallery in the traditional sense. Not a place where you whisper. Not safe.

Alive. Always alive.

**Status:** Closed.

## Economic model acknowledged

**Decision:** The studio sustains the business. Megalaya carries the brand.

**Rationale:** Crystelle's honest assessment: if Megalaya doesn't sell art for three months but generates architecture leads, that's acceptable — a personal disappointment, not a business crisis. Megalaya's value is threefold: personal ambition (working with artists daily), positioning engine (makes the studio more interesting, visible, memorable), and potential revenue stream. Revenue is welcome but not the primary measure of success.

**Implication for the site:** The site's primary job is to serve the studio's client pipeline. Megalaya's presence on the site amplifies that, not competes with it.

**Status:** Closed.

---

## SEO strategy: the site validates, it doesn't acquire (yet)

**Decision:** Preserve the validation pipeline, then build acquisition on top.

**What the data says:** 2,420 sessions/year. 93% of clicks from branded searches. The site works as a validation tool — someone hears the name, Googles it, finds the site, looks at work, checks contact. Non-branded acquisition is effectively zero: "architecte d'intérieur rennes" cluster generates 3,100 impressions/year and 8 clicks, ranking pages 4-6. Blog content ("cuisine écologique") generated 4,700 impressions and zero clicks — wrong strategy.

**What must be preserved through migration:** The branded search pipeline. People Googling "Crystelle Terrasson" must find jukkai.fr immediately. 301 redirects, Google Business Profile update, external URL updates.

**What must be built new:**

- A proper service page targeting "architecte d'intérieur rennes" and variants
- Portfolio pages with search-relevant naming (not just creative titles like "Belle Époque")
- Proper conversion tracking (form submissions, not contact page views)
- Local content strategy built on case studies with location context, not generic national topics

**The unique angle:** Jukkai gives Crystelle content territory — art × interior design — that no competitor can touch. This won't drive volume but builds a distinctive presence that separates her from every other "architecte d'intérieur rennes" page.

**Status:** Strategy set. Execution follows site architecture phase.

---

## Conversion tracking must be fixed at launch

**Decision:** The new site tracks actual form submissions, not contact page views.

**Rationale:** The current GA4 key event is a contact page view — meaning any visit to /contact/ counts. This is not a real conversion metric. Actual enquiry volume is unknown (estimated 40-115/year based on industry benchmarks of 10-30% form completion). The new site must track form submissions from day one so there is a real baseline.

**Status:** Decided, executes at build phase.

---

## Before photo locked

**Decision:** studioterrasson.fr PageSpeed audit is the documented before state for the case study.

**Key numbers:** LCP 12.4s mobile, FCP 7.9s, Best Practices 77, robots.txt broken, 516kb unused JS, 183kb unused CSS. WordPress + WP Rocket, still catastrophic.

**Additional before metrics (SEO audit):** Average search position 33. 305 queries tracked, 11 generated clicks. 294 queries with zero clicks. Overall CTR 2.4%. Homepage captures 88% of all search clicks.

**Status:** Closed.

---

## "Megalaya" has structural problems

**Decision:** The name Megalaya, while chosen with conviction by Crystelle, has functional failures against discoverability, memorability, and visual identity potential. Alternatives must be explored.

**The problems are structural, not aesthetic:**

- **Discoverability:** Competes with Meghalaya — an Indian state of 3.7 million people, a UNESCO-recognized region that permanently owns its search results. A brand cannot outrank a country on Google.
- **Memorability:** Four syllables with no natural breaking point. No phonetic anchor — the word is evenly distributed, giving memory nothing to grip.
- **Visual identity:** The student workshop confirmed it — the word dominates every layout. Too long to be a calm centre while the visual world explodes around it. "Mega-" prefix reads corporate rather than creative.

**How this surfaced:** The student workshop made it visible. Eight different designers tried to build identity systems around the word and all fought the same structural problem. Martin flagged this to Crystelle. She asked him to find alternatives.

**Status:** Closed. Naming exploration launched.

---

## Naming exploration — two finalists survive

**Decision:** After a systematic search across ~500 candidates in 30+ languages, two names survived all three filters (discoverability, memorability, visual identity potential): **Sfuméa** and **Jukkai**.

**The process:** Not a brainstorm — a linguistic excavation. Sanskrit, Arabic, Persian, Japanese, Old French, Old Castilian, Greek, Latin, Finnish, and 30+ other languages mined. Conceptual threads: blue (Crystelle's signature), the "waouh" moment, art as sensation, the fusion, constraint as play, the threshold. Phonetics research integrated — sound symbolism, productive friction, the asymmetry test (hard to read = memorable, easy to spell from hearing = discoverable). Approximately 80 candidates tested against filters, 15 survived first pass, 5 reached serious consideration, 2 survived.

**Sfuméa** (sfu-ME-a) — from sfumato, da Vinci's technique of dissolving boundaries between colours and forms. Names the fusion itself: the point where two things meet so seamlessly the boundary disappears. The "sf-" opening creates productive friction (distinctive, memorable), resolves into warm Italian-French vowels. Google: virtually clean. Story for those who ask: da Vinci, boundary dissolution. For those who don't: sounds like a place you want to visit.

**Jukkai** (juk-KA-i) — Japanese 述懐, pouring out deepest feelings. Literally: 述 (narrate) + 懐 (the heart's return). Names the gesture of interior becoming exterior — feelings carried inside finally given room to live. The double "k" creates a moment of commitment; "j" opening is soft in French, "ai" ending lands bright and open. Google: completely clean. Story for those who ask: the moment when everything inside finally finds expression. For those who don't: sounds intentional with a world behind it.

**Why these two and not others:** They name the fusion, not the parts. They reward curiosity without requiring it. They leave room — short enough to be a calm centre, open-ended enough to grow. Both end on open vowels (the mouth stays open, the sensation lingers). Both carry a story that deepens the brand without needing to be told.

**Notable dead candidates:** Azulée, Smalt, Cendres Bleues, L'Azurium, Kigai, Zaffre (all taken). Lazuline (too smooth, no edge). Solombra (4 syllables — same problem). Bô (unsearchable). Culot (real word, impossible to own).

**Interesting but unresolved:** Zelka (punchy but not clean field), Limen (perfect meaning but Google competition), Luene (warm but no depth underneath).

**Status:** Closed. Jukkai chosen — see decision below.

---

## Name chosen: Jukkai

**Decision:** Crystelle chose Jukkai. The brand becomes **Jukkai by Crystelle Terrasson**.

**How it was decided:** Martin presented the full body of work to Crystelle on April 8, 2026 — discovery process, brand strategy, SEO audit, student workshop findings, naming exploration with rationale. As part of preparation, Martin generated visual explorations (screen-print-style art prints) placing both finalist names in the brand's visual territory: bold condensed type, Klein blue, neon colour, pop-art energy. Both Martin and Crystelle independently converged on the same visual — Jukkai over a paint-splashed portrait in electric blue and neon. The name and the aesthetic direction validated each other simultaneously.

**Why Jukkai won:** 述懐 — the gesture of interior becoming exterior, feelings carried inside finally given room to live. It names what both the studio and the art shop do: give form to what someone feels but can't yet express. The double "k" gives it physical presence (signage, type, the mouth commits to the word). The "j" is soft in French, the "ai" ending opens. Google: completely clean field. Six letters, two syllables with a clear break — short enough to be a calm centre while the visual world explodes around it.

**What this unblocked:** Domain registration, brand identity consolidation, all downstream visual identity and site work. Every reference to "Megalaya" in brand-facing materials becomes "Jukkai." studioterrasson.fr redirect destination changes from megalaya.fr to jukkai.fr.

**Status:** Closed.

---

## Timeline confirmed

**Decision:** Three-phase rollout aligned with the Jukkai opening window.

- **March 8** — Discovery session ✓
- **March 10** — Brand strategy, SEO audit, decision log ✓
- **March 13** — Student workshop ✓
- **Late March → Early April** — Naming exploration (Megalaya structural issues identified, alternatives researched) ✓
- **April 8** — Presentation of full process to Crystelle ✓ — Jukkai chosen
- **April 8** — Visual name testing (generated art prints for both finalists, Crystelle and Martin converged on same visual direction) ✓
- **Post-decision → June** — Domain registration, infrastructure, Studio/API persistence, brand identity work ← current
- **June–September 2026** — Studio rushed to useful state, mock landing page, teaser landing page, content strategy
- **Around October 1, 2026** — Jukkai opening target
- **October–December 2026** — Press push (TENDANCE magazine, Melle ADELE, local press)
- **Post-launch (October+)** — First vernissages, live-painting events, regular programme begins

**Performance target for launch:** LCP under 2.5s mobile. The before photo is 12.4s. The after must be dramatic.

**Status:** Directional. Name decided (Jukkai), domain exists, identity still in progress. Next milestone: useful Studio/mockups and brand identity consolidation.

---
