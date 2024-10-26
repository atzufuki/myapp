import * as html from '@alexi/html/index.ts';
import * as md from '../index.ts';
import { ThemedElementMixin } from '../theme.ts';

export class Fab extends ThemedElementMixin(
  html.Button<{
    text?: string;
    size?: 'default' | 'small' | 'large';
  }>,
) {
  text?: string;
  size?: 'default' | 'small' | 'large';

  getDefaultProps(): Fab['props'] {
    return {
      type: 'button',
      style: {
        height: '56px',
        width: '56px',
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        borderRadius: this.theme.spToRem(20),
        backgroundColor: this.theme.color('primary'),
        color: this.theme.color('onPrimary'),
        boxShadow: '0 2px 5px rgb(0 0 0 / 26%)',
        padding: '0',
        border: '0',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
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
}
