// Motion layer for the homepage hero. The server-rendered hero is the source
// of truth: every element is visible and positioned without this module, and
// that static frame is exactly what reduced-motion and no-JS visitors get.
// Everything here boots inside a `prefers-reduced-motion: no-preference`
// matchMedia block and reverts cleanly when the preference flips.
//
// The module finds its elements through `data-hero-*` attributes rendered by
// HomeHero.astro, never through class names, so styling can change without
// silently detaching the motion.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { HeroPrintGlLayer } from './home-hero-print-gl';
import { initHeroPrintGl } from './home-hero-print-gl';

// Every timing and amplitude knob for the hero motion. Per-print depth,
// phase, position, and size live in HOME_HERO_PRINTS (home-hero.ts).
export const HOME_HERO_MOTION_TUNING = {
  stream: {
    durationSlowest: 34, // s per traversal for the farthest print (depth 0)
    durationSpan: 16, //   the nearest print (depth 1) takes slowest - span
    travelVh: 145, //      how far each print rises (vh) before looping
    bloom: 0.13, //        fraction of the loop spent fading in/out
    bloomScale: 0.6, //    prints spawn and exit at this scale
  },
  scroll: {
    rushFactor: 0.07, //   scroll px -> timeScale (flick hard = rush)
    rushMax: 9, //         timeScale ceiling scrolling down
    reverseMax: -6, //     timeScale floor scrolling up (stream reverses)
    settleAfter: 180, //   ms of stillness before easing back to cruise
    settleDuration: 1.6, // s of the ease back to timeScale 1
    clusterDrift: -46, //  px the type cluster rises while the hero scrolls out
  },
  cursor: {
    xAmpBase: 8, //        px of x-parallax at depth 0
    xAmpDepth: 26, //      extra px at depth 1 (near prints move more)
  },
  gl: {
    enabled: true, //      set false to keep the plain DOM prints
    rippleRadius: 170, //  px around the cursor that liquefies
    rippleStrength: 0, //  liquefy amplitude; 0 disables it, > 0 to try it
    smear: 0.05, //        how much stream speed bends the prints (vertical)
    drag: 0.08, //         how much cursor-parallax drag flexes them (horizontal)
    dragMax: 0.14, //      flex ceiling so a cursor jump can't fold a print
    speedLerp: 0.06, //    smear inertia (lower = lazier fabric)
  },
} as const;

function printDepth(el: HTMLElement): number {
  return Number.parseFloat(el.dataset.heroDepth ?? '0.5');
}

export interface HomeHeroMotionOptions {
  /** Class applied to the WebGL canvas so its styling stays in the module CSS. */
  glCanvasClass: string;
}

export function initHomeHeroMotion(
  hero: HTMLElement,
  options: HomeHeroMotionOptions,
): gsap.MatchMedia {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const inHero = gsap.utils.selector(hero);
    const prints = gsap.utils.toArray<HTMLElement>('[data-hero-print]', hero);

    // Type entrance. from() tweens only ever hide content after JS is
    // already running, so a script failure leaves the full static frame.
    const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
    entrance
      .from(
        inHero('[data-hero-entrance="kicker"]'),
        { y: 18, opacity: 0, duration: 0.7 },
        0.15,
      )
      .from(
        inHero('[data-hero-entrance="row"]'),
        { y: 34, opacity: 0, duration: 0.9, stagger: 0.12 },
        0.25,
      )
      .from(
        inHero('[data-hero-entrance="lockup"]'),
        { y: 22, opacity: 0, duration: 0.8 },
        0.7,
      )
      .from(
        inHero('[data-hero-entrance="cta"]'),
        { opacity: 0, duration: 0.6 },
        1.0,
      )
      .from(
        inHero('[data-hero-entrance="proof"]'),
        { opacity: 0, duration: 0.6 },
        1.1,
      );

    // The stream: each print loops bottom -> top forever. Depth sets speed
    // (near = fast = parallax), phase seeds the loop so the field is already
    // populated at load. Spawn and exit soften on the inner wrapper.
    // Transform ownership per print, so tweens never fight: the figure takes
    // stream y + cursor x, the inner wrapper takes the bloom scale/opacity.
    //
    // Everything moves through transforms only. Repositioning via top/left
    // would count as layout shift (CLS) when the stream boots; translating
    // from the static --print-y position to the hero bottom does not.
    const streamTuning = HOME_HERO_MOTION_TUNING.stream;
    const heroHeight = hero.clientHeight;
    const streams = prints.map((el) => {
      const depth = printDepth(el);
      const inner = el.querySelector('[data-hero-print-inner]');
      const duration =
        streamTuning.durationSlowest - streamTuning.durationSpan * depth;
      const staticTopPercent = Number.parseFloat(
        el.style.getPropertyValue('--print-y'),
      );
      // Translate the print from its static frame position down to the hero
      // bottom, then rise travelVh from there over one loop.
      const startY = heroHeight * (1 - staticTopPercent / 100);
      const endY = startY - (streamTuning.travelVh / 100) * window.innerHeight;
      const stream = gsap.timeline({ repeat: -1 });
      stream
        .fromTo(el, { y: startY }, { y: endY, duration, ease: 'none' }, 0)
        .fromTo(
          inner,
          { scale: streamTuning.bloomScale, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: duration * streamTuning.bloom,
            ease: 'power1.out',
          },
          0,
        )
        .to(
          inner,
          {
            scale: streamTuning.bloomScale,
            opacity: 0,
            duration: duration * streamTuning.bloom,
            ease: 'power1.in',
          },
          duration * (1 - streamTuning.bloom),
        );
      stream.progress(Number.parseFloat(el.dataset.heroPhase ?? '0'));
      return stream;
    });

    // Scroll velocity drives the stream: scrolling down rushes it, scrolling
    // up reverses it, and stillness settles it back to cruise speed.
    const scrollTuning = HOME_HERO_MOTION_TUNING.scroll;
    let lastY = window.scrollY;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      const target = gsap.utils.clamp(
        scrollTuning.reverseMax,
        scrollTuning.rushMax,
        1 + dy * scrollTuning.rushFactor,
      );
      for (const stream of streams) {
        gsap.to(stream, {
          timeScale: target,
          duration: 0.35,
          ease: 'power1.out',
          overwrite: true,
        });
      }
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        for (const stream of streams) {
          gsap.to(stream, {
            timeScale: 1,
            duration: scrollTuning.settleDuration,
            ease: 'sine.inOut',
            overwrite: true,
          });
        }
      }, scrollTuning.settleAfter);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // The cluster drifts up slower than the page, so the type reads as
    // sitting deeper in the room than the near stream.
    gsap.to(inHero('[data-hero-cluster]'), {
      y: scrollTuning.clusterDrift,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Cursor parallax, x only — y belongs to the stream. Amplitude stays
    // small enough that the display and CTA remain readable underneath.
    const cursorTuning = HOME_HERO_MOTION_TUNING.cursor;
    const xTo = prints.map((el) =>
      gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power2.out' }),
    );
    const mouse = { x: -9999, y: -9999 };
    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      const nx = event.clientX / window.innerWidth - 0.5;
      prints.forEach((el, i) => {
        xTo[i](
          -nx *
            (cursorTuning.xAmpBase + cursorTuning.xAmpDepth * printDepth(el)),
        );
      });
    };
    window.addEventListener('mousemove', onMove);

    // WebGL material layer: paints the prints with speed smear and cursor
    // liquefy. The DOM keeps driving position; if init fails, the DOM images
    // simply stay visible. Fail-open — never let the enhancement blank the
    // hero.
    const glTuning = HOME_HERO_MOTION_TUNING.gl;
    let glLayer: HeroPrintGlLayer | null = null;
    let smoothSpeed = 0;
    const render = () => {
      if (!glLayer) return;
      smoothSpeed +=
        (streams[0].timeScale() - 1 - smoothSpeed) * glTuning.speedLerp;
      glLayer.draw({
        mouse,
        speed: smoothSpeed,
        getAlpha: (plane) => Number(gsap.getProperty(plane.inner, 'opacity')),
      });
    };
    if (glTuning.enabled) {
      try {
        glLayer = initHeroPrintGl({
          host: hero,
          items: prints.flatMap((el) => {
            const inner = el.querySelector('[data-hero-print-inner]');
            const img = el.querySelector('img');
            if (!(inner instanceof HTMLElement) || !img) return [];
            return [{ el, inner, img, depth: printDepth(el) }];
          }),
          fx: glTuning,
          canvasClass: options.glCanvasClass,
        });
      } catch {
        glLayer = null;
      }
      if (glLayer) {
        for (const el of prints) {
          const img = el.querySelector('img');
          if (img) img.style.visibility = 'hidden';
        }
        gsap.ticker.add(render);
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      clearTimeout(settleTimer);
      if (glLayer) {
        gsap.ticker.remove(render);
        glLayer.destroy();
        glLayer = null;
        for (const el of prints) {
          const img = el.querySelector('img');
          if (img) img.style.visibility = '';
        }
      }
    };
  });

  return mm;
}
