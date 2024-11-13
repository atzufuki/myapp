import * as html from '@alexi/html';
import * as md from '../index.ts';

import { ThemedElementMixin } from '../theme.ts';

export class TopAppBar extends ThemedElementMixin(
  html.HTMLElement<{
    content: HTMLElement[];
  }>,
) {
  content!: HTMLElement[];

  getDefaultProps(): TopAppBar['props'] {
    return {
      style: {
        display: 'block',
        boxSizing: 'border-box',
        userSelect: 'none',
      },
    };
  }

  update() {
    this.style.backgroundColor = this.theme.color('surface');
    this.style.color = this.theme.color('onSurface');
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
