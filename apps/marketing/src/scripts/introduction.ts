import type { gsap as Gsap } from 'gsap';

/** Where the dot of the j sits inside the complete hero wordmark (887 × 356 units). */
const DOT = { x: 31.83 / 887, y: 35 / 356 };
const WORDMARK_RATIO = 356 / 887;

/**
 * The page wipes in from the dot of the j and turns the wordmark to ink. The
 * sentence then assembles around it; below, the studio and the Galerie meet.
 */
export function animateIntroduction(gsap: typeof Gsap) {
  const section = document.querySelector<HTMLElement>('[data-introduction]');
  if (!section) return;
  const hero = document.querySelector<HTMLElement>('[data-artwork-hero]');
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
      const panels = section.querySelector<HTMLElement>('[data-join-panels]')!;
      const spread = () => innerWidth * (mobile ? 0.18 : 0.22);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: panels,
            start: 'top 92%',
            end: 'center 52%',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          section.querySelector('[data-join-left]'),
          { x: () => -spread() },
          { x: 0, ease: 'power2.out' },
          0,
        )
        .fromTo(
          section.querySelector('[data-join-right]'),
          { x: () => spread() },
          { x: 0, ease: 'power2.out' },
          0,
        )
        .fromTo(
          section.querySelectorAll('[data-join-image]'),
          { scale: 1.12 },
          { scale: 1, ease: 'power2.out' },
          0,
        );

      // The wipe needs the hero pinned underneath; short viewports read the settled page.
      if (!context.conditions.spacious || hero?.dataset.motion !== 'ready') {
        return;
      }
      const track = section.querySelector<HTMLElement>('[data-origin-track]')!;
      const stage = section.querySelector<HTMLElement>('[data-origin-stage]')!;
      const mark = section.querySelector<HTMLElement>('[data-origin-mark]')!;
      const slot = section.querySelector<HTMLElement>('[data-origin-slot]')!;
      const byline = section.querySelector<HTMLElement>(
        '[data-origin-byline]',
      )!;
      const verb = section.querySelector<HTMLElement>('[data-origin-verb]')!;
      const former = section.querySelector<HTMLElement>(
        '[data-origin-former]',
      )!;
      section.dataset.motion = 'ready';
      hero.dataset.exit = 'wipe';

      // The hero wordmark is centred at min(91vw, 172svh) wide; the copy shares that box.
      const geometry = () => {
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        const markWidth = Math.min(width * 0.91, height * 1.72);
        const markHeight = markWidth * WORDMARK_RATIO;
        const x = (width - markWidth) / 2 + markWidth * DOT.x;
        const y = (height - markHeight) / 2 + markHeight * DOT.y;
        return {
          x,
          y,
          radius: Math.hypot(Math.max(x, width - x), Math.max(y, height - y)),
          markWidth,
        };
      };
      const target = () => {
        const { markWidth } = geometry();
        return {
          x: slot.offsetLeft + slot.offsetWidth / 2 - stage.clientWidth / 2,
          y: slot.offsetTop + slot.offsetHeight / 2 - stage.clientHeight / 2,
          scale: slot.offsetWidth / markWidth,
        };
      };
      gsap.fromTo(
        stage,
        {
          clipPath: () => {
            const { x, y } = geometry();
            return `circle(0px at ${x}px ${y}px)`;
          },
        },
        {
          clipPath: () => {
            const { x, y, radius } = geometry();
            return `circle(${radius}px at ${x}px ${y}px)`;
          },
          ease: 'none',
          scrollTrigger: {
            trigger: track,
            start: 'top top',
            end: () => `+=${innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
      gsap.set(mark, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: track,
            start: () => `top+=${innerHeight} top`,
            end: () => `+=${innerHeight * 1.6}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
        .to(
          mark,
          {
            x: () => target().x,
            y: () => target().y,
            scale: () => target().scale,
            duration: 0.45,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(byline, { opacity: 0, duration: 0.2, ease: 'none' }, 0.04)
        .fromTo(
          verb,
          { letterSpacing: '0.55em', textIndent: '0.55em' },
          {
            letterSpacing: '-0.03em',
            textIndent: '-0.03em',
            duration: 0.56,
            ease: 'power3.out',
          },
          0.36,
        )
        .fromTo(
          verb,
          { clipPath: 'inset(0 50% 0 50%)' },
          { clipPath: 'inset(0 0% 0 0%)', duration: 0.5, ease: 'power2.out' },
          0.42,
        )
        .fromTo(
          former,
          { xPercent: -140 },
          { xPercent: 0, duration: 0.4, ease: 'power3.out' },
          0.5,
        )
        .to({}, { duration: 0.08 });

      return () => {
        section.removeAttribute('data-motion');
        hero.removeAttribute('data-exit');
      };
    },
  );
}
