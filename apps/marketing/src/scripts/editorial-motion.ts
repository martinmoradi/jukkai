import { initArtworkViewer } from './artwork-viewer';
import { initHeroFilm } from './hero-film';

/** Static content, contact links and film controls work without GSAP. */
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
  initHeroFilm();
  if (!document.querySelector('[data-art-sequence]')) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;
  const start = () => {
    if (started || reduced.matches) return;
    started = true;
    void animateEditorial().catch(() => {
      document
        .querySelectorAll('[data-motion]')
        .forEach((element) => element.removeAttribute('data-motion'));
    });
  };
  reduced.addEventListener('change', start);
  start();
}

async function animateEditorial() {
  const [
    { gsap },
    { ScrollTrigger },
    { animateHero },
    { animateStudioTransition },
    { animateArtworkSequence },
  ] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('./hero-motion'),
    import('./studio-transition'),
    import('./artwork-sequence'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  animateHero(gsap);
  animateStudioTransition(gsap);
  animateArtworkSequence(gsap, ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('[data-art-reveal]').forEach((art) => {
      gsap.fromTo(
        art,
        { clipPath: 'inset(3% 0 3% 0)' },
        {
          clipPath: 'inset(0%)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: art,
            start: 'top 95%',
            end: 'top 60%',
            scrub: true,
          },
        },
      );
    });
  });
  void document.fonts.ready.then(() => ScrollTrigger.refresh());
}
