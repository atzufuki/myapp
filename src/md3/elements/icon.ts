import HTMLProps from '@html-props/core';

import { IconName } from './icon_names.ts';
import { ThemedElementMixin } from '../theme.ts';

export class Icon extends ThemedElementMixin(
  HTMLProps<Icon>(HTMLElement),
) {
  iconName!: IconName | null;
  size?: number;
  color?: string;

  getDefaultProps(): Icon['props'] {
    return {
      className: 'material-symbols-outlined',
      iconName: null,
      style: {
        display: 'block',
        boxSizing: 'border-box',
        color: this.props.color ?? 'inherit',
        width: this.theme.spToRem(this.size ?? 24),
        height: this.theme.spToRem(this.size ?? 24),
        fontSize: this.theme.spToRem(this.size ?? 24),
      },
    };
  }

  render(): string | Node {
    return this.iconName ?? '';
  }
}
