import type { gsap as Gsap } from 'gsap';

export function animateStudioTransition(gsap: typeof Gsap) {
  const origin = document.querySelector<HTMLElement>('[data-origin]');
  if (!origin) return;
  const media = gsap.matchMedia();
  media.add(
    {
      motion: '(prefers-reduced-motion: no-preference) and (min-height: 600px)',
      mobile: '(max-width: 800px)',
    },
    (context) => {
      if (!context.conditions?.motion) return;
      origin.dataset.motion = 'ready';
      const journey = origin.querySelector<HTMLElement>(
        '[data-origin-journey]',
      )!;
      const chapters = [
        ...origin.querySelectorAll<HTMLElement>('[data-origin-chapter]'),
      ];
      const oldWordmark = origin.querySelector('[data-old-wordmark]');
      const seal = origin.querySelector('[data-old-seal]');
      const sphere = origin.querySelector('[data-identity-sphere]');
      const newWordmark = origin.querySelector('[data-new-wordmark]');
      const timeline = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: journey,
          start: () =>
            `top ${getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim()}`,
          end: 'bottom 85%',
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(
          oldWordmark,
          { opacity: 1, scale: 1, y: 0 },
          { opacity: 0, scale: 0.5, y: -20, duration: 0.22 },
          0.12,
        )
        .fromTo(
          seal,
          { opacity: 0, scale: 0.55, rotation: -25 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.16 },
          0.24,
        )
        .to(seal, { opacity: 0, scale: 0.8, rotation: 25, duration: 0.16 }, 0.4)
        .fromTo(
          sphere,
          { opacity: 0, scale: 0.8, rotation: -50 },
          { opacity: 1, scale: 1.3, rotation: 0, duration: 0.2 },
          0.43,
        )
        .to(sphere, { opacity: 0, scale: 0.5, y: -45, duration: 0.2 }, 0.64)
        .fromTo(
          newWordmark,
          { opacity: 0, y: 30, scale: 0.88, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0%)', duration: 0.3 },
          0.66,
        )
        .to({}, { duration: 0.04 });
      chapters.forEach((chapter) => {
        gsap.fromTo(
          chapter,
          { opacity: 0.68, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: chapter,
              start: 'top 88%',
              end: context.conditions?.mobile ? 'top 54%' : 'top 50%',
              scrub: true,
            },
          },
        );
      });
      return () => origin.removeAttribute('data-motion');
    },
  );
}
