# Homepage choreography score (working doc)

**Status: DRAFT, working truth for motion architecture.** From the Martin +
agent session of July 6, 2026. Companion to `homepage-exploration.md` (copy,
hero, register) and subordinate to `docs/strategy/*` for structure, copy gates,
and vocabulary. This doc owns three things: the page's choreography beats, the
scene model that implements them, and the tooling contract for how Martin and
agents iterate. Update it as experiments settle or kill beats. Do not create
`DESIGN.md`; the visual system is still in exploration.

## Where the work lives

- Integration branch: `integration/homepage`. All homepage iteration lands
  here, sliced as issues. Main is untouched until the direction is ready.
- The base is the mood-scroll comp (PR #51, merged here): page
  `/directions/mood-scroll/`, code in
  `apps/marketing/src/components/directions/mood-scroll-*`.
  Press `D` on the page for the dev panel. Presets save to
  `apps/marketing/dev/mood-scroll-presets/` through a dev-server API.
- The frozen v1 parity reference (`/directions/mood-scroll-v1/` and its
  fixture) was removed in the blockout slice (#56); the blockout deliberately
  diverges from v1, so parity stopped being meaningful.
- Goal Martin set: push this page to awwwards honorable-mention quality.

## The thesis

The mood field (WebGL blob + grain background that blends colors as you
scroll) is the page's ambient signature system. It is the glue, not the whole
show. Pages at the target level are composed as: ambient system, then a set
piece where the ambient system steps aside, then ambient again, then land.
The rhythm between quiet ambience and loud set pieces is what makes the page
feel composed instead of generated. The current comp's weakness is known:
outside the projects pin and the finale it reads as one continuous linear
interpolation. The fix is structural (this score), not more tuning.

## The beats (current score, placeholder copy throughout)

Section order and copy authority stay with the strategy stack
(`docs/strategy/wireframe-brief.md` §1.4). The blockout (#56) carries all six
beats at provisional scroll lengths, declared as scene data and tunable from
the panel; the lengths below are the blockout's starting hypotheses, not
decisions. Constraint carried from the July 5 decisions: offer ladder and
trust strip stay freely scrollable, never pinned.

1. **Hero.** `100vh`. Warm yellow-orange ground, field present, calm drift.
   Typography per `homepage-exploration.md`.
2. **Umbrella.** `100vh`. Field present, quieter. Color candidate: lavender
   over paper (open, tune live).
3. **Galerie (projects proof).** `400vh` pinned takeover (experiment #58,
   PR #66; length from the Obsidian reference pacing). The first set piece.
   The field snaps to punchy cobalt right at the pin, an editorial beat
   (giant display type) opens the dark room, a loose collage assembles,
   then the featured frame is promoted to full bleed while the blues deepen
   to their darkest. Scroll drives geometry only; the featured image cycles
   by timer and prev/next buttons. Detailed spec below.
4. **The hand-off.** `200vh` pinned takeover (`handoff`, experiment #57,
   PR #66). The signature transition out of the dark chapter: the full-bleed
   image shrinks into an arch-masked door while the light chapter's panel
   rises to the seam in the same gesture; the field mutes toward zero and
   flips to light under the risen panel (fast offer-ladder enter band). The
   arch ends sitting across the seam and scrolls away with the page.
   Detailed spec below.
5. **Light chapter (offer ladder, art shop invitation, trust).** Three
   scenes: `offerLadder 130vh`, `artShop 120vh`, `trust 100vh`. Flat light
   ground, field presence at or near zero. Art and prints read as objects on
   gallery walls; big type carries the chapter. Order of offer ladder vs art
   shop moment inside this chapter follows the wireframe; challenge it only
   with a live comp. Freely scrollable.
6. **Finale.** `140vh`. The field returns and settles: drift calms, blobs
   fade, parallax lines land the page. Exists in the comp already.

The "pousser la porte" idea found its home (July 6 session): it is not an
entry mechanism into the galerie but the exit's meaning. The arch the
hand-off leaves at the seam is the door, and the light chapter opens on the
sentence that invites you to push it. The entry into the dark chapter is
deliberately field-only: a fast cobalt snap at the takeover's start (first
galerie stops), saving the page's one big shape reveal for the exit arch.

## The galerie beat, detailed

Reference: The Obsidian Assembly, hero through gallery into the next
chapter. The committed sequence is `references/obsidian-assembly/01..16`
(1400x900, two wheel notches between frames; it supersedes the earlier
`gallery-approach` / `gallery-handoff` sets). Frames 04..14 are the dark
room: oversized display headline, loose collage, one image promoted toward
full bleed with a name and counter while the others recede.

Interaction fork RESOLVED (Martin, July 6 session): neither pure variant.
Scroll and content are decoupled. Scroll drives geometry only — the entry,
the collage assembly, the single promotion journey to full bleed, and the
exit; scrolling back rewinds the journey. Which image is featured is
time-driven (auto-advance interval) plus prev/next buttons with a counter,
never scroll, so the takeover can never trap the visitor. Built in PR #66:
the choreography segments (editorial exit, collage enter/recede, featured
appear, grow phase, chrome timing) and the carousel timing are tunables
under the `galerie` panel group.

## The hand-off, detailed

Reference: frames 10..16 of `references/obsidian-assembly/01..16`. Full
bleed with dark chrome, then the image shrinks back into a rounded frame on
near-black, resolves into a small arch-shaped frame sitting at the seam,
and a light parchment chapter rises beneath it with giant serif typography.
The arch reads as a door back into the previous chapter.

Mechanism, named for the library: **hand-off**. The element that dominated
the previous chapter shrinks into a small framed object that sits inside the
first view of the next chapter. The tonal flip (deep blue-black to light
parchment) happens in the same gesture, and the field presence drops toward
zero as the light chapter takes over. Semantically perfect here: the
project image becomes a framed work, the arch is the door, and the light
chapter's editorial sentence below the galerie is the invitation to push it
("Venez pousser la porte") — which is where the old entry idea landed.

Implementation (PR #66): the `handoff` scene is a pinned takeover so the
morph gets scrubbed runway. One fixed featured overlay is shared by the
galerie and hand-off timelines (the galerie grows it, the hand-off shrinks
it), which also hides the section seam during the unpin traversal between
the two pins; at the end of the morph the overlay swaps into an inline arch
slot so the door scrolls away with the page. The visible dark-to-light flip
is the DOM panel rising to the seam plus a fast offer-ladder enter band
that flips the field underneath it. All taste values (shrink phase and ease
shape, arch width/height/radius, seam position, overlap, panel rise, type
entrance) are tunables under the `handoff` panel group. Mobile/tablet and
reduced motion use a static equivalent: arch and light block in flow, tonal
journey intact, no morph.

## The model: conductor v2

The current implementation is one scalar: scroll position picks the deepest
active boundary trigger, which yields a blend `t` between two of five moods,
interpolating three colors. All other parameters are global constants. Two
hardcoded exceptions (projects pin, finale settle) are the only structure.

Conductor v2 replaces this with an ordered list of scenes:

```ts
scenes: [
  {
    key: 'umbrella',
    label: 'umbrella',
    length: '100vh',
    enter: { mechanism: 'crossfade', band: [0.85, 0.2], ease: 'none' },
    stops: [
      {
        at: 0,
        ground: '#f2eae0',
        blob1: '#cdb9e8',
        blob2: '#e6cbd9',
        drift: 0.28,
        radius: 0.65,
        radiusRatio: 0.78,
        strength: 0.9,
        roundness: 0,
        noise: 0.05,
        presence: 1,
      },
    ],
  },
  {
    key: 'galerie',
    length: '270vh',
    pin: true,
    enter: { mechanism: 'takeover' },
    stops: [
      { at: 0 /* cobalt, blobs big, alive */ },
      { at: 0.45 /* the intermediate dim state, drift slows */ },
      { at: 1 /* deepest blue, near still */ },
    ],
  },
  // ...
];
```

Definitions:

- **Scene**: one DOM section plus a declared scroll length (100vh default;
  a pinned scene's length is its total scroll footprint, pin travel plus one
  viewport). Since the blockout, unpinned sections take their min-height
  from `scene.length`, and every scene group in the panel has a length
  control (declare-reinit). `key` must match the current page section
  vocabulary (`hero`, `umbrella`, `galerie`, `handoff`, `offerLadder`,
  `artShop`, `trust`, `finale`); `label` is optional panel copy.
  Content-anchored, so copy edits never invalidate tuning.
- **Stop**: a full field state at `at`, a fraction of the scene's progress.
  Every field parameter lives on stops (colors, radius, ratio, strength,
  roundness, noise, drift, and **presence** 0..1, the field's opacity in the
  composition). Per-scene granularity and intermediate states both fall out
  of stops. The schema stays open for future texture params (idle warp,
  pulse) without migration.
- **Enter**: how the scene arrives, conceptually a boundary object, stored
  on the entering scene. v1 mechanisms:
  - `crossfade`: colors melt across a parameterized band with an ease
    (`none`, `smoothstep`, or `sine.inOut`). Today's behavior, now tunable
    per boundary.
  - `cut`: instant flip at a line (a degenerate crossfade). At most one or
    two per page; it is punctuation.
  - `takeover`: the scene pins and its internal choreography plays as the
    transition (the galerie).
  - `hand-off` is the first new mechanism, built as an experiment on top of
    this model, then promoted into the vocabulary if kept.
- **Render loop**: unchanged in spirit. Each frame: find active scene and
  progress, find surrounding stops, interpolate (per-segment ease allowed),
  smooth, render. Reduced motion keeps scroll-driven color and freezes
  drift and velocity, as today.
- The current page is a special case of this model (five scenes, 100vh,
  single stop each, crossfade enters, one takeover). The refactor changes
  what is expressible, not what renders on day one.

Truly global params shrink to: velocity lift, color smoothing, and dev
toggles (markers, GSDevTools).

Color note: the July 5 decision (grounds warm ramp, hue journey in blobs)
still governs light chapters. The dark galerie chapter deliberately deviates
(deep blue grounds); that deviation is settled taste from the comp review,
not an accident. Keep the hue journey in the blobs as the default elsewhere.

## Tooling contract (how Martin and agents iterate)

The rule that makes the whole thing work: **structure is code, taste is
tunables.**

- Structure (which elements animate, in what order, what a scene contains)
  is written by agents as per-scene code, reviewed like any code. Foreground
  choreography (typographic entrances, parallax, grow/shrink morphs) lives
  in per-scene GSAP timelines hooked to the same scroll progress the
  conductor reads.
- Taste (durations, distances, eases, colors, band positions, scales) is
  never hardcoded. Any magic number becomes a registered tunable:

```ts
const tunables = createTunableRegistry(config);
const growStart = tunable(tunables, 'galerie.growStartScale', 0.5, {
  min: 0.2,
  max: 1,
  step: 0.01,
});
```

The returned handle exposes `get()` and `set()`. Scene timelines read
`get()` live where possible, or declare `requiresReinit: true` for timing
values that change ScrollTrigger or timeline geometry. The dev panel renders
registered tunables automatically, grouped under the scene their id prefix
names (`galerie.growStartScale` lands in the galerie group). Save JSON
persists them with the scenes, same preset files, same repo-backed API.
Agents wire tunables and never guess at feel; Martin drives the sliders.

- The dev panel mirrors the scene model (issue #55): a jump row that scrolls
  instantly to any scene or stop (computed from the live ScrollTrigger
  layout, including inside the pinned galerie), one collapsible group per
  scene (enter controls, per-stop colors and field params, that scene's
  tunables), and a small global group (color smoothing, velocity lift,
  markers, GSDevTools). Collapse state is remembered per browser; the scene
  in view is highlighted while the panel is open. Panel styling stays
  utilitarian; no beauty pass.
- **GSDevTools** (free since GSAP 3.13) is the timeline counterpart of the
  panel: scrub and slow-mo any scene timeline while tuning. ScrollTrigger
  `markers` per scene, toggleable from the panel. Panel = taste values,
  GSDevTools = time, markers = space, presets = memory.

## Workflow: experiment loop and mechanism library

Martin designs from references, not briefs. The loop, per idea:

1. Martin drops a reference (link, video, screenshots) and points at the
   moment he wants.
2. An agent extracts the mechanism (not the pixels) and implements it in
   one scene slot, taste values as tunables, behind the comp page.
3. Martin tunes live, verdict is keep or kill. Presets and git make kills
   free. No guilt, no half-kept experiments.
4. The mechanism library below gets one line either way. The score's beats
   update when a verdict changes them.

| Mechanism                                                                  | Source                | Verdict                             | Where          |
| -------------------------------------------------------------------------- | --------------------- | ----------------------------------- | -------------- |
| Mood field (blob + grain, scroll-blended)                                  | Codrops depth gallery | kept                                | whole page     |
| Pin takeover (image grows, room dims)                                      | comp v1               | kept                                | galerie        |
| Cobalt snap entry (field-only, no DOM seam)                                | July 6 session        | built (PR #66), awaiting taste gate | galerie entry  |
| Gallery promotion (collage, grow to full bleed; content by time + buttons) | Obsidian Assembly     | built (PR #66), awaiting taste gate | galerie        |
| Hand-off (dominant image shrinks into framed arch, tonal flip)             | Obsidian Assembly     | built (PR #66), awaiting taste gate | galerie exit   |
| Idle texture (field life while not scrolling)                              | none yet              | candidate, needs refs               | ambient scenes |

## Build order

1. **Conductor v2**: scene model, stops, enter vocabulary, presence dial,
   tunables registry, GSDevTools + markers wiring. Acceptance: the
   umbrella-to-galerie-to-grown-image passage is rebuilt as a scene with
   internal stops, tunable from the panel, scrubbable with GSDevTools.
2. **Panel mirrors scenes**: groups per scene, jump navigation, presets
   carry the richer shape.
3. **Blockout**: all six beats at real scroll lengths with placeholder
   content; tune the page rhythm end to end before any art direction.
4. **Experiments**, one issue each, killable: hand-off, gallery
   interaction (scrubbed vs stepped), idle texture.
5. **Scene art direction slices**, one scene per fresh-context agent, in
   any order, per the sliced workflow.

## Parked forks (decide by experiment or later)

Resolved July 6 (see the galerie and hand-off sections): galerie
interaction (decoupled: scroll = geometry, time + buttons = content) and
the entry into the dark chapter (field-only cobalt snap; "pousser la
porte" became the exit's meaning).

- Where (and whether) a hard `cut` lands; the hand-off may be enough.
- Offer ladder vs art shop order inside the light chapter (wireframe wins
  by default).
- Umbrella color (lavender candidate, tune live).
- Idle texture treatment and its references.
- Hero intro/loader idea (exploration doc), unchanged, not designed.
- Mobile: pins and the hand-off need a designed mobile answer, not a
  degraded desktop one. Reduced motion stays a parallel design.
- Perf posture: raw WebGL stays (comp is ~4 KB gzip vs 170 KB for the
  Three.js reference); keep the hero stream transform-only (see commit
  b2e8db9 rationale).
