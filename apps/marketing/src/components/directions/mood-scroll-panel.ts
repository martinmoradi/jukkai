// Dev tweak panel for the /directions/mood-scroll/ comp. Toggled with "D".
//
// Writes straight into the shared config object; the render loop reads the
// config every frame, so every edit is live. "Copier JSON" dumps the current
// state so a good tuning session survives the tab.

import type { MoodScrollConfig, ProjectsVariant } from './mood-scroll-config';

export interface MoodPanelClasses {
  panel: string;
  hidden: string;
  title: string;
  group: string;
  groupTitle: string;
  row: string;
  value: string;
  copy: string;
}

interface SliderSpec {
  key:
    | 'blobRadius'
    | 'blobRadiusRatio'
    | 'blobStrength'
    | 'blobRoundness'
    | 'noiseStrength'
    | 'driftSpeed'
    | 'velocityInfluence';
  label: string;
  min: number;
  max: number;
  step: number;
}

const SLIDERS: SliderSpec[] = [
  { key: 'blobRadius', label: 'blob radius', min: 0.2, max: 1.3, step: 0.01 },
  {
    key: 'blobRadiusRatio',
    label: 'blob 2 ratio',
    min: 0.3,
    max: 1,
    step: 0.01,
  },
  { key: 'blobStrength', label: 'blob strength', min: 0, max: 1.5, step: 0.01 },
  { key: 'blobRoundness', label: 'roundness', min: 0, max: 1, step: 0.05 },
  { key: 'noiseStrength', label: 'grain', min: 0, max: 0.2, step: 0.005 },
  { key: 'driftSpeed', label: 'drift speed', min: 0, max: 1, step: 0.01 },
  {
    key: 'velocityInfluence',
    label: 'velocity lift',
    min: 0,
    max: 2,
    step: 0.05,
  },
];

const MOOD_LABELS: Array<[keyof MoodScrollConfig['moods'], string]> = [
  ['hero', 'hero (orange)'],
  ['umbrella', 'umbrella (lavande)'],
  ['projectsBlue', 'projets — variante bleue'],
  ['projectsAubergine', 'projets — variante aubergine'],
  ['artShop', 'art shop (magenta)'],
  ['finale', 'finale (settle)'],
];

export function initMoodPanel(
  config: MoodScrollConfig,
  classes: MoodPanelClasses,
): HTMLElement {
  const panel = document.createElement('aside');
  panel.className = `${classes.panel} ${classes.hidden}`;
  panel.setAttribute('aria-label', 'Réglages du fond (dev)');

  const title = document.createElement('p');
  title.className = classes.title;
  title.textContent = 'mood-scroll — D pour fermer';
  panel.append(title);

  // Projects variant switch.
  const variantGroup = group(panel, classes, 'variante projets');
  for (const variant of ['blue', 'aubergine'] as ProjectsVariant[]) {
    const row = document.createElement('label');
    row.className = classes.row;
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'mood-projects-variant';
    input.checked = config.projectsVariant === variant;
    input.addEventListener('change', () => {
      config.projectsVariant = variant;
    });
    row.append(input, document.createTextNode(` ${variant}`));
    variantGroup.append(row);
  }

  // Global sliders.
  const globalGroup = group(panel, classes, 'globaux');
  for (const spec of SLIDERS) {
    const row = document.createElement('label');
    row.className = classes.row;
    const text = document.createElement('span');
    text.textContent = spec.label;
    const value = document.createElement('span');
    value.className = classes.value;
    value.textContent = String(config[spec.key]);
    const input = document.createElement('input');
    input.type = 'range';
    input.min = String(spec.min);
    input.max = String(spec.max);
    input.step = String(spec.step);
    input.value = String(config[spec.key]);
    input.addEventListener('input', () => {
      config[spec.key] = Number.parseFloat(input.value);
      value.textContent = input.value;
    });
    row.append(text, input, value);
    globalGroup.append(row);
  }

  // Per-mood colors.
  for (const [key, label] of MOOD_LABELS) {
    const moodGroup = group(panel, classes, label);
    const mood = config.moods[key];
    for (const channel of ['ground', 'blob1', 'blob2'] as const) {
      const row = document.createElement('label');
      row.className = classes.row;
      const text = document.createElement('span');
      text.textContent = channel;
      const input = document.createElement('input');
      input.type = 'color';
      input.value = mood[channel];
      input.addEventListener('input', () => {
        mood[channel] = input.value;
      });
      row.append(text, input);
      moodGroup.append(row);
    }
  }

  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = classes.copy;
  copy.textContent = 'Copier JSON';
  copy.addEventListener('click', () => {
    void navigator.clipboard
      .writeText(JSON.stringify(config, null, 2))
      .then(() => {
        copy.textContent = 'Copié ✓';
        window.setTimeout(() => {
          copy.textContent = 'Copier JSON';
        }, 1200);
      });
  });
  panel.append(copy);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'd' && event.key !== 'D') return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const active = document.activeElement;
    if (
      active instanceof HTMLInputElement ||
      active instanceof HTMLTextAreaElement
    ) {
      return;
    }
    panel.classList.toggle(classes.hidden);
  });

  document.body.append(panel);
  return panel;
}

function group(
  panel: HTMLElement,
  classes: MoodPanelClasses,
  label: string,
): HTMLElement {
  const section = document.createElement('section');
  section.className = classes.group;
  const heading = document.createElement('p');
  heading.className = classes.groupTitle;
  heading.textContent = label;
  section.append(heading);
  panel.append(section);
  return section;
}
