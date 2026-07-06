// Dev tweak panel for the /directions/mood-scroll/ comp. Toggled with "D".
//
// Writes straight into the shared config object; the render loop reads the
// config every frame, so every edit is live. JSON actions exist only so a good
// tuning session can leave the tab and come back intact.

import '@melloware/coloris/dist/coloris.css';

import Coloris from '@melloware/coloris';

import {
  applyMoodScrollConfig,
  cloneMoodScrollConfig,
  MOOD_COLOR_CHANNELS,
  type MoodColorChannel,
  type MoodKey,
  type MoodScrollConfig,
  normalizeHexColor,
} from './mood-scroll-config';

export interface MoodPanelClasses {
  panel: string;
  hidden: string;
  title: string;
  group: string;
  groupTitle: string;
  row: string;
  value: string;
  colorInput: string;
  actions: string;
  copy: string;
  fileInput: string;
  status: string;
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

const MOOD_LABELS: Array<[MoodKey, string]> = [
  ['hero', 'hero (orange)'],
  ['umbrella', 'umbrella (lavender)'],
  ['projects', 'projects (blue)'],
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

  const syncControls: Array<() => void> = [];
  const colorInputs: HTMLInputElement[] = [];

  const title = document.createElement('p');
  title.className = classes.title;
  title.textContent = 'mood-scroll — D pour fermer';
  panel.append(title);

  // Global sliders.
  const globalGroup = group(panel, classes, 'global');
  for (const spec of SLIDERS) {
    const row = document.createElement('label');
    row.className = classes.row;
    const text = document.createElement('span');
    text.textContent = spec.label;
    const value = document.createElement('span');
    value.className = classes.value;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = String(spec.min);
    input.max = String(spec.max);
    input.step = String(spec.step);
    const sync = () => {
      input.value = String(config[spec.key]);
      value.textContent = input.value;
    };
    syncControls.push(sync);
    sync();
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
    for (const channel of MOOD_COLOR_CHANNELS) {
      const row = document.createElement('label');
      row.className = classes.row;
      const text = document.createElement('span');
      text.textContent = channel;
      const input = document.createElement('input');
      input.type = 'text';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.inputMode = 'text';
      input.className = classes.colorInput;
      input.setAttribute('data-coloris', '');
      input.setAttribute('aria-label', `${label} ${channel}`);
      const sync = () => {
        input.value = mood[channel];
        input.dispatchEvent(new Event('input', { bubbles: true }));
      };
      syncControls.push(sync);
      sync();
      input.addEventListener('input', () => {
        const next = normalizeHexColor(input.value);
        if (next) {
          mood[channel] = next;
        }
      });
      input.addEventListener('change', () => {
        commitColorInput(input, mood, channel);
      });
      colorInputs.push(input);
      row.append(text, input);
      moodGroup.append(row);
    }
  }

  const status = document.createElement('p');
  status.className = classes.status;
  status.setAttribute('role', 'status');

  let statusTimer: number | undefined;
  const setStatus = (message: string) => {
    status.textContent = message;
    if (statusTimer) window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      status.textContent = '';
    }, 2400);
  };

  const syncAll = () => {
    for (const sync of syncControls) sync();
  };

  const actions = document.createElement('div');
  actions.className = classes.actions;

  const copy = actionButton(classes, 'Copier JSON');
  copy.addEventListener('click', () => {
    void navigator.clipboard
      .writeText(serializeConfig(config))
      .then(() => {
        setStatus('JSON copié');
      })
      .catch(() => {
        setStatus('Copie impossible');
      });
  });

  const save = actionButton(classes, 'Exporter JSON');
  save.addEventListener('click', () => {
    saveJsonFile(serializeConfig(config));
    setStatus('JSON exporté');
  });

  const load = actionButton(classes, 'Charger JSON');
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json,.json';
  fileInput.className = classes.fileInput;
  load.addEventListener('click', () => {
    fileInput.click();
  });
  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    void file
      .text()
      .then((text) => {
        const result = loadJsonConfig(config, text);
        if (result.ok) {
          syncAll();
          setStatus(`${file.name} chargé`);
        } else {
          setStatus(result.message);
        }
      })
      .catch(() => {
        setStatus('Lecture impossible');
      })
      .finally(() => {
        fileInput.value = '';
      });
  });

  actions.append(copy, save, load, fileInput);
  panel.append(actions, status);

  document.body.append(panel);

  Coloris.init();
  Coloris({
    el: colorInputs,
    parent: panel,
    theme: 'polaroid',
    themeMode: 'dark',
    alpha: false,
    format: 'hex',
    formatToggle: false,
    closeButton: true,
    closeLabel: 'OK',
    margin: 8,
    swatches: collectSwatches(config),
  });

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
    Coloris.updatePosition();
  });

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

function actionButton(
  classes: Pick<MoodPanelClasses, 'copy'>,
  label: string,
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = classes.copy;
  button.textContent = label;
  return button;
}

function serializeConfig(config: MoodScrollConfig): string {
  return JSON.stringify(cloneMoodScrollConfig(config), null, 2);
}

function saveJsonFile(json: string): void {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  link.href = url;
  link.download = `mood-scroll-${stamp}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function loadJsonConfig(
  config: MoodScrollConfig,
  text: string,
): { ok: true } | { ok: false; message: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, message: 'JSON invalide' };
  }

  if (!applyMoodScrollConfig(config, parsed)) {
    return { ok: false, message: 'Aucun réglage reconnu' };
  }
  return { ok: true };
}

function commitColorInput(
  input: HTMLInputElement,
  mood: Record<MoodColorChannel, string>,
  channel: MoodColorChannel,
): void {
  const next = normalizeHexColor(input.value);
  if (next) {
    mood[channel] = next;
  }
  input.value = mood[channel];
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function collectSwatches(config: MoodScrollConfig): string[] {
  const colors = new Set<string>();
  for (const [, mood] of Object.entries(config.moods)) {
    for (const channel of MOOD_COLOR_CHANNELS) {
      colors.add(mood[channel]);
    }
  }
  return [...colors];
}
