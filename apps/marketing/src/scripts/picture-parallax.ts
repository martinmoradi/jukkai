import type { gsap as Gsap } from 'gsap';

/** Move complete photographs gently; never crop their artwork or edit the source. */
export function addPictureParallax(
  gsap: typeof Gsap,
  pictures: NodeListOf<HTMLElement>,
) {
  const distance = () => (innerWidth <= 800 ? 8 : 16);
  pictures.forEach((picture) => {
    gsap.fromTo(
      picture,
      { y: distance },
      {
        y: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: picture.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      },
    );
  });
}

export function animatePictureParallax(gsap: typeof Gsap) {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    addPictureParallax(
      gsap,
      document.querySelectorAll('[data-picture-parallax]'),
    );
  });
}
