// Scroll wiring for the /directions/mood-scroll/ comp.
//
// The background is weather, not scenery: blobs drift on their own clock,
// scroll never translates them. Scroll couples in three ways only:
//   - scene enter windows scrub the field blend
//   - takeover scenes pin and scrub their internal stops
//   - scroll velocity lifts brightness (capped, smoothed)

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  type ConductorTarget,
  parseSceneLengthVh,
  resolveConductorTarget,
  resolveEnterWindow,
  toMoodGlFrame,
} from './mood-scroll-conductor';
import type { MoodScene, MoodScrollConfig, Rgb } from './mood-scroll-config';
import {
  mixRgb,
  MOOD_SCROLL_STRUCTURE_CHANGE_EVENT,
} from './mood-scroll-config';
import { createMoodGl } from './mood-scroll-gl';

const VELOCITY_SMOOTHING = 0.12;
const VELOCITY_NORM_PX = 60;

type ConductorLink = {
  target: ConductorTarget;
  st: ScrollTrigger;
};

type ConductorState = {
  chain: ConductorLink[];
  dispose: () => void;
};

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
  const frozen =
    new URLSearchParams(window.location.search).get('frozen') === '1';

  let conductor = createConductorState(root, config);
  let chain = conductor.chain;
  let conductorRebuildFrame: number | null = null;

  const rebuildConductor = () => {
    conductor.dispose();
    conductor = createConductorState(root, config);
    chain = conductor.chain;
    ScrollTrigger.refresh();
  };

  const scheduleConductorRebuild = () => {
    if (conductorRebuildFrame !== null) return;
    conductorRebuildFrame = window.requestAnimationFrame(() => {
      conductorRebuildFrame = null;
      rebuildConductor();
    });
  };

  window.addEventListener(
    MOOD_SCROLL_STRUCTURE_CHANGE_EVENT,
    scheduleConductorRebuild,
  );

  const section = (scene: MoodScene) =>
    root.querySelector(`[data-mood-section='${scene.key}']`);

  // Finale parallax: layers translate at different rates over the settled
  // field, an opaque texture change from the ambient sections above.
  const finaleScene = config.scenes.find((scene) => scene.key === 'finale');
  const finaleEl = finaleScene ? section(finaleScene) : null;
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
  const firstScene = config.scenes[0];
  const firstField = resolveConductorTarget(config, {
    mechanism: 'rest',
    sceneKey: firstScene.key,
    progress: 0,
  });
  const current: { ground: Rgb; blob1: Rgb; blob2: Rgb } = {
    ground: firstField.ground,
    blob1: firstField.blob1,
    blob2: firstField.blob2,
  };
  let time = 0;
  let lastScrollY = window.scrollY;
  let smoothedVelocity = 0;

  const readTarget = (): ConductorTarget => {
    let picked: ConductorTarget = {
      mechanism: 'rest',
      sceneKey: firstScene.key,
      progress: 0,
    };
    for (const link of chain) {
      if (link.st.progress > 0) {
        picked = {
          ...link.target,
          progress: link.st.progress,
        };
      }
    }
    return picked;
  };

  const tick = (_t: number, deltaMs: number) => {
    const target = resolveConductorTarget(config, readTarget());
    if (!reducedMotion && !frozen) {
      time += (deltaMs / 1000) * target.drift;
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollY);
      lastScrollY = y;
      smoothedVelocity += (delta - smoothedVelocity) * VELOCITY_SMOOTHING;
    }

    const colorSmoothing = frozen ? 1 : config.colorSmoothing;
    current.ground = mixRgb(current.ground, target.ground, colorSmoothing);
    current.blob1 = mixRgb(current.blob1, target.blob1, colorSmoothing);
    current.blob2 = mixRgb(current.blob2, target.blob2, colorSmoothing);

    const velocity =
      reducedMotion || frozen
        ? 0
        : Math.min(smoothedVelocity / VELOCITY_NORM_PX, 1) *
          config.velocityInfluence *
          0.5;

    moodGl.render(
      toMoodGlFrame(
        {
          ...target,
          ground: current.ground,
          blob1: current.blob1,
          blob2: current.blob2,
        },
        { time, velocity },
      ),
    );
  };

  gsap.ticker.add(tick);
  const onResize = () => moodGl.resize();
  window.addEventListener('resize', onResize);

  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener('resize', onResize);
    window.removeEventListener(
      MOOD_SCROLL_STRUCTURE_CHANGE_EVENT,
      scheduleConductorRebuild,
    );
    if (conductorRebuildFrame !== null) {
      window.cancelAnimationFrame(conductorRebuildFrame);
    }
    conductor.dispose();
    moodGl.dispose();
  };
}

function createConductorState(
  root: HTMLElement,
  config: MoodScrollConfig,
): ConductorState {
  const chain: ConductorLink[] = [];
  const disposers: Array<() => void> = [];
  const section = (scene: MoodScene) =>
    root.querySelector(`[data-mood-section='${scene.key}']`);

  // Mood conductor: an ordered chain of scene enter triggers. The palette is
  // NOT written from competing onUpdate callbacks (an instant jump makes the
  // last-created trigger stomp the others); instead the render loop walks
  // the chain each frame and takes the deepest link with progress > 0.
  let sceneStartVh = 0;
  for (let index = 0; index < config.scenes.length; index += 1) {
    const scene = config.scenes[index];
    const previous = config.scenes[index - 1];
    const lengthVh = parseSceneLengthVh(scene.length);

    if (index === 0 || !previous) {
      sceneStartVh += lengthVh;
      continue;
    }

    const el = section(scene);
    if (!el) {
      sceneStartVh += lengthVh;
      continue;
    }

    if (scene.enter.mechanism === 'takeover') {
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: `+=${scenePinTravelVh(scene)}%`,
          pin: scene.pin === true,
          scrub: true,
        },
      });
      const pinTrigger = pinTimeline.scrollTrigger;
      if (pinTrigger) {
        chain.push({
          target: { mechanism: 'takeover', sceneKey: scene.key, progress: 0 },
          st: pinTrigger,
        });
      }
      disposers.push(() => {
        pinTimeline.scrollTrigger?.kill();
        pinTimeline.kill();
      });

      wireGalerieTakeover(root, pinTimeline, scene.key);
      sceneStartVh += lengthVh;
      continue;
    }

    const enterWindow = resolveEnterWindow(
      scene.enter,
      sceneStartVh,
      lengthVh,
      scene.pin === true,
    );
    const startLine = viewportLineForStart(
      scene,
      enterWindow.startVh,
      sceneStartVh,
    );
    const endLine = viewportLineForStart(
      scene,
      enterWindow.endVh,
      sceneStartVh,
    );
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top ${startLine}%`,
      end:
        scene.enter.mechanism === 'cut' || startLine === endLine
          ? '+=1'
          : `top ${endLine}%`,
      scrub: true,
    });
    disposers.push(() => trigger.kill());

    chain.push({
      target:
        scene.enter.mechanism === 'crossfade'
          ? {
              mechanism: 'crossfade',
              fromSceneKey: previous.key,
              toSceneKey: scene.key,
              progress: 0,
              ease: scene.enter.ease,
            }
          : {
              mechanism: 'cut',
              fromSceneKey: previous.key,
              toSceneKey: scene.key,
              progress: 0,
            },
      st: trigger,
    });
    sceneStartVh += lengthVh;
  }

  return {
    chain,
    dispose: () => {
      for (const dispose of disposers.splice(0).reverse()) dispose();
    },
  };
}

function wireGalerieTakeover(
  root: HTMLElement,
  pinTimeline: gsap.core.Timeline,
  sceneKey: string,
): void {
  if (sceneKey !== 'galerie') return;

  const growEl = root.querySelector('[data-mood-grow]');
  const captionEl = root.querySelector('[data-mood-caption]');
  if (growEl) {
    pinTimeline.fromTo(
      growEl,
      { scale: 0.5 },
      { scale: 1, ease: 'none', duration: 1 },
      0,
    );
  }
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

function viewportLineForStart(
  scene: MoodScene,
  windowVh: number,
  sceneStartVh: number,
): number {
  if (scene.enter.mechanism === 'crossfade') {
    return sceneStartVh - windowVh;
  }
  if (scene.enter.mechanism === 'cut') {
    return scene.enter.at * 100;
  }
  return 0;
}

function scenePinTravelVh(scene: MoodScene): number {
  return Math.max(parseSceneLengthVh(scene.length) - 100, 1);
}
