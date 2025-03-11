import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../theme.ts';

export class Fab extends ThemedElementMixin(
  HTMLProps<Fab & HTMLButtonElement>(HTMLButtonElement),
) {
  text?: string;
  size?: 'default' | 'small' | 'large';

  getDefaultProps(): this['props'] {
    return {
      type: 'button',
      style: {
        height: '56px',
        width: '56px',
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        boxShadow: '0 2px 5px rgb(0 0 0 / 26%)',
        padding: '0',
        border: '0',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        borderRadius: this.theme.spToRem(20),
        backgroundColor: this.theme.color('primary'),
        color: this.theme.color('onPrimary'),
      },
    };
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.size === 'small') {
      this.style.height = '40px';
      this.style.width = '40px';
      this.style.borderRadius = '12px';
    }

    if (this.size === 'large') {
      this.style.height = '96px';
      this.style.width = '96px';
      this.style.borderRadius = '28px';
    }
  }

  render() {
    return new md.Row({
      crossAxisAlignment: 'center',
      crossAxisSize: 'max',
      spacing: this.theme.spToRem(8),
      children: [
        new md.Typography({
          typescale: 'label-large',
          text: this.text ?? '',
        }),
      ],
    });
  }

  static define(name: string) {
    customElements.define(name, Fab, { extends: 'button' });
    return this;
  }
}
