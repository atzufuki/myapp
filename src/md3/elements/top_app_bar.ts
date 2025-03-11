import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../theme.ts';

export class TopAppBar extends ThemedElementMixin(
  HTMLProps<TopAppBar>(HTMLElement),
) {
  content!: HTMLElement[];

  getDefaultProps(): TopAppBar['props'] {
    return {
      style: {
        display: 'block',
        boxSizing: 'border-box',
        userSelect: 'none',
        backgroundColor: this.theme.color('surface'),
        color: this.theme.color('onSurface'),
      },
    };
  }

  render() {
    return new md.Row({
      mainAxisAlignment: 'space-between',
      crossAxisAlignment: 'center',
      spacing: this.theme.spToRem(24),
      style: {
        minHeight: this.theme.spToRem(64),
        height: this.theme.spToRem(64),
        padding: `0 ${this.theme.spToRem(16)}`,
        overflow: 'hidden',
      },
      children: this.content,
    });
  }
}
