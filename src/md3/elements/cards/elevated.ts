import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../../theme.ts';

export class ElevatedCard extends ThemedElementMixin(
  HTMLProps<ElevatedCard>(HTMLElement),
) {
  heading?: string;
  body?: HTMLElement;

  getDefaultProps(): ElevatedCard['props'] {
    return {
      style: {
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
      },
    };
  }

  update(): void {
    this.style.boxShadow = this.theme.elevation[2].shadow;
    this.style.borderRadius = this.theme.shape.medium;
    this.style.padding = this.theme.spToRem(16);
    this.style.backgroundColor = this.theme.color('surface');
    this.style.color = this.theme.color('onSurface');
  }

  render() {
    return new md.Column({
      spacing: this.theme.spToRem(16),
      children: [
        this.heading
          ? new md.Typography({
            typescale: 'title-large',
            text: this.heading,
          })
          : '',
        this.body,
      ],
    });
  }
}
