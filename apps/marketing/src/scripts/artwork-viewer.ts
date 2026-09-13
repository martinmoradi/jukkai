/** A detail-first viewer: real source pixels, native touch panning and keyboard controls. */
export function initArtworkViewer(root: Document = document) {
  const dialog = root.querySelector<HTMLDialogElement>('[data-art-dialog]');
  if (!dialog) return;
  const image = dialog.querySelector<HTMLImageElement>('[data-art-image]')!;
  const viewport = dialog.querySelector<HTMLElement>('[data-art-viewport]')!;
  const canvas = dialog.querySelector<HTMLElement>('[data-art-canvas]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-art-caption]')!;
  const level = dialog.querySelector<HTMLOutputElement>('[data-zoom-level]')!;
  const plus = dialog.querySelector<HTMLButtonElement>('[data-zoom-in]')!;
  const minus = dialog.querySelector<HTMLButtonElement>('[data-zoom-out]')!;
  const fit = dialog.querySelector<HTMLButtonElement>('[data-zoom-fit]')!;
  let opener: HTMLAnchorElement | null = null;
  let fitWidth = 1;
  let zoom = 2;
  let maxZoom = 4;
  let loading = 0;

  function render(next: number, point?: { x: number; y: number }) {
    const oldWidth = image.clientWidth || fitWidth;
    const oldHeight = image.clientHeight || fitWidth;
    const center = point ?? {
      x:
        oldWidth > viewport.clientWidth
          ? (viewport.scrollLeft + viewport.clientWidth / 2) / oldWidth
          : 0.5,
      y:
        oldHeight > viewport.clientHeight
          ? (viewport.scrollTop + viewport.clientHeight / 2) / oldHeight
          : 0.5,
    };
    zoom = Math.min(maxZoom, Math.max(1, next));
    const width = fitWidth * zoom;
    const height = (width * image.naturalHeight) / image.naturalWidth;
    canvas.style.width = `${Math.max(viewport.clientWidth, width)}px`;
    canvas.style.height = `${Math.max(viewport.clientHeight, height)}px`;
    image.style.setProperty('--image-width', `${width}px`);
    viewport.scrollLeft = Math.max(
      0,
      width * center.x - viewport.clientWidth / 2,
    );
    viewport.scrollTop = Math.max(
      0,
      height * center.y - viewport.clientHeight / 2,
    );
    level.value = `${Math.round(zoom * 100)} %`;
    plus.disabled = zoom >= maxZoom - 0.01;
    minus.disabled = zoom <= 1.01;
    fit.disabled = zoom <= 1.01;
  }

  function measure() {
    fitWidth = Math.min(
      viewport.clientWidth - 24,
      ((viewport.clientHeight - 24) * image.naturalWidth) / image.naturalHeight,
    );
    maxZoom = Math.max(1, Math.min(4, image.naturalWidth / fitWidth));
  }

  root.querySelectorAll<HTMLAnchorElement>('[data-artwork]').forEach((link) => {
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
      const ticket = ++loading;
      const inline = link.querySelector<HTMLImageElement>('img');
      const rect = inline?.getBoundingClientRect();
      const point =
        event.detail && rect
          ? {
              x: Math.max(
                0,
                Math.min(1, (event.clientX - rect.left) / rect.width),
              ),
              y: Math.max(
                0,
                Math.min(1, (event.clientY - rect.top) / rect.height),
              ),
            }
          : { x: 0.5, y: 0.5 };
      image.src = link.dataset.artSrc;
      image.alt = link.dataset.artAlt ?? inline?.alt ?? '';
      caption.textContent = link.dataset.artCaption ?? '';
      dialog.showModal();
      viewport.setAttribute('aria-busy', 'true');
      void image
        .decode()
        .then(() => {
          if (!dialog.open || ticket !== loading) return;
          measure();
          const usefulZoom = rect ? (rect.width * 1.35) / fitWidth : 2;
          render(Math.max(2, usefulZoom), point);
          viewport.removeAttribute('aria-busy');
          viewport.focus({ preventScroll: true });
        })
        .catch(() => {
          viewport.removeAttribute('aria-busy');
          caption.textContent =
            'L’image n’a pas pu être chargée. Fermez puis réessayez.';
        });
    });
  });
  plus.addEventListener('click', () => render(zoom + 0.5));
  minus.addEventListener('click', () => render(zoom - 0.5));
  fit.addEventListener('click', () => render(1));
  dialog
    .querySelector('[data-art-close]')
    ?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    loading++;
    opener?.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', (event) => {
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-70, 0],
      ArrowRight: [70, 0],
      ArrowUp: [0, -70],
      ArrowDown: [0, 70],
    };
    if (delta[event.key] && event.target === viewport) {
      event.preventDefault();
      viewport.scrollBy({
        left: delta[event.key][0],
        top: delta[event.key][1],
        behavior: 'instant',
      });
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      render(zoom + 0.5);
    } else if (event.key === '-') {
      event.preventDefault();
      render(zoom - 0.5);
    } else if (event.key === '0') {
      event.preventDefault();
      render(1);
    }
  });
  // Touch uses the browser's native two-axis scrolling. A mouse can grab the image.
  let drag: {
    x: number;
    y: number;
    left: number;
    top: number;
    id: number;
  } | null = null;
  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
      id: event.pointerId,
    };
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!drag) return;
    viewport.scrollLeft = drag.left - (event.clientX - drag.x);
    viewport.scrollTop = drag.top - (event.clientY - drag.y);
  });
  const endDrag = () => {
    drag = null;
  };
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', endDrag);
  window.addEventListener('resize', () => {
    if (!dialog.open || !image.naturalWidth) return;
    measure();
    render(zoom);
  });
}
