// Scroll wiring for the /directions/mood-scroll/ comp.
//
// The background is weather, not scenery: blobs drift on their own clock,
// scroll never translates them. Scroll couples in three ways only:
//   - scene enter windows scrub the field blend
//   - takeover scenes ride sticky runways and scrub their internal stops
//   - scroll velocity lifts brightness (capped, smoothed)
//
// Takeover scenes are sticky runways, not GSAP pins: the section is a tall
// block (its declared length) holding a 100vh `position: sticky` stage, and
// the trigger spans the whole block from 'top bottom' to 'bottom bottom'.
// The first viewport of that domain is the entrance window, so the room's
// arrival is part of the choreography and the field stops (raw fractions)
// can start working while the block scrolls in.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  type ConductorTarget,
  parseSceneLengthVh,
  resolveConductorTarget,
  resolveFieldStops,
  resolveSurfaceTrack,
  toMoodGlFrame,
} from './mood-scroll-conductor';
import type { MoodScene, MoodScrollConfig, Rgb } from './mood-scroll-config';
import {
  mixRgb,
  MOOD_SCROLL_STRUCTURE_CHANGE_EVENT,
} from './mood-scroll-config';
import {
  clearGalerieChoreographyStyles,
  createFeaturedCarousel,
  createGalerieTimeline,
  createHandoffTimeline,
  type GalerieChoreographyTunables,
  HANDOFF_SWAP_AT,
  registerGalerieChoreographyTunables,
  stuckPosition,
  takeoverEntranceFraction,
} from './mood-scroll-galerie';
import { createMoodGl } from './mood-scroll-gl';
import type { MoodTunableRegistry } from './mood-scroll-tunables';

const VELOCITY_SMOOTHING = 0.12;
const VELOCITY_NORM_PX = 60;
const RESIZE_REBUILD_DELAY_MS = 180;

// Below this width (or under reduced motion) the page uses the static
// fallback: no pins, no morph theatrics, sections in normal flow. The mood
// journey still rides scroll; the carousel still works from its buttons.
const FULL_CHOREOGRAPHY_QUERY = '(min-width: 1024px)';

type MoodScrollMode = 'full' | 'static';

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

export interface MoodDevToggleResult {
  ok: boolean;
  message?: string;
}

export interface MoodScrollDevTools {
  markersEnabled(): boolean;
  gsDevToolsEnabled(): boolean;
  setMarkers(enabled: boolean): MoodDevToggleResult;
  setGsDevTools(enabled: boolean): Promise<MoodDevToggleResult>;
  jumpTo(sceneKey: string, stopAt?: number): MoodDevToggleResult;
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

  // The galerie wall's own contained surface. Fail-open: a missing canvas or
  // failed context leaves the backdrop's flat punch-colored wall.
  const surfaceCanvas = root.querySelector('[data-galerie-surface]');
  const surfaceGl =
    surfaceCanvas instanceof HTMLCanvasElement
      ? createMoodGl(surfaceCanvas)
      : null;

  gsap.registerPlugin(ScrollTrigger);
  const choreography = registerGalerieChoreographyTunables(tunables);

  const reducedMotionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  const fullChoreographyQuery = window.matchMedia(FULL_CHOREOGRAPHY_QUERY);
  const reducedMotion = reducedMotionQuery.matches;
  const frozen =
    new URLSearchParams(window.location.search).get('frozen') === '1';

  const resolveMode = (): MoodScrollMode =>
    fullChoreographyQuery.matches && !reducedMotionQuery.matches
      ? 'full'
      : 'static';
  const applyModeAttribute = (mode: MoodScrollMode) => {
    if (mode === 'static') root.dataset.moodStatic = 'true';
    else delete root.dataset.moodStatic;
  };

  const carousel = createFeaturedCarousel(root, {
    intervalSec: choreography.slideIntervalSec,
    fadeSec: choreography.slideFadeSec,
    reducedMotion,
  });

  // Auto-advance only while the journey actually shows the featured frame:
  // from its appearance inside the galerie runway until the hand-off swaps
  // the overlay into the inline arch slot. In the static version the timer
  // runs while the galerie section is on screen (the contract stays time +
  // buttons, never scroll).
  const sceneEntrance = (sceneKey: string): number => {
    const scene = config.scenes.find((entry) => entry.key === sceneKey);
    return scene
      ? takeoverEntranceFraction(parseSceneLengthVh(scene.length))
      : 0;
  };
  const takeoverProgress: Record<string, number> = { galerie: 0, handoff: 0 };
  const onTakeoverProgress = (sceneKey: string, progress: number) => {
    takeoverProgress[sceneKey] = progress;
    const enabled =
      resolveMode() === 'full'
        ? takeoverProgress.galerie >
            stuckPosition(
              sceneEntrance('galerie'),
              choreography.featuredAppearStart.get(),
            ) &&
          takeoverProgress.handoff <
            stuckPosition(sceneEntrance('handoff'), HANDOFF_SWAP_AT)
        : takeoverProgress.galerie > 0.02 && takeoverProgress.galerie < 0.98;
    carousel.setAutoAdvance(enabled);
  };

  let mode = resolveMode();
  applyModeAttribute(mode);
  let markersEnabled = false;
  let gsDevToolsEnabled = false;
  let gsDevToolsInstance: { kill: () => void } | null = null;
  let conductor = createConductorState(root, config, {
    choreography,
    markers: markersEnabled,
    mode,
    onTakeoverProgress,
  });
  let chain = conductor.chain;
  let conductorRebuildFrame: number | null = null;

  const killGsDevTools = () => {
    gsDevToolsInstance?.kill();
    gsDevToolsInstance = null;
  };

  // Serialized on a token: a conductor rebuild can request a sync while an
  // earlier enable is still awaiting the dynamic import; only the latest
  // request may create an instance, or duplicates leak into the DOM.
  let gsDevToolsSyncId = 0;
  const syncGsDevTools = async (): Promise<MoodDevToggleResult> => {
    const syncId = ++gsDevToolsSyncId;
    killGsDevTools();
    if (!gsDevToolsEnabled) return { ok: true };

    const timeline = conductor.timelines.get('galerie');
    if (!timeline) {
      gsDevToolsEnabled = false;
      return { ok: false, message: 'No galerie timeline to inspect' };
    }

    const { GSDevTools } = await import('gsap/GSDevTools');
    if (syncId !== gsDevToolsSyncId) return { ok: true };
    gsap.registerPlugin(GSDevTools);
    gsDevToolsInstance = GSDevTools.create({
      animation: timeline,
      id: 'mood-scroll-galerie',
    });
    return { ok: true, message: 'GSDevTools ready for galerie' };
  };

  const rebuildConductor = () => {
    conductor.dispose();
    mode = resolveMode();
    applyModeAttribute(mode);
    conductor = createConductorState(root, config, {
      choreography,
      markers: markersEnabled,
      mode,
      onTakeoverProgress,
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
  // The galerie surface smooths its own color state; both canvases share the
  // same time and velocity, so equal targets render pixel-identical fields.
  const surfaceCurrent: { ground: Rgb; blob1: Rgb; blob2: Rgb } | null =
    surfaceGl
      ? { ground: [0, 0, 0], blob1: [0, 0, 0], blob2: [0, 0, 0] }
      : null;
  let surfacePrimed = false;
  let time = 0;
  let lastScrollY = window.scrollY;
  let smoothedVelocity = 0;

  const readSurfaceField = () => {
    const scene = config.scenes.find((entry) => entry.key === 'galerie');
    if (!scene) return null;
    const link = chain.find(
      (entry) =>
        entry.target.mechanism === 'takeover' &&
        entry.target.sceneKey === 'galerie',
    );
    if (!link) return null;
    const track = resolveSurfaceTrack(
      scene,
      takeoverEntranceFraction(parseSceneLengthVh(scene.length)),
    );
    return resolveFieldStops(track, link.st.progress);
  };

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

    // The living wall: resolve the galerie's surface track at the block's
    // own progress every frame (so panel edits land mid-approach too) and
    // render with the SAME time and velocity as the shared canvas — equal
    // targets produce pixel-identical fields across the wall's edges.
    if (surfaceGl && surfaceCurrent && mode === 'full') {
      const surfaceField = readSurfaceField();
      if (surfaceField) {
        if (!surfacePrimed) {
          surfacePrimed = true;
          surfaceCurrent.ground = surfaceField.ground;
          surfaceCurrent.blob1 = surfaceField.blob1;
          surfaceCurrent.blob2 = surfaceField.blob2;
        } else {
          surfaceCurrent.ground = mixRgb(
            surfaceCurrent.ground,
            surfaceField.ground,
            colorSmoothing,
          );
          surfaceCurrent.blob1 = mixRgb(
            surfaceCurrent.blob1,
            surfaceField.blob1,
            colorSmoothing,
          );
          surfaceCurrent.blob2 = mixRgb(
            surfaceCurrent.blob2,
            surfaceField.blob2,
            colorSmoothing,
          );
        }
        surfaceGl.render(
          toMoodGlFrame(
            {
              ...surfaceField,
              ground: surfaceCurrent.ground,
              blob1: surfaceCurrent.blob1,
              blob2: surfaceCurrent.blob2,
            },
            { time, velocity },
          ),
        );
      }
    }
  };

  gsap.ticker.add(tick);
  // Choreography geometry (arch size, seam position, large-frame tweens) is
  // computed in pixels at build time, so a settled resize rebuilds the
  // conductor rather than leaving stale end values.
  let resizeRebuildTimer: ReturnType<typeof setTimeout> | null = null;
  const onResize = () => {
    moodGl.resize();
    surfaceGl?.resize();
    if (resizeRebuildTimer !== null) clearTimeout(resizeRebuildTimer);
    resizeRebuildTimer = setTimeout(() => {
      resizeRebuildTimer = null;
      scheduleConductorRebuild();
    }, RESIZE_REBUILD_DELAY_MS);
  };
  window.addEventListener('resize', onResize);
  const onModeChange = () => scheduleConductorRebuild();
  fullChoreographyQuery.addEventListener('change', onModeChange);
  reducedMotionQuery.addEventListener('change', onModeChange);

  // Jump targets read the live conductor chain at click time, so they stay
  // correct after enter-band edits or pin-length changes rebuild the triggers.
  const jumpTo = (sceneKey: string, stopAt = 0): MoodDevToggleResult => {
    const scene = config.scenes.find((entry) => entry.key === sceneKey);
    if (!scene) return { ok: false, message: `Unknown scene ${sceneKey}` };

    const at = Math.min(Math.max(stopAt, 0), 1);
    const takeoverLink = chain.find(
      (link) =>
        link.target.mechanism === 'takeover' &&
        link.target.sceneKey === sceneKey,
    );

    let top: number;
    if (takeoverLink) {
      const { st } = takeoverLink;
      top = st.start + at * (st.end - st.start);
    } else {
      const el = section(scene);
      if (!el) return { ok: false, message: `No section for ${sceneKey}` };
      top = window.scrollY + el.getBoundingClientRect().top;
    }

    window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: 'instant' });
    return { ok: true };
  };

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
        jumpTo,
      }
    : undefined;

  return {
    devTools,
    dispose: () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      fullChoreographyQuery.removeEventListener('change', onModeChange);
      reducedMotionQuery.removeEventListener('change', onModeChange);
      if (resizeRebuildTimer !== null) clearTimeout(resizeRebuildTimer);
      window.removeEventListener(
        MOOD_SCROLL_STRUCTURE_CHANGE_EVENT,
        scheduleConductorRebuild,
      );
      unsubscribeTunables();
      if (conductorRebuildFrame !== null) {
        window.cancelAnimationFrame(conductorRebuildFrame);
      }
      killGsDevTools();
      carousel.dispose();
      conductor.dispose();
      moodGl.dispose();
      surfaceGl?.dispose();
    },
  };
}

function createConductorState(
  root: HTMLElement,
  config: MoodScrollConfig,
  options: {
    choreography: GalerieChoreographyTunables;
    markers: boolean;
    mode: MoodScrollMode;
    onTakeoverProgress?: (sceneKey: string, progress: number) => void;
  },
): ConductorState {
  const chain: ConductorLink[] = [];
  const disposers: Array<() => void> = [];
  const renderers = new Map<string, (invalidate?: boolean) => void>();
  const timelines = new Map<string, gsap.core.Timeline>();
  const section = (scene: MoodScene) =>
    root.querySelector(`[data-mood-section='${scene.key}']`);

  // Scene lengths are data: each section gets its declared length as an
  // inline min-height, so panel edits to a length reshape the page on the
  // next conductor rebuild. Takeover scenes are sticky runway blocks — the
  // declared length IS the block height; the 100vh sticky stage inside
  // supplies the viewport. In the static version those sections drop back
  // to natural flow height.
  for (const scene of config.scenes) {
    const el = section(scene);
    if (!(el instanceof HTMLElement)) continue;
    if (scene.pin === true && options.mode === 'static') {
      el.style.removeProperty('min-height');
      continue;
    }
    el.style.minHeight = `${parseSceneLengthVh(scene.length)}vh`;
  }

  applyGalerieBackdropTreatment(root, config, options.mode);

  // Mood conductor: an ordered chain of scene enter triggers. The palette is
  // NOT written from competing onUpdate callbacks (an instant jump makes the
  // last-created trigger stomp the others); instead the render loop walks
  // the chain each frame and takes the deepest link with progress > 0.
  for (let index = 1; index < config.scenes.length; index += 1) {
    const scene = config.scenes[index];
    const previous = config.scenes[index - 1];
    const el = section(scene);
    if (!previous || !el) continue;

    if (scene.enter.mechanism === 'takeover') {
      // Static fallback: no pin, no choreography timeline. The section sits
      // in normal flow and the field journey scrubs across its traversal.
      if (options.mode === 'static') {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 75%',
          end: 'bottom 40%',
          markers: options.markers,
          scrub: true,
          onUpdate: (self) => {
            options.onTakeoverProgress?.(scene.key, self.progress);
          },
        });
        chain.push({
          target: { mechanism: 'takeover', sceneKey: scene.key, progress: 0 },
          st: trigger,
        });
        disposers.push(() => trigger.kill());
        continue;
      }

      const entrance = takeoverEntranceFraction(
        parseSceneLengthVh(scene.length),
      );
      const timeline = createTakeoverTimeline(
        root,
        scene.key,
        options.choreography,
        entrance,
      );
      // The two takeover timelines share the featured overlay. A timeline
      // only renders while its own runway is engaged (or once, to rewind on
      // the way out); otherwise a refresh while parked inside the OTHER
      // runway would stomp the overlay with this timeline's resting values.
      const apply = createGuardedTimelineApply(timeline);
      // No pin: CSS sticky holds the stage. The trigger spans the whole
      // block so the timeline domain includes the entrance window.
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom bottom',
        markers: options.markers,
        scrub: true,
        onUpdate: (self) => {
          apply(self.progress);
          options.onTakeoverProgress?.(scene.key, self.progress);
        },
        // At creation the trigger has no layout yet (progress 0). Re-sync on
        // refresh so a conductor rebuild while parked inside the runway does
        // not leave the timeline at its start until the next scroll event.
        onRefresh: (self) => {
          apply(self.progress);
          options.onTakeoverProgress?.(scene.key, self.progress);
        },
      });
      chain.push({
        target: { mechanism: 'takeover', sceneKey: scene.key, progress: 0 },
        st: trigger,
      });
      timelines.set(scene.key, timeline);
      renderers.set(scene.key, (invalidate = false) => {
        if (trigger.progress === 0) return;
        renderTakeoverTimeline(timeline, trigger.progress, invalidate);
      });
      disposers.push(() => {
        trigger.kill();
        timeline.kill();
      });
      continue;
    }

    // Crossfade and cut enters scrub while the section top crosses viewport
    // lines derived from the enter spec (band fractions of one viewport).
    const startLine =
      scene.enter.mechanism === 'crossfade'
        ? scene.enter.band[0] * 100
        : scene.enter.at * 100;
    const endLine =
      scene.enter.mechanism === 'crossfade' ? scene.enter.band[1] * 100 : 0;
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
  }

  return {
    chain,
    renderers,
    timelines,
    dispose: () => {
      for (const dispose of disposers.splice(0).reverse()) dispose();
      // Rebuilds (and switches to the static fallback) start from the
      // stylesheet's truth, not from whatever inline state the choreography
      // timelines left behind.
      clearGalerieChoreographyStyles(root);
    },
  };
}

function createTakeoverTimeline(
  root: HTMLElement,
  sceneKey: string,
  choreography: GalerieChoreographyTunables,
  entranceFraction: number,
): gsap.core.Timeline {
  if (sceneKey === 'galerie') {
    return createGalerieTimeline(root, choreography, entranceFraction);
  }
  if (sceneKey === 'handoff') {
    return createHandoffTimeline(root, choreography, entranceFraction);
  }
  return gsap.timeline({ paused: true });
}

/**
 * The galerie backdrop is the dark room's own wall: it scrolls in with the
 * block as the hard section boundary, colored from the scene's punch stop
 * (the first stop past the entrance window). Full mode paints it flat as
 * the fail-open ground under the wall's live mood surface; the static
 * version keeps it and pre-bakes the deepening as a gradient. Stop color
 * edits reach it on the next conductor rebuild.
 */
function applyGalerieBackdropTreatment(
  root: HTMLElement,
  config: MoodScrollConfig,
  mode: MoodScrollMode,
): void {
  const backdrop = root.querySelector('[data-galerie-backdrop]');
  if (!(backdrop instanceof HTMLElement)) return;
  const scene = config.scenes.find((entry) => entry.key === 'galerie');
  if (!scene || scene.stops.length === 0) return;

  const entrance = takeoverEntranceFraction(parseSceneLengthVh(scene.length));
  const punch =
    scene.stops.find((stop) => stop.at >= entrance) ?? scene.stops.at(-1);
  const darkest = scene.stops.at(-1);
  if (!punch || !darkest) return;

  backdrop.style.background =
    mode === 'static'
      ? `linear-gradient(${punch.ground}, ${darkest.ground} 90%)`
      : punch.ground;
}

function createGuardedTimelineApply(
  timeline: gsap.core.Timeline,
): (progress: number) => void {
  let engaged = false;
  return (progress: number) => {
    if (progress > 0) {
      engaged = true;
      timeline.time(progress, false);
      return;
    }
    if (!engaged) return;
    engaged = false;
    timeline.time(0, false);
  };
}

function renderTakeoverTimeline(
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
