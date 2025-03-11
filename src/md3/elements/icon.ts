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
        color: 'inherit',
        display: 'block',
        boxSizing: 'border-box',
      },
    };
  }

  update() {
    this.style.width = this.theme.spToRem(this.size ?? 24);
    this.style.height = this.theme.spToRem(this.size ?? 24);
    this.style.fontSize = this.theme.spToRem(this.size ?? 24);

    if (this.color) {
      this.style.color = this.color;
    }
  }

  render(): string | Node {
    return this.iconName ?? '';
  }
}
