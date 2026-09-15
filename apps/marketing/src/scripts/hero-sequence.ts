import { HERO_SHOTS, type HeroShot } from '#/data/hero-sequence';

/** Timed artwork editing runs independently of the optional scroll bundle. */
export function initHeroSequence() {
  const element = document.querySelector<HTMLElement>('[data-artwork-hero]');
  if (!element) return;
  const hero = element;
  const stage = hero.querySelector<HTMLElement>('[data-film-stage]')!;
  const frames = [...hero.querySelectorAll<HTMLElement>('[data-hero-frame]')];
  const images = frames.map((frame) => frame.querySelector('img')!);
  const button = hero.querySelector<HTMLButtonElement>('[data-hero-pause]')!;
  const label = button.querySelector<HTMLElement>('[data-pause-label]')!;
  const icon = button.querySelector<SVGElement>('[data-pause-icon]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const ready = new Set<number>();
  const failed = new Set<number>();
  const loading = new Map<number, Promise<void>>();
  let inView = false;
  let userPaused = false;
  let started = false;
  let shotIndex = 0;
  let current = 0;
  let outgoing: number | undefined;
  let elapsed = 0;
  let lastTime = 0;
  let raf = 0;
  let animations: Animation[] = [];

  const shouldPlay = () =>
    inView && !document.hidden && !reduced.matches && !userPaused;
  const transform = ([scale, x, y]: HeroShot['from']) =>
    `translate(${x}%, ${y}%) scale(${scale})`;

  function load(index: number) {
    if (loading.has(index)) return loading.get(index)!;
    const image = images[index];
    // Assign srcset first so the browser selects one responsive resource.
    image.srcset = image.dataset.srcset!;
    image.src = image.dataset.src!;
    const pending = image
      .decode()
      .then(() => {
        ready.add(index);
      })
      .catch(() => {
        failed.add(index);
      });
    loading.set(index, pending);
    return pending;
  }

  function nextIndex() {
    for (let offset = 1; offset < HERO_SHOTS.length; offset++) {
      const index = (shotIndex + offset) % HERO_SHOTS.length;
      if (!failed.has(HERO_SHOTS[index].artwork)) return index;
    }
    return shotIndex;
  }

  function preloadNext() {
    if (shouldPlay()) void load(HERO_SHOTS[nextIndex()].artwork);
  }

  function finishOutgoing() {
    if (outgoing === undefined) return;
    if (outgoing !== current) frames[outgoing].removeAttribute('data-active');
    outgoing = undefined;
  }

  function beginShot(index: number) {
    finishOutgoing();
    animations.forEach((animation) => {
      animation.commitStyles();
      animation.cancel();
    });
    const shot = HERO_SHOTS[index];
    const previous = current;
    current = shot.artwork;
    shotIndex = index;
    elapsed = 0;
    hero.dataset.shot = String(index);
    frames[previous].style.zIndex = '0';
    const frame = frames[current];
    frame.dataset.active = '';
    frame.style.zIndex = '1';
    animations = [
      images[current].animate(
        [
          { transform: transform(shot.from) },
          { transform: transform(shot.to) },
        ],
        { duration: shot.duration, fill: 'both', easing: 'linear' },
      ),
    ];
    if (shot.transition && current !== previous) {
      outgoing = previous;
      const entrance: Keyframe[] =
        shot.transition === 'wipe'
          ? [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }]
          : shot.transition === 'rise'
            ? [
                { transform: 'translateY(100%)' },
                { transform: 'translateY(0)' },
              ]
            : [{ opacity: 0 }, { opacity: 1 }];
      animations.push(
        frame.animate(entrance, {
          duration: shot.transition === 'dissolve' ? 420 : 360,
          fill: 'both',
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }),
      );
    } else if (previous !== current) {
      frames[previous].removeAttribute('data-active');
    }
    preloadNext();
  }

  function tick(time: number) {
    raf = 0;
    if (!shouldPlay()) return;
    if (lastTime) elapsed += time - lastTime;
    lastTime = time;
    if (elapsed >= 420) finishOutgoing();
    if (elapsed >= HERO_SHOTS[shotIndex].duration) {
      const next = nextIndex();
      if (ready.has(HERO_SHOTS[next].artwork)) beginShot(next);
      else preloadNext(); // Hold a decoded frame while the network catches up.
    }
    raf = requestAnimationFrame(tick);
  }

  function syncPlayback() {
    const playing = shouldPlay();
    button.hidden = reduced.matches;
    hero.dataset.playing = String(playing);
    cancelAnimationFrame(raf);
    raf = 0;
    lastTime = 0;
    animations.forEach((animation) =>
      playing &&
      Number(animation.currentTime ?? 0) <
        Number(animation.effect?.getComputedTiming().endTime ?? 0)
        ? animation.play()
        : animation.pause(),
    );
    if (!playing) return;
    if (!started) {
      started = true;
      // A failed first picture can recover to the next available artwork.
      void load(0).then(() => {
        if (ready.has(0) && hero.dataset.shot === undefined) beginShot(0);
        if (shouldPlay()) syncPlayback();
        else animations.forEach((animation) => animation.pause());
      });
    }
    preloadNext();
    raf = requestAnimationFrame(tick);
  }

  button.addEventListener('click', () => {
    userPaused = !userPaused;
    label.textContent = userPaused ? 'Lecture' : 'Pause';
    button.setAttribute(
      'aria-label',
      userPaused ? 'Relancer les images' : 'Mettre les images en pause',
    );
    icon.setAttribute(
      'd',
      userPaused ? 'M4 2l10 6-10 6z' : 'M4 3h3v10H4zm5 0h3v10H9z',
    );
    syncPlayback();
  });
  document.addEventListener('visibilitychange', syncPlayback);
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(raf);
    animations.forEach((animation) => animation.pause());
  });
  window.addEventListener('pageshow', syncPlayback);
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      animations.forEach((animation) => animation.finish());
      finishOutgoing();
    }
    syncPlayback();
  });
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.intersectionRatio > 0.001;
      syncPlayback();
    },
    { threshold: 0.001 },
  ).observe(stage);

  // Keep the existing header handover tied to the sticky hero's visible edge.
  if (header) {
    header.dataset.headerReady = 'true';
    new IntersectionObserver(
      ([entry]) => {
        header.dataset.onFilm = String(entry.isIntersecting);
      },
      { rootMargin: `-${header.offsetHeight}px 0px 0px`, threshold: 0 },
    ).observe(stage);
  }
}
