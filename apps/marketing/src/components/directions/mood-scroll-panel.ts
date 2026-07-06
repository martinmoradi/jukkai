// Dev tweak panel for the /directions/mood-scroll/ comp. Toggled with "D".
//
// Writes straight into the shared scene config object; the render loop reads
// the config every frame, so every edit is live. JSON actions are dev-server
// backed so good tuning sessions are saved inside the repo worktree.

import '@melloware/coloris/dist/coloris.css';

import Coloris from '@melloware/coloris';

import {
  applyMoodScrollConfig,
  cloneMoodScrollConfig,
  MOOD_ENTER_EASES,
  MOOD_FIELD_COLOR_CHANNELS,
  MOOD_SCROLL_STRUCTURE_CHANGE_EVENT,
  type MoodFieldColorChannel,
  type MoodFieldNumberChannel,
  type MoodScrollConfig,
  normalizeHexColor,
  sortMoodSceneStops,
} from './mood-scroll-config';
import type { MoodScrollDevTools } from './mood-scroll-motion';
import type {
  MoodTunableHandle,
  MoodTunableRegistry,
} from './mood-scroll-tunables';

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
  groupHeader: string;
  groupTitle: string;
  groupToggle: string;
  groupBody: string;
  row: string;
  value: string;
  colorInput: string;
  actions: string;
  button: string;
  presetList: string;
  presetListItem: string;
  status: string;
}

interface NumberSliderSpec<Key extends string> {
  key: Key;
  label: string;
  min: number;
  max: number;
  step: number;
}

interface PresetListItem {
  name: string;
  updatedAt: string;
}

const GLOBAL_SLIDERS: Array<
  NumberSliderSpec<'colorSmoothing' | 'velocityInfluence'>
> = [
  {
    key: 'colorSmoothing',
    label: 'color smoothing',
    min: 0.02,
    max: 0.5,
    step: 0.01,
  },
  {
    key: 'velocityInfluence',
    label: 'velocity lift',
    min: 0,
    max: 2,
    step: 0.05,
  },
];

const STOP_SLIDERS: Array<NumberSliderSpec<MoodFieldNumberChannel>> = [
  { key: 'radius', label: 'radius', min: 0.2, max: 1.3, step: 0.01 },
  { key: 'radiusRatio', label: 'blob 2 ratio', min: 0.3, max: 1, step: 0.01 },
  { key: 'strength', label: 'strength', min: 0, max: 1.5, step: 0.01 },
  { key: 'roundness', label: 'roundness', min: 0, max: 1, step: 0.05 },
  { key: 'noise', label: 'grain', min: 0, max: 0.2, step: 0.005 },
  { key: 'drift', label: 'drift', min: 0, max: 1, step: 0.01 },
  { key: 'presence', label: 'presence', min: 0, max: 1, step: 0.01 },
];

const CHANNEL_LABELS: Record<MoodFieldColorChannel, string> = {
  ground: 'ground',
  blob1: 'blob 1',
  blob2: 'blob 2',
};

const PRESET_API = '/__mood-scroll-presets';
const PRESET_NAME_PATTERN =
  /^(\d{2}-\d{4})(?:-([a-z0-9]+(?:-[a-z0-9]+)*))?\.json$/;
let nextGroupId = 0;

export function initMoodPanel(
  config: MoodScrollConfig,
  tunables: MoodTunableRegistry,
  classes: MoodPanelClasses,
  devTools?: MoodScrollDevTools,
): HTMLElement {
  const panel = document.createElement('aside');
  panel.className = `${classes.panel} ${classes.hidden}`;
  panel.setAttribute('aria-label', 'Mood background dev settings');

  const presetState: { fileName: string | null } = { fileName: null };
  let syncControls: Array<() => void> = [];
  let colorInputs: HTMLInputElement[] = [];

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
  const notifyStructureChange = () => {
    window.dispatchEvent(new CustomEvent(MOOD_SCROLL_STRUCTURE_CHANGE_EVENT));
  };

  const title = document.createElement('div');
  title.className = classes.title;
  panel.append(title);

  const controlsRoot = document.createElement('div');
  const presetList = document.createElement('div');
  presetList.className = `${classes.presetList} ${classes.hidden}`;

  const mountColoris = () => {
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
  };

  const renderControls = () => {
    syncControls = [];
    colorInputs = [];
    controlsRoot.replaceChildren();

    const globalGroup = group(controlsRoot, classes, 'global');
    for (const spec of GLOBAL_SLIDERS) {
      addNumberSlider(globalGroup, classes, spec, {
        get: () => config[spec.key],
        set: (value) => {
          config[spec.key] = value;
        },
      });
    }

    if (devTools) {
      const toolsGroup = group(controlsRoot, classes, 'tools');
      addCheckbox(toolsGroup, classes, 'markers', {
        get: () => devTools.markersEnabled(),
        set: (value) => {
          const result = devTools.setMarkers(value);
          if (result.message) setStatus(result.message);
        },
      });
      addCheckbox(toolsGroup, classes, 'GSDevTools', {
        get: () => devTools.gsDevToolsEnabled(),
        set: (value, sync) => {
          void devTools.setGsDevTools(value).then((result) => {
            if (result.message) setStatus(result.message);
            sync();
          });
        },
      });
    }

    const entries = tunables.entries();
    if (entries.length > 0) {
      const tunableGroup = group(controlsRoot, classes, 'tunables');
      for (const handle of entries) {
        addTunableSlider(tunableGroup, classes, handle);
      }
    }

    for (const scene of config.scenes) {
      const sceneGroup = group(controlsRoot, classes, scene.label ?? scene.key);

      if (scene.enter.mechanism === 'crossfade') {
        addNumberSlider(
          sceneGroup,
          classes,
          {
            key: 'enterStart',
            label: 'enter start',
            min: 0,
            max: 1,
            step: 0.01,
          },
          {
            get: () =>
              scene.enter.mechanism === 'crossfade' ? scene.enter.band[0] : 0,
            set: (value) => {
              if (scene.enter.mechanism === 'crossfade') {
                scene.enter.band[0] = value;
                notifyStructureChange();
              }
            },
          },
        );
        addNumberSlider(
          sceneGroup,
          classes,
          { key: 'enterEnd', label: 'enter end', min: 0, max: 1, step: 0.01 },
          {
            get: () =>
              scene.enter.mechanism === 'crossfade' ? scene.enter.band[1] : 0,
            set: (value) => {
              if (scene.enter.mechanism === 'crossfade') {
                scene.enter.band[1] = value;
                notifyStructureChange();
              }
            },
          },
        );
        addSelect(
          sceneGroup,
          classes,
          {
            label: 'enter ease',
            options: MOOD_ENTER_EASES,
          },
          {
            get: () =>
              scene.enter.mechanism === 'crossfade' ? scene.enter.ease : 'none',
            set: (value) => {
              if (scene.enter.mechanism === 'crossfade') {
                scene.enter.ease = value;
                notifyStructureChange();
              }
            },
          },
        );
      }

      if (scene.enter.mechanism === 'cut') {
        addNumberSlider(
          sceneGroup,
          classes,
          { key: 'cutLine', label: 'cut line', min: 0, max: 1, step: 0.01 },
          {
            get: () => (scene.enter.mechanism === 'cut' ? scene.enter.at : 0),
            set: (value) => {
              if (scene.enter.mechanism === 'cut') {
                scene.enter.at = value;
                notifyStructureChange();
              }
            },
          },
        );
      }

      for (const stop of scene.stops) {
        addNumberSlider(
          sceneGroup,
          classes,
          { key: 'at', label: `stop ${stop.at}`, min: 0, max: 1, step: 0.01 },
          {
            get: () => stop.at,
            set: (value) => {
              stop.at = value;
              sortMoodSceneStops(scene);
            },
          },
        );

        for (const channel of MOOD_FIELD_COLOR_CHANNELS) {
          addColorInput(sceneGroup, classes, {
            label: `${stop.at} ${CHANNEL_LABELS[channel]}`,
            get: () => stop[channel],
            set: (value) => {
              stop[channel] = value;
            },
          });
        }

        for (const spec of STOP_SLIDERS) {
          addNumberSlider(sceneGroup, classes, spec, {
            get: () => stop[spec.key],
            set: (value) => {
              stop[spec.key] = value;
            },
          });
        }
      }
    }

    syncControls.push(...collectInputSyncs(controlsRoot));
  };

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
  renderControls();

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
      const result = loadJsonConfig(config, text, tunables);
      if (!result.ok) {
        setStatus(result.message);
        return;
      }

      presetState.fileName = fileName;
      renderControls();
      mountColoris();
      syncAll();
      notifyStructureChange();
      renderPresetHeader();
      presetList.classList.add(classes.hidden);
      setStatus(`Loaded ${fileName}`);
    } catch (error) {
      setStatus(errorMessage(error, 'Could not load JSON'));
    }
  };

  actions.append(save, load);
  panel.append(controlsRoot, actions, presetList, status);

  document.body.append(panel);

  Coloris.init();
  mountColoris();

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

function addNumberSlider<Key extends string>(
  parent: HTMLElement,
  classes: Pick<MoodPanelClasses, 'row' | 'value'>,
  spec: NumberSliderSpec<Key>,
  binding: {
    get: () => number;
    set: (value: number) => void;
  },
): void {
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
  input.dataset.syncNumber = 'true';

  const sync = () => {
    input.value = String(binding.get());
    value.textContent = input.value;
  };
  input.addEventListener('input', () => {
    binding.set(Number.parseFloat(input.value));
    value.textContent = input.value;
  });
  row.append(text, input, value);
  parent.append(row);
  sync();
  input.addEventListener('mood-scroll-sync', sync);
}

function addSelect<Value extends string>(
  parent: HTMLElement,
  classes: Pick<MoodPanelClasses, 'row'>,
  spec: {
    label: string;
    options: readonly Value[];
  },
  binding: {
    get: () => Value;
    set: (value: Value) => void;
  },
): void {
  const row = document.createElement('label');
  row.className = classes.row;
  const text = document.createElement('span');
  text.textContent = spec.label;
  const input = document.createElement('select');
  input.dataset.syncSelect = 'true';
  for (const optionValue of spec.options) {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionValue;
    input.append(option);
  }

  const sync = () => {
    input.value = binding.get();
  };
  input.addEventListener('change', () => {
    binding.set(input.value as Value);
  });
  row.append(text, input);
  parent.append(row);
  sync();
  input.addEventListener('mood-scroll-sync', sync);
}

function addCheckbox(
  parent: HTMLElement,
  classes: Pick<MoodPanelClasses, 'row'>,
  label: string,
  binding: {
    get: () => boolean;
    set: (value: boolean, sync: () => void) => void;
  },
): void {
  const row = document.createElement('label');
  row.className = classes.row;
  const text = document.createElement('span');
  text.textContent = label;
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.dataset.syncCheckbox = 'true';

  const sync = () => {
    input.checked = binding.get();
  };
  input.addEventListener('change', () => {
    binding.set(input.checked, sync);
  });
  row.append(text, input);
  parent.append(row);
  sync();
  input.addEventListener('mood-scroll-sync', sync);
}

function addTunableSlider(
  parent: HTMLElement,
  classes: Pick<MoodPanelClasses, 'row' | 'value'>,
  handle: MoodTunableHandle,
): void {
  addNumberSlider(
    parent,
    classes,
    {
      key: handle.id,
      label: handle.label,
      min: handle.min,
      max: handle.max,
      step: handle.step,
    },
    {
      get: () => handle.get(),
      set: (value) => {
        handle.set(value);
      },
    },
  );
}

function addColorInput(
  parent: HTMLElement,
  classes: Pick<MoodPanelClasses, 'row' | 'colorInput'>,
  binding: {
    label: string;
    get: () => string;
    set: (value: string) => void;
  },
): void {
  const row = document.createElement('label');
  row.className = classes.row;
  const text = document.createElement('span');
  text.textContent = binding.label;
  const input = document.createElement('input');
  input.type = 'text';
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.inputMode = 'text';
  input.className = classes.colorInput;
  input.setAttribute('data-coloris', '');
  input.setAttribute('aria-label', binding.label);
  input.dataset.syncColor = 'true';
  input.addEventListener('input', () => {
    const next = normalizeHexColor(input.value);
    if (next) binding.set(next);
  });
  input.addEventListener('change', () => {
    commitColorInput(input, binding);
  });
  row.append(text, input);
  parent.append(row);
  input.value = binding.get();
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function collectInputSyncs(root: HTMLElement): Array<() => void> {
  return [
    ...Array.from(
      root.querySelectorAll<HTMLInputElement>('[data-sync-number]'),
    ).map((input) => () => {
      input.dispatchEvent(new Event('mood-scroll-sync'));
    }),
    ...Array.from(
      root.querySelectorAll<HTMLInputElement>('[data-sync-color]'),
    ).map((input) => () => {
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }),
    ...Array.from(
      root.querySelectorAll<HTMLSelectElement>('[data-sync-select]'),
    ).map((input) => () => {
      input.dispatchEvent(new Event('mood-scroll-sync'));
    }),
    ...Array.from(
      root.querySelectorAll<HTMLInputElement>('[data-sync-checkbox]'),
    ).map((input) => () => {
      input.dispatchEvent(new Event('mood-scroll-sync'));
    }),
  ];
}

function group(
  parent: HTMLElement,
  classes: MoodPanelClasses,
  label: string,
): HTMLElement {
  const section = document.createElement('section');
  section.className = classes.group;

  const bodyId = `mood-panel-group-${nextGroupId}`;
  nextGroupId += 1;

  const header = document.createElement('button');
  header.type = 'button';
  header.className = classes.groupHeader;
  header.setAttribute('aria-controls', bodyId);
  header.setAttribute('aria-expanded', 'true');

  const heading = document.createElement('span');
  heading.className = classes.groupTitle;
  heading.textContent = label;

  const toggle = document.createElement('span');
  toggle.className = classes.groupToggle;
  toggle.setAttribute('aria-hidden', 'true');
  toggle.textContent = '-';

  const body = document.createElement('div');
  body.id = bodyId;
  body.className = classes.groupBody;

  header.addEventListener('click', () => {
    const expanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', String(!expanded));
    body.hidden = expanded;
    toggle.textContent = expanded ? '+' : '-';
  });

  header.append(heading, toggle);
  section.append(header, body);
  parent.append(section);
  return body;
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
  tunables: MoodTunableRegistry,
): { ok: true } | { ok: false; message: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, message: 'Invalid JSON' };
  }

  if (!applyMoodScrollConfig(config, parsed, tunables)) {
    return { ok: false, message: 'No recognized mood-scroll settings' };
  }
  return { ok: true };
}

function commitColorInput(
  input: HTMLInputElement,
  binding: {
    get: () => string;
    set: (value: string) => void;
  },
): void {
  const next = normalizeHexColor(input.value);
  if (next) binding.set(next);
  input.value = binding.get();
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function collectSwatches(config: MoodScrollConfig): string[] {
  const colors = new Set<string>();
  for (const scene of config.scenes) {
    for (const stop of scene.stops) {
      for (const channel of MOOD_FIELD_COLOR_CHANNELS) {
        colors.add(stop[channel]);
      }
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
