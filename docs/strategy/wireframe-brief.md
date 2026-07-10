# Jukkai wireframe brief (Phase 3.5)

**Phase 3.5 candidate, produced July 2, 2026 and reconciled July 10.** Derived from
`docs/strategy/foundation.md` (v1.7, truth), `docs/strategy/messaging.md`, `docs/strategy/sitemap.md` and
`docs/strategy/content-matrix.md` (IA and content source). Audience: a Figma/wireframe agent.

This document preserves section-level page hypotheses: what each current candidate
page might show, in what order, and why. It is not a build contract until the IA/SEO
and contact/conversion confidence reviews choose a model. Every quoted
French phrase is territory, not a frozen string. The wireframes should make the
strategy visible, not make the final website beautiful.

---

## 0. Global rules (apply to every page)

1. **Architecture contact remains the commercial intent.** Exact CTA copy,
   hierarchy, and destination are open: phone, booking, email, form, or a
   contact-choice surface. Galerie visit actions are a distinct intent.
2. **Header candidate**: the brand lockup at logo position (the Jukkai wordmark
   with « by Crystelle Terrasson » as a visually subordinate line, designed so
   the line deletes without the wordmark changing — foundation §4 name-weight
   rule); current nav candidate Projets · Prestations · Galerie · À propos · Contact.
   B2B visibility, dropdowns, and header contact actions await IA review.
3. **Footer, sitewide**: full page list, NAP block (Jukkai by Crystelle
   Terrasson, Châteaugiron address, phone), « à 20 minutes de Rennes » anchor
   line, Instagram link, legal links, links to service page and guide coût
   (they are not in the nav). Slot for « anciennement Studio Crystelle
   Terrasson » during the migration window.
4. **The semantic H1 guardrail travels.** The final H1 is real, visible,
   descriptive text in normal document order. Never sr-only or orphaned keyword
   text. Exact-match homepage wording and the emotional-display/H1 split are open.
5. **Placeholders are labelled, never invented.** Legacy validation keys
   (S1, C1..C9, L1..L6, V1..V8) defer to the named inputs in the current
   questions and messaging docs. Do not invent projects, testimonials, artist names, art
   prices, events, offer names, or offer prices to fill a frame.
6. **Vocabulary discipline is absolute** even in wireframe placeholder text:
   no cold-gallery, boutique, magasin, product-grid, ecommerce, catalogue, or
   « prix sur demande » codes for the Galerie; no « premium / haut de gamme /
   luxe », no QVT boilerplate, no self-asserted « nous sommes à l'écoute », no
   past-tense art×architecture bridge claims. `Galerie` is canonical; the writing
   makes the category living, accessible, purchasable, and distinctively Jukkai.
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
   a person at trust moments (à-propos story, beside the contact action), not as
   a brand suffix.

### Shared proof-module library

Reference these by ID in the per-page briefs; design each once, reuse everywhere.

| ID   | Module                    | Contents                                                                                                                                                                  |
| ---- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PM1  | Qualification strip       | 2 architectes · 30 ans de métier · UNAID · current insurance. The 2012 founding story never appears as a contextless badge. Compact; qualifies, never persuades.          |
| PM2  | Testimonial card          | Client quote slot + attribution (first name + commune + project type). Content is C4-gated: slots only.                                                                   |
| PM3  | Project card              | Photo, creative title (Jukkai register), descriptive subtitle, commune, project type. Dual naming always.                                                                 |
| PM4  | Before/after or 3D module | Transformation proof; optional per project (not all rows have it).                                                                                                        |
| PM5  | Price/range table         | Current dated Crystelle ranges, mission-depth distinctions, and clearly separated market context. Working full-mission placeholder: roughly 12–14%, pending confirmation. |
| PM6  | Process steps             | Phases from first contact to suivi de chantier; names the contrat de mission / lettre de mission plainly.                                                                 |
| PM7  | FAQ block                 | Accordion or list; only on the three acquisition surfaces. FAQ schema is Phase 4.                                                                                         |
| PM8  | Reviews cue               | Google reviews count/stars, compact, real numbers only.                                                                                                                   |
| PM9  | Visit/NAP block           | Address, hours, itinerary link, map. Hours and phone are L5-gated.                                                                                                        |
| PM10 | Quiet artist route        | One low-priority « Vous êtes artiste ? » contact line near the bottom of Galerie. Instagram/direct networking do the actual artist acquisition.                           |

---

## 1. Homepage `/`

1. **Page job.** Validate the referral in seconds, open the Jukkai world, route
   to the service page, projets, and the Galerie. Serves the branded searcher; the
   service page serves the stranger.
2. **Lead register.** Fusion: Jukkai sets the frame, architecture anchors it.
   This is the likely page where both registers share the viewport. The exact
   hero construction remains part of the IA/SEO review.
3. **Above the fold.** All in one viewport: the Jukkai world sets the register
   (colour, art, alive); an emotional display headline that is NOT a heading;
   a visible semantic H1 that identifies the architecture practice; a nearby
   support line carrying Rennes and the Châteaugiron physical anchor;
   the primary CTA; a compact proof cue (PM8 + UNAID from PM1). The full brand
   compound appears once in this frame (eyebrow-line
   territory, per global rule 8); the header lockup above it already carries
   the name, so the hero instance stays small and must not read as a third
   headline.
4. **Section order.**
   1. Hero (the fusion frame above).
   2. Umbrella answer: what Jukkai is (the practice, the Galerie, the place);
      one short section resolving how these activities belong together.
   3. Transformation proof teaser: 3 project cards (PM3) routing to `/projets/`.
   4. Offer ladder teaser: the four mission sizes in one glance, routing to
      `/prestations/` (catches « is my project too small? » early).
   5. The Galerie invitation: scene imagery + « venez pousser la porte » CTA
      to `/galerie/`, secondary weight.
   6. Trust strip: PM1 + PM8, with a line routing to `/a-propos/`.
   7. Closing CTA band: primary CTA repeated.
5. **Proof modules.** PM8 + PM1 (hero cue and trust strip), PM3 ×3.
6. **CTA placement.** Primary: header, hero, closing band. Secondary: Galerie
   invitation in section 5 only. Tertiary: « voir les projets » links.
7. **SEO/content requirements.** Descriptive title with brand, category, and
   geography; exact pattern follows the selected IA. Rennes carries the search
   phrase, Châteaugiron is phrased as the physical anchor, not a co-primary
   market. Branded intent only. The H1 obeys global rule 4, but neither its
   exact wording nor its visual relationship to display copy is frozen. Internal
   links to the service page and guide coût somewhere in the body or footer.
8. **Validation-needed.** Exact CTA French, final project teaser rows, real
   review count (launch task), hero visuals (Crystelle approves selection).
9. **Wireframe guardrails.** The Galerie section must not read as a second hero;
   do not hide the only descriptive heading for visual convenience; do not write
   placeholder testimonial quotes; sections 3 and 5 must be modular (swap rows,
   swap imagery, zero structural change); below the hero, the compound never
   reappears (global rule 8): section headings and CTAs use « Jukkai » alone or
   no brand at all.

## 2. Service page `/architecte-interieur-rennes/`

1. **Page job.** Give the stranger arriving from « architecte d'intérieur
   rennes » a complete, credible answer and carry them toward contact. This is
   a P0 acquisition-page candidate, subject to the IA/SEO comparison.
2. **Lead register.** Architecture. At most one Jukkai closing note.
3. **Above the fold.** Keyword-first H1 (« Architecte d'intérieur à Rennes »
   territory), an immediate answer-style intro (who, where: basée à
   Châteaugiron, à 20 minutes de Rennes; for whom: Rennes et la région
   rennaise), PM1 compact, primary CTA.
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
6. **CTA placement.** Primary contact intent: hero, after the trust block,
   closing band. The eventual action and destination follow the contact review.
   Secondary: projets and guide coût links (deepen before converting).
7. **SEO/content requirements.** Keyword-first title. Body vocabulary: Rennes,
   région rennaise, Ille-et-Vilaine (35); use `35` only paired with the
   department name. Châteaugiron is the physical anchor, not part of the
   service-page H1. Cross-links both ways with the guide coût. FAQ block is
   table stakes.
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
   offer (the old site's H1 failure is not repeated); the project-size ladder
   visible or one scroll away; primary CTA.
4. **Section order.**
   1. Intro: one identity, a full ladder of mission sizes beneath it.
   2. Offer 1: conseil / mission déco. Structural slot with placeholder name,
      price, and scope (C1/C2-gated); premium-inversion frame territory
      (« une mission déco avec l'exigence d'une architecte d'intérieur »,
      placement V3-gated).
   3. Offer 2: transformation ciblée, with range.
   4. Offer 3: rénovation complète, with the choice between conception-only
      and mission complète made explicit. Working full-mission fee territory:
      roughly 12–14% of the construction budget, pending confirmation and
      small-project exceptions.
   5. Offer 4: espaces professionnels as a routing card to
      `/amenagement-bureaux-rennes/`, not full content.
   6. Mission depth: a clear comparison of cerebral/design work versus
      contractor coordination and suivi de chantier, including what the
      décennale changes for the client.
   7. Pricing recap: PM5 with the market frames, cross-link to the guide coût.
   8. Process: PM6, the contrat de mission named plainly.
   9. Closing CTA band.
5. **Proof modules.** PM5, PM6; one PM2 slot optional near the ladder; art
   woven as a vision line inside offers 2-3.
6. **CTA placement.** Primary: a contact action per offer, plus the closing
   band. Prefill is an optional implementation hypothesis, not a requirement.
   Secondary: guide coût.
7. **SEO/content requirements.** Brand-first title (« Prestations & tarifs »
   territory). Supports the tarif cluster via cross-links; does not chase it.
   No FAQ block here.
8. **Validation-needed.** C1 (entry offer name/price/scope), C2 (offer names,
   Crystelle veto), V3 (premium-inversion placement), and the exact sequence for
   the free first meeting after lead qualification.
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
      (selection-gated; the module must read credibly while empty of names, carried by
      project type and scale).
   4. Fee structure at office scale (PM5 variant).
   5. Pro project gallery routing to `/projets/` (pro filter).
   6. FAQ (PM7), B2B-shaped.
   7. Closing CTA band with click-to-call / click-to-email.
5. **Proof modules.** PM6, PM3 (pro rows), PM5, PM7; PM1 compact near the CTA.
6. **CTA placement.** Primary: the contact route chosen by the contact review.
   Click-to-call and click-to-email remain visible and tracked; B2B may justify
   elevating them. Secondary: voir les projets pro.
7. **SEO/content requirements.** Keyword-first title. Targets « aménagement
   bureaux rennes », « architecte bureau rennes ». FAQ block required.
8. **Validation-needed.** Final B2B case selection, facts, assets, and any new
   client constraint. Existing public cases are presumptively reusable.
9. **Wireframe guardrails.** No QVT / « bien-être des collaborateurs »
   boilerplate anywhere, including placeholders; no invented client names or
   surfaces; the page must stand on process alone before final case selection; Jukkai atmosphere is
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
   6. Closing: route to the service page and the chosen contact action.
5. **Proof modules.** PM5 (the page's core), PM6 (condensed), PM7; PM1 compact.
6. **CTA placement.** Primary contact intent, after the table and at close.
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
   4. Quiet Galerie note (one line, tertiary).
5. **Proof modules.** PM3 as the entire body.
6. **CTA placement.** Primary: closing band. Secondary: the filter, the quiet
   Galerie note.
7. **SEO/content requirements.** Brand-first title (« Projets » territory).
   Long-tail equity lives on the project pages; the hub feeds them.
8. **Validation-needed.** Final launch slate (6-10 rows, ladder coverage:
   full renovation, modernisation, déco transformation, 2-4 pro).
9. **Wireframe guardrails.** The grid must look intentional at 6 rows and at
   12; the filter is client-side state, not navigation to segment URLs; cards
   carry real communes only; do not design around any specific project name
   (all rows are provisional).

## 7. Project page template `/projets/{slug-descriptif}/`

1. **Page job.** One transformation story: photos, location, type, scope,
   constraints, choices, and budget where permitted.
2. **Lead register.** Architecture structure with dual naming; the creative
   title is the Jukkai moment. Art enters only when the real project supports it
   or as a restrained vision note.
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
   6. Optional Galerie connection where it arises naturally. If the project has
      no real art component, keep it as a restrained vision note or omit it.
   7. Next project + primary CTA.
5. **Proof modules.** PM4, PM2, photo gallery, location/type metadata.
6. **CTA placement.** Primary contact action at close. Secondary: next project,
   service page.
7. **SEO/content requirements.** Brand-first title with dual naming
   (« {Titre créatif} : {sous-titre descriptif, commune} — Jukkai... »).
   Descriptive slug from real type + commune (never the creative title).
   Catches « rénovation {type} {commune} » long tail.
8. **Validation-needed.** Existing public projects are presumptively reusable.
   Confirm the final facts, selected assets, budget disclosure, and any new client
   or privacy constraint per row.
9. **Wireframe guardrails.** Every module after the title block is
   optional-tolerant (a project without before/after or testimonial must still
   compose well); any art move is one bounded optional block, never a false
   track-record claim; no invented locations, budgets, or quotes.

## 8. Galerie `/galerie/`

1. **Page job.** Make the place visitable and desirable before opening: the
   scene, the temporary October 2026 opening message, visit information, the
   artist route, and a framing that makes this Galerie unmistakably Jukkai.
2. **Lead register.** Jukkai. Structural blocks such as visit information keep
   architecture precision.
3. **Above the fold.** The scene leads: space photos/renders with sensory
   framing (you push the door, colour, art on the walls, the architects at work,
   a coffee offered), plus « ouverture en octobre 2026 » territory (L1).
4. **Section order.**
   1. Scene hero + temporary opening message.
   2. Thesis line, exactly once. Preferred territory: « une galerie qui ne
      chuchote pas » / « repartir avec un coup de cœur » or an affirmative
      equivalent. Negative framing is optional. The requirement is to make the
      category theirs, not to evade the word galerie (V2-gated).
   3. What you will find: œuvres, sculptures, mobilier iconique, and the visible
      working architects; coup-de-cœur permission (« adepte ou néophyte »
      territory); gift-register accessibility. Slot for the price-behaviour
      sentence (V6-gated: may promise visible in-Galerie pricing, never invent
      numbers).
   4. Visit block: PM9 (address, hours L5-gated, itinerary link).
   5. Pre-opening CTA block: Instagram follow, with newsletter only if an
      operational tool and a real publishing plan exist.
   6. Quiet artist route: PM10. A full artist page is deliberately low priority.
   7. Quiet presence of the primary architecture CTA (footer-adjacent, small).
5. **Proof modules.** Space photos/renders (L4), PM9, PM10, the opening claim.
6. **CTA placement.** Primary architecture CTA present but quiet. The page's
   own jobs run at secondary weight: itinerary click, Instagram follow, any
   real newsletter signup, and artist contact route. Track them separately.
7. **SEO/content requirements.** Brand-first title. Use Galerie confidently,
   with language that makes it living, approachable, and purchasable. GBP,
   schema (Phase 4), citations, and signage/category layers can carry the same
   vocabulary. Châteaugiron discovery surface.
8. **Validation-needed.** V2 (thesis line), V6 (price behaviour), C9/V8
   (artist terms wording), L1 (temporary date form), L4 (visuals), L5 (hours,
   phone). Wireframe all as labelled slots.
9. **Wireframe guardrails.** No invented prices, event promises, artist names,
   or ecommerce/catalogue patterns. Do not use boutique, magasin, or objets as
   dominant labels. The thesis line appears once. The artist route must not
   suggest pay-to-exhibit. The architecture CTA never competes with visit CTAs.

## 9. À propos `/a-propos/`

1. **Page job.** Her story and the umbrella (Jukkai is the whole: the practice,
   the Galerie, the place), credentials in precision, the transition from the old
   name.
2. **Lead register.** Blend: the story in Jukkai warmth, the credentials in
   architecture precision. Never alternate registers within one block.
3. **Above the fold.** The people (2 architectes: Crystelle and Laura) and the
   story opening. Not a keyword surface; no SEO hero mechanics.
4. **Section order.**
   1. Story opening: Crystelle, 30 ans de métier, the move to Châteaugiron
      (Jukkai warmth).
   2. The umbrella: what Jukkai is, connecting the studio and the Galerie.
   3. The two architects (both present, roles).
   4. How she thinks: neuro-architecture as a narrative lens inside the story,
      grounded in real training and used only where the project makes it
      relevant (C6-gated wording), plus « Chaque contrainte est un terrain de
      jeu ».
   5. Credentials block: PM1 plus the 2023 « Professionnel de la décoration
      éco-responsable » label. The studio's 2012 origin belongs in the story,
      not as a floating longevity badge.
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

## 10. Contact `/contact/` (research-gated)

1. **Page job.** Make the easiest appropriate next step obvious without hiding
   legitimate alternatives. Reaching this page is intent, not itself a
   conversion.
2. **Lead register.** Architecture, warm. No guest moments.
3. **Above the fold.** Warm heading (« Parlons de votre projet » territory), a
   one-line reassurance, and the primary contact choice visible. Whether that
   is call, booking, form, or a choice surface is still open.
4. **Section order.**
   1. Heading + reassurance line.
   2. Contact paths: phone, email, booking and/or a short project form. The
      hierarchy and number of paths must follow research and Crystelle's real
      lead-handling behaviour.
   3. If retained, a short form may ask only what improves response or
      qualification. Candidate fields include project type, commune and a
      budget uncertainty option; none are frozen.
   4. PM1 compact beside or below the primary path.
   5. PM9: NAP, map/itinerary, « à Châteaugiron, à 20 minutes de Rennes ».
5. **Proof modules.** PM1, PM9.
6. **CTA placement.** Open. Each real action is measured separately: phone
   click, email click, booking completion, form success, and Galerie itinerary.
7. **SEO/content requirements.** Brand-first title. Indexable (the old
   /contact/ held position ~10).
8. **Validation-needed.** L5 (new NAP), Crystelle's current lead sources and
   qualification flow, historic form/booking usage, and the contact research.
9. **Wireframe guardrails.** Do not count the page view as a conversion. Do not
   remove the phone number merely to force trackable website behaviour; Google
   Business Profile and other off-site paths remain part of the funnel. Every
   retained path must have a clear purpose.

## 11. Confirmation `/contact/merci/` (conditional)

1. **Page job.** If a form is retained, confirm successful submission and
   explain what happens next. This page is not required if the selected contact
   architecture does not need it.
2. **Lead register.** Architecture, warm.
3. **Above the fold.** Clear confirmation message and what happens next.
4. **Section order.**
   1. Confirmation + what happens next.
   2. Optional next action only if it matches the selected operating flow, such
      as booking or a soft route back to the projects.
5. **Proof modules.** None required; optionally one PM3 row as the return path.
6. **CTA placement.** Conditional on the chosen flow. A booking link is one
   candidate, not the default.
7. **SEO/content requirements.** Noindex. A successful submission event is the
   measurement anchor; it need not depend on a unique URL.
8. **Validation-needed.** The contact/conversion decision and Crystelle's real
   follow-up process.
9. **Wireframe guardrails.** No upsell clutter, no newsletter pitch, no second
   form; the page must read as completion. Never count a mere page load if the
   URL can be visited directly or refreshed.

---

## Open items the wireframes must keep visible

- Every still-gated slot renders as a labelled placeholder in the frames, so
  the validation surface stays visible through Phase 4 (matrix rule: silent
  promotion to final is a defect).
- The IA/SEO review must decide the page model, primary navigation, homepage
  semantics, service-page role, B2B visibility, and guide-cost timing before
  these frames become a build contract.
- The contact/conversion review must decide the action hierarchy, form role,
  booking role, and measurement model. `/contact/merci/` remains conditional.
