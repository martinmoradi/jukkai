declare module '@melloware/coloris' {
  interface ColorisOptions {
    alpha?: boolean;
    closeButton?: boolean;
    closeLabel?: string;
    el?: string | HTMLInputElement | HTMLInputElement[];
    format?: 'hex' | 'rgb' | 'hsl' | 'auto' | 'mixed';
    formatToggle?: boolean;
    margin?: number;
    parent?: HTMLElement;
    swatches?: string[];
    theme?: string;
    themeMode?: 'dark' | 'light' | 'auto';
  }

  interface ColorisApi {
    (options: ColorisOptions): void;
    init(): void;
    updatePosition(): void;
  }

  const Coloris: ColorisApi;
  export default Coloris;
}
