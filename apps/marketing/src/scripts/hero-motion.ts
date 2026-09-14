import type { gsap as Gsap } from 'gsap';

export function animateHero(gsap: typeof Gsap) {
  const hero = document.querySelector<HTMLElement>('[data-video-hero]');
  if (!hero) return;
  const media = gsap.matchMedia();
  media.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      mobile: '(max-width: 800px)',
    },
    (context) => {
      if (!context.conditions?.motion) {
        hero.removeAttribute('data-motion');
        return;
      }
      hero.dataset.motion = 'ready';
      hero.dataset.animated = 'true';
      const mark = hero.querySelector('[data-film-mark]');
      const stage = hero.querySelector<HTMLElement>('[data-film-stage]')!;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          mark,
          {
            xPercent: -50,
            yPercent: -50,
            y: () => stage.clientHeight * 0.075,
            scale: context.conditions.mobile ? 0.71 : 0.37,
          },
          { y: 0, scale: 1, duration: 0.82, ease: 'power1.inOut' },
          0,
        )
        .fromTo(
          hero.querySelector('[data-film-cue]'),
          { autoAlpha: 1, y: 0 },
          { autoAlpha: 0, y: -16, duration: 0.15 },
          0,
        )
        .fromTo(
          hero.querySelector('[data-film-drift]'),
          { scale: 1.065 },
          { scale: 1, duration: 1, ease: 'none' },
          0,
        );
      return () => {
        hero.removeAttribute('data-motion');
      };
    },
  );
}
