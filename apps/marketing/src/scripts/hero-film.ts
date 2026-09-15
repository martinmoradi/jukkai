/** Video playback is independent of the optional scroll-animation bundle. */
export function initHeroFilm() {
  const stage = document.querySelector<HTMLElement>('[data-film-stage]');
  if (!stage) return;
  const film = stage.querySelector<HTMLVideoElement>('[data-hero-film]')!;
  const status = stage.querySelector<HTMLElement>('[data-film-status]')!;
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const portrait = matchMedia('(max-width: 700px) and (orientation: portrait)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let inView = stage.getBoundingClientRect().bottom > 0;
  let failed = false;

  async function syncPlayback() {
    if (reduced.matches || !inView || document.hidden || failed) {
      film.pause();
    } else {
      try {
        await film.play();
      } catch {
        /* Autoplay can be blocked; the static poster remains visible. */
      }
    }
  }

  function loadFilm() {
    const src = portrait.matches
      ? film.dataset.portrait!
      : film.dataset.landscape!;
    if (film.getAttribute('src') === src) return;
    film.pause();
    film.removeAttribute('data-ready');
    failed = false;
    status.textContent = '';
    film.src = src;
    film.load();
    void syncPlayback();
  }

  film.muted = true;
  film.addEventListener('loadeddata', () => {
    if (!reduced.matches) film.dataset.ready = 'true';
    void syncPlayback();
  });
  film.addEventListener('error', () => {
    failed = true;
    film.removeAttribute('data-ready');
    status.textContent =
      'Le film ne peut pas être chargé. Son image reste affichée.';
  });
  document.addEventListener('visibilitychange', () => void syncPlayback());
  portrait.addEventListener('change', () => {
    if (film.getAttribute('src')) loadFilm();
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) film.removeAttribute('data-ready');
    else if (inView) loadFilm();
    if (!reduced.matches && film.readyState >= 2 && !failed) {
      film.dataset.ready = 'true';
    }
    void syncPlayback();
  });
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.intersectionRatio > 0.001;
      if (inView && !reduced.matches && !film.getAttribute('src')) loadFilm();
      void syncPlayback();
    },
    { threshold: 0.001 },
  ).observe(stage);
  // A separate threshold changes the navigation as the film passes underneath it.
  if (header) {
    header.dataset.headerReady = 'true';
    new IntersectionObserver(
      ([entry]) => {
        header.dataset.onFilm = String(entry.isIntersecting);
      },
      { rootMargin: `-${header.offsetHeight}px 0px 0px`, threshold: 0 },
    ).observe(stage);
  }
  if (!reduced.matches && inView) loadFilm();
}
