import { animateStudioTransition } from './studio-transition';

const STORAGE_KEY = 'jukkai:curtain';
// A deliberate slow start, accelerating all the way offscreen.
const EASING = 'cubic-bezier(0.55, 0, 1, 0.45)';

/** Four horizontal bands bridge ordinary document loads; no client router. */
export function initPageTransition() {
  const root = document.documentElement;
  const curtain = document.querySelector<HTMLElement>('[data-page-curtain]');
  if (!curtain) return;
  const bands = [
    ...curtain.querySelectorAll<HTMLElement>('[data-curtain-band]'),
  ];
  const identity = curtain.querySelector<HTMLElement>(
    '[data-identity-entrance]',
  )!;
  const content = curtain.querySelector<HTMLElement>(
    '[data-transition-content]',
  )!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  let destination: string | undefined;
  let watchdog: ReturnType<typeof setTimeout> | undefined;

  function track(animation: Animation) {
    animations.add(animation);
    return animation.finished.catch(() => undefined);
  }

  function lock() {
    document
      .querySelectorAll<HTMLElement>('body > :is(header, main, footer, a)')
      .forEach((element) => {
        if (element.inert) return;
        element.dataset.transitionInert = '';
        element.inert = true;
      });
    document.dispatchEvent(new Event('jukkai:transition-start'));
  }

  function release() {
    clearTimeout(watchdog);
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    delete root.dataset.pageTransition;
    document
      .querySelectorAll<HTMLElement>('[data-transition-inert]')
      .forEach((element) => {
        element.inert = false;
        delete element.dataset.transitionInert;
      });
  }

  function finish() {
    release();
    document.dispatchEvent(new Event('jukkai:transition-end'));
  }

  // The inline failure watchdog also uses this event to clean up late animations.
  document.addEventListener('jukkai:transition-end', release);

  function wipe(cover: boolean) {
    return Promise.all(
      bands.map((band, index) =>
        track(
          band.animate(
            [
              { transform: `translateX(${cover ? '-101%' : '0%'})` },
              { transform: `translateX(${cover ? '0%' : '101%'})` },
            ],
            {
              duration: cover ? 460 : 650,
              // The lower band clears first, forming the reference's stepped edge.
              delay: (cover ? index : bands.length - 1 - index) * 50,
              easing: EASING,
              fill: 'both',
            },
          ),
        ),
      ),
    );
  }

  async function reveal() {
    const intro = root.dataset.pageTransition === 'intro';
    lock();
    const assets = [
      ...document.querySelectorAll<HTMLImageElement>(
        '[data-hero-frame][data-active] img, [data-identity-entrance] img, [data-curtain-wordmark]',
      ),
    ].map((image) => image.decode().catch(() => undefined));
    const ready = Promise.allSettled([document.fonts.ready, ...assets]);
    // Let the identity tell its story while the first hero image/font decodes.
    const handover = intro
      ? Promise.all(animateStudioTransition(identity).map(track))
      : new Promise((resolve) => setTimeout(resolve, 180));
    await Promise.all([
      handover,
      Promise.race([
        ready,
        new Promise((resolve) => setTimeout(resolve, intro ? 3600 : 1200)),
      ]),
    ]);
    if (!root.dataset.pageTransition) return;
    await Promise.all([
      track(
        content.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 220,
          fill: 'both',
          easing: EASING,
        }),
      ),
      wipe(false),
    ]);
    finish();
  }

  function navigate() {
    if (!destination) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ href: destination, time: Date.now() }),
      );
    } catch {
      /* The link still navigates when storage is unavailable. */
    }
    location.assign(destination);
    // Recover if navigation is cancelled or the destination never responds.
    watchdog = setTimeout(() => {
      destination = undefined;
      finish();
    }, 6000);
  }

  document.addEventListener('click', (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      reduced.matches
    )
      return;
    const link =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>('a[href]')
        : null;
    if (
      !link ||
      link.hasAttribute('download') ||
      (link.target && link.target !== '_self')
    )
      return;
    const url = new URL(link.href);
    const path = (pathname: string) => pathname.replace(/\/$/, '') || '/';
    if (
      url.origin !== location.origin ||
      !['/', '/contact'].includes(path(url.pathname)) ||
      path(url.pathname) === path(location.pathname)
    )
      return;
    event.preventDefault();
    if (root.dataset.pageTransition || destination) return;
    destination = url.href;
    root.dataset.pageTransition = 'cover';
    lock();
    try {
      void Promise.all([
        wipe(true),
        track(
          content.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 160,
            delay: 490,
            fill: 'both',
            easing: 'ease-out',
          }),
        ),
      ])
        .then(navigate)
        .catch(navigate);
    } catch {
      navigate();
    }
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      destination = undefined;
      release();
      if (reduced.matches) finish();
      else {
        root.dataset.pageTransition = 'reveal';
        void reveal().catch(finish);
      }
    }
  });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    finish();
    // Cancelling a cover resolves its animation promises and preserves the click.
  });
  if (reduced.matches) finish();
  else if (root.dataset.pageTransition) void reveal().catch(finish);
}
