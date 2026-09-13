/** All content and contact links work before this enhancement loads. */
export function initEditorialMotion() {
  const mapsLink =
    document.querySelector<HTMLAnchorElement>('[data-maps-link]');
  if (
    mapsLink?.dataset.appleMapsUrl &&
    /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)
  ) {
    mapsLink.href = mapsLink.dataset.appleMapsUrl;
  }

  const dialog = document.querySelector<HTMLDialogElement>('[data-art-dialog]');
  const dialogImage =
    dialog?.querySelector<HTMLImageElement>('[data-art-image]');
  const caption = dialog?.querySelector<HTMLElement>('[data-art-caption]');
  if (dialog && dialogImage && caption) {
    let opener: HTMLAnchorElement | null = null;
    document
      .querySelectorAll<HTMLAnchorElement>('[data-artwork]')
      .forEach((link) => {
        link.addEventListener('click', (event) => {
          if (
            !link.dataset.artSrc ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          event.preventDefault();
          opener = link;
          dialogImage.src = link.dataset.artSrc;
          dialogImage.alt =
            link.dataset.artAlt ?? link.querySelector('img')?.alt ?? '';
          caption.textContent = link.dataset.artCaption ?? '';
          dialog.showModal();
        });
      });
    dialog
      .querySelector('[data-art-close]')
      ?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    });
    dialog.addEventListener('close', () =>
      opener?.focus({ preventScroll: true }),
    );
  }

  // An explicit preference skips the animation bundle as well as the motion.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  void animateEditorial().catch(() => {
    // Network failures leave the server-rendered page fully usable.
  });
}

async function animateEditorial() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  media.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      mobile: '(max-width: 800px)',
      desktop: '(min-width: 801px)',
    },
    (context) => {
      if (!context.conditions?.motion) return;
      const mobile = Boolean(context.conditions.mobile);
      const intro = document.querySelector<HTMLElement>('[data-art-intro]');
      const sequence = document.querySelector<HTMLElement>(
        '[data-art-sequence]',
      );
      const stage = document.querySelector<HTMLElement>('[data-art-stage]');
      const heroImage = document.querySelector<HTMLImageElement>(
        '[data-art-hero-image]',
      );
      if (sequence && stage && heroImage && intro) {
        sequence.dataset.motion = 'ready';
        const size = () =>
          Math.min(
            stage.clientWidth * (mobile ? 0.84 : 0.48),
            stage.clientHeight * (mobile ? 0.64 : 0.78),
          );
        const closeScale = () =>
          mobile
            ? Math.max(
                stage.clientWidth / size(),
                (stage.clientHeight * 0.47) / size(),
              ) * 1.5
            : Math.max(
                (stage.clientWidth * 0.54) / size(),
                stage.clientHeight / size(),
              ) * 1.28;
        gsap.set(heroImage, { width: size, xPercent: -50, yPercent: -50 });
        // Three poses: close-up / opening frame / whole painting. The CSS sticky
        // stage uses only 80svh of additional native scroll, on both form factors.
        const sequenceTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sequence,
            start: () =>
              `top ${getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim()}`,
            end: () => `+=${sequence.offsetHeight - stage.offsetHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
            onRefreshInit: () => gsap.set(heroImage, { width: size }),
          },
        });
        sequenceTimeline
          .fromTo(
            '[data-art-frame]',
            {
              clipPath: () =>
                mobile
                  ? `inset(${intro.offsetHeight + 12}px 0% 0% 0%)`
                  : 'inset(0% 0% 0% 46%)',
            },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8 },
            0,
          )
          .fromTo(
            heroImage,
            {
              x: () => (mobile ? 0 : stage.clientWidth * 0.23),
              y: () =>
                mobile
                  ? intro.offsetHeight +
                    77 +
                    size() * closeScale() * 0.22 -
                    stage.clientHeight / 2
                  : 0,
              scale: closeScale,
            },
            { x: 0, y: 0, scale: 1, duration: 0.85, ease: 'power1.inOut' },
            0,
          )
          .fromTo(
            '[data-art-intro]',
            { y: 0, opacity: 1, visibility: 'visible' },
            { y: mobile ? -95 : -65, autoAlpha: 0, duration: 0.34 },
            0,
          )
          .fromTo(
            '[data-art-backdrop]',
            { scale: 0.86, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.65 },
            0.2,
          )
          .fromTo(
            '[data-art-credit]',
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.22 },
            0.72,
          )
          .fromTo(
            '[data-art-progress]',
            { scaleX: 0 },
            { scaleX: 1, duration: 1 },
            0,
          );
      }

      // Supporting gestures share the opening's logic: frames open and a
      // photograph settles into place. Body copy is never hidden for a reveal.
      gsap.utils.toArray<HTMLElement>('[data-art-reveal]').forEach((frame) => {
        if (frame.getBoundingClientRect().top < window.innerHeight) return;
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 0% 10% 0%)', y: 30 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: frame,
              start: 'top 95%',
              end: 'top 40%',
              scrub: true,
            },
          },
        );
      });
      const portrait = document.querySelector('[data-portrait-reveal]');
      if (portrait) {
        gsap.fromTo(
          portrait,
          { xPercent: mobile ? -5 : -8 },
          {
            xPercent: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: portrait,
              start: 'top 95%',
              end: 'top 40%',
              scrub: true,
            },
          },
        );
      }
      const mark = document.querySelector('[data-opening-mark]');
      if (mark) {
        gsap.fromTo(
          mark,
          { rotation: -30 },
          {
            rotation: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: mark,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }
      void document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => {
        delete sequence?.dataset.motion;
      };
    },
  );
}
