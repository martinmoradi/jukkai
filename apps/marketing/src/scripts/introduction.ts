import type { gsap as Gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';

/** Each line enters once when visible; scrolling never scrubs or reverses it. */
export function animateIntroduction(gsap: typeof Gsap) {
  const section = document.querySelector<HTMLElement>('[data-introduction]');
  const phrase = section?.querySelector<HTMLElement>('[data-intro-phrase]');
  if (!section || !phrase) return;
  gsap.registerPlugin(CustomEase, SplitText);
  const settle = CustomEase.create('intro-letter', '0.2,0.75,0.35,1');
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
    const entrances = lines.map((line, lineIndex) => {
      const split = SplitText.create(line, {
        type: 'words,chars',
        tag: 'span',
        aria: 'none',
      });
      // Measure while the spans still share natural kerning. Preserve those
      // advances in em units so splitting and restoring do not move the letters.
      const fontSize = Number.parseFloat(getComputedStyle(line).fontSize);
      const advances = split.chars.map(
        (char) => `${char.getBoundingClientRect().width / fontSize}em`,
      );
      gsap.set(split.words, { display: 'inline-block' });
      // Span wrappers need a transformable box. Set every initial state before
      // the stagger starts, so late letters cannot flash in their final position.
      gsap.set(split.chars, {
        display: 'inline-block',
        width: (index) => advances[index],
        opacity: 0,
        x: '0.25em',
        y: '-1em',
        scale: 2,
        skewX: 15,
        skewY: 30,
        filter: 'blur(0.05em)',
        transformOrigin: '50% 50%',
      });
      const tween = gsap.to(split.chars, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        skewX: 0,
        skewY: 0,
        filter: 'blur(0em)',
        duration: 1.5,
        ease: settle,
        // Scatter arrivals over 750ms, with a repeatable order for each line.
        // Neighbouring letters must remain at visibly different stages.
        stagger: (index) => ((index * 7 + lineIndex * 3) % 11) * 0.075,
        scrollTrigger: {
          trigger: line,
          start: 'top 82%',
          once: true,
        },
        onStart: () => {
          section.dataset.introRevealed = 'true';
        },
        // Natural typesetting resumes independently, as each line settles.
        onComplete: () => split.revert(),
      });
      return { split, tween };
    });
    return () => {
      entrances.forEach(({ split, tween }) => {
        tween.kill();
        split.revert();
      });
    };
  });
}
