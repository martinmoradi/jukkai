import type { gsap as Gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

/** One entrance per visit; scrolling never controls or reverses the letters. */
export function animateIntroduction(gsap: typeof Gsap) {
  const section = document.querySelector<HTMLElement>('[data-introduction]');
  const phrase = section?.querySelector<HTMLElement>('[data-intro-phrase]');
  if (!section || !phrase) return;
  gsap.registerPlugin(SplitText);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // Deep links and restored positions should arrive at readable text immediately.
    if (
      section.dataset.introRevealed ||
      phrase.getBoundingClientRect().top < innerHeight * 0.82
    ) {
      section.dataset.introRevealed = 'true';
      return;
    }
    const lines = [
      ...phrase.querySelectorAll<HTMLElement>('[data-intro-line]'),
    ];
    const splits = lines.map((line) =>
      SplitText.create(line, {
        type: 'words,chars',
        tag: 'span',
        aria: 'none',
      }),
    );
    const restore = () => splits.forEach((split) => split.revert());
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: phrase,
        start: 'top 82%',
        once: true,
      },
      onStart: () => {
        section.dataset.introRevealed = 'true';
      },
      // Return to natural typesetting once the entrance has finished.
      onComplete: restore,
    });
    splits.forEach((split, lineIndex) => {
      const direction = lineIndex === 0 ? 1 : -1;
      timeline.fromTo(
        split.chars,
        {
          opacity: 0,
          xPercent: -direction * 22,
          yPercent: direction * 85,
          scale: 1.7,
          skewX: direction * 12,
          skewY: direction * 18,
          filter: 'blur(6px)',
          transformOrigin: '50% 60%',
        },
        {
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
          filter: 'blur(0px)',
          duration: 1.7,
          ease: 'power3.out',
          stagger: (index) => ((index * 7) % 11) * 0.025,
        },
        lineIndex * 0.12,
      );
    });
    return () => {
      timeline.kill();
      restore();
    };
  });
}
