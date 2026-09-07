/** Browser regression check against an already running marketing preview. */
const baseUrl = process.argv[2];

if (!baseUrl) {
  throw new Error('Usage: bun scripts/contact-card-layout-check.ts <base-url>');
}

const session = `contact-card-layout-${process.pid}`;
const viewports = [
  [1024, 768],
  [960, 540],
  [320, 480],
  [320, 568],
  [375, 667],
  [390, 844],
  [430, 932],
  [480, 320],
  [568, 320],
  [844, 390],
  [640, 560],
  [768, 927],
  [768, 928],
  [1024, 927],
  [1024, 928],
  [768, 1024],
  [1280, 900],
  [1440, 1080],
];

function browser(...args: string[]) {
  const result = Bun.spawnSync(
    ['agent-browser', '--session', session, '--json', ...args],
    { stdout: 'pipe', stderr: 'pipe' },
  );
  const response = JSON.parse(result.stdout.toString());

  if (result.exitCode !== 0 || !response.success) {
    throw new Error(response.error ?? result.stderr.toString());
  }

  return response.data;
}

try {
  browser('open', new URL('/contact/crystelle/', baseUrl).href);

  for (const [width, height] of viewports) {
    browser('set', 'viewport', String(width), String(height));
    const { result } = browser(
      'eval',
      `(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(image => image.decode()));
        await Promise.all(document.getAnimations().map(animation => animation.finished));
        const root = document.documentElement;
        const links = [...document.querySelectorAll('main a')];
        const failures = [];
        if (root.scrollWidth > innerWidth || root.scrollHeight > innerHeight) {
          failures.push('document overflows the viewport');
        }
        for (const link of links) {
          const box = link.getBoundingClientRect();
          if (box.width < 44 || box.height < 44) failures.push('target below 44px');
          if (box.left < 0 || box.top < 0 || box.right > innerWidth || box.bottom > innerHeight) {
            failures.push(link.textContent.trim() + ' is outside the viewport');
          }
        }
        if (links.length !== 6) failures.push('expected all six contact and action links');
        return {
          viewport: [innerWidth, innerHeight],
          document: [root.scrollWidth, root.scrollHeight],
          failures,
        };
      })()`,
    );
    console.log(JSON.stringify(result));
    if (result.failures.length) throw new Error('Contact card layout failed');
  }
} finally {
  browser('close');
}
