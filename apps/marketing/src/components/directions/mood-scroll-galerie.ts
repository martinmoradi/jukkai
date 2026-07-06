// Galerie choreography for the /directions/mood-scroll/ comp (experiment
// #57 + #58, reference: docs/design/references/obsidian-assembly/01..16).
//
// The contract split: scroll drives geometry only (editorial beat, collage
// assembly, promotion to full bleed, plateau, shrink-to-arch hand-off);
// time and buttons drive which image is featured. The featured frame is one
// fixed overlay element that both takeover timelines animate, so the seam
// between the galerie runway and the hand-off runway stays invisible behind
// it.
//
// Each takeover scene is a sticky runway: the section is a tall block with a
// 100vh sticky stage inside, and its timeline's 0..1 spans the whole block
// from first entry ('top bottom') to the end of the stick ('bottom bottom').
// The first viewport of that domain is the entrance window (the composed
// room scrolling in); the tunable phase values stay in stuck space (0 = the
// stage sticks, 1 = block end) and are mapped into the raw domain here.
//
// Structure is code, taste is tunables: every feel value here is registered
// and drivable from the dev panel.

import { gsap } from 'gsap';

import {
  type MoodTunableHandle,
  type MoodTunableRegistry,
  tunable,
} from './mood-scroll-tunables';

export interface GalerieChoreographyTunables {
  growStartScale: MoodTunableHandle;
  backdropFadeStart: MoodTunableHandle;
  backdropFadeDuration: MoodTunableHandle;
  editorialExitStart: MoodTunableHandle;
  editorialExitDuration: MoodTunableHandle;
  /** Entrance-space: fractions of the scroll-in window, not the stick. */
  collageEnterStart: MoodTunableHandle;
  collageEnterDuration: MoodTunableHandle;
  collageRecedeStart: MoodTunableHandle;
  collageRecedeDuration: MoodTunableHandle;
  collageRecedeDim: MoodTunableHandle;
  featuredAppearStart: MoodTunableHandle;
  growPhaseStart: MoodTunableHandle;
  growPhaseDuration: MoodTunableHandle;
  chromeStart: MoodTunableHandle;
  slideIntervalSec: MoodTunableHandle;
  slideFadeSec: MoodTunableHandle;
  shrinkStart: MoodTunableHandle;
  shrinkDuration: MoodTunableHandle;
  shrinkShape: MoodTunableHandle;
  archWidthVw: MoodTunableHandle;
  archHeightVh: MoodTunableHandle;
  archRadius: MoodTunableHandle;
  seamY: MoodTunableHandle;
  archOverlap: MoodTunableHandle;
  panelRiseStart: MoodTunableHandle;
  panelRiseDuration: MoodTunableHandle;
  typeStart: MoodTunableHandle;
  typeDuration: MoodTunableHandle;
  chromeFadeStart: MoodTunableHandle;
}

export function registerGalerieChoreographyTunables(
  registry: MoodTunableRegistry,
): GalerieChoreographyTunables {
  const reinit = { requiresReinit: true } as const;
  const phase = { min: 0, max: 1, step: 0.01, ...reinit };
  const span = { min: 0.02, max: 1, step: 0.01, ...reinit };

  return {
    growStartScale: tunable(registry, 'galerie.growStartScale', 0.46, {
      min: 0.2,
      max: 1,
      step: 0.01,
    }),
    backdropFadeStart: tunable(registry, 'galerie.backdropFadeStart', 0.06, {
      ...phase,
      max: 0.5,
    }),
    backdropFadeDuration: tunable(
      registry,
      'galerie.backdropFadeDuration',
      0.1,
      { ...span, max: 0.4 },
    ),
    editorialExitStart: tunable(registry, 'galerie.editorialExitStart', 0.16, {
      ...phase,
      max: 0.8,
    }),
    editorialExitDuration: tunable(
      registry,
      'galerie.editorialExitDuration',
      0.12,
      { ...span, max: 0.5 },
    ),
    collageEnterStart: tunable(registry, 'galerie.collageEnterStart', 0.1, {
      ...phase,
      max: 0.8,
    }),
    collageEnterDuration: tunable(
      registry,
      'galerie.collageEnterDuration',
      0.75,
      { ...span, min: 0.05, max: 1 },
    ),
    collageRecedeStart: tunable(
      registry,
      'galerie.collageRecedeStart',
      0.48,
      phase,
    ),
    collageRecedeDuration: tunable(
      registry,
      'galerie.collageRecedeDuration',
      0.18,
      { ...span, max: 0.8 },
    ),
    collageRecedeDim: tunable(registry, 'galerie.collageRecedeDim', 0.22, {
      min: 0,
      max: 1,
      step: 0.01,
    }),
    featuredAppearStart: tunable(
      registry,
      'galerie.featuredAppearStart',
      0.3,
      phase,
    ),
    growPhaseStart: tunable(registry, 'galerie.growPhaseStart', 0.46, phase),
    growPhaseDuration: tunable(registry, 'galerie.growPhaseDuration', 0.34, {
      ...span,
      min: 0.05,
    }),
    chromeStart: tunable(registry, 'galerie.chromeStart', 0.52, phase),
    slideIntervalSec: tunable(registry, 'galerie.slideIntervalSec', 4, {
      min: 1,
      max: 12,
      step: 0.5,
    }),
    slideFadeSec: tunable(registry, 'galerie.slideFadeSec', 0.6, {
      min: 0,
      max: 2,
      step: 0.05,
    }),
    shrinkStart: tunable(registry, 'handoff.shrinkStart', 0.02, {
      ...phase,
      max: 0.5,
    }),
    shrinkDuration: tunable(registry, 'handoff.shrinkDuration', 0.55, {
      ...span,
      min: 0.1,
    }),
    shrinkShape: tunable(registry, 'handoff.shrinkShape', 1.4, {
      min: 0.4,
      max: 3,
      step: 0.05,
    }),
    archWidthVw: tunable(registry, 'handoff.archWidthVw', 24, {
      min: 10,
      max: 60,
      step: 1,
      ...reinit,
    }),
    archHeightVh: tunable(registry, 'handoff.archHeightVh', 46, {
      min: 16,
      max: 80,
      step: 1,
      ...reinit,
    }),
    archRadius: tunable(registry, 'handoff.archRadius', 1, {
      min: 0,
      max: 1,
      step: 0.01,
      ...reinit,
    }),
    seamY: tunable(registry, 'handoff.seamY', 0.56, {
      min: 0.3,
      max: 0.9,
      step: 0.01,
      ...reinit,
    }),
    archOverlap: tunable(registry, 'handoff.archOverlap', 0.22, {
      min: 0,
      max: 1,
      step: 0.01,
      ...reinit,
    }),
    panelRiseStart: tunable(registry, 'handoff.panelRiseStart', 0.3, phase),
    panelRiseDuration: tunable(registry, 'handoff.panelRiseDuration', 0.45, {
      ...span,
      min: 0.05,
    }),
    typeStart: tunable(registry, 'handoff.typeStart', 0.55, phase),
    typeDuration: tunable(registry, 'handoff.typeDuration', 0.3, {
      ...span,
      min: 0.05,
    }),
    chromeFadeStart: tunable(registry, 'handoff.chromeFadeStart', 0.22, phase),
  };
}

// --- Pure choreography math (unit-tested) ---

export interface SegmentWindow {
  start: number;
  duration: number;
}

/** Clamp a timeline segment so it fits the 0..1 runway contract. */
export function clampSegment(start: number, duration: number): SegmentWindow {
  const s = clamp01(start);
  return { start: s, duration: Math.max(Math.min(duration, 1 - s), 0.001) };
}

/**
 * A sticky runway's entrance window: the first viewport of the block's
 * scroll domain ('top bottom' → 'bottom bottom'), before the stage sticks.
 * Capped so a short runway always keeps some stuck travel.
 */
export function takeoverEntranceFraction(lengthVh: number): number {
  if (!Number.isFinite(lengthVh) || lengthVh <= 0) return 0;
  return Math.min(100 / lengthVh, 0.9);
}

/** Map a stuck-space fraction (0 = stick engages, 1 = block end) to raw. */
export function stuckPosition(
  entranceFraction: number,
  position: number,
): number {
  const f = clamp01(entranceFraction);
  return f + clamp01(position) * (1 - f);
}

/** A stuck-space segment mapped and scaled into the raw timeline domain. */
export function stuckSegment(
  entranceFraction: number,
  start: number,
  duration: number,
): SegmentWindow {
  const f = clamp01(entranceFraction);
  return clampSegment(stuckPosition(f, start), duration * (1 - f));
}

/** An entrance-space segment mapped into the raw timeline domain. */
export function entranceSegment(
  entranceFraction: number,
  start: number,
  duration: number,
): SegmentWindow {
  const f = clamp01(entranceFraction);
  return clampSegment(clamp01(start) * f, duration * f);
}

export interface HandoffGeometryInput {
  archWidthVw: number;
  archHeightVh: number;
  archRadius: number;
  seamY: number;
  archOverlap: number;
}

export interface HandoffGeometry {
  archWidthPx: number;
  archHeightPx: number;
  archRadiusPx: number;
  seamTopPx: number;
  slotTopPx: number;
  /** How far the overlay frame's center shifts from viewport center. */
  frameShiftYPx: number;
}

/**
 * The arch's resting place: its bottom overlaps the light panel's seam by
 * `archOverlap` of its own height, like a door hung across the wall's edge.
 */
export function resolveHandoffGeometry(
  input: HandoffGeometryInput,
  viewport: { widthPx: number; heightPx: number },
): HandoffGeometry {
  const archWidthPx = (input.archWidthVw / 100) * viewport.widthPx;
  const archHeightPx = (input.archHeightVh / 100) * viewport.heightPx;
  const archRadiusPx = clamp01(input.archRadius) * (archWidthPx / 2);
  const seamTopPx = clamp01(input.seamY) * viewport.heightPx;
  const slotTopPx = seamTopPx - archHeightPx * (1 - clamp01(input.archOverlap));
  return {
    archWidthPx,
    archHeightPx,
    archRadiusPx,
    seamTopPx,
    slotTopPx,
    frameShiftYPx: slotTopPx + archHeightPx / 2 - viewport.heightPx / 2,
  };
}

/**
 * Symmetric power ease for the shrink: shape 1 is linear, higher shapes
 * hold the full bleed longer and land the arch harder.
 */
export function shrinkEase(progress: number, shape: number): number {
  const t = clamp01(progress);
  const p = Math.max(shape, 0.01);
  const a = Math.pow(t, p);
  const b = Math.pow(1 - t, p);
  return a / (a + b);
}

export function wrapIndex(index: number, count: number): number {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 1);
}

// --- Timeline builders ---

/**
 * Stuck-space point where the fixed overlay swaps into the inline arch slot
 * (shared with the carousel's auto-advance gate).
 */
export const HANDOFF_SWAP_AT = 0.985;

const CHOREOGRAPHY_SELECTORS = [
  '[data-galerie-backdrop]',
  '[data-galerie-editorial]',
  '[data-collage-item]',
  '[data-galerie-overlay]',
  '[data-galerie-frame]',
  '[data-galerie-chrome]',
  '[data-handoff-panel]',
  '[data-handoff-type]',
  '[data-handoff-slot]',
].join(', ');

/**
 * Drop the inline styles the choreography wrote, so a rebuild (or a switch
 * to the static fallback) starts from the stylesheet's truth. Only the
 * animated properties are cleared: `clearProps: 'all'` would also wipe the
 * server-rendered CSS custom properties (collage scatter, slide tints).
 */
export function clearGalerieChoreographyStyles(root: HTMLElement): void {
  const elements = root.querySelectorAll(CHOREOGRAPHY_SELECTORS);
  if (elements.length > 0) {
    gsap.set(elements, {
      clearProps: 'opacity,visibility,transform,width,height,borderRadius',
    });
  }
}

function handoffGeometry(t: GalerieChoreographyTunables): HandoffGeometry {
  return resolveHandoffGeometry(
    {
      archWidthVw: t.archWidthVw.get(),
      archHeightVh: t.archHeightVh.get(),
      archRadius: t.archRadius.get(),
      seamY: t.seamY.get(),
      archOverlap: t.archOverlap.get(),
    },
    { widthPx: window.innerWidth, heightPx: window.innerHeight },
  );
}

/**
 * Mirror the hand-off geometry into CSS custom properties so the inline
 * arch slot and the light panel sit exactly where the overlay morph lands.
 */
export function applyHandoffGeometryVars(
  root: HTMLElement,
  t: GalerieChoreographyTunables,
): void {
  const geometry = handoffGeometry(t);
  root.style.setProperty('--handoff-arch-w', `${geometry.archWidthPx}px`);
  root.style.setProperty('--handoff-arch-h', `${geometry.archHeightPx}px`);
  root.style.setProperty('--handoff-arch-r', `${geometry.archRadiusPx}px`);
  root.style.setProperty('--handoff-seam-top', `${geometry.seamTopPx}px`);
  root.style.setProperty('--handoff-slot-top', `${geometry.slotTopPx}px`);
}

/** Pin the timeline's duration to exactly 1 (the "1 = full pin" contract). */
function padToPinContract(timeline: gsap.core.Timeline): void {
  const spacer = { progress: 0 };
  timeline.to(spacer, { progress: 1, duration: 0.0001, ease: 'none' }, 0.9999);
}

/**
 * Galerie takeover: the composed dark room scrolls in on its backdrop while
 * the collage assembles (the entrance window), the backdrop fades to reveal
 * the cobalt field, the editorial exits, the featured frame appears and
 * grows to full bleed, plateau. The plateau has no geometry on purpose: the
 * carousel owns it, and the traversal that follows hides the section seam
 * behind the full-bleed overlay.
 */
export function createGalerieTimeline(
  root: HTMLElement,
  t: GalerieChoreographyTunables,
  entranceFraction: number,
): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true, id: 'galerie' });
  padToPinContract(tl);
  const f = entranceFraction;

  const backdrop = root.querySelector('[data-galerie-backdrop]');
  const editorial = root.querySelector('[data-galerie-editorial]');
  const collageItems = root.querySelectorAll('[data-collage-item]');
  const overlay = root.querySelector('[data-galerie-overlay]');
  const frame = root.querySelector('[data-galerie-frame]');
  const chrome = root.querySelector('[data-galerie-chrome]');

  // The editorial is stylesheet-visible so the room never arrives empty;
  // the timeline only owns its exit.
  if (editorial) {
    const exit = stuckSegment(
      f,
      t.editorialExitStart.get(),
      t.editorialExitDuration.get(),
    );
    tl.to(
      editorial,
      { autoAlpha: 0, yPercent: -22, ease: 'none', duration: exit.duration },
      exit.start,
    );
  }

  // The backdrop is the hard section boundary while the room scrolls in.
  // Just after the stick the field underneath has snapped to the same
  // cobalt, so fading the wall swaps flat paint for the living blobs.
  if (backdrop) {
    const fade = stuckSegment(
      f,
      t.backdropFadeStart.get(),
      t.backdropFadeDuration.get(),
    );
    tl.to(
      backdrop,
      { autoAlpha: 0, ease: 'none', duration: fade.duration },
      fade.start,
    );
  }

  if (collageItems.length > 0) {
    tl.set(collageItems, { autoAlpha: 0 }, 0);
    const enter = entranceSegment(
      f,
      t.collageEnterStart.get(),
      t.collageEnterDuration.get(),
    );
    tl.fromTo(
      collageItems,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        y: 0,
        ease: 'none',
        duration: enter.duration * 0.55,
        stagger: {
          each: (enter.duration * 0.45) / Math.max(collageItems.length - 1, 1),
        },
        immediateRender: false,
      },
      enter.start,
    );
    const recede = stuckSegment(
      f,
      t.collageRecedeStart.get(),
      t.collageRecedeDuration.get(),
    );
    tl.to(
      collageItems,
      {
        autoAlpha: () => t.collageRecedeDim.get(),
        scale: 0.92,
        y: -30,
        ease: 'none',
        duration: recede.duration,
      },
      recede.start,
    );
  }

  if (overlay && frame) {
    const appear = stuckSegment(f, t.featuredAppearStart.get(), 0.06);
    tl.set(overlay, { autoAlpha: 0 }, 0);
    tl.set(frame, { autoAlpha: 0 }, 0);
    tl.set(overlay, { autoAlpha: 1 }, Math.max(appear.start - 0.001, 0));
    tl.fromTo(
      frame,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: 'none', duration: appear.duration },
      appear.start,
    );
    const grow = stuckSegment(
      f,
      t.growPhaseStart.get(),
      t.growPhaseDuration.get(),
    );
    tl.fromTo(
      frame,
      {
        width: () => `${t.growStartScale.get() * 100}vw`,
        height: () => `${t.growStartScale.get() * 100}vh`,
      },
      {
        width: '100vw',
        height: '100vh',
        ease: 'none',
        duration: grow.duration,
      },
      grow.start,
    );
  }

  if (chrome) {
    const chromeIn = stuckSegment(f, t.chromeStart.get(), 0.08);
    tl.set(chrome, { autoAlpha: 0 }, 0);
    tl.fromTo(
      chrome,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, ease: 'none', duration: chromeIn.duration },
      chromeIn.start,
    );
  }

  // The galerie owns the page-load state of the shared elements: render the
  // timeline's zero state once so everything starts hidden.
  tl.time(0, false);
  return tl;
}

/**
 * Hand-off takeover: the full-bleed featured frame shrinks into an
 * arch-masked door while the light chapter's panel rises to the seam, then
 * the overlay swaps into the inline slot so the arch scrolls away with the
 * page. The runway's entrance window is the traversal between the two
 * sticky stages: it plays under the full-bleed overlay, so every beat here
 * lives in the stuck window. Every tween uses `immediateRender: false` plus
 * explicit `from` values: this timeline shares the overlay with the galerie
 * timeline, and must not write anything until its own runway is engaged.
 */
export function createHandoffTimeline(
  root: HTMLElement,
  t: GalerieChoreographyTunables,
  entranceFraction: number,
): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true, id: 'handoff' });
  padToPinContract(tl);
  const f = entranceFraction;

  const overlay = root.querySelector('[data-galerie-overlay]');
  const frame = root.querySelector('[data-galerie-frame]');
  const chrome = root.querySelector('[data-galerie-chrome]');
  const panel = root.querySelector('[data-handoff-panel]');
  const type = root.querySelector('[data-handoff-type]');
  const slot = root.querySelector('[data-handoff-slot]');

  applyHandoffGeometryVars(root, t);

  if (frame) {
    const shrink = stuckSegment(f, t.shrinkStart.get(), t.shrinkDuration.get());
    tl.fromTo(
      frame,
      {
        width: '100vw',
        height: '100vh',
        y: 0,
        borderRadius: '0px 0px 0px 0px',
      },
      {
        width: () => `${handoffGeometry(t).archWidthPx}px`,
        height: () => `${handoffGeometry(t).archHeightPx}px`,
        y: () => handoffGeometry(t).frameShiftYPx,
        borderRadius: () => {
          const r = handoffGeometry(t).archRadiusPx;
          return `${r}px ${r}px 0px 0px`;
        },
        ease: (progress: number) => shrinkEase(progress, t.shrinkShape.get()),
        duration: shrink.duration,
        immediateRender: false,
      },
      Math.max(shrink.start, 0.0001),
    );
  }

  if (chrome) {
    const chromeFade = stuckSegment(f, t.chromeFadeStart.get(), 0.12);
    tl.fromTo(
      chrome,
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        ease: 'none',
        duration: chromeFade.duration,
        immediateRender: false,
      },
      Math.max(chromeFade.start, 0.0001),
    );
  }

  if (panel) {
    // The panel is handoff-owned, so its resting state can be set eagerly.
    gsap.set(panel, { yPercent: 100 });
    const rise = stuckSegment(
      f,
      t.panelRiseStart.get(),
      t.panelRiseDuration.get(),
    );
    tl.fromTo(
      panel,
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: 'none',
        duration: rise.duration,
        immediateRender: false,
      },
      rise.start,
    );
  }

  if (type) {
    gsap.set(type, { autoAlpha: 0, yPercent: 30 });
    const entrance = stuckSegment(f, t.typeStart.get(), t.typeDuration.get());
    tl.fromTo(
      type,
      { autoAlpha: 0, yPercent: 30 },
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: 'none',
        duration: entrance.duration,
        immediateRender: false,
      },
      entrance.start,
    );
  }

  if (slot) {
    gsap.set(slot, { autoAlpha: 0 });
    const swapAt = stuckPosition(f, HANDOFF_SWAP_AT);
    const swapDuration = Math.max((1 - swapAt) * 0.6, 0.001);
    tl.fromTo(
      slot,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: swapDuration,
        ease: 'none',
        immediateRender: false,
      },
      swapAt,
    );
    if (overlay) {
      tl.fromTo(
        overlay,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          duration: swapDuration,
          ease: 'none',
          immediateRender: false,
        },
        swapAt,
      );
    }
  }

  return tl;
}

// --- Featured carousel (time + buttons, never scroll) ---

export interface FeaturedCarousel {
  setAutoAdvance(enabled: boolean): void;
  dispose(): void;
}

/**
 * One index, mirrored into every stage under the root (the fixed overlay,
 * the hand-off's inline arch slot, and the static fallback). Auto-advance
 * is externally gated so it only runs while the journey shows the frame.
 */
export function createFeaturedCarousel(
  root: HTMLElement,
  options: {
    intervalSec: MoodTunableHandle;
    fadeSec: MoodTunableHandle;
    reducedMotion: boolean;
  },
): FeaturedCarousel {
  const stages = Array.from(root.querySelectorAll('[data-carousel-stage]')).map(
    (stage) =>
      Array.from(stage.querySelectorAll<HTMLElement>('[data-carousel-slide]')),
  );
  const counters = root.querySelectorAll('[data-carousel-counter]');
  const names = root.querySelectorAll('[data-carousel-name]');
  const count = stages[0]?.length ?? 0;

  let index = 0;
  let autoAdvance = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const render = (instant: boolean) => {
    const fade = instant || options.reducedMotion ? 0 : options.fadeSec.get();
    for (const slides of stages) {
      slides.forEach((slide, slideIndex) => {
        gsap.to(slide, {
          autoAlpha: slideIndex === index ? 1 : 0,
          duration: fade,
          ease: 'power1.inOut',
          overwrite: 'auto',
        });
      });
    }
    const name = stages[0]?.[index]?.dataset.projectName ?? '';
    for (const el of names) el.textContent = name;
    for (const el of counters) el.textContent = `${index + 1}/${count}`;
  };

  const clearTimer = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };

  const schedule = () => {
    clearTimer();
    if (!autoAdvance || options.reducedMotion || count <= 1) return;
    timer = setTimeout(() => {
      if (!document.hidden) goTo(index + 1, false);
      else schedule();
    }, options.intervalSec.get() * 1000);
  };

  const goTo = (next: number, instant: boolean) => {
    if (count <= 0) return;
    index = wrapIndex(next, count);
    render(instant);
    schedule();
  };

  const onPrev = () => goTo(index - 1, false);
  const onNext = () => goTo(index + 1, false);
  const prevButtons = root.querySelectorAll('[data-carousel-prev]');
  const nextButtons = root.querySelectorAll('[data-carousel-next]');
  for (const button of prevButtons) {
    button.addEventListener('click', onPrev);
  }
  for (const button of nextButtons) {
    button.addEventListener('click', onNext);
  }

  if (count > 0) render(true);

  return {
    setAutoAdvance: (enabled: boolean) => {
      if (autoAdvance === enabled) return;
      autoAdvance = enabled;
      schedule();
    },
    dispose: () => {
      clearTimer();
      for (const button of prevButtons) {
        button.removeEventListener('click', onPrev);
      }
      for (const button of nextButtons) {
        button.removeEventListener('click', onNext);
      }
      for (const slides of stages) {
        if (slides.length > 0) gsap.killTweensOf(slides);
      }
    },
  };
}
