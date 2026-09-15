/** Preserve the playful C-to-sphere handover, on the entrance screen alone. */
export function animateStudioTransition(entrance: HTMLElement) {
  const wordmark = entrance.querySelector('[data-old-wordmark]')!;
  const seal = entrance.querySelector('[data-old-seal]')!;
  const sphere = entrance.querySelector('[data-identity-sphere]')!;
  const options: KeyframeAnimationOptions = {
    duration: 2200,
    fill: 'both',
    easing: 'ease-in-out',
  };
  return [
    wordmark.animate(
      [
        { opacity: 1, transform: 'scale(1)', offset: 0 },
        { opacity: 1, transform: 'scale(1)', offset: 0.28 },
        { opacity: 0, transform: 'translateY(-20px) scale(.5)', offset: 0.43 },
        { opacity: 0, transform: 'translateY(-20px) scale(.5)' },
      ],
      options,
    ),
    seal.animate(
      [
        { opacity: 0, transform: 'scale(.55) rotate(-25deg)', offset: 0 },
        { opacity: 0, transform: 'scale(.55) rotate(-25deg)', offset: 0.34 },
        { opacity: 1, transform: 'scale(1) rotate(0deg)', offset: 0.48 },
        { opacity: 1, transform: 'scale(1) rotate(0deg)', offset: 0.55 },
        { opacity: 0, transform: 'scale(.8) rotate(25deg)', offset: 0.68 },
        { opacity: 0, transform: 'scale(.8) rotate(25deg)' },
      ],
      options,
    ),
    sphere.animate(
      [
        { opacity: 0, transform: 'scale(.8) rotate(-50deg)', offset: 0 },
        { opacity: 0, transform: 'scale(.8) rotate(-50deg)', offset: 0.59 },
        { opacity: 1, transform: 'scale(1.1) rotate(0deg)', offset: 0.78 },
        { opacity: 1, transform: 'scale(1) rotate(0deg)' },
      ],
      options,
    ),
  ];
}
