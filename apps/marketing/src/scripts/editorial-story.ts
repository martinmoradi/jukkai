import type { gsap as Gsap } from 'gsap';

/** The new name makes room for art; the invitation then hands over to the spiral. */
export function animateEditorialStory(gsap: typeof Gsap) {
  const origin = document.querySelector<HTMLElement>('[data-editorial-origin]');
  const prelude = document.querySelector<HTMLElement>('[data-gallery-prelude]');
  if (!origin || !prelude) return;
  const media = gsap.matchMedia();
  media.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      spacious: '(min-height: 700px)',
      mobile: '(max-width: 800px)',
    },
    (context) => {
      if (!context.conditions?.motion) return;
      const mobile = Boolean(context.conditions.mobile);
      const stage = origin.querySelector<HTMLElement>('[data-origin-stage]')!;
      const measure = () =>
        origin.style.setProperty('--origin-height', `${stage.offsetHeight}px`);
      if (context.conditions.spacious) {
        origin.dataset.motion = 'ready';
        measure();
      }
      const entrance = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: origin,
          start: 'top 85%',
          end: 'top -20%',
          scrub: 0.35,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
        },
      });
      entrance
        .fromTo(
          origin.querySelector('[data-origin-former]'),
          { x: () => innerWidth * 0.075 },
          { x: 0, duration: 0.5 },
          0,
        )
        .fromTo(
          origin.querySelector('[data-origin-name]'),
          { x: () => -innerWidth * 0.12 },
          { x: 0, duration: 0.7 },
          0,
        )
        .fromTo(
          origin.querySelector('[data-origin-interior]'),
          { x: mobile ? -30 : -80, y: 65, rotation: -12 },
          { x: 0, y: 0, rotation: -7, duration: 0.7 },
          0.05,
        )
        .fromTo(
          origin.querySelector('[data-origin-art]'),
          {
            x: mobile ? -45 : -140,
            y: mobile ? 80 : 180,
            rotation: -10,
            scale: 0.65,
          },
          { x: 0, y: 0, rotation: 6, scale: 1, duration: 0.8 },
          0.1,
        );
      // The explanation stays fully opaque while the photographs and name settle.
      gsap.fromTo(
        origin.querySelector('[data-origin-copy]'),
        { y: 40 },
        {
          y: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: origin,
            start: 'top 65%',
            end: 'top top',
            scrub: 0.3,
          },
        },
      );
      gsap.to(document.querySelector('[data-film-stage]'), {
        scale: 0.92,
        ease: 'none',
        scrollTrigger: {
          trigger: origin,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });
      const welcome = gsap.timeline({
        scrollTrigger: {
          trigger: prelude.querySelector('[data-for-home]'),
          start: 'top 95%',
          end: 'bottom 20%',
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      welcome
        .fromTo(
          prelude.querySelector('[data-for-home]'),
          { x: mobile ? -18 : -70 },
          { x: 0, duration: 1, ease: 'power1.out' },
          0,
        )
        .fromTo(
          prelude.querySelector('[data-for-someone]'),
          { x: mobile ? 20 : 100 },
          { x: 0, duration: 1, ease: 'power1.out' },
          0,
        )
        .fromTo(
          prelude.querySelector('[data-living-art]'),
          { y: mobile ? 55 : 95, rotation: 5, scale: 0.85 },
          { y: 0, rotation: -4, scale: 1, duration: 1, ease: 'power1.out' },
          0,
        );
      return () => {
        origin.removeAttribute('data-motion');
        origin.style.removeProperty('--origin-height');
      };
    },
  );
}
