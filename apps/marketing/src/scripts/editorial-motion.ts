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
    let opener: HTMLButtonElement | null = null;
    document
      .querySelectorAll<HTMLButtonElement>('[data-artwork]')
      .forEach((button) => {
        button.addEventListener('click', () => {
          if (!button.dataset.artSrc) return;
          opener = button;
          dialogImage.src = button.dataset.artSrc;
          dialogImage.alt = button.querySelector('img')?.alt ?? '';
          caption.textContent = button.dataset.artCaption ?? '';
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

  media.add('(prefers-reduced-motion: no-preference)', () => {
    if (window.scrollY < 100) {
      const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const mark = document.querySelector('[data-hero-mark]');
      if (mark) {
        entrance.from(mark, {
          y: 25,
          opacity: 0,
          duration: 0.9,
          clearProps: 'all',
        });
      }
      entrance.from(
        '[data-hero-copy]',
        { y: 20, opacity: 0, duration: 0.7, stagger: 0.1, clearProps: 'all' },
        0.15,
      );
      entrance.from(
        '[data-hero-image]',
        { y: 30, opacity: 0, duration: 0.9, clearProps: 'all' },
        0.2,
      );
    }

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      // Never obscure content at a restored scroll position or an anchor target.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92)
        return;
      gsap.from(element, {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: element, start: 'top 94%', once: true },
      });
    });

    const desktopMotion = gsap.matchMedia();
    desktopMotion.add('(min-width: 761px)', () => {
      gsap.utils
        .toArray<HTMLImageElement>('[data-parallax-image]')
        .forEach((image) => {
          gsap.fromTo(
            image,
            { scale: 1.08, yPercent: -2 },
            {
              yPercent: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: image.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.1,
              },
            },
          );
        });
      const turningMark = document.querySelector('[data-turning-mark]');
      if (turningMark) {
        gsap.to(turningMark, {
          rotation: 55,
          ease: 'none',
          scrollTrigger: {
            trigger: turningMark,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }
    });
    void document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => desktopMotion.revert();
  });
}
