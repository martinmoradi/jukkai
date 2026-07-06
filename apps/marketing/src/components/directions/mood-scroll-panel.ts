// Dev tweak panel for the /directions/mood-scroll/ comp. Toggled with "D".
//
// The panel mirrors the scene model: a jump row for instant travel, one
// collapsible group per scene (enter, stops, registered tunables), then a
// small global group. Writes go straight into the shared scene config object;
// the render loop reads the config every frame, so every edit is live. JSON
// actions are dev-server backed so good tuning sessions are saved inside the
// repo worktree.

import '@melloware/coloris/dist/coloris.css';

import Coloris from '@melloware/coloris';
import {
  Check,
  createElement as createIconElement,
  FolderOpen,
  GripVertical,
  type IconNode,
  RotateCcw,
  Save,
  Trash2,
  X,
} from 'lucide';

import {
  applyMoodScrollConfig,
  cloneMoodScrollConfig,
  MOOD_ENTER_EASES,
  MOOD_FIELD_COLOR_CHANNELS,
  MOOD_SCROLL_STRUCTURE_CHANGE_EVENT,
  type MoodFieldColorChannel,
  type MoodFieldNumberChannel,
  type MoodScene,
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
  dragHandle: string;
  presetButton: string;
  titleActions: string;
  titleAction: string;
  rename: string;
  renameStamp: string;
  renameInput: string;
  jumpRow: string;
  jumpScene: string;
  jumpButton: string;
  jumpStopButton: string;
  group: string;
  groupHeader: string;
  groupTitle: string;
  groupMeta: string;
  groupToggle: string;
  groupBody: string;
  subheading: string;
  row: string;
  value: string;
  colorInput: string;
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
const EXPANDED_STORAGE_KEY = 'jukkai:mood-scroll-panel:expanded';
let nextGroupId = 0;

interface GroupControl {
  header: HTMLButtonElement;
  body: HTMLElement;
  setExpanded(expanded: boolean): void;
}

export function initMoodPanel(
  config: MoodScrollConfig,
  tunables: MoodTunableRegistry,
  classes: MoodPanelClasses,
  devTools?: MoodScrollDevTools,
): HTMLElement {
  const panel = document.createElement('aside');
  panel.className = `${classes.panel} ${classes.hidden}`;
  panel.setAttribute('aria-label', 'Mood background dev settings');

  const defaultSnapshot = cloneMoodScrollConfig(config);
  const presetState: { fileName: string | null } = { fileName: null };
  const loadedSnapshot: { config: MoodScrollConfig } = {
    config: cloneMoodScrollConfig(config),
  };
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

  const jumpRoot = document.createElement('nav');
  jumpRoot.className = classes.jumpRow;
  jumpRoot.setAttribute('aria-label', 'Jump to scene');

  const controlsRoot = document.createElement('div');
  const presetList = document.createElement('div');
  presetList.className = `${classes.presetList} ${classes.hidden}`;
  panel.append(presetList);

  // Collapse memory: which groups are open survives reloads. First-ever open
  // falls back to expanding the scene currently in view.
  const storedExpanded = readExpandedState();
  const hadStoredState = storedExpanded !== null;
  const expandedState: Record<string, boolean> = storedExpanded ?? {};
  const persistExpanded = () => writeExpandedState(expandedState);

  const groupControls = new Map<string, GroupControl>();
  const jumpButtons = new Map<string, HTMLButtonElement>();

  const sceneSections = config.scenes
    .map((scene) => ({
      key: scene.key,
      el: document.querySelector(`[data-mood-section='${scene.key}']`),
    }))
    .filter((entry): entry is { key: string; el: Element } =>
      Boolean(entry.el),
    );

  let activeSceneKey: string | null = null;
  let autoExpanded = false;

  const computeActiveScene = (): string | null => {
    // The section covering the viewport midline wins; a pinned section keeps
    // covering it for its whole pin, which is exactly what we want.
    const mid = window.innerHeight / 2;
    let active = activeSceneKey ?? sceneSections[0]?.key ?? null;
    for (const { key, el } of sceneSections) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= mid && rect.bottom > mid) active = key;
    }
    return active;
  };

  const applyActiveHighlight = () => {
    for (const [key, button] of jumpButtons) {
      button.dataset.active = String(key === activeSceneKey);
    }
    for (const [key, control] of groupControls) {
      if (key === 'global') continue;
      control.header.dataset.active = String(key === activeSceneKey);
    }
  };

  const updateActiveScene = () => {
    const next = computeActiveScene();
    if (next === activeSceneKey) return;
    activeSceneKey = next;
    applyActiveHighlight();
  };

  let scrollFrame: number | null = null;
  const onViewportChange = () => {
    if (scrollFrame !== null) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = null;
      updateActiveScene();
    });
  };
  const startSceneTracking = () => {
    window.addEventListener('scroll', onViewportChange, { passive: true });
    window.addEventListener('resize', onViewportChange);
    updateActiveScene();
  };
  const stopSceneTracking = () => {
    window.removeEventListener('scroll', onViewportChange);
    window.removeEventListener('resize', onViewportChange);
    if (scrollFrame !== null) {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = null;
    }
  };

  const resetPanelPosition = () => {
    panel.style.removeProperty('top');
    panel.style.removeProperty('right');
    panel.style.removeProperty('bottom');
    panel.style.removeProperty('left');
  };

  const hidePanel = () => {
    panel.classList.add(classes.hidden);
    presetList.classList.add(classes.hidden);
    resetPanelPosition();
    stopSceneTracking();
  };

  const showPanel = () => {
    resetPanelPosition();
    panel.classList.remove(classes.hidden);
    Coloris.updatePosition();
    startSceneTracking();
    if (!autoExpanded && !hadStoredState) {
      autoExpanded = true;
      if (activeSceneKey) expandGroup(activeSceneKey);
    }
  };

  const expandGroup = (key: string) => {
    const control = groupControls.get(key);
    if (!control) return;
    control.setExpanded(true);
    expandedState[key] = true;
    persistExpanded();
  };

  const group = (key: string, label: string, meta?: string): HTMLElement => {
    const control = createGroup(controlsRoot, classes, {
      label,
      meta,
      expanded: expandedState[key] === true,
      onToggle: (expanded) => {
        expandedState[key] = expanded;
        persistExpanded();
      },
    });
    groupControls.set(key, control);
    return control.body;
  };

  const jumpToScene = (scene: MoodScene, stopAt: number) => {
    if (!devTools) return;
    const result = devTools.jumpTo(scene.key, stopAt);
    if (!result.ok) {
      if (result.message) setStatus(result.message);
      return;
    }
    expandGroup(scene.key);
  };

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

  const renderJumpRow = () => {
    jumpRoot.replaceChildren();
    jumpButtons.clear();
    if (!devTools) return;

    for (const [index, scene] of config.scenes.entries()) {
      const label = scenePanelLabel(scene, index);
      const cluster = document.createElement('div');
      cluster.className = classes.jumpScene;

      const sceneButton = document.createElement('button');
      sceneButton.type = 'button';
      sceneButton.className = classes.jumpButton;
      sceneButton.textContent = label;
      sceneButton.setAttribute('aria-label', `Jump to ${label}`);
      sceneButton.addEventListener('click', () => jumpToScene(scene, 0));
      jumpButtons.set(scene.key, sceneButton);
      cluster.append(sceneButton);

      if (scene.stops.length > 1) {
        for (const stop of scene.stops) {
          if (stop.at <= 0) continue;
          const stopButton = document.createElement('button');
          stopButton.type = 'button';
          stopButton.className = classes.jumpStopButton;
          stopButton.textContent = formatStopAt(stop.at);
          stopButton.setAttribute(
            'aria-label',
            `Jump to ${label} stop at ${formatStopAt(stop.at)}`,
          );
          stopButton.addEventListener('click', () => {
            jumpToScene(scene, stop.at);
          });
          cluster.append(stopButton);
        }
      }

      jumpRoot.append(cluster);
    }
  };

  const renderSceneGroup = (scene: MoodScene, index: number) => {
    const body = group(
      scene.key,
      scenePanelLabel(scene, index),
      sceneMeta(scene, index),
    );

    if (index > 0 && scene.enter.mechanism === 'crossfade') {
      subheading(body, classes, 'enter');
      addNumberSlider(
        body,
        classes,
        { key: 'enterStart', label: 'band start', min: 0, max: 1, step: 0.01 },
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
        body,
        classes,
        { key: 'enterEnd', label: 'band end', min: 0, max: 1, step: 0.01 },
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
        body,
        classes,
        { label: 'ease', options: MOOD_ENTER_EASES },
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

    if (index > 0 && scene.enter.mechanism === 'cut') {
      subheading(body, classes, 'enter');
      addNumberSlider(
        body,
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

    const multiStop = scene.stops.length > 1;
    for (const stop of scene.stops) {
      if (multiStop) {
        const heading = subheading(
          body,
          classes,
          `stop · ${formatStopAt(stop.at)}`,
        );
        addNumberSlider(
          body,
          classes,
          { key: 'at', label: 'at', min: 0, max: 1, step: 0.01 },
          {
            get: () => stop.at,
            set: (value) => {
              stop.at = value;
              sortMoodSceneStops(scene);
              heading.textContent = `stop · ${formatStopAt(stop.at)}`;
            },
            // Stop order and jump pills may be stale after a drag; rebuild
            // the controls once the drag commits.
            onCommit: () => rerenderControls(),
          },
        );
      }

      for (const channel of MOOD_FIELD_COLOR_CHANNELS) {
        addColorInput(body, classes, {
          label: CHANNEL_LABELS[channel],
          ariaLabel: multiStop
            ? `${scene.key} stop ${formatStopAt(stop.at)} ${CHANNEL_LABELS[channel]}`
            : `${scene.key} ${CHANNEL_LABELS[channel]}`,
          get: () => stop[channel],
          set: (value) => {
            stop[channel] = value;
          },
        });
      }

      for (const spec of STOP_SLIDERS) {
        addNumberSlider(body, classes, spec, {
          get: () => stop[spec.key],
          set: (value) => {
            stop[spec.key] = value;
          },
        });
      }
    }

    const sceneTunables = tunables
      .entries()
      .filter((handle) => handle.sceneKey === scene.key);
    if (sceneTunables.length > 0) {
      subheading(body, classes, 'tunables');
      for (const handle of sceneTunables) {
        addTunableSlider(body, classes, handle);
      }
    }
  };

  const renderGlobalGroup = () => {
    const body = group('global', 'global');
    for (const spec of GLOBAL_SLIDERS) {
      addNumberSlider(body, classes, spec, {
        get: () => config[spec.key],
        set: (value) => {
          config[spec.key] = value;
        },
      });
    }

    // Tunables whose id prefix matches no scene still get a home so they are
    // never invisible.
    const sceneKeys = new Set(config.scenes.map((scene) => scene.key));
    const orphanTunables = tunables
      .entries()
      .filter((handle) => !sceneKeys.has(handle.sceneKey));
    if (orphanTunables.length > 0) {
      subheading(body, classes, 'tunables');
      for (const handle of orphanTunables) {
        addTunableSlider(body, classes, handle);
      }
    }

    if (devTools) {
      subheading(body, classes, 'dev tools');
      addCheckbox(body, classes, 'markers', {
        get: () => devTools.markersEnabled(),
        set: (value) => {
          const result = devTools.setMarkers(value);
          if (result.message) setStatus(result.message);
        },
      });
      addCheckbox(body, classes, 'GSDevTools', {
        get: () => devTools.gsDevToolsEnabled(),
        set: (value, sync) => {
          void devTools.setGsDevTools(value).then((result) => {
            if (result.message) setStatus(result.message);
            sync();
          });
        },
      });
    }
  };

  const renderControls = () => {
    syncControls = [];
    groupControls.clear();
    controlsRoot.replaceChildren();

    renderJumpRow();
    renderGlobalGroup();
    config.scenes.forEach(renderSceneGroup);

    colorInputs = Array.from(
      controlsRoot.querySelectorAll<HTMLInputElement>('input[data-coloris]'),
    );
    syncControls.push(...collectInputSyncs(controlsRoot));
    applyActiveHighlight();
  };

  const rerenderControls = () => {
    renderControls();
    mountColoris();
    syncAll();
  };

  const isDirty = () =>
    JSON.stringify(cloneMoodScrollConfig(config)) !==
    JSON.stringify(loadedSnapshot.config);

  const resetUnsavedTweaks = () => {
    if (!isDirty()) {
      setStatus(`Already at ${presetHeaderLabel(presetState.fileName)}`);
      return;
    }

    applyMoodScrollConfig(config, loadedSnapshot.config, tunables);
    rerenderControls();
    notifyStructureChange();
    setStatus(`Reset to ${presetHeaderLabel(presetState.fileName)}`);
  };

  const saveCurrentPreset = async (): Promise<boolean> => {
    try {
      const result = await savePresetFile(config, presetState.fileName);
      presetState.fileName = result.fileName;
      loadedSnapshot.config = cloneMoodScrollConfig(config);
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

  const refreshPresetList = async () => {
    presetList.textContent = 'Loading saved JSON...';
    try {
      renderPresetList(await listPresetFiles());
    } catch (error) {
      presetList.textContent = errorMessage(error, 'Could not read presets');
    }
  };

  const togglePresetList = () => {
    presetList.classList.toggle(classes.hidden);
    if (!presetList.classList.contains(classes.hidden)) {
      void refreshPresetList();
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
      loadedSnapshot.config = cloneMoodScrollConfig(config);
      rerenderControls();
      notifyStructureChange();
      renderPresetHeader();
      presetList.classList.add(classes.hidden);
      setStatus(`Loaded ${fileName}`);
    } catch (error) {
      setStatus(errorMessage(error, 'Could not load JSON'));
    }
  };

  const deleteCurrentPreset = async (): Promise<boolean> => {
    if (!presetState.fileName) return false;
    const fileName = presetState.fileName;

    try {
      await deletePresetFile(fileName);
      presetState.fileName = null;
      loadedSnapshot.config = cloneMoodScrollConfig(defaultSnapshot);
      applyMoodScrollConfig(config, defaultSnapshot, tunables);
      rerenderControls();
      notifyStructureChange();
      renderPresetHeader();
      presetList.classList.add(classes.hidden);
      setStatus(`Deleted ${fileName}; restored default`);
      return true;
    } catch (error) {
      setStatus(errorMessage(error, 'Could not delete JSON'));
      return false;
    }
  };

  const renderHeaderActions = () =>
    createHeaderActions(classes, {
      onClose: hidePanel,
      onDelete: presetState.fileName
        ? () => {
            void deleteCurrentPreset();
          }
        : undefined,
      onLoad: togglePresetList,
      onReset: resetUnsavedTweaks,
      onSave: () => {
        void saveCurrentPreset();
      },
      setStatus,
    });

  const renderPresetHeader = (editing = false) => {
    title.replaceChildren();
    const dragHandle = createDragHandle(classes, panel);

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
      stamp.textContent = `${parsed.stamp}-`;
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
      title.append(dragHandle, label, renderHeaderActions());
      window.setTimeout(() => {
        input.focus();
        input.select();
      }, 0);
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = classes.presetButton;
    button.textContent = presetHeaderLabel(presetState.fileName);
    button.title = presetState.fileName
      ? `Click to rename ${presetState.fileName}`
      : 'Save JSON to name this preset';
    button.addEventListener('click', beginRename);

    title.append(dragHandle, button, renderHeaderActions());
  };

  renderPresetHeader();
  renderControls();

  panel.append(jumpRoot, controlsRoot, status);

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
    if (panel.classList.contains(classes.hidden)) showPanel();
    else hidePanel();
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
    onCommit?: () => void;
  },
): void {
  const row = document.createElement('label');
  row.className = classes.row;
  const text = document.createElement('span');
  text.textContent = spec.label;
  const value = document.createElement('input');
  value.type = 'number';
  value.className = classes.value;
  value.min = String(spec.min);
  value.max = String(spec.max);
  value.step = String(spec.step);
  value.inputMode = 'decimal';
  value.setAttribute('aria-label', `${spec.label} value`);
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(spec.min);
  input.max = String(spec.max);
  input.step = String(spec.step);
  input.dataset.syncNumber = 'true';

  const sync = () => {
    input.value = String(binding.get());
    value.value = formatPanelNumber(binding.get(), spec.step);
  };
  input.addEventListener('input', () => {
    binding.set(Number.parseFloat(input.value));
    value.value = formatPanelNumber(Number.parseFloat(input.value), spec.step);
  });
  if (binding.onCommit) {
    input.addEventListener('change', () => binding.onCommit?.());
  }
  value.addEventListener('change', () => {
    const next = parsePanelNumber(value.value, spec);
    if (next === null) {
      sync();
      return;
    }
    binding.set(next);
    input.value = String(next);
    value.value = formatPanelNumber(next, spec.step);
    binding.onCommit?.();
  });
  value.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      value.blur();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      sync();
      value.blur();
    }
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
      label: sceneScopedTunableLabel(handle),
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
    ariaLabel: string;
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
  input.setAttribute('aria-label', binding.ariaLabel);
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

function createGroup(
  parent: HTMLElement,
  classes: MoodPanelClasses,
  options: {
    label: string;
    meta?: string;
    expanded: boolean;
    onToggle: (expanded: boolean) => void;
  },
): GroupControl {
  const section = document.createElement('section');
  section.className = classes.group;

  const bodyId = `mood-panel-group-${nextGroupId}`;
  nextGroupId += 1;

  const header = document.createElement('button');
  header.type = 'button';
  header.className = classes.groupHeader;
  header.setAttribute('aria-controls', bodyId);

  const heading = document.createElement('span');
  heading.className = classes.groupTitle;
  heading.textContent = options.label;

  const toggle = document.createElement('span');
  toggle.className = classes.groupToggle;
  toggle.setAttribute('aria-hidden', 'true');

  const body = document.createElement('div');
  body.id = bodyId;
  body.className = classes.groupBody;

  const setExpanded = (expanded: boolean) => {
    header.setAttribute('aria-expanded', String(expanded));
    body.hidden = !expanded;
    toggle.textContent = expanded ? '−' : '+';
  };
  setExpanded(options.expanded);

  header.addEventListener('click', () => {
    const expanded = header.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
    options.onToggle(!expanded);
  });

  if (options.meta) {
    const meta = document.createElement('span');
    meta.className = classes.groupMeta;
    meta.textContent = options.meta;
    header.append(heading, meta, toggle);
  } else {
    header.append(heading, toggle);
  }
  section.append(header, body);
  parent.append(section);
  return { header, body, setExpanded };
}

function subheading(
  parent: HTMLElement,
  classes: Pick<MoodPanelClasses, 'subheading'>,
  text: string,
): HTMLElement {
  const el = document.createElement('p');
  el.className = classes.subheading;
  el.textContent = text;
  parent.append(el);
  return el;
}

function sceneMeta(scene: MoodScene, index: number): string {
  if (index === 0) return 'start';
  if (scene.enter.mechanism === 'takeover') {
    return scene.pin ? 'takeover · pin' : 'takeover';
  }
  return scene.enter.mechanism;
}

function scenePanelLabel(scene: MoodScene, index: number): string {
  return `${String(index + 1).padStart(2, '0')} ${scene.label ?? scene.key}`;
}

function sceneScopedTunableLabel(handle: MoodTunableHandle): string {
  const prefix = `${handle.sceneKey} `;
  return handle.label.startsWith(prefix)
    ? handle.label.slice(prefix.length)
    : handle.label;
}

function formatStopAt(at: number): string {
  return String(Math.round(at * 100) / 100);
}

function formatPanelNumber(value: number, step: number): string {
  return value.toFixed(decimalPlaces(step));
}

function decimalPlaces(value: number): number {
  const [, decimals = ''] = String(value).split('.');
  return decimals.length;
}

function parsePanelNumber(
  raw: string,
  spec: Pick<NumberSliderSpec<string>, 'min' | 'max'>,
): number | null {
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return null;
  return Math.min(Math.max(value, spec.min), spec.max);
}

function createDragHandle(
  classes: Pick<MoodPanelClasses, 'dragHandle'>,
  panel: HTMLElement,
): HTMLElement {
  const handle = document.createElement('span');
  handle.className = classes.dragHandle;
  handle.title = 'Drag panel';
  handle.setAttribute('aria-hidden', 'true');
  handle.append(createPanelIcon(GripVertical));
  installPanelDrag(handle, panel);
  return handle;
}

function installPanelDrag(handle: HTMLElement, panel: HTMLElement): void {
  handle.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    event.preventDefault();

    const rect = panel.getBoundingClientRect();
    const startLeft = rect.left;
    const startTop = rect.top;
    const startX = event.clientX;
    const startY = event.clientY;

    panel.style.left = `${startLeft}px`;
    panel.style.top = `${startTop}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    try {
      handle.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events have no active pointer to capture.
    }
    handle.dataset.dragging = 'true';

    const move = (moveEvent: PointerEvent) => {
      const margin = 8;
      const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
      const maxTop = Math.max(
        margin,
        window.innerHeight - rect.height - margin,
      );
      panel.style.left = `${clamp(
        startLeft + moveEvent.clientX - startX,
        margin,
        maxLeft,
      )}px`;
      panel.style.top = `${clamp(
        startTop + moveEvent.clientY - startY,
        margin,
        maxTop,
      )}px`;
      Coloris.updatePosition();
    };

    const stop = (stopEvent: PointerEvent) => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', stop);
      handle.removeEventListener('pointercancel', stop);
      handle.dataset.dragging = 'false';
      if (handle.hasPointerCapture(stopEvent.pointerId)) {
        handle.releasePointerCapture(stopEvent.pointerId);
      }
    };

    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
  });
}

function createHeaderActions(
  classes: Pick<MoodPanelClasses, 'titleActions' | 'titleAction'>,
  options: {
    onClose: () => void;
    onDelete?: () => void;
    onLoad: () => void;
    onReset: () => void;
    onSave: () => void;
    setStatus: (message: string) => void;
  },
): HTMLElement {
  const actions = document.createElement('div');
  actions.className = classes.titleActions;

  actions.append(
    createIconButton(classes, {
      action: 'save',
      icon: Save,
      label: 'Save JSON',
      onClick: options.onSave,
    }),
    createIconButton(classes, {
      action: 'load',
      icon: FolderOpen,
      label: 'Load JSON',
      onClick: options.onLoad,
    }),
    createIconButton(classes, {
      action: 'reset',
      icon: RotateCcw,
      label: 'Reset unsaved tweaks',
      onClick: options.onReset,
    }),
  );

  if (options.onDelete) {
    actions.append(
      createDeleteButton(classes, options.onDelete, options.setStatus),
    );
  }

  actions.append(
    createIconButton(classes, {
      action: 'close',
      icon: X,
      label: 'Close',
      onClick: options.onClose,
    }),
  );

  return actions;
}

function createIconButton(
  classes: Pick<MoodPanelClasses, 'titleAction'>,
  options: {
    action: string;
    icon: IconNode;
    label: string;
    onClick: () => void;
  },
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = classes.titleAction;
  button.dataset.panelAction = options.action;
  button.title = options.label;
  button.setAttribute('aria-label', options.label);
  button.append(createPanelIcon(options.icon));
  button.addEventListener('click', options.onClick);
  return button;
}

function createDeleteButton(
  classes: Pick<MoodPanelClasses, 'titleAction'>,
  onDelete: () => void,
  setStatus: (message: string) => void,
): HTMLButtonElement {
  const button = createIconButton(classes, {
    action: 'delete',
    icon: Trash2,
    label: 'Delete loaded JSON',
    onClick: () => {
      if (button.dataset.confirming !== 'true') {
        armDeleteButton(button, setStatus);
        return;
      }

      onDelete();
    },
  });
  return button;
}

function armDeleteButton(
  button: HTMLButtonElement,
  setStatus: (message: string) => void,
): void {
  button.dataset.confirming = 'true';
  button.title = 'Confirm delete';
  button.setAttribute('aria-label', 'Confirm delete');
  button.replaceChildren(createPanelIcon(Check));
  setStatus('Click delete again to confirm');

  window.setTimeout(() => {
    if (!button.isConnected || button.dataset.confirming !== 'true') return;
    button.dataset.confirming = 'false';
    button.title = 'Delete loaded JSON';
    button.setAttribute('aria-label', 'Delete loaded JSON');
    button.replaceChildren(createPanelIcon(Trash2));
  }, 2600);
}

function createPanelIcon(icon: IconNode): SVGElement {
  const el = createIconElement(icon, {
    'aria-hidden': 'true',
    focusable: 'false',
    height: 15,
    width: 15,
  });
  el.setAttribute('stroke-width', '2.1');
  return el;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
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

function readExpandedState(): Record<string, boolean> | null {
  try {
    const raw = window.localStorage.getItem(EXPANDED_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed))
      return null;
    const state: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'boolean') state[key] = value;
    }
    return state;
  } catch {
    return null;
  }
}

function writeExpandedState(state: Record<string, boolean>): void {
  try {
    window.localStorage.setItem(EXPANDED_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (private mode); collapse memory is optional.
  }
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

async function deletePresetFile(fileName: string): Promise<void> {
  await requestPreset<{ ok: true }>('/delete', {
    body: JSON.stringify({ fileName }),
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

function presetHeaderLabel(fileName: string | null): string {
  if (!fileName) return 'default';
  const parsed = parsePresetFileName(fileName);
  if (!parsed) return presetDisplayName(fileName);
  return parsed.slug || parsed.stamp;
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
