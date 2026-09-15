import { initArtworkViewer } from './artwork-viewer';
import { initHeroSequence } from './hero-sequence';

/** Static content, contact links and image playback work without GSAP. */
export function initEditorialMotion() {
  const mapsLink =
    document.querySelector<HTMLAnchorElement>('[data-maps-link]');
  if (
    mapsLink?.dataset.appleMapsUrl &&
    /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)
  ) {
    mapsLink.href = mapsLink.dataset.appleMapsUrl;
  }
  initArtworkViewer();
  initHeroSequence();
  if (!document.querySelector('[data-art-sequence]')) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const initialHash = location.hash;
  const followInitialHash = () => {
    if (!initialHash || location.hash !== initialHash) return;
    document.getElementById(initialHash.slice(1))?.scrollIntoView({
      block: 'start',
      behavior: 'instant',
    });
  };
  let started = false;
  let initialPass = true;
  const start = () => {
    if (started || reduced.matches) return;
    const followHash = initialPass;
    started = true;
    void animateEditorial()
      .then(() => {
        if (followHash) followInitialHash();
      })
      .catch(() => {
        document
          .querySelectorAll('[data-motion]')
          .forEach((element) => element.removeAttribute('data-motion'));
        if (followHash) void document.fonts.ready.then(followInitialHash);
      });
  };
  reduced.addEventListener('change', start);
  start();
  if (reduced.matches) void document.fonts.ready.then(followInitialHash);
  initialPass = false;
}

async function animateEditorial() {
  const [
    { gsap },
    { ScrollTrigger },
    { animateHero },
    { animateArtworkSequence },
    { animateIntroduction },
  ] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('./hero-motion'),
    import('./artwork-sequence'),
    import('./introduction'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  animateHero(gsap);
  animateIntroduction(gsap);
  animateArtworkSequence(gsap);
  await document.fonts.ready;
  ScrollTrigger.refresh();
  // Native fragments may have landed before enhancement changed section heights.
  // Reconcile once after every stage is measured, never on a later resize.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}
