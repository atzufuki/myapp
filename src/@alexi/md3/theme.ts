import { Constructor, dedupeMixin } from '@open-wc/dedupe-mixin';

import themejson from './material-theme.json' with { type: 'json' };

type Scheme = {
  primary: string;
  surfaceTint: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  primaryFixed: string;
  onPrimaryFixed: string;
  primaryFixedDim: string;
  onPrimaryFixedVariant: string;
  secondaryFixed: string;
  onSecondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixedVariant: string;
  tertiaryFixed: string;
  onTertiaryFixed: string;
  tertiaryFixedDim: string;
  onTertiaryFixedVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
};

type Shade = {
  '0': string;
  '5': string;
  '10': string;
  '15': string;
  '20': string;
  '25': string;
  '30': string;
  '35': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '80': string;
  '90': string;
  '95': string;
  '98': string;
  '99': string;
  '100': string;
};

type Palette = {
  primary: Shade;
  secondary: Shade;
  tertiary: Shade;
  neutral: Shade;
  'neutral-variant': Shade;
};

type MaterialThemeJSON = {
  description: string;
  seed: string;
  coreColors: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  extendedColors: {
    name: string;
    color: string;
    description: string;
    harmonized: boolean;
  }[];
  schemes: {
    light: Scheme;
    'light-medium-contrast': Scheme;
    'light-high-contrast': Scheme;
    dark: Scheme;
    'dark-medium-contrast': Scheme;
    'dark-high-contrast': Scheme;
  };
  palettes: {
    primary: Shade;
    secondary: Shade;
    tertiary: Shade;
    neutral: Shade;
    'neutral-variant': Shade;
  };
};

export function parseMaterialThemeJson(json: MaterialThemeJSON) {
  return json;
}

export class BoxShadow {
  0 = 'unset';
  1 = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
  2 = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
  3 = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
  4 = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
  5 = '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)';
}

export class Opacity {
  0 = '0';
  1 = '0.05';
  2 = '0.08';
  3 = '0.11';
  4 = '0.12';
  5 = '0.14';
}

export class Elevation {
  0 = {
    shadow: new BoxShadow()[0],
    opacity: new Opacity()[0],
  };
  1 = {
    shadow: new BoxShadow()[1],
    opacity: new Opacity()[1],
  };
  2 = {
    shadow: new BoxShadow()[2],
    opacity: new Opacity()[2],
  };
  3 = {
    shadow: new BoxShadow()[3],
    opacity: new Opacity()[3],
  };
  4 = {
    shadow: new BoxShadow()[4],
    opacity: new Opacity()[4],
  };
  5 = {
    shadow: new BoxShadow()[5],
    opacity: new Opacity()[5],
  };
}

export class ThemeData {
  materialThemeJSON: MaterialThemeJSON;
  fontFamily = 'Roboto, sans-serif';
  contrast:
    | 'light'
    | 'light-medium-contrast'
    | 'light-high-contrast'
    | 'dark'
    | 'dark-medium-contrast'
    | 'dark-high-contrast';
  elevation = new Elevation();
  tone = new Opacity();
  shape = {
    none: 'unset',
    extraSmall: this.spToRem(4),
    small: this.spToRem(8),
    medium: this.spToRem(12),
    large: this.spToRem(16),
    extraLarge: this.spToRem(28),
    full: '999px',
  };

  constructor(
    props: {
      materialThemeJSON?: MaterialThemeJSON;
      fontFamily?: string;
      contrast?: ThemeData['contrast'];
    } = {},
  ) {
    this.materialThemeJSON = props.materialThemeJSON ?? themejson;
    this.fontFamily = props.fontFamily ?? this.fontFamily;

    if (props.contrast) {
      this.contrast = props.contrast;
    } else {
      this.contrast = globalThis.matchMedia &&
          globalThis.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
  }

  hexWithOpacity(hexValue: string, opacity: number) {
    const percent = opacity * 100;
    const intValue = Math.round((percent / 100) * 255);
    const opacityHex = intValue.toString(16).padStart(2, '0').toUpperCase();
    return hexValue + opacityHex;
  }

  spToRem(value: number) {
    return value / 16 + 'rem';
  }

  extendedColor(color: MaterialThemeJSON['extendedColors'][0]['name']): string {
    return this.materialThemeJSON.extendedColors.find((c) => c.name === color)
      ?.color;
  }

  coreColor(color: keyof MaterialThemeJSON['coreColors']): string {
    return this.materialThemeJSON.coreColors[color];
  }

  color(
    color: keyof Scheme,
    contrast: ThemeData['contrast'] = this.contrast,
  ): string {
    return parseMaterialThemeJson(this.materialThemeJSON).schemes[contrast][
      color
    ];
  }

  palette(color: keyof Palette, shade: keyof Shade): string {
    return parseMaterialThemeJson(this.materialThemeJSON).palettes[color][
      shade
    ];
  }
}

interface CustomElement extends HTMLElement {
  connectedCallback?(): void;
}

export const ThemedElementMixin = dedupeMixin(
  <T extends Constructor<CustomElement>>(SuperClass: T) =>
    class ThemedElementMixin extends SuperClass {
      theme = new ThemeData();

      connectedCallback(): void {
        this.dataset.themed = 'true';
        const closestThemedElement = this.parentElement.closest<
          ThemedElementMixin
        >(
          '[data-themed="true"]',
        );
        if (closestThemedElement && closestThemedElement.theme) {
          this.theme = closestThemedElement.theme;
        }
        if (super.connectedCallback) super.connectedCallback();
      }
    },
);
