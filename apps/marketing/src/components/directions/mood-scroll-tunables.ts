import type { MoodScrollConfig } from './mood-scroll-config';

export interface MoodTunableOptions {
  label?: string;
  min: number;
  max: number;
  step: number;
  requiresReinit?: boolean;
  /** Sub-phase this tunable belongs to; the panel clusters by it. */
  group?: string;
  /** One-sentence hover explanation shown on the panel row. */
  description?: string;
}

export interface MoodTunableHandle {
  id: string;
  sceneKey: string;
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  requiresReinit: boolean;
  group?: string;
  description?: string;
  get(): number;
  set(value: number): void;
  reset(): void;
}

export type MoodTunableChange = (handle: MoodTunableHandle) => void;

export interface MoodTunableRegistry {
  entries(): MoodTunableHandle[];
  get(id: string): MoodTunableHandle | undefined;
  register(
    id: string,
    defaultValue: number,
    options: MoodTunableOptions,
  ): MoodTunableHandle;
  applyPreset(values: Record<string, number>): void;
  subscribe(listener: MoodTunableChange): () => void;
}

export function createTunableRegistry(
  config: MoodScrollConfig,
): MoodTunableRegistry {
  return new ConfigBackedTunableRegistry(config);
}

export function tunable(
  registry: MoodTunableRegistry,
  id: string,
  defaultValue: number,
  options: MoodTunableOptions,
): MoodTunableHandle {
  return registry.register(id, defaultValue, options);
}

class ConfigBackedTunableRegistry implements MoodTunableRegistry {
  private readonly handles = new Map<string, MoodTunableHandle>();
  private readonly ordered: MoodTunableHandle[] = [];
  private readonly listeners = new Set<MoodTunableChange>();

  constructor(private readonly config: MoodScrollConfig) {
    this.config.tunables ??= {};
  }

  entries(): MoodTunableHandle[] {
    return [...this.ordered];
  }

  get(id: string): MoodTunableHandle | undefined {
    return this.handles.get(id);
  }

  register(
    id: string,
    defaultValue: number,
    options: MoodTunableOptions,
  ): MoodTunableHandle {
    const existing = this.handles.get(id);
    if (existing) return existing;

    const normalizedDefault =
      normalizeTunableValue(defaultValue, options) ?? options.min;
    const current = normalizeTunableValue(this.config.tunables[id], options);
    this.config.tunables[id] = current ?? normalizedDefault;

    const handle: MoodTunableHandle = {
      id,
      sceneKey: sceneKeyFromId(id),
      label: options.label ?? labelFromId(id),
      defaultValue: normalizedDefault,
      min: options.min,
      max: options.max,
      step: options.step,
      requiresReinit: options.requiresReinit === true,
      group: options.group,
      description: options.description,
      get: () => this.config.tunables[id] ?? normalizedDefault,
      set: (value) => {
        this.config.tunables[id] =
          normalizeTunableValue(value, options) ?? normalizedDefault;
        this.notify(handle);
      },
      reset: () => {
        this.config.tunables[id] = normalizedDefault;
        this.notify(handle);
      },
    };

    this.handles.set(id, handle);
    this.ordered.push(handle);
    return handle;
  }

  applyPreset(values: Record<string, number>): void {
    for (const handle of this.ordered) {
      const value = values[handle.id];
      if (Number.isFinite(value)) {
        handle.set(value);
      } else {
        handle.reset();
      }
    }
  }

  subscribe(listener: MoodTunableChange): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(handle: MoodTunableHandle): void {
    for (const listener of this.listeners) listener(handle);
  }
}

function normalizeTunableValue(
  value: unknown,
  options: Pick<MoodTunableOptions, 'min' | 'max'>,
): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.min(Math.max(value, options.min), options.max);
}

function sceneKeyFromId(id: string): string {
  return id.split('.')[0] ?? id;
}

function labelFromId(id: string): string {
  return id
    .replace(/\./g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .toLowerCase();
}
