import type { gsap as Gsap } from 'gsap';

/** One sticky stage owns the spiral, stack, and the existing portrait handover. */
export function animateArtworkSequence(gsap: typeof Gsap) {
  const sequence = document.querySelector<HTMLElement>('[data-art-sequence]');
  if (!sequence) return;
  const media = gsap.matchMedia();
  media.add(
    {
      motion:
        '(prefers-reduced-motion: no-preference) and (min-height: 720px), (prefers-reduced-motion: no-preference) and (max-width: 800px) and (min-height: 600px)',
      mobile: '(max-width: 800px)',
    },
    (context) => {
      if (!context.conditions?.motion) return;
      const mobile = Boolean(context.conditions.mobile);
      const track = sequence.querySelector<HTMLElement>('[data-art-track]')!;
      const stage = sequence.querySelector<HTMLElement>('[data-art-stage]')!;
      const spiral = sequence.querySelector<HTMLElement>('[data-spiral]')!;
      const orbits = [
        ...sequence.querySelectorAll<HTMLElement>('[data-spiral-orbit]'),
      ];
      const artworks = [
        ...sequence.querySelectorAll<HTMLElement>('[data-spiral-art]'),
      ];
      const invitation = sequence.querySelector<HTMLElement>(
        '[data-spiral-invitation]',
      )!;
      const credit = sequence.querySelector<HTMLElement>(
        '[data-stack-credit]',
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
      // Keep each work available in static flow. During the choreography, only the
      // exposed top painting is interactive; hidden layers cannot steal keyboard focus.
      orbits.forEach((orbit) => {
        orbit.inert = true;
      });
      story.removeAttribute('id');
      architecture.removeAttribute('id');
      marker.id = 'crystelle';
      architectureMarker.id = 'architecture';
      marker.append(architectureMarker);
      const sceneHeight = () =>
        window.innerHeight -
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--header-height',
          ),
        );
      const measure = () => {
        sequence.style.setProperty('--scene-height', `${sceneHeight()}px`);
        sequence.style.setProperty('--story-height', `${stage.offsetHeight}px`);
        sequence.style.setProperty(
          '--motion-distance',
          `${window.innerHeight * (mobile ? 2.4 : 2.8)}px`,
        );
      };
      measure();
      const angle = 360 / artworks.length;
      const radius = () =>
        mobile
          ? Math.max(stage.clientWidth * 0.8, sceneHeight() * 0.52)
          : stage.clientWidth * 0.6;
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
      const middleSize = () =>
        mobile
          ? Math.min(stage.clientWidth * 0.62, sceneHeight() * 0.34)
          : Math.min(stage.clientWidth * 0.35, sceneHeight() * 0.62);
      const middleY = () =>
        mobile
          ? photoBox().y + photoBox().h + 24 + middleSize() / 2
          : sceneHeight() * 0.5;
      // The painting really occupies this region of the supplied 4:3 photograph.
      // Retain the existing dissolve across different source lighting/perspective.
      const destination = () => {
        const p = photoBox();
        return {
          x: p.x + p.w * 0.797,
          y: p.y + p.h * 0.323,
          scale: (p.w * 0.286) / spiral.offsetWidth,
        };
      };
      gsap.set(spiral, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1 });
      gsap.set(orbits, { rotation: (index) => -angle * index });
      gsap.set(artworks, {
        x: radius,
        rotation: (index) => angle * index,
        opacity: 0,
      });
      gsap.set([photo, copy, credit], { autoAlpha: 0 });
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'artwork-spiral',
          trigger: track,
          start: 'top 70%',
          end: () =>
            `+=${window.innerHeight * (mobile ? 3.1 : 3.5) - (window.innerHeight - sceneHeight())}`,
          onRefreshInit: measure,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const inspectable = self.progress >= 0.57 && self.progress < 0.73;
            orbits[4].inert = !inspectable;
            credit.inert = !inspectable;
          },
        },
      });
      timeline
        .fromTo(
          invitation,
          { autoAlpha: 1, scale: 1 },
          { autoAlpha: 0, scale: 0.86, duration: 0.13, ease: 'power1.in' },
          0.07,
        )
        .fromTo(
          orbits,
          { rotation: (index) => -angle * index },
          {
            rotation: (index) => -angle * index + 180,
            duration: 0.43,
            stagger: 0.035,
            ease: 'power1.out',
          },
          0,
        )
        .fromTo(
          artworks,
          { x: radius, rotation: (index) => angle * index },
          {
            x: 0,
            rotation: (index) => angle * index - 180,
            duration: 0.43,
            stagger: 0.035,
            ease: 'power1.out',
          },
          0,
        )
        .fromTo(
          artworks,
          { opacity: 0 },
          { opacity: 1, duration: 0.025, stagger: 0.035 },
          0,
        )
        .to(credit, { autoAlpha: 1, duration: 0.04 }, 0.57)
        .to(orbits.slice(0, -1), { autoAlpha: 0, duration: 0.05 }, 0.66)
        .to(credit, { autoAlpha: 0, duration: 0.05 }, 0.7)
        .fromTo(
          photo,
          {
            autoAlpha: 0,
            clipPath: mobile ? 'inset(0 0 14% 0)' : 'inset(0 14% 0 0)',
          },
          { autoAlpha: 1, clipPath: 'inset(0%)', duration: 0.13 },
          0.69,
        )
        .to(
          spiral,
          {
            x: () =>
              stage.clientWidth * (mobile ? 0.5 : 0.77) -
              stage.clientWidth * 0.5,
            y: () => middleY() - sceneHeight() * 0.5,
            scale: () => middleSize() / spiral.offsetWidth,
            duration: 0.13,
            ease: 'power1.inOut',
          },
          0.69,
        )
        .to(
          spiral,
          {
            x: () => destination().x - stage.clientWidth * 0.5,
            y: () => destination().y - sceneHeight() * 0.5,
            scale: () => destination().scale,
            duration: 0.15,
            ease: 'power1.inOut',
          },
          0.82,
        )
        .to(spiral, { autoAlpha: 0, duration: 0.055 }, 0.915)
        .fromTo(
          copy,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.075 },
          0.925,
        )
        .to({}, { duration: 0.035 });

      return () => {
        sequence.removeAttribute('data-motion');
        ['--scene-height', '--story-height', '--motion-distance'].forEach(
          (property) => sequence.style.removeProperty(property),
        );
        orbits.forEach((orbit) => {
          orbit.inert = false;
        });
        credit.inert = false;
        marker.removeAttribute('id');
        architectureMarker.remove();
        story.id = 'crystelle';
        architecture.id = 'architecture';
      };
    },
  );
}
