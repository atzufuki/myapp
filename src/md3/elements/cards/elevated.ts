import * as html from '@alexi/html';
import * as md from '../../index.ts';
import { ThemedElementMixin } from '../../theme.ts';

export class ElevatedCard extends ThemedElementMixin(
  html.HTMLElement<{
    heading?: string;
    body?: HTMLElement;
  }>,
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
    super.update();

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
ElevatedCard.define('elevated-card');
