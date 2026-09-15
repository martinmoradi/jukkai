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
      const words = [
        ...sequence.querySelectorAll<HTMLElement>('[data-roll-word]'),
      ];
      const roll = sequence.querySelector<HTMLElement>('[data-roll]')!;
      const home = sequence.querySelector<HTMLElement>('[data-scene-home]')!;
      const gift = sequence.querySelector<HTMLElement>('[data-scene-gift]')!;
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
      // Scroll travel per timeline unit; the story anchor sits 0.7 viewports before the end.
      const perUnit = mobile ? 2.47 : 2.79;
      let travel = 0;
      const measure = () => {
        sequence.style.setProperty('--scene-height', `${sceneHeight()}px`);
        sequence.style.setProperty('--story-height', `${stage.offsetHeight}px`);
        sequence.style.setProperty(
          '--motion-distance',
          `${window.innerHeight * (travel - 0.7)}px`,
        );
      };
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
      gsap.set(words, { yPercent: (index) => index * 100 });
      gsap.set([home, gift], { xPercent: -50, yPercent: -50 });
      // "Pour" holds while the last word rolls: chez soi, quelqu'un, then le plaisir
      // alone at the centre where the paintings will land. Scenes pass through.
      const across = (share: number) => () => stage.clientWidth * share;
      const down = (share: number) => () => sceneHeight() * share;
      const still = () => 0;
      // The slot is as wide as the widest word; centre the line on the visible one.
      const lineAt = (share: number, index: number) => () =>
        stage.clientWidth * share +
        (roll.offsetWidth - words[index].offsetWidth) / 2;
      const preroll = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
      preroll
        .fromTo(
          invitation,
          mobile
            ? { x: lineAt(0, 0), y: down(0.17) }
            : { x: lineAt(-0.2, 0), y: still },
          mobile
            ? { x: lineAt(0, 1), y: down(-0.17), duration: 0.2 }
            : { x: lineAt(0.16, 1), duration: 0.2 },
          0.12,
        )
        .fromTo(
          words,
          { yPercent: (index) => index * 100 },
          { yPercent: (index) => index * 100 - 100, duration: 0.2 },
          0.12,
        )
        .fromTo(
          home,
          mobile ? { x: still, y: down(-0.17) } : { x: across(0.29), y: still },
          { x: across(0.95), duration: 0.2, ease: 'power2.in' },
          0.12,
        )
        .fromTo(
          gift,
          mobile
            ? { x: across(-0.95), y: down(0.17) }
            : { x: across(-0.95), y: still },
          {
            x: mobile ? still : across(-0.27),
            duration: 0.2,
            ease: 'power2.out',
          },
          0.12,
        )
        .to(
          invitation,
          mobile
            ? { x: lineAt(0, 2), y: 0, duration: 0.2 }
            : { x: lineAt(0, 2), duration: 0.2 },
          0.38,
        )
        .to(
          words,
          { yPercent: (index) => index * 100 - 200, duration: 0.2 },
          0.38,
        )
        .to(gift, { x: across(-0.95), duration: 0.2, ease: 'power2.in' }, 0.38)
        .to({}, { duration: 0.08 });
      const choreography = gsap.timeline({ defaults: { ease: 'none' } });
      choreography
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

      const orbitStart = preroll.duration();
      travel = orbitStart + choreography.duration();
      travel *= perUnit;
      measure();
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'artwork-spiral',
          trigger: track,
          start: 'top 70%',
          end: () =>
            `+=${window.innerHeight * travel - (window.innerHeight - sceneHeight())}`,
          onRefreshInit: measure,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const inspectable =
              Number(gsap.getProperty(credit, 'opacity')) > 0.5;
            orbits[4].inert = !inspectable;
            credit.inert = !inspectable;
          },
        },
      });
      timeline
        .add(preroll, 0)
        .add(choreography, orbitStart)
        // The words recede under the arriving paintings, then leave while covered.
        .to(
          invitation,
          { scale: 0.32, duration: 0.3, ease: 'power2.in' },
          orbitStart + 0.1,
        )
        .to(invitation, { autoAlpha: 0, duration: 0.03 }, orbitStart + 0.42);

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
