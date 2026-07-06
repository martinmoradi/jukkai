# Homepage design exploration (working draft)

**Status: DRAFT, not canon.** Working notes from Martin + agent design sessions,
July 4, 2026. Nothing here is frozen copy or approved design. The strategy stack
(`docs/strategy/*`) remains truth for structure, registers, vocabulary bans, and
validation gates; where this file and the strategy conflict, the strategy wins.
Copy lines below are candidates to design around, all subject to Phase 4 freeze
and Crystelle's validation. Update or delete freely as iteration invalidates it.

## What this file is for

Carry design-session context across fresh agent sessions: the current hero/copy
candidates, the composition mechanisms extracted from references, and the open
questions. Read alongside the wireframe brief (`docs/strategy/wireframe-brief.md` §1).

## Hero: the frozen skeleton (from strategy, not draft)

One viewport: emotional display headline (display text, never a heading) +
kicker H1 (« Architecte d'intérieur à Rennes » territory, real visible text) +
nearby support copy for Châteaugiron / région rennaise + primary CTA (« Parlons
de votre projet » territory, V5-gated) + compact proof cue (reviews placeholder

- UNAID claims canon) + the compound « Jukkai by Crystelle Terrasson » exactly
  once, eyebrow weight, never a third headline. Vocabulary discipline follows
  foundation v1.6: reject cold-gallery codes, not necessarily the word « galerie »
  when it is reclaimed. Shop invitation is NOT in the hero (section 5 only).

## Hero text inventory (all candidate slots for composition trials)

Principle Martin set on July 4: a visitor who only ever sees the hero must
understand what this place is (architecture AND art), because the umbrella
section is a scroll away and the shop invitation four sections away. Saying
what Jukkai is in the hero is allowed; _inviting_ to the shop is not (the
invitation stays section 5, secondary weight). The H1 stays a clean SEO string;
the fusion is completed by sibling text outside the `<h1>` element that shares
its visual style.

Every slot below is optional except the skeleton items. Mix and match per
composition; do not use two slots that both say « art shop » (pick one).

1. **Eyebrow (skeleton):** « Jukkai by Crystelle Terrasson » — tiny, once.
2. **Kicker pair:** H1 « Architecte d'intérieur à Rennes » (element contains
   only this), plus styled sibling text completing the place/fusion identity.
   Candidates:
   - « & un art shop, sous le même toit »
   - « et bientôt un art shop » [L1: "bientôt"/date form gated]
   - « et un lieu où l'art est chez lui » (softer, no label commitment)
   - « installée à Châteaugiron, au service de la région rennaise »
3. **Display stance (skeleton):** current candidates
   « Des lieux dont on se souvient. » / « Des lieux qu'on n'oublie pas » /
   « On se souvient des lieux ».
4. **Support line** (1 short sentence, umbrella-lite, small text):
   - « Ici, on dessine des espaces et on accroche des œuvres. »
   - « Deux architectes d'intérieur, un art shop, une même exigence. »
   - « Un studio d'architecture d'intérieur et un art shop, sous le même toit,
     à Châteaugiron. » (same line as the umbrella statement; if used here,
     the umbrella section needs a different opening)
5. **Name gloss / kanji micro-label:** « jukkai 述懐, n. jap. : se souvenir à
   voix haute » (or kanji only, no translation — enigma option). Crystelle
   blesses any public gloss.
6. **Scattered micro-labels** (Obsidian "Coordinates Withheld" register, pick
   1-3):
   - « Châteaugiron, à 20 minutes de Rennes »
   - « L'art shop ouvre en octobre 2026 » [L1-gated date form]
   - « Habitat & espaces professionnels »
   - vertical 述懐 as pure texture
   - No art prices anywhere (banned register).
7. **Media-window captions** (if the shuffling window ships): project type +
   commune only, S1-gated placeholders; never invented names.
8. **CTA (skeleton):** « Parlons de votre projet → », quiet text-link weight.
9. **Proof line (skeleton):** ★ 4,9 · [XX] avis Google — UNAID · 30 ans de
   métier · 2 architectes · depuis 2012.

Comprehension test for any composition: cover everything except the hero; a
stranger should be able to answer "who, where, and what two things happen
here". If they can't, the kicker pair or support line is missing or too weak.

## Hero: current draft direction (all candidate, none settled)

Concept: the name itself anchors the hero. « jukkai » set large as a
dictionary-entry / defined-word object (content, not logo reveal), kanji 述懐 as
editorial texture, meaning echoed by the display stance.

- Eyebrow/gloss: dictionary register. Gloss wording OPEN — see "jukkai gloss"
  below. May also ship without any translation (enigma is on-brand: Crystelle
  described the brand-person as « un peu énigmatique, on a envie d'aller lui
  parler », discovery transcript bloc 5).
- Display stance candidate: « Des lieux dont on se souvient. » (name translated
  into the offer). Variants if it reads elegiac in situ: « Des lieux qu'on
  n'oublie pas », « On se souvient des lieux ». Earlier candidate « Un intérieur
  se compose comme une œuvre » rejected by Martin.
- Three-voice typography (solid / outline / italic) kept from Martin's first
  draft; voices should map to meaning (architecture voice vs art voice).
- CTA: quiet text-link register, not a button (header carries the button).
- Proof line at baseline, small caps, metadata register:
  ★ 4,9 · [XX] avis Google — UNAID · 30 ans de métier · 2 architectes · depuis 2012. Review numbers stay placeholders until real (launch task).

### Composition mechanisms (from reference teardown)

References: The Obsidian Assembly (center-of-gravity object + ground floor +
asymmetric type + stance headline), Marvell Tile & Stone (committed small-image
field on calm ground), wedding-site shifting media window (small living anchor
forgives photo quality), Telha Clarke / Japanese studio / Anastasiia (editorial
about-section pattern).

- Hero needs a center of gravity and a floor. Candidate anchor: giant defined
  word « jukkai », and/or a small fast-shuffling media window (many imperfect
  photos, small size + speed read as abundance). Ghost-opacity scattered tiles
  don't work; tiles must be committed (full presence, placement logic) or few
  and floor-anchored.
- **Floor ≠ dark.** The floor is the next section's paper color rising into the
  hero (handoff device). Current plan: light editorial section follows the hero,
  so the hero floor is light; the dark zone arrives one section later.
- Intro/loader idea (Martin): short (~1.5s, once per session, skippable,
  reduced-motion aware) intro carries the « Jukkai by Crystelle Terrasson »
  ceremony, so the static hero eyebrow stays tiny. Not designed yet.

## Page tonal script (superseded by the score)

The tonal script grew into a full choreography score on July 6, 2026:
`docs/design/homepage-score.md` now owns the beats, the scene model
(conductor v2), the transition vocabulary, and the tooling contract. The
mood-scroll comp (PR #51) is the winning direction; iteration happens on
`integration/homepage`. Original shape, kept for context: warm gradient hero
→ light editorial paper (umbrella/about) → dark gallery (projects proof;
art-lit-in-a-dark-room, color comes from the images) → paper (offer ladder)
→ shop invitation (second color moment) → quiet trust → closing. The
light→dark entry into the gallery ("pousser la porte") is still an open
signature moment; its exit twin, the Obsidian hand-off (full-bleed image
shrinks into an arched frame while the light chapter rises,
`references/obsidian-assembly/gallery-handoff-01..03.png`), is specced in
the score. Matches wireframe section order §1.4.

## Section stances (draft system)

One short stance line anchors each major section, editorial-poster style:

- Hero: the memory stance (above).
- Projects/dark gallery: « On n'aurait jamais fait ça. » — Crystelle's own
  stated goal reaction (discovery transcript: « Le "waouh". Le "on n'aurait
  jamais fait ça." »). Client-voice framing, which is exactly the register the
  strategy allows (self-asserted écoute banned; client words are the proof).
  Placement near missions/projects per Martin's instinct. DRAFT.
- Missions/offer ladder area: the waouh idea lives here or in projects, not the
  hero.
- Shop page (not homepage): thesis line appears once, there only (V2-gated).
  Current preferred territory after the July 5 discussion: « une galerie
  vivante, pensée comme un art shop », « une galerie qui ne chuchote pas », or
  « repartir avec un coup de cœur ». The old « Ni galerie, ni boutique déco. Un
  art shop. » line is only a contrast option now.
- Martin likes negative framing generally; transcript bloc 5 has the raw
  "jamais" list (pas un magasin, pas une boutique déco, pas tout blanc, pas
  froid, vivant).

## Umbrella/about section draft (Telha Clarke shape)

Statement (giant type, the section body):
« Jukkai est un studio d'architecture d'intérieur et un art shop, sous le même
toit, à Châteaugiron. Le même œil choisit les œuvres et dessine les espaces. »
(Second sentence optional; vision-tense only per bridge-claim rule.)

Micro-column: « Deux architectes d'intérieur. Des rénovations complètes aux
missions déco, pour les particuliers et les espaces professionnels. » +
« Découvrir les prestations → »

Metadata card (overlapping portrait/image, Japanese-studio style):
« Châteaugiron — à 20 minutes de Rennes / Depuis 2012 ». A portrait of
Crystelle is the one photo that can be art-directed to order (photo-quality
problem doesn't apply).

## jukkai gloss (OPEN)

述懐 (jukkai): 述 relate/state + 懐 heart/bosom/nostalgia; standard gloss
"recollection, relating one's feelings". First candidate « dire ce que le cœur
garde » rejected by Martin as melodramatic. Current candidates, dictionary-dry:

- « jukkai 述懐 — n. jap. : se souvenir à voix haute » (current favorite shape)
- « jukkai 述懐 — n. jap. : un souvenir que l'on raconte »
- No gloss at all in the hero (kanji as texture only); the name story told in
  à-propos.

Any public gloss needs Crystelle's blessing (it's her name story). NOTE: the
name was Megalaya at discovery-transcript time (March 2026); renamed since.

## CTA rationale (so future sessions don't relitigate)

Primary CTA in hero is frozen structure (foundation §5; header + hero + closing
band). It is not a persuasion checkpoint: ~93% of old-site traffic was branded,
the hero's audience arrives referred and largely pre-convinced; the CTA is the
visible door handle for them. Cold visitors scroll; they're served by the page
body and by the acquisition pages (service page, guide coût), which carry their
own conversion paths. No second CTA (art shop) in the hero: reopens the settled
foundation §5 slot fight; shop invitation runs secondary weight in section 5.

## Galerie / naming (so future sessions don't relitigate)

July 5 clarification: the problem is not necessarily the word « galerie »; the
problem is the cold/intimidating gallery code (white cube, silence, hidden
prices, conceptual snobbery, collector-only posture). « Galerie » gives category
fluency and legitimacy. « Art shop » gives permission to browse, buy, offer, and
leave with a coup de cœur. The strongest working frame is: « une galerie
vivante, pensée comme un art shop ».

« galerie châteaugiron » discovery is still mostly carried by GBP secondary
category, ArtGallery schema on `/art-shop/`, third-party listings, and maybe
signage/category language. On-page copy may use « galerie » only if it is
qualified/reclaimed by the warm, alive, purchasable Jukkai frame. Do not smuggle
a cold gallery page into the hero; the exact public label remains C8/V1/V2
validation with Crystelle.

## Design principles mined from the discovery transcript

- The goal reaction is the waouh / « on n'aurait jamais fait ça » (bloc 1).
- Never white, never cold, never expensive-looking, never scary; alive, wander,
  linger, talk (bloc 5). A dark gallery section must still feel warm and alive,
  not austere.
- The brand carries the fusion; Crystelle spontaneously doesn't (closing note).
  The site must make the fusion legible without asking her voice to.
- Transcript is March 2026, pre-rename, project has evolved: mine for texture,
  don't treat as current truth.

## Direction decisions from the July 5, 2026 grilling session

Settled with Martin; also projected into `apps/marketing/PRODUCT.md` (which
future agent sessions should read first). DESIGN.md stays deliberately absent
until Martin freezes direction.

- **Luxury-middle stance**: borrow elegance as craft (motion quality,
  typographic discipline, pacing), never as status cues. The visual twin of
  the copy's premium inversion. Ceiling unchanged: never white, cold,
  expensive-looking, or scary.
- **Color system (closed)**: grounds carry warmth (committed warm ramp per
  section, per the tonal script; muted paper is rhythm, never identity);
  imagery carries color (art, projects, the place); chrome uses the ramp's
  two poles with Obsidian-style contextual inversion, animated; micro-accents
  from the ramp as texture only. No owned accent hue. This deliberately
  shrinks the color problem to one ramp + ink.
- **Motion posture**: motion-rich throughout, every beat gets designed
  motion; per-beat loudness is decided on live comps, not in text. Default
  constraint that comps may challenge but agents must not silently break:
  offer ladder and trust strip stay freely scrollable (no pinning/hijack).
  Reduced motion is a parallel design.
- **Type system (open, comp both)**: (a) display family carrying the three
  voices + quiet workhorse sans; (b) serif-to-sans variable font (ABC
  Arizona SRFF axis in the audition library) morphing between art voice and
  architecture voice at transitions, as the fusion metaphor. Identities from
  the audition library; licensing gate before freeze.
- **References**: Obsidian Assembly is the voice anchor, not just a
  mechanism source. Atlas is sufficient for beats 1-3 and 6; beats 4, 5, and
  7 have no references yet and get their 3-5 mechanism refs only when they
  enter comps. No blanket re-screenshot passes.
- **Known hero draft issues** (both already implied above): ghost-opacity
  scattered tiles must become committed or floor-anchored; the white kicker
  H1 fails contrast on the tan ground.
