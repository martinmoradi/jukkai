/** Video playback is independent of the optional scroll-animation bundle. */
export function initHeroFilm() {
  const stage = document.querySelector<HTMLElement>('[data-film-stage]');
  if (!stage) return;
  const film = stage.querySelector<HTMLVideoElement>('[data-hero-film]')!;
  const toggle = stage.querySelector<HTMLButtonElement>('[data-film-toggle]')!;
  const label = stage.querySelector<HTMLElement>('[data-film-label]')!;
  const icon = stage.querySelector<HTMLElement>('[data-film-icon]')!;
  const status = stage.querySelector<HTMLElement>('[data-film-status]')!;
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const portrait = matchMedia('(max-width: 700px) and (orientation: portrait)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let pausedByVisitor = reduced.matches;
  let inView = stage.getBoundingClientRect().bottom > 0;
  let failed = false;

  function updateLabel() {
    const stopped = film.paused;
    toggle.setAttribute(
      'aria-label',
      stopped ? 'Lire la vidéo' : 'Mettre la vidéo en pause',
    );
    label.textContent = stopped ? 'Lecture' : 'Pause';
    icon.textContent = stopped ? '▷' : 'Ⅱ';
  }

  async function syncPlayback() {
    if (pausedByVisitor || !inView || document.hidden || failed) {
      film.pause();
    } else {
      try {
        await film.play();
      } catch {
        /* The poster and play control remain usable. */
      }
    }
    updateLabel();
  }

  function loadFilm() {
    const src = portrait.matches
      ? film.dataset.portrait!
      : film.dataset.landscape!;
    if (film.getAttribute('src') === src) return;
    film.pause();
    film.removeAttribute('data-ready');
    failed = false;
    film.src = src;
    film.load();
    void syncPlayback();
  }

  film.muted = true;
  toggle.hidden = false;
  film.addEventListener('loadeddata', () => {
    film.dataset.ready = 'true';
    void syncPlayback();
  });
  film.addEventListener('error', () => {
    failed = true;
    film.removeAttribute('data-ready');
    status.textContent =
      'Le film ne peut pas être chargé. Son image reste affichée.';
    updateLabel();
  });
  film.addEventListener('play', updateLabel);
  film.addEventListener('pause', updateLabel);
  toggle.addEventListener('click', () => {
    pausedByVisitor = !film.paused;
    if (!pausedByVisitor && (!film.getAttribute('src') || failed)) {
      film.removeAttribute('src');
      status.textContent = '';
      loadFilm();
    }
    void syncPlayback();
  });
  document.addEventListener('visibilitychange', () => void syncPlayback());
  portrait.addEventListener('change', () => {
    if (film.getAttribute('src')) loadFilm();
  });
  reduced.addEventListener('change', () => {
    pausedByVisitor = reduced.matches;
    if (!reduced.matches) loadFilm();
    void syncPlayback();
  });
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.intersectionRatio > 0.001;
      if (inView && !pausedByVisitor && !film.getAttribute('src')) loadFilm();
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
  updateLabel();
}
