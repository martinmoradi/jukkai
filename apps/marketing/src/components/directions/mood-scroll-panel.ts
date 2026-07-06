// Dev tweak panel for the /directions/mood-scroll/ comp. Toggled with "D".
//
// Writes straight into the shared config object; the render loop reads the
// config every frame, so every edit is live. JSON actions are dev-server
// backed so good tuning sessions are saved inside the repo worktree.

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
  presetButton: string;
  titleHint: string;
  rename: string;
  renameStamp: string;
  renameInput: string;
  group: string;
  groupTitle: string;
  row: string;
  value: string;
  colorInput: string;
  actions: string;
  button: string;
  presetList: string;
  presetListItem: string;
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

interface PresetListItem {
  name: string;
  updatedAt: string;
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

const CHANNEL_LABELS: Record<MoodColorChannel, string> = {
  ground: 'ground',
  blob1: 'blob 1',
  blob2: 'blob 2',
};

const PRESET_API = '/__mood-scroll-presets';
const PRESET_NAME_PATTERN =
  /^(\d{2}-\d{4})(?:-([a-z0-9]+(?:-[a-z0-9]+)*))?\.json$/;

export function initMoodPanel(
  config: MoodScrollConfig,
  classes: MoodPanelClasses,
): HTMLElement {
  const panel = document.createElement('aside');
  panel.className = `${classes.panel} ${classes.hidden}`;
  panel.setAttribute('aria-label', 'Mood background dev settings');

  const syncControls: Array<() => void> = [];
  const colorInputs: HTMLInputElement[] = [];
  const presetState: { fileName: string | null } = { fileName: null };

  const status = document.createElement('p');
  status.className = classes.status;
  status.setAttribute('role', 'status');

  let statusTimer: number | undefined;
  const setStatus = (message: string) => {
    status.textContent = message;
    if (statusTimer) window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      status.textContent = '';
    }, 2800);
  };

  const syncAll = () => {
    for (const sync of syncControls) sync();
  };

  const title = document.createElement('div');
  title.className = classes.title;
  panel.append(title);

  const presetList = document.createElement('div');
  presetList.className = `${classes.presetList} ${classes.hidden}`;

  const saveCurrentPreset = async (): Promise<boolean> => {
    try {
      const result = await savePresetFile(config, presetState.fileName);
      presetState.fileName = result.fileName;
      renderPresetHeader();
      setStatus(`Saved ${result.fileName}`);
      return true;
    } catch (error) {
      setStatus(errorMessage(error, 'Could not save JSON'));
      return false;
    }
  };

  const beginRename = () => {
    if (presetState.fileName) {
      renderPresetHeader(true);
      return;
    }

    void saveCurrentPreset().then((saved) => {
      if (saved) renderPresetHeader(true);
    });
  };

  const renderPresetHeader = (editing = false) => {
    title.replaceChildren();

    if (editing && presetState.fileName) {
      const parsed = parsePresetFileName(presetState.fileName);
      if (!parsed) {
        renderPresetHeader();
        return;
      }

      const label = document.createElement('label');
      label.className = classes.rename;
      const stamp = document.createElement('span');
      stamp.className = classes.renameStamp;
      stamp.textContent = `mood-scroll / ${parsed.stamp}-`;
      const input = document.createElement('input');
      input.className = classes.renameInput;
      input.type = 'text';
      input.value = parsed.slug;
      input.placeholder = 'slug';
      input.autocomplete = 'off';
      input.spellcheck = false;

      let finished = false;
      const finish = (shouldCommit: boolean) => {
        if (finished) return;
        finished = true;
        if (!shouldCommit) {
          renderPresetHeader();
          return;
        }

        const slug = sanitizePresetSlug(input.value);
        if (slug === parsed.slug || !presetState.fileName) {
          renderPresetHeader();
          return;
        }

        void renamePresetFile(presetState.fileName, slug)
          .then((result) => {
            presetState.fileName = result.fileName;
            setStatus(`Renamed ${result.fileName}`);
          })
          .catch((error) => {
            setStatus(errorMessage(error, 'Could not rename JSON'));
          })
          .finally(() => {
            renderPresetHeader();
          });
      };

      input.addEventListener('blur', () => {
        finish(true);
      });
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          input.blur();
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          finish(false);
        }
      });

      label.append(stamp, input);
      title.append(label);
      window.setTimeout(() => {
        input.focus();
        input.select();
      }, 0);
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = classes.presetButton;
    button.textContent = `mood-scroll / ${presetDisplayName(
      presetState.fileName,
    )}`;
    button.title = 'Click to rename the saved JSON suffix';
    button.addEventListener('click', beginRename);

    const hint = document.createElement('span');
    hint.className = classes.titleHint;
    hint.textContent = 'D to close';
    title.append(button, hint);
  };

  renderPresetHeader();

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
      text.textContent = CHANNEL_LABELS[channel];
      const input = document.createElement('input');
      input.type = 'text';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.inputMode = 'text';
      input.className = classes.colorInput;
      input.setAttribute('data-coloris', '');
      input.setAttribute('aria-label', `${label} ${CHANNEL_LABELS[channel]}`);
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

  const actions = document.createElement('div');
  actions.className = classes.actions;

  const save = actionButton(classes, 'Save JSON');
  save.addEventListener('click', () => {
    void saveCurrentPreset();
  });

  const load = actionButton(classes, 'Load JSON');
  load.addEventListener('click', () => {
    presetList.classList.toggle(classes.hidden);
    if (!presetList.classList.contains(classes.hidden)) {
      void refreshPresetList();
    }
  });

  const refreshPresetList = async () => {
    presetList.textContent = 'Loading saved JSON...';
    try {
      renderPresetList(await listPresetFiles());
    } catch (error) {
      presetList.textContent = errorMessage(error, 'Could not read presets');
    }
  };

  const renderPresetList = (presets: PresetListItem[]) => {
    presetList.replaceChildren();
    if (presets.length === 0) {
      presetList.textContent = 'No saved JSON yet.';
      return;
    }

    for (const preset of presets) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = classes.presetListItem;
      button.textContent = presetDisplayName(preset.name);
      button.title = `Updated ${new Date(preset.updatedAt).toLocaleString()}`;
      button.addEventListener('click', () => {
        void loadPresetFile(preset.name);
      });
      presetList.append(button);
    }
  };

  const loadPresetFile = async (fileName: string) => {
    try {
      const text = await readPresetFile(fileName);
      const result = loadJsonConfig(config, text);
      if (!result.ok) {
        setStatus(result.message);
        return;
      }

      presetState.fileName = fileName;
      syncAll();
      renderPresetHeader();
      presetList.classList.add(classes.hidden);
      setStatus(`Loaded ${fileName}`);
    } catch (error) {
      setStatus(errorMessage(error, 'Could not load JSON'));
    }
  };

  actions.append(save, load);
  panel.append(actions, presetList, status);

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
  classes: Pick<MoodPanelClasses, 'button'>,
  label: string,
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = classes.button;
  button.textContent = label;
  return button;
}

function loadJsonConfig(
  config: MoodScrollConfig,
  text: string,
): { ok: true } | { ok: false; message: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, message: 'Invalid JSON' };
  }

  if (!applyMoodScrollConfig(config, parsed)) {
    return { ok: false, message: 'No recognized mood-scroll settings' };
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

async function listPresetFiles(): Promise<PresetListItem[]> {
  const response = await requestPreset<{ presets: PresetListItem[] }>('/');
  return response.presets;
}

async function savePresetFile(
  config: MoodScrollConfig,
  fileName: string | null,
): Promise<{ fileName: string }> {
  return requestPreset('/save', {
    body: JSON.stringify({
      config: cloneMoodScrollConfig(config),
      fileName,
    }),
    method: 'POST',
  });
}

async function renamePresetFile(
  fileName: string,
  slug: string,
): Promise<{ fileName: string }> {
  return requestPreset('/rename', {
    body: JSON.stringify({ fileName, slug }),
    method: 'POST',
  });
}

async function readPresetFile(fileName: string): Promise<string> {
  const response = await fetch(
    `${PRESET_API}/load?fileName=${encodeURIComponent(fileName)}`,
  );
  if (!response.ok) throw new Error(await responseMessage(response));
  return response.text();
}

async function requestPreset<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${PRESET_API}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...init.headers,
    },
  });
  if (!response.ok) throw new Error(await responseMessage(response));
  return response.json() as Promise<T>;
}

async function responseMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: unknown };
    if (typeof body.message === 'string') return body.message;
  } catch {
    // Fall through to the status text.
  }
  return response.statusText || 'Preset request failed';
}

function presetDisplayName(fileName: string | null): string {
  return fileName ? fileName.replace(/\.json$/, '') : 'default';
}

function parsePresetFileName(
  fileName: string,
): { stamp: string; slug: string } | null {
  const match = fileName.match(PRESET_NAME_PATTERN);
  if (!match) return null;
  return { stamp: match[1], slug: match[2] ?? '' };
}

function sanitizePresetSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
    .replace(/-+$/g, '');
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}
