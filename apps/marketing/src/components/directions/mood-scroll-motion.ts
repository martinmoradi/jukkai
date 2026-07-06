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
import {
  type MoodTunableHandle,
  type MoodTunableRegistry,
  tunable,
} from './mood-scroll-tunables';

const VELOCITY_SMOOTHING = 0.12;
const VELOCITY_NORM_PX = 60;

type ConductorLink = {
  target: ConductorTarget;
  st: ScrollTrigger;
};

type ConductorState = {
  chain: ConductorLink[];
  renderers: Map<string, (invalidate?: boolean) => void>;
  timelines: Map<string, gsap.core.Timeline>;
  dispose: () => void;
};

interface GalerieTunables {
  growStartScale: MoodTunableHandle;
  captionStart: MoodTunableHandle;
  captionDuration: MoodTunableHandle;
  captionLiftY: MoodTunableHandle;
  pinLengthVh: MoodTunableHandle;
}

export interface MoodDevToggleResult {
  ok: boolean;
  message?: string;
}

export interface MoodScrollDevTools {
  markersEnabled(): boolean;
  gsDevToolsEnabled(): boolean;
  setMarkers(enabled: boolean): MoodDevToggleResult;
  setGsDevTools(enabled: boolean): Promise<MoodDevToggleResult>;
}

export interface MoodScrollInstance {
  devTools?: MoodScrollDevTools;
  dispose(): void;
}

export function initMoodScroll(
  root: HTMLElement,
  config: MoodScrollConfig,
  tunables: MoodTunableRegistry,
): MoodScrollInstance | null {
  const canvas = root.querySelector('[data-mood-canvas]');
  if (!(canvas instanceof HTMLCanvasElement)) return null;
  const moodGl = createMoodGl(canvas);
  if (!moodGl) return null;

  gsap.registerPlugin(ScrollTrigger);
  const galerieTunables = registerGalerieTunables(tunables);

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const frozen =
    new URLSearchParams(window.location.search).get('frozen') === '1';

  let markersEnabled = false;
  let gsDevToolsEnabled = false;
  let gsDevToolsInstance: { kill: () => void } | null = null;
  let conductor = createConductorState(root, config, {
    galerieTunables,
    markers: markersEnabled,
  });
  let chain = conductor.chain;
  let conductorRebuildFrame: number | null = null;

  const killGsDevTools = () => {
    gsDevToolsInstance?.kill();
    gsDevToolsInstance = null;
  };

  const syncGsDevTools = async (): Promise<MoodDevToggleResult> => {
    killGsDevTools();
    if (!gsDevToolsEnabled) return { ok: true };

    const timeline = conductor.timelines.get('galerie');
    if (!timeline) {
      gsDevToolsEnabled = false;
      return { ok: false, message: 'No galerie timeline to inspect' };
    }

    const { GSDevTools } = await import('gsap/GSDevTools');
    gsap.registerPlugin(GSDevTools);
    gsDevToolsInstance = GSDevTools.create({
      animation: timeline,
      id: 'mood-scroll-galerie',
    });
    return { ok: true, message: 'GSDevTools ready for galerie' };
  };

  const rebuildConductor = () => {
    conductor.dispose();
    conductor = createConductorState(root, config, {
      galerieTunables,
      markers: markersEnabled,
    });
    chain = conductor.chain;
    ScrollTrigger.refresh();
    if (import.meta.env.DEV && gsDevToolsEnabled) void syncGsDevTools();
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
  const unsubscribeTunables = tunables.subscribe((handle) => {
    if (handle.requiresReinit) {
      scheduleConductorRebuild();
      return;
    }
    conductor.renderers.get(handle.sceneKey)?.(true);
  });

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

  const devTools: MoodScrollDevTools | undefined = import.meta.env.DEV
    ? {
        markersEnabled: () => markersEnabled,
        gsDevToolsEnabled: () => gsDevToolsEnabled,
        setMarkers: (enabled) => {
          markersEnabled = enabled;
          scheduleConductorRebuild();
          return {
            ok: true,
            message: enabled ? 'Markers on' : 'Markers off',
          };
        },
        setGsDevTools: async (enabled) => {
          gsDevToolsEnabled = enabled;
          return syncGsDevTools();
        },
      }
    : undefined;

  return {
    devTools,
    dispose: () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      window.removeEventListener(
        MOOD_SCROLL_STRUCTURE_CHANGE_EVENT,
        scheduleConductorRebuild,
      );
      unsubscribeTunables();
      if (conductorRebuildFrame !== null) {
        window.cancelAnimationFrame(conductorRebuildFrame);
      }
      killGsDevTools();
      conductor.dispose();
      moodGl.dispose();
    },
  };
}

function registerGalerieTunables(
  registry: MoodTunableRegistry,
): GalerieTunables {
  return {
    growStartScale: tunable(registry, 'galerie.growStartScale', 0.5, {
      min: 0.2,
      max: 1,
      step: 0.01,
    }),
    captionStart: tunable(registry, 'galerie.captionStart', 0.6, {
      min: 0,
      max: 1,
      step: 0.01,
      requiresReinit: true,
    }),
    captionDuration: tunable(registry, 'galerie.captionDuration', 0.35, {
      min: 0.05,
      max: 1,
      step: 0.01,
      requiresReinit: true,
    }),
    captionLiftY: tunable(registry, 'galerie.captionLiftY', 24, {
      min: 0,
      max: 80,
      step: 1,
      requiresReinit: true,
    }),
    pinLengthVh: tunable(registry, 'galerie.pinLengthVh', 270, {
      min: 120,
      max: 420,
      step: 5,
      requiresReinit: true,
    }),
  };
}

function createConductorState(
  root: HTMLElement,
  config: MoodScrollConfig,
  options: {
    galerieTunables: GalerieTunables;
    markers: boolean;
  },
): ConductorState {
  const chain: ConductorLink[] = [];
  const disposers: Array<() => void> = [];
  const renderers = new Map<string, (invalidate?: boolean) => void>();
  const timelines = new Map<string, gsap.core.Timeline>();
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
    const lengthVh = sceneLengthVh(scene, options.galerieTunables);

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
      const timeline = createGalerieTakeoverTimeline(
        root,
        scene.key,
        options.galerieTunables,
      );
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${scenePinTravelVh(scene, options.galerieTunables)}%`,
        markers: options.markers,
        pin: scene.pin === true,
        scrub: true,
        onUpdate: (self) => {
          timeline.time(self.progress);
        },
      });
      timeline.time(trigger.progress);
      chain.push({
        target: { mechanism: 'takeover', sceneKey: scene.key, progress: 0 },
        st: trigger,
      });
      timelines.set(scene.key, timeline);
      renderers.set(scene.key, (invalidate = false) => {
        renderGalerieTimeline(timeline, trigger.progress, invalidate);
      });
      disposers.push(() => {
        trigger.kill();
        timeline.kill();
      });

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
      markers: options.markers,
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
    renderers,
    timelines,
    dispose: () => {
      for (const dispose of disposers.splice(0).reverse()) dispose();
    },
  };
}

function createGalerieTakeoverTimeline(
  root: HTMLElement,
  sceneKey: string,
  galerieTunables: GalerieTunables,
): gsap.core.Timeline {
  const timeline = gsap.timeline({ paused: true });

  if (sceneKey === 'galerie') {
    const growEl = root.querySelector('[data-mood-grow]');
    const captionEl = root.querySelector('[data-mood-caption]');

    if (growEl) {
      timeline.fromTo(
        growEl,
        { scale: () => galerieTunables.growStartScale.get() },
        { scale: 1, ease: 'none', duration: 1 },
        0,
      );
    }

    if (captionEl) {
      timeline.fromTo(
        captionEl,
        { autoAlpha: 0, y: () => galerieTunables.captionLiftY.get() },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          duration: galerieTunables.captionDuration.get(),
        },
        galerieTunables.captionStart.get(),
      );
    }
    renderGalerieTimeline(timeline, 0);
  }

  return timeline;
}

function renderGalerieTimeline(
  timeline: gsap.core.Timeline,
  progress: number,
  invalidate = false,
): void {
  if (invalidate) {
    timeline.invalidate();
    const duration = timeline.duration();
    if (duration > 0) {
      // Force a render even when the playhead is already at this time, so
      // function-based tween values are read again after panel edits.
      const nudge =
        progress <= 0
          ? Math.min(duration, 0.001)
          : Math.max(progress - 0.001, 0);
      timeline.time(nudge, true);
    }
  }
  timeline.time(progress, false);
}

function sceneLengthVh(
  scene: MoodScene,
  galerieTunables: GalerieTunables,
): number {
  if (scene.key === 'galerie') return galerieTunables.pinLengthVh.get();
  return parseSceneLengthVh(scene.length);
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

function scenePinTravelVh(
  scene: MoodScene,
  galerieTunables: GalerieTunables,
): number {
  return Math.max(sceneLengthVh(scene, galerieTunables) - 100, 1);
}
