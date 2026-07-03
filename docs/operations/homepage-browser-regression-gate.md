# Homepage Browser Regression Gate

Use this gate for every Full Website homepage visual slice before asking for a
human taste review. It is a local evidence contract, not a CI replacement. The
goal is to prove that `/` still holds its layout, semantic landmarks, reduced
motion fallback, browser health, and basic performance after a visual change.

Run it with `agent-browser`. Do not use the Codex in-app browser for this gate.

## Evidence To Attach

Every homepage visual PR should call out these artifacts or paste the relevant
text output:

- Desktop viewport screenshot of `/`.
- Mobile viewport screenshot of `/`.
- Full-page screenshot of `/`.
- Reduced-motion screenshot of `/`.
- `agent-browser snapshot -i -c` output, with notes for the visible H1, primary
  CTA, and key navigation or proof content when those surfaces exist.
- `agent-browser eval --stdin` output for the JavaScript invariants below.
- `agent-browser errors` output.
- `agent-browser vitals <url> --json` output.

If a surface does not exist in the current slice, say that directly in the PR.
Do not silently omit the check.

## Local Server

Start your own marketing dev server on an owned non-default port. State the URL
in your PR notes and clean up the process when the run is finished.

```bash
PORT=4327
URL="http://127.0.0.1:${PORT}/"
SESSION="$(agent-browser session id --scope worktree --prefix jukkai-homepage-gate)"
EVIDENCE_DIR=".browser-evidence/homepage-$(date +%Y%m%d-%H%M%S)"

DEV_STATUS="$(bun run --cwd apps/marketing dev -- status)"
printf '%s\n' "${DEV_STATUS}"
if ! printf '%s\n' "${DEV_STATUS}" | rg -q "No dev server is running"; then
  echo "Astro already has a background dev server for this project."
  echo "Stop it only if it is yours: bun run --cwd apps/marketing dev -- stop"
  exit 1
fi

if ss -ltnp | rg -q ":${PORT}\\b"; then
  echo "Port ${PORT} is already bound. Choose another non-default port."
  exit 1
fi

mkdir -p "${EVIDENCE_DIR}"
bun run --cwd apps/marketing dev -- --port "${PORT}" > "${EVIDENCE_DIR}/dev-server.log" 2>&1 &
SERVER_PID=$!

cleanup() {
  bun run --cwd apps/marketing dev -- stop >/dev/null 2>&1 || true
  kill "${SERVER_PID}" 2>/dev/null || true
  agent-browser close --session "${SESSION}" 2>/dev/null || true
}
trap cleanup EXIT
```

Astro allows one background dev server per project. If `status` reports a server
you do not own, do not stop it. Coordinate first, then rerun the gate from a clean
status. The cleanup trap calls `dev -- stop` because Astro owns the long-running
background server after startup. Leave that shell open while you run the gate
commands below. If you split the work across shells, export the same `PORT`,
`URL`, `SESSION`, and `EVIDENCE_DIR` values before running the browser commands.

## Screenshots

Capture the same page at the required visual states.

```bash
agent-browser --session "${SESSION}" open "${URL}"
agent-browser --session "${SESSION}" wait --load networkidle

agent-browser --session "${SESSION}" set viewport 1440 1000
agent-browser --session "${SESSION}" reload
agent-browser --session "${SESSION}" wait --load networkidle
agent-browser --session "${SESSION}" screenshot "${EVIDENCE_DIR}/desktop.png"

agent-browser --session "${SESSION}" set viewport 390 844
agent-browser --session "${SESSION}" reload
agent-browser --session "${SESSION}" wait --load networkidle
agent-browser --session "${SESSION}" screenshot "${EVIDENCE_DIR}/mobile.png"

agent-browser --session "${SESSION}" set viewport 1440 1000
agent-browser --session "${SESSION}" reload
agent-browser --session "${SESSION}" wait --load networkidle
agent-browser --session "${SESSION}" screenshot --full "${EVIDENCE_DIR}/full-page.png"

agent-browser --session "${SESSION}" set media light reduced-motion
agent-browser --session "${SESSION}" reload
agent-browser --session "${SESSION}" wait --load networkidle
agent-browser --session "${SESSION}" screenshot "${EVIDENCE_DIR}/reduced-motion.png"
```

The reduced-motion screenshot should show stable, reviewable content. If a later
slice adds animation, motion should stop, simplify, or complete immediately when
`prefers-reduced-motion: reduce` is active.

## Semantic Checks

Capture the compact interactive snapshot. In the PR, note whether it proves the
visible H1, primary CTA, navigation, and proof content. If static text is not
present in the interactive tree, add a scoped non-interactive snapshot for that
static surface and explain why.

```bash
agent-browser --session "${SESSION}" set media light
agent-browser --session "${SESSION}" set viewport 1440 1000
agent-browser --session "${SESSION}" reload
agent-browser --session "${SESSION}" wait --load networkidle

agent-browser --session "${SESSION}" snapshot -i -c > "${EVIDENCE_DIR}/snapshot-interactive.txt"
agent-browser --session "${SESSION}" snapshot -c -s main > "${EVIDENCE_DIR}/snapshot-main.txt"
```

Required semantic assertions:

- The page has one visible H1.
- The primary CTA is visible when the content matrix says one should exist.
- Navigation links are visible when the slice has navigation.
- Proof, trust, or portfolio content is visible when the slice has those
  sections.
- The snapshot does not expose duplicate labels, hidden placeholder content, or
  unrelated boilerplate as the main experience.

## JavaScript Invariants

Run the invariant script through `eval --stdin`. It fails the gate if the page
has horizontal overflow, an invisible hero, a missing H1, a missing CTA when a
CTA exists in the DOM, or reduced-motion emulation did not stick.

```bash
cat <<'EOF' | agent-browser --session "${SESSION}" eval --stdin > "${EVIDENCE_DIR}/invariants.json"
const doc = document.documentElement;
const body = document.body;
const main = document.querySelector("main");
const hero = document.querySelector("section");
const h1s = Array.from(document.querySelectorAll("h1"));
const ctas = Array.from(document.querySelectorAll("a[href], button")).filter((el) => {
  const text = (el.textContent || "").trim();
  const rect = el.getBoundingClientRect();
  return text.length > 0 && rect.width > 0 && rect.height > 0;
});
const heroRect = hero?.getBoundingClientRect();
const viewportWidth = window.innerWidth;
const scrollWidth = Math.max(doc.scrollWidth, body?.scrollWidth || 0);

const result = {
  url: window.location.href,
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  scrollWidth,
  horizontalOverflowPx: scrollWidth - viewportWidth,
  h1Count: h1s.length,
  visibleH1Text: h1s
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    })
    .map((el) => el.textContent.trim()),
  visibleCtas: ctas.map((el) => ({
    text: el.textContent.trim(),
    href: el instanceof HTMLAnchorElement ? el.href : null,
  })),
  main: main
    ? {
        width: main.getBoundingClientRect().width,
        height: main.getBoundingClientRect().height,
      }
    : null,
  hero: heroRect
    ? {
        width: heroRect.width,
        height: heroRect.height,
        top: heroRect.top,
        bottom: heroRect.bottom,
      }
    : null,
};

const failures = [];
if (result.horizontalOverflowPx > 1) failures.push("horizontal overflow");
if (result.h1Count !== 1) failures.push("expected exactly one h1");
if (result.visibleH1Text.length !== 1) failures.push("h1 is not visible");
if (!result.hero || result.hero.width < 320 || result.hero.height < 240) {
  failures.push("hero dimensions are not reviewable");
}
if (!result.main || result.main.height < 240) {
  failures.push("main content dimensions are not reviewable");
}

({ ...result, failures });
EOF
```

Review the JSON. `failures` must be empty unless the PR explicitly explains why
the current slice has a temporary, intentional exception.

Run the invariant script again after `agent-browser set media light
reduced-motion` and a reload. The second run must report `"reducedMotion": true`.

## Browser Errors And Vitals

Clear stale errors, reload once, then capture browser errors and Core Web Vitals.

```bash
agent-browser --session "${SESSION}" errors --clear
agent-browser --session "${SESSION}" reload
agent-browser --session "${SESSION}" wait --load networkidle
agent-browser --session "${SESSION}" errors > "${EVIDENCE_DIR}/errors.txt"
agent-browser --session "${SESSION}" vitals "${URL}" --json > "${EVIDENCE_DIR}/vitals.json"
```

The PR must call out any JavaScript errors, uncaught exceptions, failed resource
loads, poor vitals, or notable warnings. A clean run should say that errors were
empty and summarize the vitals numbers instead of only attaching the file.

## PR Note Template

```markdown
Homepage browser regression gate:

- URL: http://127.0.0.1:4327/
- Screenshots: desktop, mobile, full-page, reduced-motion captured in `.browser-evidence/...`
- Semantics: H1 present, primary CTA present or intentionally absent, navigation/proof surfaces present or intentionally absent
- JS invariants: pass, no horizontal overflow, visible hero dimensions
- Reduced motion: pass, `prefers-reduced-motion: reduce` active in second invariant run
- Browser errors: none, or list them
- Vitals: paste LCP, CLS, TTFB, FCP, INP from `vitals.json`
```
