# Jukkai wireframe brief (Phase 3.5)

**Phase 3.5 deliverable, produced July 2, 2026.** Derived from `docs/strategy/foundation.md`
(v1.5, truth), `docs/strategy/messaging.md` (registers, vocabulary), `docs/strategy/sitemap.md` and
`docs/strategy/content-matrix.md` (IA and content source). Audience: a Figma/wireframe agent.

This document defines section-level page outlines: what each page must show, in
what order, and why. It is not final copy and not visual design. Every quoted
French phrase is territory, not a frozen string. The wireframes should make the
strategy visible, not make the final website beautiful.

---

## 0. Global rules (apply to every page)

1. **One primary CTA per page, always the architecture enquiry** (« Parlons de
   votre projet » territory, pointing to `/contact/`). The shop's invitation
   (« venez pousser la porte » territory) is always secondary weight and never
   competes visually. No exceptions, including the shop page.
2. **Header, sitewide**: the brand lockup at logo position (the Jukkai wordmark
   with « by Crystelle Terrasson » as a visually subordinate line, designed so
   the line deletes without the wordmark changing — foundation §4 name-weight
   rule); nav Projets · Prestations · L'art shop · À propos · Contact, flat, no
   dropdowns; plus the primary CTA as a styled button beside the nav, visually
   distinct from it.
3. **Footer, sitewide**: full page list, NAP block (Jukkai by Crystelle
   Terrasson, Châteaugiron address, phone), « à 20 minutes de Rennes » anchor
   line, Instagram link, legal links, links to service page and guide coût
   (they are not in the nav). Slot for « anciennement Studio Crystelle
   Terrasson » during the migration window.
4. **The H1 guardrail travels.** Where a page pairs an emotional display
   headline with an architecture H1 (homepage model), the H1 is real, visible,
   styled text in normal document order. Never sr-only, never orphaned keyword
   text. Heading hierarchy below it stays coherent.
5. **Placeholders are labelled, never invented.** Any module gated on a
   validation key (S1, C1..C9, L1..L6, V1..V8) is wireframed as a clearly
   labelled slot. Do not invent projects, testimonials, artist names, art
   prices, events, offer names, or offer prices to fill a frame.
6. **Vocabulary bans are absolute** even in wireframe placeholder text: no
   galerie / boutique / magasin / objets for the shop, no « prix sur demande »,
   no « premium / haut de gamme / luxe », no QVT boilerplate, no self-asserted
   « nous sommes à l'écoute », no past-tense art×architecture bridge claims.
7. **Project pages are modular proof rows, not structural pillars.** Any module
   that consumes projects (teasers, galleries, reference slots) must work when
   rows are added, swapped, or removed, and must render acceptably at the low
   end of the 6-10 launch slate.
8. **Name-weight rule (foundation §4, v1.4).** The full « Jukkai by Crystelle
   Terrasson » compound appears in exactly three visible places: the header
   lockup (rule 2), the footer NAP block (rule 3), and once in the homepage
   hero's first viewport. Never in section headings, never in CTAs, never in
   running or placeholder copy, never repeated beside other wordmark instances.
   Body text says « Jukkai » and « Crystelle » separately; her name appears as
   a person at trust moments (à-propos story, beside the contact form), not as
   a brand suffix.

### Shared proof-module library

Reference these by ID in the per-page briefs; design each once, reuse everywhere.

| ID   | Module                    | Contents                                                                                                                                                                                     |
| ---- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PM1  | Claims-canon strip        | 2 architectes · 30 ans de métier · depuis 2012 · UNAID. Compact; qualifies, never persuades. Sits near conversion points.                                                                    |
| PM2  | Testimonial card          | Client quote slot + attribution (first name + commune + project type). Content is C4-gated: slots only.                                                                                      |
| PM3  | Project card              | Photo, creative title (Jukkai register), descriptive subtitle, commune, project type. Dual naming always.                                                                                    |
| PM4  | Before/after or 3D module | Transformation proof; optional per project (not all rows have it).                                                                                                                           |
| PM5  | Price/range table         | Public architecture ranges in market frames (8-15% des travaux, €/m², entry offer once validated).                                                                                           |
| PM6  | Process steps             | Phases from first contact to suivi de chantier; names the contrat de mission / lettre de mission plainly.                                                                                    |
| PM7  | FAQ block                 | Accordion or list; only on the three acquisition surfaces. FAQ schema is Phase 4.                                                                                                            |
| PM8  | Reviews cue               | Google reviews count/stars, compact, real numbers only.                                                                                                                                      |
| PM9  | Visit/NAP block           | Address, hours, itinerary link, map. Hours and phone are L5-gated.                                                                                                                           |
| PM10 | Artist block              | « Vous êtes artiste ? » heading territory, no-fee-to-exhibit line, named contact route, « come see the place » invitation, studio-solidity line (depuis 2012). Terms wording is C9/V8-gated. |

---

## 1. Homepage `/`

1. **Page job.** Validate the referral in seconds, open the Jukkai world, route
   to the service page, projets, and the shop. Serves the branded searcher; the
   service page serves the stranger.
2. **Lead register.** Fusion: Jukkai sets the frame, architecture anchors it.
   The one page where both registers share the viewport, per the frozen hero
   ruling.
3. **Above the fold.** All in one viewport: the Jukkai world sets the register
   (colour, art, alive); an emotional display headline that is NOT a heading;
   the architecture kicker as the real H1 (« Architecte d'intérieur à Rennes &
   Châteaugiron » territory); the primary CTA; a compact proof cue (PM8 + UNAID
   from PM1). The full brand compound appears once in this frame (eyebrow-line
   territory, per global rule 8); the header lockup above it already carries
   the name, so the hero instance stays small and must not read as a third
   headline.
4. **Section order.**
   1. Hero (the fusion frame above).
   2. Umbrella answer: what Jukkai is (the practice, the shop, the place); one
      short section resolving the « studio or art shop? » objection.
   3. Transformation proof teaser: 3 project cards (PM3) routing to `/projets/`.
   4. Offer ladder teaser: the four mission sizes in one glance, routing to
      `/prestations/` (catches « is my project too small? » early).
   5. The world / shop invitation: scene imagery + « venez pousser la porte »
      CTA to `/art-shop/`, secondary weight.
   6. Trust strip: PM1 + PM8, with a line routing to `/a-propos/`.
   7. Closing CTA band: primary CTA repeated.
5. **Proof modules.** PM8 + PM1 (hero cue and trust strip), PM3 ×3.
6. **CTA placement.** Primary: header, hero, closing band. Secondary: shop
   invitation in section 5 only. Tertiary: « voir les projets » links.
7. **SEO/content requirements.** Frozen title: « Jukkai by Crystelle Terrasson
   — Architecte d'intérieur, Rennes & Châteaugiron ». Branded intent only. The
   kicker H1 obeys global rule 4. Internal links to the service page and guide
   coût somewhere in the body or footer.
8. **Validation-needed.** Exact CTA French (V5), project teaser rows (S1), real
   review count (launch task), hero visuals (Crystelle approves selection).
9. **Wireframe guardrails.** The shop section must not read as a second hero;
   the emotional headline must never be markup-promoted to H1; do not write
   placeholder testimonial quotes; sections 3 and 5 must be modular (swap rows,
   swap imagery, zero structural change); below the hero, the compound never
   reappears (global rule 8): section headings and CTAs use « Jukkai » alone or
   no brand at all.

## 2. Service page `/architecte-interieur-rennes/`

1. **Page job.** Give the stranger arriving from « architecte d'intérieur
   rennes » a complete, credible answer and carry them to the form. P0
   acquisition surface; the page the site is built around.
2. **Lead register.** Architecture. At most one Jukkai closing note.
3. **Above the fold.** Keyword-first H1 (« Architecte d'intérieur à Rennes »
   territory), an immediate answer-style intro (who, where: « à Châteaugiron, à
   20 minutes de Rennes », for whom), PM1 compact, primary CTA.
4. **Section order.**
   1. H1 + intro answering the query directly.
   2. Offer summary: the mission ladder with entry price ranges on-page (the
      SERP rewards visible pricing), each row anchoring to `/prestations/`.
   3. Process: PM6 including the contrat de mission line.
   4. Trust block: PM2 ×3-5 slots + PM8.
   5. Project gallery: PM3 ×3-4, habitat rows, routing to `/projets/`.
   6. Geo coverage: Rennes et sa région, real communes served only.
   7. FAQ (PM7) including « architecte d'intérieur ou décorateur ? ».
   8. One Jukkai closing note (the place, the world), small.
   9. Closing CTA band.
5. **Proof modules.** PM1, PM2, PM3, PM5 (entry ranges), PM6, PM7, PM8.
6. **CTA placement.** Primary: hero, after the trust block, closing band.
   Secondary: projets and guide coût links (deepen before converting).
7. **SEO/content requirements.** Keyword-first title. Body vocabulary: Rennes,
   Ille-et-Vilaine, région rennaise; Châteaugiron as the physical anchor.
   Cross-links both ways with the guide coût. FAQ block is table stakes.
8. **Validation-needed.** Testimonials to collect (C4): wireframe slots with
   the attribution format visible. Claims phrasing (C5). Entry-offer figure in
   the ladder is C1-gated.
9. **Wireframe guardrails.** No invented testimonials, communes, or figures;
   the geo section must not look like a doorway-page commune list; the Jukkai
   note stays one bounded block; écoute and budget respect appear only inside
   client-word slots, never as studio self-description.

## 3. Prestations `/prestations/`

1. **Page job.** Make the offer ladder and its public prices legible, show the
   process including the contrat de mission, and catch « is my project too
   small? ».
2. **Lead register.** Architecture, with art woven into offer descriptions as
   vision (never a named prestation).
3. **Above the fold.** H1 naming the architecte d'intérieur identity over the
   ladder (the old site's H1 failure is not repeated); the four mission sizes
   visible or one scroll away; primary CTA.
4. **Section order.**
   1. Intro: one identity, a full ladder of mission sizes beneath it.
   2. Offer 1: conseil / mission déco. Structural slot with placeholder name,
      price, and scope (C1/C2-gated); premium-inversion frame territory
      (« une mission déco avec l'exigence d'une architecte d'intérieur »,
      placement V3-gated).
   3. Offer 2: transformation ciblée, with range.
   4. Offer 3: rénovation complète / mission complète, with range (8-15% des
      travaux frame).
   5. Offer 4: espaces professionnels as a routing card to
      `/amenagement-bureaux-rennes/`, not full content.
   6. Pricing recap: PM5 with the market frames, cross-link to the guide coût.
   7. Process: PM6, the contrat de mission named plainly.
   8. Closing CTA band.
5. **Proof modules.** PM5, PM6; one PM2 slot optional near the ladder; art
   woven as a vision line inside offers 2-3.
6. **CTA placement.** Primary: per-offer enquiry buttons with project type
   prefilled (Phase 4 wires the prefill; wireframe shows the intent), plus
   closing band. Secondary: guide coût.
7. **SEO/content requirements.** Brand-first title (« Prestations & tarifs »
   territory). Supports the tarif cluster via cross-links; does not chase it.
   No FAQ block here.
8. **Validation-needed.** C1 (entry offer name/price/scope), C2 (offer names,
   Crystelle veto), V3 (premium-inversion placement), the old « first meeting
   free » claim needs operational re-confirmation before reuse.
9. **Wireframe guardrails.** The entry-offer slot ships structurally with a
   labelled placeholder, never an invented name or price; all four offers use
   one repeatable offer-module layout so names and prices can change without
   redesign; the B2B card must not grow into a full section; bridge language
   stays vision-tense.

## 4. Espaces professionnels `/amenagement-bureaux-rennes/`

1. **Page job.** Convert office fit-out demand through process made visible and
   references, not QVT clichés. P1 acquisition surface. Breadcrumb reads
   Prestations › Espaces professionnels while the URL sits at root.
2. **Lead register.** Architecture, rational path leads. Jukkai present as
   atmosphere (a studio with taste is itself a B2B argument), never leading.
3. **Above the fold.** Keyword-first H1 (« Aménagement de bureaux à Rennes »
   territory), the one-contact / respect des délais et du budget promise as
   concrete commitments, primary CTA plus a visible click-to-call.
4. **Section order.**
   1. H1 + intro: end-to-end conception and prescription, one interlocutor.
   2. Process made visible: PM6 in B2B shape (cahier des charges intake,
      phases, artisan relay, suivi), including the factual 150 m² / Ordre
      threshold line.
   3. References: PM3 ×2-4 slots in the « named client, surface, place » shape
      (S1-gated; the module must read credibly while empty of names, carried by
      project type and scale).
   4. Fee structure at office scale (PM5 variant).
   5. Pro project gallery routing to `/projets/` (pro filter).
   6. FAQ (PM7), B2B-shaped.
   7. Closing CTA band with click-to-call / click-to-email.
5. **Proof modules.** PM6, PM3 (pro rows), PM5, PM7; PM1 compact near the CTA.
6. **CTA placement.** Primary: enquiry form with espace professionnel
   prefilled. Secondary: click-to-call / click-to-email at elevated prominence
   (B2B moves by phone; both are tracked events), voir les projets pro.
7. **SEO/content requirements.** Keyword-first title. Targets « aménagement
   bureaux rennes », « architecte bureau rennes ». FAQ block required.
8. **Validation-needed.** S1: B2B naming permissions. Reference slots stay
   explicit and labelled until cleared.
9. **Wireframe guardrails.** No QVT / « bien-être des collaborateurs »
   boilerplate anywhere, including placeholders; no invented client names or
   surfaces; the page must stand on process alone pre-S1; Jukkai atmosphere is
   imagery and tone, never a structural section.

## 5. Guide coût `/combien-coute-architecte-interieur-rennes/`

1. **Page job.** Own the proven tarif query with real figures and feed the
   service page. P0; the one non-branded demand the old site nearly ranked for.
2. **Lead register.** Architecture. No guest moments.
3. **Above the fold.** The question itself as H1, a direct short answer
   immediately below (answer-extraction format), visible date (2026).
4. **Section order.**
   1. H1 + direct answer summary (the ranges in two or three sentences).
   2. Price table per mission type: PM5 with market consensus frames (80-120
      €/h, 40-120 €/m², 8-15% des travaux) plus the Jukkai entry-offer figure
      slot (C1-gated).
   3. What drives the cost (surface, scope, mission type).
   4. What a mission covers, including the contrat de mission line.
   5. FAQ (PM7): peut-on négocier ?, que couvre la mission ?, « architecte
      d'intérieur ou décorateur ? ».
   6. Closing: route to the service page, then the form.
5. **Proof modules.** PM5 (the page's core), PM6 (condensed), PM7; PM1 compact.
6. **CTA placement.** Primary: enquiry form, after the table and at close.
   Secondary: service page link (both ways cross-linking is required).
7. **SEO/content requirements.** Keyword-first, dated title, refreshed yearly.
   Tables and tiered structure for answer extraction; FAQ schema in Phase 4.
8. **Validation-needed.** C1: the entry-offer price is a published figure on
   this page; the slot stays a labelled placeholder until validated.
9. **Wireframe guardrails.** Market benchmarks and Jukkai's own ranges must be
   visually distinct (never blur consensus data into a Jukkai claim); no
   invented Jukkai figures; no Jukkai-register moments; the layout must survive
   a yearly figures refresh without redesign.

## 6. Projets hub `/projets/`

1. **Page job.** Proof by transformation; browse by habitat / espaces
   professionnels.
2. **Lead register.** Architecture structure; the creative titles on cards are
   the Jukkai moment.
3. **Above the fold.** Short intro line, the habitat/pro filter, and the first
   row of cards. The grid is the page; it starts immediately.
4. **Section order.**
   1. Intro line + filter (habitat / espaces professionnels; one view, no
      separate URLs).
   2. Card grid: PM3 rows, each with creative title, descriptive subtitle,
      commune, type.
   3. Closing CTA band.
   4. Quiet art-shop note (one line, tertiary).
5. **Proof modules.** PM3 as the entire body.
6. **CTA placement.** Primary: closing band. Secondary: the filter, the quiet
   art-shop note.
7. **SEO/content requirements.** Brand-first title (« Projets » territory).
   Long-tail equity lives on the project pages; the hub feeds them.
8. **Validation-needed.** S1: the launch slate (6-10 rows, ladder coverage:
   full renovation, modernisation, déco transformation, 2-4 pro).
9. **Wireframe guardrails.** The grid must look intentional at 6 rows and at
   12; the filter is client-side state, not navigation to segment URLs; cards
   carry real communes only; do not design around any specific project name
   (all rows are provisional).

## 7. Project page template `/projets/{slug-descriptif}/`

1. **Page job.** One transformation story: photos, location, type, the écoute
   and budget register, the closing art move.
2. **Lead register.** Architecture structure with dual naming; the creative
   title and the closing art move are the Jukkai moments.
3. **Above the fold.** Creative title as display text, descriptive subtitle
   (type + commune), hero photo. Phase 4 resolves whether the H1 is the
   descriptive subtitle or a combined form, per the H1 guardrail; the wireframe
   shows both text levels.
4. **Section order.**
   1. Title block (dual naming) + key facts: commune, project type.
   2. The starting point: the client's brief and question (« par quoi
      commencer » territory), écoute register.
   3. The transformation: photo sequence with PM4 where real assets exist.
   4. Scope and budget facts, where permitted.
   5. Testimonial: PM2 slot, where permitted.
   6. Closing art move: vision framing only (« le même œil choisit les œuvres
      et dessine les espaces » territory), with a quiet link to `/art-shop/`.
   7. Next project + primary CTA.
5. **Proof modules.** PM4, PM2, photo gallery, location/type metadata.
6. **CTA placement.** Primary: enquiry form at close. Secondary: next project,
   service page.
7. **SEO/content requirements.** Brand-first title with dual naming
   (« {Titre créatif} : {sous-titre descriptif, commune} — Jukkai... »).
   Descriptive slug from real type + commune (never the creative title).
   Catches « rénovation {type} {commune} » long tail.
8. **Validation-needed.** Everything per row is S1: photos, commune, client
   naming, testimonial permission.
9. **Wireframe guardrails.** Every module after the title block is
   optional-tolerant (a project without before/after or testimonial must still
   compose well); the closing art move is one bounded block, never past-tense,
   never a track-record claim; no invented locations, budgets, or quotes.

## 8. L'art shop `/art-shop/`

1. **Page job.** Make the place visitable and desirable before opening: the
   scene, the date, visit info, the artist block, the thesis line.
2. **Lead register.** Jukkai. Structural blocks (visit info, artist block,
   solidity) keep architecture precision.
3. **Above the fold.** The scene leads: space photos/renders with sensory
   framing (you push the door, colour, art on the walls, the architects at work,
   a coffee offered), plus the opening claim (« ouverture le 1er octobre 2026 »
   or month-level form, L1).
4. **Section order.**
   1. Scene hero + opening date.
   2. Thesis line, exactly once: « Ni galerie, ni boutique déco. Un art shop. »
      (wording V2-gated).
   3. What you will find: the scene unpacked (œuvres, sculptures, mobilier
      iconique, the visible working architects), coup-de-cœur permission
      (« adepte ou néophyte » territory), gift-register accessibility. Slot for
      the price-behaviour sentence (V6-gated: may only promise visible in-shop
      pricing, never print numbers).
   4. Visit block: PM9 (address, hours L5-gated, itinerary link).
   5. Pre-opening CTA block: newsletter signup + Instagram follow (newsletter
      tool unconfirmed, sitemap 9.10: design so it degrades to Instagram-only).
   6. Artist block: PM10.
   7. Quiet presence of the primary architecture CTA (footer-adjacent, small).
5. **Proof modules.** Space photos/renders (L4), PM9, PM10, the opening-date
   claim, the studio-solidity line inside PM10.
6. **CTA placement.** Primary architecture CTA present but quiet. The page's
   own jobs run at secondary weight: itinerary click, Instagram follow,
   newsletter signup, artist contact route (all tracked).
7. **SEO/content requirements.** Brand-first title (« L'art shop — Jukkai by
   Crystelle Terrasson »). Never chases « galerie » on-page; GBP and schema
   (Phase 4) carry that vocabulary. Châteaugiron discovery surface.
8. **Validation-needed.** The largest validation surface on the site: C8/V1
   (« L'art shop » label), V2 (thesis line), V6 (price-behaviour sentence),
   C9/V8 (artist terms wording), L1 (date form), L4 (visuals), L5 (hours,
   phone). Wireframe all as labelled slots.
9. **Wireframe guardrails.** No prices, no « prix sur demande » register, no
   event promises, no artist names, no ecommerce or catalogue patterns (no
   product grids, no cart affordances); banned words absolute (galerie,
   boutique, magasin, objets); the thesis line appears once and is never echoed
   as a motif; the artist block must not visually suggest pay-to-exhibit; the
   architecture CTA never competes with the visit CTAs here, and the visit CTAs
   never rise to primary weight.

## 9. À propos `/a-propos/`

1. **Page job.** Her story and the umbrella (Jukkai is the whole: the practice,
   the shop, the place), credentials in precision, the transition from the old
   name.
2. **Lead register.** Blend: the story in Jukkai warmth, the credentials in
   architecture precision. Never alternate registers within one block.
3. **Above the fold.** The people (2 architectes: Crystelle and Laura) and the
   story opening. Not a keyword surface; no SEO hero mechanics.
4. **Section order.**
   1. Story opening: Crystelle, 30 ans de métier, the move to Châteaugiron
      (Jukkai warmth).
   2. The umbrella: what Jukkai is, answering « studio or art shop? ».
   3. The two architects (both present, roles).
   4. How she thinks: neuro-architecture as a narrative lens inside the story
      (C6-gated wording), plus the philosophy line « Chaque contrainte est un
      terrain de jeu ».
   5. Credentials block: PM1 (compact, architecture precision).
   6. Transition line: « anciennement Studio Crystelle Terrasson » (migration
      window; design as removable).
   7. Closing CTA + voir les projets.
5. **Proof modules.** PM1, portraits/space imagery, the transition line.
6. **CTA placement.** Primary: closing enquiry CTA. Secondary: projets.
7. **SEO/content requirements.** Brand-first title (« À propos » territory).
   Catches branded and « anciennement studio crystelle terrasson » migration
   queries (meta layer, Phase 4).
8. **Validation-needed.** C5 (claims phrasing), C6 (neuro-architecture
   sentence, her veto), C7 (bridge: only if a documented placement exists).
9. **Wireframe guardrails.** Never blur 30 (her career) with 2012/14 (the
   studio); neuro-architecture is never a badge, credential logo, or trust-block
   item; credentials stay compact (they qualify; the stories persuade); the
   transition line is one removable element, not woven into the layout.

## 10. Contact `/contact/`

1. **Page job.** Convert: the qualification form, no budget floor, the warm
   door.
2. **Lead register.** Architecture, warm. No guest moments.
3. **Above the fold.** Warm heading (« Parlons de votre projet » territory), a
   one-line reassurance, and the form starting in the first viewport.
4. **Section order.**
   1. Heading + reassurance line.
   2. The form, frozen contract: project type (rénovation complète /
      transformation ciblée / espace professionnel / conseil déco / artiste),
      commune, budget band with an explicit « je ne sais pas encore » option,
      phone optional.
   3. PM1 compact beside or below the form (the qualification objection is
      answered at the conversion point).
   4. Alternate routes: click-to-call, click-to-email (tracked).
   5. PM9: NAP, map/itinerary, « à Châteaugiron, à 20 minutes de Rennes ».
5. **Proof modules.** PM1, PM9.
6. **CTA placement.** Primary: the form submit. Secondary: call/email. No
   Calendly on this page; booking lives on `/contact/merci/` only.
7. **SEO/content requirements.** Brand-first title. Indexable (the old
   /contact/ held position ~10).
8. **Validation-needed.** C3 (budget-band comfort), L5 (new NAP), L6
   (Crystelle's contact-flow preference: instant booking vs personal reply).
9. **Wireframe guardrails.** The form is the page: nothing above it may push it
   below the fold on desktop; no extra form fields beyond the frozen contract;
   no budget floor signalling anywhere; Calendly must not appear here.

## 11. Confirmation `/contact/merci/`

1. **Page job.** Confirm the submission, fire the tracked conversion, offer the
   Calendly accelerator.
2. **Lead register.** Architecture, warm.
3. **Above the fold.** Clear confirmation message (merci territory, what
   happens next) and the booking offer visible.
4. **Section order.**
   1. Confirmation + what happens next.
   2. Calendly accelerator: « choisissez un créneau si vous voulez avancer tout
      de suite » territory, embed or link.
   3. Soft routing back: voir les projets.
5. **Proof modules.** None required; optionally one PM3 row as the return path.
6. **CTA placement.** The Calendly booking is this page's action, framed as
   optional acceleration, never as a required next step. Secondary: back to
   projets.
7. **SEO/content requirements.** Noindex. This URL (or its equivalent submit
   event) anchors the primary conversion measurement.
8. **Validation-needed.** L6 (whether booking or personal reply leads the
   confirmation framing).
9. **Wireframe guardrails.** No upsell clutter, no newsletter pitch, no second
   form; the page must read as completion (the conversion already happened);
   Calendly is the accelerator, never presented as the only door.

---

## Open items the wireframes must keep visible

- Every S1/C/L/V-gated slot renders as a labelled placeholder in the frames, so
  the validation surface stays visible through Phase 4 (matrix rule: silent
  promotion to final is a defect).
- Sitemap §9 decisions still pending at brief time (flat nav, /art-shop/ slug,
  guide coût at launch, B2B slug at root, /contact/merci/ as conversion URL)
  are wireframed per the proposed defaults; if a default flips at freeze, only
  the affected frame changes.
