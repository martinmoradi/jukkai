import type { gsap as Gsap } from 'gsap';

/** A brief entrance reuses the supplied identity handover inside the artwork hero. */
export function animateStudioTransition(gsap: typeof Gsap) {
  const hero = document.querySelector<HTMLElement>('[data-artwork-hero]');
  if (!hero) return;
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // A deep link or a visitor already scrolling needs the settled hero immediately.
    if (window.scrollY > 30 || location.hash) return;
    const entrance = hero.querySelector<HTMLElement>(
      '[data-identity-entrance]',
    )!;
    const oldWordmark = entrance.querySelector('[data-old-wordmark]');
    const seal = entrance.querySelector('[data-old-seal]');
    const sphere = entrance.querySelector('[data-identity-sphere]');
    const face = hero.querySelector('[data-film-face]');
    gsap.set(entrance, { autoAlpha: 1 });
    gsap.set(face, { opacity: 0 });
    const timeline = gsap.timeline({ defaults: { ease: 'power1.inOut' } });
    timeline
      .fromTo(
        oldWordmark,
        { opacity: 0, scale: 1 },
        { opacity: 1, duration: 0.25 },
      )
      .to(oldWordmark, { opacity: 0, scale: 0.5, y: -20, duration: 0.3 }, 0.6)
      .fromTo(
        seal,
        { opacity: 0, scale: 0.55, rotation: -25 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.25 },
        0.75,
      )
      .to(seal, { opacity: 0, scale: 0.8, rotation: 25, duration: 0.25 }, 1.05)
      .fromTo(
        sphere,
        { opacity: 0, scale: 0.8, rotation: -50 },
        { opacity: 1, scale: 1.1, rotation: 0, duration: 0.3 },
        1.2,
      )
      .to(sphere, { opacity: 0, scale: 0.5, y: -30, duration: 0.3 }, 1.5)
      .fromTo(
        face,
        { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, clipPath: 'inset(0%)', duration: 0.5 },
        1.65,
      )
      .set(entrance, { autoAlpha: 0 });
    const settle = () => {
      if (window.scrollY > 30) timeline.progress(1);
    };
    window.addEventListener('scroll', settle, { passive: true });
    return () => window.removeEventListener('scroll', settle);
  });
}
