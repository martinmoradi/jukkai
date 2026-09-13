import { initArtworkViewer } from './artwork-viewer';

/** Links, complete artworks and the introduction are useful without enhancement. */
export function initEditorialMotion() {
  const mapsLink =
    document.querySelector<HTMLAnchorElement>('[data-maps-link]');
  if (
    mapsLink?.dataset.appleMapsUrl &&
    /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)
  ) {
    mapsLink.href = mapsLink.dataset.appleMapsUrl;
  }
  initArtworkViewer();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document
      .querySelector('[data-art-sequence]')
      ?.removeAttribute('data-motion');
    return;
  }
  if (!document.querySelector('[data-art-sequence]')) return;
  void animateEditorial().catch(() => {
    document
      .querySelector('[data-art-sequence]')
      ?.removeAttribute('data-motion');
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
      motion: '(prefers-reduced-motion: no-preference) and (min-height: 600px)',
      mobile: '(max-width: 800px)',
    },
    (context) => {
      if (!context.conditions?.motion) return;
      const mobile = Boolean(context.conditions.mobile);
      const sequence = document.querySelector<HTMLElement>(
        '[data-art-sequence]',
      )!;
      const stage = sequence.querySelector<HTMLElement>('[data-art-stage]')!;
      const hero = sequence.querySelector<HTMLElement>('[data-hero-scene]')!;
      const image = sequence.querySelector<HTMLImageElement>(
        '[data-art-hero-image]',
      )!;
      const intro = sequence.querySelector<HTMLElement>('[data-art-intro]')!;
      const heading = intro.querySelector('h1')!;
      const description = intro.querySelector<HTMLElement>(
        '[data-hero-description]',
      )!;
      const photo = sequence.querySelector<HTMLElement>('[data-story-photo]')!;
      const story = sequence.querySelector<HTMLElement>('[data-story-scene]')!;
      const copy = sequence.querySelector<HTMLElement>('[data-story-copy]')!;
      const architecture =
        sequence.querySelector<HTMLElement>('#architecture')!;
      const marker = sequence.querySelector<HTMLElement>(
        '[data-story-anchor]',
      )!;
      const architectureMarker = document.createElement('span');
      sequence.dataset.motion = 'ready';
      sequence.dataset.animated = 'true';
      // Native anchors land at the readable destination, even on a direct hash URL.
      story.removeAttribute('id');
      architecture.removeAttribute('id');
      marker.id = 'esprit';
      architectureMarker.id = 'architecture';
      marker.append(architectureMarker);

      const baseSize = () =>
        mobile ? stage.clientWidth * 1.55 : stage.clientHeight * 1.22;
      const firstTop = () =>
        mobile ? heading.offsetTop + heading.offsetHeight + 18 : 0;
      const firstY = () =>
        mobile ? firstTop() + 42 + baseSize() * 0.25 : stage.clientHeight * 0.5;
      const frame = () =>
        mobile
          ? `inset(${firstTop()}px 0 ${description.offsetHeight + 40}px)`
          : 'inset(0% 0% 0% 49%)';
      const photoBox = () => {
        const p = photo.getBoundingClientRect();
        const s = stage.getBoundingClientRect();
        return {
          x: p.left - s.left,
          y: p.top - s.top,
          w: p.width,
          h: p.height,
        };
      };
      // The painting really appears at this position in the supplied photograph.
      // It dissolves before the join; no installation or artwork perspective is fabricated.
      const destination = () => {
        const p = photoBox();
        return {
          x: p.x + p.w * 0.797,
          y: p.y + p.h * 0.323,
          scale: (p.w * 0.286) / baseSize(),
        };
      };
      gsap.set(image, { width: baseSize, xPercent: -50, yPercent: -50 });
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sequence,
          start: () =>
            `top ${getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim()}`,
          end: () => `+=${sequence.offsetHeight - stage.offsetHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: () => gsap.set(image, { width: baseSize }),
        },
      });
      timeline
        .fromTo(
          image,
          {
            x: () => stage.clientWidth * (mobile ? 0.5 : 0.745),
            y: firstY,
            scale: 1,
            opacity: 1,
          },
          {
            x: () => stage.clientWidth * (mobile ? 0.5 : 0.755),
            y: () =>
              mobile
                ? photoBox().h + (stage.clientHeight - photoBox().h) * 0.53
                : stage.clientHeight * 0.5,
            scale: () =>
              (mobile
                ? Math.min(
                    stage.clientWidth * 0.72,
                    (stage.clientHeight - photoBox().h) * 0.82,
                  )
                : Math.min(
                    stage.clientWidth * 0.43,
                    stage.clientHeight * 0.78,
                  )) / baseSize(),
            duration: 0.48,
            ease: 'power1.inOut',
          },
          0,
        )
        .fromTo(
          '[data-art-frame]',
          { clipPath: frame },
          { clipPath: 'inset(0%)', duration: 0.43 },
          0,
        )
        .fromTo(
          intro,
          { autoAlpha: 1, y: 0 },
          { autoAlpha: 0, y: mobile ? -25 : -15, duration: 0.14 },
          0.02,
        )
        .fromTo(
          '[data-art-credit]',
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 0.15 },
          0.22,
        )
        .fromTo(
          photo,
          {
            autoAlpha: 0,
            clipPath: mobile ? 'inset(0 0 14% 0)' : 'inset(0 14% 0 0)',
          },
          { autoAlpha: 1, clipPath: 'inset(0%)', duration: 0.28 },
          0.08,
        )
        .to(
          image,
          {
            x: () => destination().x,
            y: () => destination().y,
            scale: () => destination().scale,
            duration: 0.39,
            ease: 'power1.inOut',
          },
          0.48,
        )
        .to(image, { opacity: 0, duration: 0.14 }, 0.6)
        .fromTo(
          copy,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.12 },
          0.7,
        )
        .set(hero, { autoAlpha: 0 }, 0.92)
        .to({}, { duration: 0.04 }, 0.96);

      gsap.utils.toArray<HTMLElement>('[data-art-reveal]').forEach((art) => {
        gsap.fromTo(
          art,
          { clipPath: 'inset(3% 0 3% 0)' },
          {
            clipPath: 'inset(0%)',
            ease: 'power1.out',
            scrollTrigger: {
              trigger: art,
              start: 'top 95%',
              end: 'top 60%',
              scrub: true,
            },
          },
        );
      });
      void document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
        if (location.hash === '#esprit' || location.hash === '#architecture') {
          window.scrollTo({
            top:
              sequence.offsetTop +
              sequence.offsetHeight -
              stage.offsetHeight -
              parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                  '--header-height',
                ),
              ),
            behavior: 'instant',
          });
        }
      });
      return () => {
        sequence.removeAttribute('data-motion');
        marker.removeAttribute('id');
        architectureMarker.remove();
        story.id = 'esprit';
        architecture.id = 'architecture';
      };
    },
  );
}
