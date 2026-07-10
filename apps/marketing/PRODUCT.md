# Product

Strategic context for the Jukkai marketing site. This file is a projection of
the settled strategy stack (`docs/strategy/*`) plus the direction decisions
from the July 5, 2026 grilling session. Where this file and the strategy docs
conflict, the strategy docs win.

July 10 reconciliation: `Galerie` is the canonical category. The sitemap,
homepage H1/hierarchy, and contact mechanism remain provisional until the focused
IA/SEO and contact reviews land.

**DESIGN.md is deliberately absent.** The visual system is in exploration;
Martin decides when direction freezes. Do not create DESIGN.md or run
`/impeccable document` until he says so. Current design state lives in
`docs/design/homepage-exploration.md`.

## Register

brand

## Users

- **Primary: referred particuliers** around Rennes and the région rennaise.
  Châteaugiron is the real place / Galerie anchor, not a co-primary acquisition
  market. Roughly 93% of old-site traffic was branded; hero visitors arrive
  pre-convinced and need an obvious contact path, not persuasion.
- **Permission seekers**: smaller-budget déco clients asking "is my project
  too small? what will it cost?". They need legible offers and public ranges,
  not spectacle.
- **B2B and professional spaces, explicit growth target**: need budget and délais
  confidence, responsibility/insurance, one contact, visible process, and strong
  references.
- **Cold visitors** arrive via acquisition pages (service page, cost guide)
  and scan. Conversion sections must stay scannable.
- **Galerie audience** needs the place to feel visitable, alive, and approachable.
  Its exact homepage weight remains part of the IA/design exploration.

## Product Purpose

Marketing site for Jukkai: an interior architecture studio and a Galerie
under one roof in Châteaugiron. The site's job is to make that fusion legible
(the brand carries the fusion; Crystelle's spontaneous voice does not), to
convert referred visitors through the contact paths they actually use, and to
raise the practice's perceived ceiling without pricing out small ones. Success
reactions: recognition plus intrigue in the hero, « on n'aurait jamais fait
ça » at the projects proof.

## Brand Personality

- Warm, alive, un peu énigmatique. On a envie d'aller lui parler.
- Hard ceiling from discovery: never white, never cold, never
  expensive-looking, never scary.
- Elegance is carried as rigor, the visual twin of the copy's premium
  inversion (« une mission déco avec l'exigence d'une architecte
  d'intérieur »). Craft cues yes (motion quality, typographic discipline,
  pacing); status cues no.
- Voice anchor reference: The Obsidian Assembly (warm committed ground,
  characterful display type, metadata as texture, storytelling). Adapted to a
  warm light world with real interior photography, not copied as a dark
  brand.

## Anti-references

- Beige-serif luxury interior sites: hushed monochrome, sterile calm,
  price-on-request energy. This is the lane the site borrows craft from and
  must never land in.
- White-cube cold gallery aesthetics for the art. The category may be reclaimed
  as « galerie vivante », but never as hushed white-cube codes: no whispering,
  hidden-price, collector-only, or conceptual-snob posture. Color comes from
  the works.
- AI landing-page grammar: tracked uppercase eyebrows on every section,
  identical card grids, gradient text, hero-metric templates.
- Vocabulary discipline from `docs/strategy/messaging.md` binds all UI copy,
  including placeholder text in comps.

## Design Principles

1. **Grounds carry warmth.** Each section commits to a ground from the warm
   ramp (caramel, paper, dark-warm) following the tonal script. Muted paper is
   rhythm between identity moments; identity moments (hero, projects, Galerie) are
   never muted.
2. **Imagery carries color.** Art, project photography, and the place itself
   are the color system. UI surfaces do not compete with them.
3. **Chrome is the ramp's two poles.** CTAs and UI take ink or paper from the
   section's ground and invert contextually (Obsidian recipe), animated.
   Micro-accents from the warm ramp as texture only; no owned accent hue, no
   per-section accent systems.
4. **Editorial and bold through scale and motion, not hue.** Typographic
   scale, composition, and choreography do the bold work.
5. **Motion-rich throughout, loudness decided in comps.** Every beat gets
   designed motion; per-beat intensity is decided on live comps, not in text.
   Default constraint: offer ladder and trust strip stay freely scrollable
   (no pinning or scroll hijack) because cold visitors scan them.
6. **Decisions land on live comps.** Direction picks happen by pointing at
   rendered candidates, not by choosing between text descriptions. References
   are mechanism sources, 3 to 5 per section problem, gathered when a beat
   enters comps.

## Open auditions (not yet frozen)

- Type system shape, to be comped both ways: (a) one characterful display
  family carrying the three voices (solid / outline / italic, mapped to art
  voice vs architecture voice) plus a quiet workhorse sans for body, UI, and
  metadata; (b) a serif-to-sans variable font (e.g. ABC Arizona's SRFF axis)
  as the fusion metaphor, morphing at transitions. Font identities come from
  the audition library (`public/fonts/generated/`), licensing checked before
  any freeze.
- Signature motion moment: the light-to-dark gallery entry ("pousser la
  porte") with grow-on-scroll images is the leading candidate.

## Accessibility & Inclusion

- Reduced motion is a parallel design, not a fallback checkbox. Every
  mechanism ships with its `prefers-reduced-motion` counterpart designed.
- Contrast holds on gradients: body text 4.5:1, large display 3:1, including
  the kicker H1 over the hero ground (the current draft fails this; known).
- French-language audience; every final H1 is visible, useful, and semantically
  real. Exact-match « Architecte d'intérieur à Rennes » is a candidate, not a
  frozen homepage string. Rennes, Châteaugiron, and région rennaise remain
  truthful geography to compose according to the selected IA.
- Motion must hold 60fps on mid-range hardware; transform-only discipline for
  scroll-driven work.
