# Visual identity workroom — wordmark session capture

> **Status:** active working note, non-canonical  
> **Last edited:** 2026-07-15  
> **Useful for:** resuming the Figma identity work without reconstructing the
> session  
> **Related assets:** [`brand/`](../../brand/README.md)

This note combines Martin's Figma observations, Crystelle's reactions, and agent
recommendations. Labels describe confidence inside this working session only;
even **working agreement** does not promote a choice into project canon.

## Current working state

### Wordmark and lockup

- The wordmark master is black and single-ink. **Working agreement.**
- Current Figma component: `lockup / primary` in the Jukkai wordmark file,
  built from the thin `-26` variant. **Working agreement.**
- Shareable exports live in `brand/marks/wordmark/`.
- Recomposition history, source tools, and comparison variants live in
  `brand/source/wordmark-recomposition/`.

### Byline

Current Figma values recorded by Martin:

- Hellix VF Light;
- size 36 in the working composition;
- 16.78% letter spacing.

The following geometric specification came from the working session and still
needs to be checked against the edited Figma component before it is treated as
an export rule:

- uppercase `BY CRYSTELLE TERRASSON`;
- cap height approximately `tittle × 0.4`;
- gap from wordmark baseline to byline cap line: one tittle diameter;
- byline baseline aligned with the `j` descender tip;
- right edge flush with the `i` stem;
- byline remains a removable layer and does not change the wordmark.

## Candidate visual grammar

- The dot motif carries color and punctuation in layouts, never inside the
  wordmark. **Martin direction; Crystelle has pushed back; needs proof.**
- Painterly or ink textures belong to the surrounding world—backgrounds,
  dividers, invitations—not welded into the mark or lockup. **Martin direction;
  Crystelle has pushed back; needs proof.**
- Editorial discipline governs the system; brutalist or expressive moves act
  as accents. The rough mental ratio is 80/20, translating “rock but not punk”
  into visual behavior. **Strong working preference, not a fixed formula.**

## Motif candidates

### Dot separator

Possible use: `ARCHITECTURE INTÉRIEURE ● GALERIE D'ART` and contact-block
separators. **Interesting idea; unproven.**

### Seal / hanko

The kanji 述懐 appears in a small stamped enclosure. Intended scale is
talisman-like: card back, flyer corner, or window-vinyl detail. Use a proper
Japanese Mincho-class typeface rather than a system fallback. Current SVG
exports are in `brand/marks/seal/`. **Developed candidate, not yet selected as
the brand symbol.**

### Eye / œil

Candidate symbol: petal plus dot. It connects to the idea that the same eye
chooses works and designs spaces, and to the client's underlying question:
“Can I trust her eye?”

This is parked for a dedicated symbol session. Do not introduce it as byline
furniture or reshape the wordmark's tittles to smuggle it into the mark.
**Martin's long-held idea; provisional.**

## Typography

- **Hellix:** functional voice for body, navigation, captions, contact blocks,
  and byline. **Established through current usage.**
- **Voyage:** editorial voice for display moments, pull quotes, and expressive
  headlines. **Martin's candidate; the flyer is its first real test.**
- For small letterspaced capitals, increase weight and tracking rather than
  shrinking Hellix Light indefinitely. The earlier recommendation was Light at
  display size, then Regular with roughly 18–20% tracking at small sizes.
- Preserve French accents on capitals: `INTÉRIEURE`, `CHÂTEAUGIRON`.

## Color exploration

### Current color notes from Martin

- possible ivory field: `#EAE2D2`;
- possible dark sections or ink: `#1D1D1B`;
- Crystelle suggested a different field color for each person's business card,
  while keeping the rest of the system consistent.

These are candidates, not a palette approval.

### Working method proposed during the session

Use OKLCH and vary one axis at a time rather than choosing colors only by eye in
a hex or HSB picker:

1. Assign roles before colors: `ink`, `field`, and `accent`.
2. Build sibling fields within similar lightness and chroma bands; move hue more
   freely. The rough trial bands were L within ±0.05 and C within ±0.03.
3. Give each composition a chroma budget: one dominant field, one neutral, ink,
   and at most one high-chroma accent.
4. Check text-on-field contrast before a pairing becomes reusable.

This is an adopted exploration method, not a final token system.

## Print spacing experiment

Earlier agent recommendation, retained as a tool to test rather than a rule:

- 4 mm base unit for print layouts; whole- or half-unit margins and gaps;
- 1.333 modular type scale from a 9 pt body seed: 9 / 12 / 16 / 21.3 / 28.4 /
  37.9 pt;
- captions around 7 pt as a practical floor;
- size the lockup from wordmark width so its internal proportions remain fixed;
- below the byline's legibility floor, use the wordmark alone.

## Next useful checks

1. Compare this byline geometry with the edited Figma `lockup / primary`
   component and keep one accurate specification.
2. Test the wordmark and byline at actual business-card and flyer sizes.
3. Make one restrained composition that tests the dot/ink-world grammar rather
   than debating it abstractly.
4. Test Voyage in the flyer before treating it as an identity font.
5. Keep symbol selection—seal, eye, neither, or both in different roles—as a
   separate decision session.
