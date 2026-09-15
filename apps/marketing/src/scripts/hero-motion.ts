import type { gsap as Gsap } from 'gsap';

export function animateHero(gsap: typeof Gsap) {
  const hero = document.querySelector<HTMLElement>('[data-artwork-hero]');
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
            // The introduction may extend the hero to stay pinned under its wipe.
            end: () =>
              `+=${innerHeight * (context.conditions?.mobile ? 0.95 : 1.25)}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          mark,
          {
            xPercent: -50,
            yPercent: -50,
            x: () =>
              context.conditions?.mobile ? 0 : -stage.clientWidth * 0.12,
            y: () => stage.clientHeight * 0.045,
            scale: context.conditions.mobile ? 0.72 : 0.6,
          },
          { x: 0, y: 0, scale: 1, duration: 0.82, ease: 'power1.inOut' },
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
          {
            scale: 1,
            x: 0,
            y: 0,
            xPercent: context.conditions?.mobile ? 7 : 12,
            yPercent: 4,
          },
          { scale: 1.04, xPercent: 0, yPercent: 0, duration: 1, ease: 'none' },
          0,
        )
        .to(
          hero.querySelector('[data-film-window]'),
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.82,
            ease: 'power1.inOut',
          },
          0,
        )
        .to(
          hero.querySelector('[data-film-note]'),
          { autoAlpha: 0, duration: 0.2 },
          0,
        );
      return () => {
        hero.removeAttribute('data-motion');
      };
    },
  );
}
