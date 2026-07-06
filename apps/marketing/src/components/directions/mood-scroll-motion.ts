// Scroll wiring for the /directions/mood-scroll/ comp.
//
// The background is weather, not scenery: blobs drift on their own clock,
// scroll never translates them. Scroll couples in three ways only —
//   - section boundaries scrub the mood palette blend
//   - the projects pin drives umbrella→projects as the image grows
//   - scroll velocity lifts brightness (capped, smoothed)
// The finale settles the field: blobs fade and drift slows, so the page
// lands instead of drifting forever under the footer.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { MoodScrollConfig, MoodStop, Rgb } from './mood-scroll-config';
import { hexToRgb, mixRgb, resolveMood } from './mood-scroll-config';
import { createMoodGl } from './mood-scroll-gl';

interface BlendTarget {
  from: MoodStop;
  to: MoodStop;
  blend: number;
}

const COLOR_SMOOTHING = 0.14;
const VELOCITY_SMOOTHING = 0.12;
const VELOCITY_NORM_PX = 60;

export function initMoodScroll(
  root: HTMLElement,
  config: MoodScrollConfig,
): (() => void) | null {
  const canvas = root.querySelector('[data-mood-canvas]');
  if (!(canvas instanceof HTMLCanvasElement)) return null;
  const moodGl = createMoodGl(canvas);
  if (!moodGl) return null;

  gsap.registerPlugin(ScrollTrigger);

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  const section = (stop: MoodStop) =>
    root.querySelector(`[data-mood-section='${stop}']`);

  // Mood conductor: an ordered chain of boundary triggers. The palette is
  // NOT written from competing onUpdate callbacks (an instant jump makes the
  // last-created trigger stomp the others); instead the render loop walks
  // the chain each frame and takes the deepest link with progress > 0.
  const chain: Array<{ from: MoodStop; to: MoodStop; st: ScrollTrigger }> = [];

  const boundary = (stop: MoodStop): ScrollTrigger | undefined => {
    const el = section(stop);
    if (!el) return undefined;
    return ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'top 20%',
      scrub: true,
    });
  };

  // Projects pin: the image grows while the room dims. The mood blend rides
  // the pin progress so the deepening is caused by the artwork taking over.
  const pinEl = section('projects');
  const growEl = root.querySelector('[data-mood-grow]');
  const captionEl = root.querySelector('[data-mood-caption]');
  let pinTrigger: ScrollTrigger | undefined;
  if (pinEl && growEl) {
    const pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: pinEl,
        start: 'top top',
        end: '+=170%',
        pin: true,
        scrub: true,
      },
    });
    pinTrigger = pinTimeline.scrollTrigger;
    pinTimeline.fromTo(
      growEl,
      { scale: 0.5 },
      { scale: 1, ease: 'none', duration: 1 },
      0,
    );
    if (captionEl) {
      // The stance is light ink: it only becomes readable once the room has
      // dimmed, so it rides the back half of the pin.
      pinTimeline.fromTo(
        captionEl,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.35 },
        0.6,
      );
    }
  }

  // Assemble the conductor chain in page order.
  const umbrellaBoundary = boundary('umbrella');
  if (umbrellaBoundary) {
    chain.push({ from: 'hero', to: 'umbrella', st: umbrellaBoundary });
  }
  if (pinTrigger) {
    chain.push({ from: 'umbrella', to: 'projects', st: pinTrigger });
  }
  const artShopBoundary = boundary('artShop');
  if (artShopBoundary) {
    chain.push({ from: 'projects', to: 'artShop', st: artShopBoundary });
  }
  const finaleBoundary = boundary('finale');
  if (finaleBoundary) {
    chain.push({ from: 'artShop', to: 'finale', st: finaleBoundary });
  }

  // Finale parallax: layers translate at different rates over the settled
  // field, an opaque texture change from the ambient sections above.
  const finaleEl = section('finale');
  if (finaleEl) {
    for (const el of root.querySelectorAll<HTMLElement>(
      '[data-mood-parallax]',
    )) {
      const speed = Number.parseFloat(el.dataset.moodParallax ?? '0') || 0;
      gsap.fromTo(
        el,
        { yPercent: speed * 100 },
        {
          yPercent: speed * -100,
          ease: 'none',
          scrollTrigger: {
            trigger: finaleEl,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      );
    }
  }

  // Render loop: smooth colors toward the scrub target (also absorbs dev
  // panel edits and variant switches), track scroll velocity, drift time.
  const current = {
    ground: hexToRgb(resolveMood(config, 'hero').ground),
    blob1: hexToRgb(resolveMood(config, 'hero').blob1),
    blob2: hexToRgb(resolveMood(config, 'hero').blob2),
  };
  let time = 0;
  let lastScrollY = window.scrollY;
  let smoothedVelocity = 0;

  const readChain = (): BlendTarget => {
    let picked: BlendTarget = { from: 'hero', to: 'hero', blend: 0 };
    for (const link of chain) {
      if (link.st.progress > 0) {
        picked = { from: link.from, to: link.to, blend: link.st.progress };
      }
    }
    return picked;
  };

  const targetRgb = (
    target: BlendTarget,
    pick: 'ground' | 'blob1' | 'blob2',
  ): Rgb => {
    const from = hexToRgb(resolveMood(config, target.from)[pick]);
    const to = hexToRgb(resolveMood(config, target.to)[pick]);
    return mixRgb(from, to, target.blend);
  };

  const tick = (_t: number, deltaMs: number) => {
    const target = readChain();
    const settle = target.to === 'finale' ? target.blend : 0;
    const calm = 1 - settle * 0.85;
    if (!reducedMotion) {
      time += (deltaMs / 1000) * config.driftSpeed * calm;
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollY);
      lastScrollY = y;
      smoothedVelocity += (delta - smoothedVelocity) * VELOCITY_SMOOTHING;
    }

    current.ground = mixRgb(
      current.ground,
      targetRgb(target, 'ground'),
      COLOR_SMOOTHING,
    );
    current.blob1 = mixRgb(
      current.blob1,
      targetRgb(target, 'blob1'),
      COLOR_SMOOTHING,
    );
    current.blob2 = mixRgb(
      current.blob2,
      targetRgb(target, 'blob2'),
      COLOR_SMOOTHING,
    );

    const velocity = reducedMotion
      ? 0
      : Math.min(smoothedVelocity / VELOCITY_NORM_PX, 1) *
        config.velocityInfluence *
        0.5;

    moodGl.render({
      ground: current.ground,
      blob1: current.blob1,
      blob2: current.blob2,
      radius1: config.blobRadius,
      radius2: config.blobRadius * config.blobRadiusRatio,
      strength: config.blobStrength * calm,
      noise: config.noiseStrength,
      time,
      velocity,
      roundness: config.blobRoundness,
    });
  };

  gsap.ticker.add(tick);
  const onResize = () => moodGl.resize();
  window.addEventListener('resize', onResize);

  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener('resize', onResize);
    moodGl.dispose();
  };
}
