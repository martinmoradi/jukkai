# Jukkai Design System

> **Status: living document, v0.1 (2026-07-15). Martin-owned.** This is the
> working design system: settled decisions plus explicit defaults to build and
> print with today. It is expected to change — amend it in place and log the
> change at the bottom. Provenance labels follow
> [`docs/research/visual-identity-capture.md`](docs/research/visual-identity-capture.md)
> (the identity session log): **[settled]** · **[provisional]** · **[derived]**
> (computed from a settled value, gate-checked) · **[open]**.
>
> Rendered specimen: `/design` in `apps/marketing`
> (`bun run dev:marketing`). Reference audit behind the defaults:
> `~/src/pro/dembrandt/SYNTHESIS.md`.

## 0. Architecture: brand core vs. medium mappings

The system has two layers. The **brand core** (grammar, color roles and values,
type voices, hierarchy discipline, the relational spacing rule) is
media-independent. **Medium mappings** express it per surface: print in
millimeters and points, web in pixels and fluid ranges. Pixels never appear in
the core; millimeters never appear in the web mapping.

## 1. Grammar [settled]

**An engineered mark in one ink, living in a colorful, painterly,
dot-punctuated world.**

- Mark and lockup: always a single ink. Color is the ink or the field behind
  it, never inside the mark.
- The dot motif carries color and punctuation in layouts, never inside the
  wordmark.
- Painterly/ink textures live in the world layer only.
- Register: editorial discipline governs; brutalist/expressive interventions
  are accents — conceptually 80/20 ("rock but not punk").

Full motif ranking (seal, eye, dot, brush) lives in the capture doc §3.

## 2. Color

Work in OKLCH. Method [settled as working method]: **roles before colors**,
**hold two axes and vary one**, **chroma budget per composition** (one dominant
field + one neutral + ink, at most one high-chroma accent), **contrast is a
gate, not a taste call** (normal text ≥ 4.5:1, large text and active UI
graphics ≥ 3:1).

### Roles

| Role                 | Value                   | Hex       | Provenance                                                                              |
| -------------------- | ----------------------- | --------- | --------------------------------------------------------------------------------------- |
| `canvas`             | `oklch(0.915 0.023 85)` | `#EAE2D2` | [provisional] ivory, from a foundry reference Martin likes; Crystelle wants "not white" |
| `ink`                | `oklch(0.23 0.004 107)` | `#1D1D1B` | [provisional] warm near-black, pairs with canvas at 13.1:1 (AAA)                        |
| `ink-muted`          | `oklch(0.48 0.012 95)`  | `#605E56` | [derived] max-L warm grey passing 5:1 on canvas                                         |
| `hairline`           | `oklch(0.78 0.02 85)`   | `#BDB7A9` | [derived] rules and quiet boundaries; not for text                                      |
| `field-terracotta`   | `oklch(0.719 0.118 34)` | `#E48873` | [settled anchor] measured from Figma sessions                                           |
| `field-2`, `field-3` | — slots —               | —         | [open] powder blue and amber, to measure from Figma                                     |
| `accent`             | — slot —                | —         | [open] one high-chroma emphasis role, not yet chosen                                    |

Inverse scene: swap `canvas` and `ink` (same 13.1:1 both ways). Neutrals are
derived from the warm brand hues (H ≈ 85–107°), never generic grey.

### Field family band [settled anchor, provisional band]

Sibling fields share volume: **L 0.67–0.77, C 0.09–0.15, H free.** Terracotta
is the measured anchor. `canvas` (ivory) is deliberately _outside_ this family
— it is the paper role, not a Jukkai color.

### Hard usage rules

- Terracotta on canvas measures **2.0:1** — field only, never ink or text on
  ivory. On `ink` ground it passes at 6.5:1 and may serve as ink. [derived]
- Never two colors inside the mark or lockup. [settled]
- Per-person field color on business material, same system otherwise.
  [Crystelle, adopted]
- The brand is colorful; a single composition is not multicolored. [settled]

## 3. Typography

Two voices, no third family [settled by usage / SYNTHESIS-backed]:

- **Hellix** (sans) — functional voice: body, navigation, captions, contact
  blocks, byline, anything read or operated.
- **Voyage** (serif) — editorial voice: display, pull quotes, expressive
  headlines. [provisional — the flyer is its first real test]

### Functional ladder (Hellix) [provisional]

| Role      | Web  | Line-height | Notes                                 |
| --------- | ---- | ----------- | ------------------------------------- |
| Caption   | 14px | 1.4         | Secondary metadata only               |
| Body      | 16px | 1.5         | 18px for editorial reading            |
| Lead      | 22px | 1.4         | Shorter measure than body             |
| Sans head | 25px | 1.25        | Sparingly; never competes with Voyage |

Body measure 55–68ch; lead 35–50ch. Hierarchy discipline: H1–H3 only.

### Editorial set (Voyage) [provisional]

Semantic ranges, fluid on web (`clamp()`), not a ladder:

| Role      | Range (web) | Line-height |
| --------- | ----------- | ----------- |
| H3        | 32 → 44px   | 1.15        |
| H2        | 40 → 64px   | 1.08        |
| H1        | 52 → 96px   | 1.02        |
| Statement | 72 → 160px  | 0.95        |

### Letterspaced caps (brand style) [settled]

Hellix Light, uppercase, 15% tracking at display sizes; at small sizes step up
weight (Light → Regular) and tracking (18–20%) instead of shrinking further.
_Current constraint:_ only Hellix Regular exists as a usable file — the Light
weight arrives with the licensed family. [open]

### Print scale [provisional — calibrate on card + flyer]

Modular ratio 1.333 (perfect fourth), seed 9pt body:
9 / 12 / 16 / 21.3 / 28.4 / 37.9pt. Caption floor 7pt.

### French hygiene [settled, canon]

Accents on capitals (INTÉRIEURE, CHÂTEAUGIRON). The compound is
"by Crystelle Terrasson", lowercase b.

### Licenses [open, blocks print]

Current files are trials. Hellix and Voyage need commercial licenses before
anything is printed or deployed; wordmark source fonts (Maxi Sharp, National 2)
need a license check even though the mark is outlined.

## 4. Spacing — two gears

The rule that transfers to every medium [settled as principle]:
**space inside a group < space between groups.** Compositions feel spacious
because related things stay tight while scenes are separated decisively — not
because every gap is large.

### Web mapping [provisional]

- Fixed primitives: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160px`.
  4–12 optical, 16–32 component/grouping, 48–64 layout, 96–160 scene pacing.
- Fluid aliases: gutter `clamp(16px, 4vw, 64px)` · grid gap
  `clamp(16px, 2.5vw, 32px)` · section `clamp(64px, 10vw, 160px)` · hero
  `clamp(96px, 14vw, 240px)`.
- Three widths, always distinct: viewport field (backgrounds, oversized type) ·
  layout rail (~1280–1600px) · reading measure (ch-capped, independent).

### Print mapping [provisional — calibrate on card]

Base unit **4mm**; margins and gaps in whole or half units. Business card
85×55mm ≈ 21×13 unit grid. Lockup sizing derives from its own spec (pick
wordmark width, internals follow); below the byline legibility floor use the
wordmark alone.

OKLCH values are screen-space: print locks _roles and relationships_ here and
proofs actual CMYK values with the printer. [agent-rec, unchallenged]

## 5. Surfaces [provisional]

Flat is the default: radius 0 everywhere, depth from alignment, crop, hairlines
(1px) and tonal fields. Shadows only for true overlays. Earn any rounding as a
named exception.

## 6. Motion [provisional, web only]

| Role            | Duration | Notes                                              |
| --------------- | -------- | -------------------------------------------------- |
| Hover/press     | 120ms    | Immediate, quiet                                   |
| State change    | 200ms    | Ease out on enter                                  |
| Section reveal  | 500ms    | Opacity + small transform                          |
| Editorial curve | —        | `cubic-bezier(0.23, 1, 0.32, 1)` for large reveals |

`prefers-reduced-motion` parity always; the static composition must carry the
hierarchy on its own.

## 7. Marks and motifs

Masters live in `assets/` (single black ink):

- Wordmark: `assets/archive/wordmark/Recomposed/` (construction recipe in its
  README) — copies for the specimen in `apps/marketing/public/marks/`.
- Byline: `assets/wordmark/by crystelle terrasson.svg` (spec in capture doc §2).
- Tittle dot: `assets/tittle.svg` — the dot motif master.
- Seal 述懐: `assets/seal/` production set, `currentColor`, talisman scale only.

Lockup appears at trust moments only; everywhere else the wordmark stands
alone. [canon]

## 8. Open decisions

1. Accent color and remaining field family members (measure powder blue and
   amber from Figma, tune the band).
2. Kanji 述懐 provenance conversation with Crystelle, before first print.
3. Font licenses (§3) — blocks print and deploy.
4. Voyage's first real test on the flyer.
5. Eye symbol: separate exploration session.
6. Ivory in print: printed cream vs. ivory paper stock — decide on the card.

## Log

- 2026-07-15 — v0.1. Created from the identity capture, the dembrandt
  cross-reference audit, and Martin's ivory/dark proposal measured in OKLCH.
  `/design` specimen page added to `apps/marketing`.
