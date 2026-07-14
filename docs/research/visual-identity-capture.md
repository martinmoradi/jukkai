# Jukkai visual identity — working system

> **Status: working capture, non-canonical.** This documents identity decisions
> and tools as they emerge from Martin's Figma sessions (July 13–14, 2026 and
> onward). Per `docs/operations/method.md`, being in the repo grants no decision
> authority. Graduation: after Crystelle validates the business card and flyer,
> the settled parts move to a real design contract (`DESIGN.md` or
> `docs/design/`) and `AGENTS.md` is amended in the same PR.
>
> Provenance labels: **[canon]** = foundation.md ruling · **[settled]** = decided
> in session, Martin approved · **[provisional]** = working default, expected to
> move · **[agent-rec]** = Claude recommendation, not yet Martin's ·
> **[Crystelle]** = her request/idea · **[open]** = needs a decision.

## 1. Grammar (one sentence)

**An engineered mark in one ink, living in a colorful, painterly, dot-punctuated
world.** [settled]

- The mark and lockup are always a single ink. Color enters as the ink itself or
  as the field behind it — never inside the mark (no colored tittle). [settled]
- The dot motif carries color and punctuation in layouts, never inside the
  wordmark. [settled]
- Painterly/ink textures live in the world layer (backgrounds, dividers,
  invitations) — never welded into the mark or lockup. [settled]
- Register: editorial discipline as the governing system, brutalist/expressive
  interventions as accents — conceptually 80/20. This is the visual translation
  of the canon tone axis "rock but not punk". [settled, maps to canon]

## 2. Mark and lockup

- Wordmark construction recipe and recomposition tools:
  `Jukkai wordmark/Recomposed/README.md`. Master is black, single ink. [settled]
- Approved lockup: Figma component `lockup / primary` (Jukkai-wordmark file,
  built on the −26 thin variant). [settled]
- Byline spec [settled]: Hellix VF Light, uppercase `BY CRYSTELLE TERRASSON`,
  15% tracking; cap height = tittle × 0.4; gap wordmark-baseline → byline
  cap-line = 1 tittle diameter; byline baseline on the j descender tip; flush
  right with the i stem. The byline is a deletable layer (canon v1.4: removable
  without the wordmark changing).
- Lockup appears at trust moments only (site header, once in homepage hero,
  business material, small frontage lettering). Everywhere else the wordmark is
  alone. Below legibility floor: wordmark alone, never a shrunken lockup.
  [canon v1.4/v1.5]
- Dotted byline variant `· CRYSTELLE TERRASSON ·` (two dots echo the two
  tittles): secondary, for ceremonial surfaces where the full compound already
  appears nearby in text. Never combine BY + flanking dots. [settled]

## 3. Motifs, ranked

- **Dot separator** (`ARCHITECTURE INTÉRIEURE ● GALERIE D'ART`, contact-block
  separators): approved, carries palette colors. [settled]
- **Seal / hanko**: kanji 述懐 in a small stamped box. Talisman scale only —
  card back, flyer corner, window vinyl detail. Never inside or interrupting the
  name; a seal sits beside/after a signature. One ink. Proper Japanese typeface
  (Mincho-class), not a system fallback. [settled] Pending: provenance/meaning
  conversation with Crystelle before first print. [open]
- **Eye / œil**: candidate brand symbol (petal + dot). Strategically resonant
  ("le même œil choisit les œuvres et dessine les espaces", the "can I trust her
  eye?" client question). Parked — symbol decisions get their own session, never
  smuggled in as byline furniture or by reshaping the mark's tittles.
  [provisional, Martin's long-held idea]
- **Ink/brush gesture**: world layer only (see grammar). [settled]

## 4. Typography

- **Hellix** — functional voice: body, navigation, captions, contact blocks,
  byline. [settled by usage]
- **Voyage** — editorial voice: display/serif moments, pull quotes, expressive
  headlines. [provisional — Martin's pick, untested; the flyer is its first
  test]
- Letterspaced-caps style (byline, descriptors): Hellix Light, uppercase,
  15% tracking at display sizes; at small sizes step up weight (Light → Regular)
  and tracking (18–20%) rather than shrinking further. [settled]
- French typographic hygiene: accents on capitals (INTÉRIEURE, CHÂTEAUGIRON);
  the compound is written "by Crystelle Terrasson", lowercase b. [canon]
- **Licenses before print** [open]: current files are trials (Hellix VF-TRIAL,
  TestNational2). Hellix and Voyage need commercial licenses before the card or
  flyer is printed; the wordmark's source fonts (Maxi Sharp, National 2) need a
  license check even though the mark is outlined.

## 5. Color — method, then palette

### Method (the tool) [agent-rec, adopted as working method]

Work in **OKLCH**, not the hex/HSB picker. Its three axes are perceptually
honest: L (lightness), C (chroma = color volume), H (hue). The method is
**hold two axes, vary one** — palette work becomes a constraint system instead
of picker roulette:

1. **Roles before colors.** Every color has a job: `ink` (the mark, text),
   `field` (large background planes), `accent` (dots, one intervention per
   composition). A color may hold several roles only by explicit rule.
2. **Fields form a family by sharing L and C bands.** Sibling field colors keep
   L within ~±0.05 and C within ~±0.03 of each other; only H moves freely.
   That shared "volume" is why a palette reads as curated instead of random.
3. **Chroma budget per composition:** one dominant field + one neutral + ink,
   at most one high-C accent. The brand is colorful; a single composition is
   not multicolored.
4. **Contrast is a gate, not a taste call:** text-on-field combinations must
   pass a contrast check (WCAG/APCA) before entering the palette rules.

Anchor measurement: **terracotta rgb(228,136,115) = oklch(0.72, 0.12, 34°)**.
Candidate siblings should therefore live near L 0.67–0.77, C 0.09–0.15, with
only hue changing.

### Palette candidates [provisional — to be normalized and tuned on the card]

Black (ink) · warm cream (neutral field/paper) · terracotta (field, measured
above) · powder blue (field, unmeasured) · amber (ink + field, unmeasured).
Bright orange: ink on dark/colored grounds only, fails as ink on white. Salmon:
field only, never ink.

### Usage rules

- Per-person color coding on business material: each team member's card takes a
  different field color from the family, same system otherwise. [Crystelle,
  adopted — it gives color a job, which is what keeps colorful premium]
- Wordmark on colored field: black (or single palette ink). White-on-field
  allowed for the byline/support text if it passes the contrast gate.
- Never two colors inside the mark or lockup. [settled]

## 6. Spacing and scale (print tool) [provisional — calibrate on card + flyer]

- **Base unit:** 4 mm for print layout (card 85×55 mm ≈ a 21×13 unit grid);
  margins and gaps are whole or half units. On-screen later: 8 px base.
- **Type scale:** modular, ratio 1.333 (perfect fourth), print seed 9 pt body →
  9 / 12 / 16 / 21.3 / 28.4 / 37.9 pt. Captions/labels one step down (6.75 ≈
  7 pt floor). Display sizes may break the scale only as a deliberate
  intervention (see grammar 80/20).
- **Lockup sizing on artifacts:** derived from its own spec — pick the wordmark
  width, everything internal follows. Minimum size = the byline legibility
  floor; below it, wordmark alone.

## 7. Open decisions

1. Kanji 述懐 provenance/meaning: Crystelle conversation, before first print.
2. Palette normalization (measure Martin's Figma experiments in OKLCH, tune the
   family bands) and per-person color assignments.
3. Font licenses (section 4).
4. Eye symbol: dedicated exploration session, later.
5. Voyage's first real test on the flyer.

## Log

- 2026-07-13/14 — Lockup designed, specced, componentized (`lockup / primary`).
  Color grammar, motif ranking, register mapping settled in session. Crystelle's
  self-made card/flyer drafts reviewed; per-person color idea adopted; her
  large-gray-kanji treatment reversed in favor of the seal. This document
  created.
