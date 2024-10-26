import * as md from '@alexi/md3';
import * as html from '@alexi/html';
import { ThemedElementMixin } from '../theme';

export class ListTile extends ThemedElementMixin(
  html.HTMLElement<{
    leading?: string | Node;
    trailing?: string | Node;
    maintitle?: string | Node;
    subtitle?: string | Node;
    isThreeLine?: boolean;
    isClickable?: boolean;
    isSelected?: boolean;
    background?: string;
    indentation?: number;
  }>,
) {
  leading?: string | Node;
  trailing?: string | Node;
  maintitle?: string | Node;
  subtitle?: string | Node;
  isThreeLine?: boolean;
  isClickable?: boolean = true;
  isSelected?: boolean;
  background?: string;
  indentation?: number;

  connectedCallback(): void {
    super.connectedCallback();

    if (this.isClickable) {
      this.addEventListener('mouseenter', this.hover);
      this.addEventListener('mouseleave', this.hover);
      this.addEventListener('touchstart', this.hover);
      this.addEventListener('touchend', this.hover);
    }
  }

  disconnectedCallback(): void {
    if (this.isClickable) {
      this.removeEventListener('mouseenter', this.hover);
      this.removeEventListener('mouseleave', this.hover);
      this.removeEventListener('touchstart', this.hover);
      this.removeEventListener('touchend', this.hover);
    }
  }

  hover = (event: MouseEvent) => {
    switch (event.type) {
      case 'mouseenter':
        this.style.backgroundColor = this.theme.color('primaryContainer');
        break;
      case 'mouseleave':
        this.style.backgroundColor = this.background ??
          this.theme.color('surface');
        break;
      case 'touchstart':
        this.style.backgroundColor = this.theme.color('primaryContainer');
        break;
      case 'touchend':
        this.style.backgroundColor = this.background ??
          this.theme.color('surface');
        break;
      default:
        break;
    }
  };

  update = () => {
    this.style.whiteSpace = this.isThreeLine ? 'wrap' : 'nowrap';
    this.style.backgroundColor = this.background ?? this.theme.color('surface');
    this.style.color = this.theme.color('onSurface');

    const paddingLeft = this.theme.spToRem((this.indentation ?? 0) + 16);

    this.style.padding = `${this.theme.spToRem(8)} ${
      this.theme.spToRem(
        24,
      )
    } ${this.theme.spToRem(8)} ${paddingLeft}`;

    if (this.isSelected) {
      this.isClickable = false;
      this.style.backgroundColor = this.theme.color('tertiaryContainer');
      this.style.color = this.theme.color('onPrimaryContainer');
      this.style.pointerEvents = 'none';
    }

    if (this.isClickable) {
      this.style.userSelect = 'none';
      this.style.cursor = 'pointer';
    }
  };

  getDefaultProps(): ListTile['props'] {
    return {
      style: {
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      },
    };
  }

  render() {
    return new md.Fragment({
      children: [
        new md.Row({
          mainAxisSize: 'max',
          mainAxisAlignment: 'space-between',
          crossAxisSize: 'min',
          crossAxisAlignment: 'center',
          spacing: this.theme.spToRem(16),
          children: [
            new md.Row({
              mainAxisSize: 'max',
              crossAxisSize: 'min',
              crossAxisAlignment: 'center',
              spacing: this.theme.spToRem(16),
              children: [
                this.leading ?? '',

                new md.Column({
                  crossAxisSize: 'max',
                  hidden: !this.maintitle,
                  children: [
                    this.maintitle instanceof Node
                      ? this.maintitle
                      : new md.Typography({
                        typescale: 'body-large',
                        text: this.maintitle!,
                        typespace: 'pre-line',
                      }),

                    this.subtitle instanceof Node
                      ? this.subtitle
                      : new md.Typography({
                        typescale: 'body-medium',
                        text: this.subtitle!,
                      }),
                  ],
                }),
              ],
            }),

            this.trailing ?? '',
          ],
        }),

        this.isClickable
          ? new md.Ripple({
            color: this.theme.color('onSurface'),
          })
          : '',
      ],
    });
  }
}
