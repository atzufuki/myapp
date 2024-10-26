import * as md from '@alexi/md3';
import * as html from '@alexi/html';
import { ThemedElementMixin } from '../theme';

export class Avatar extends ThemedElementMixin(
  html.Button<{
    src?: string;
    displayName?: string;
  }>,
) {
  src?: string;
  displayName?: string;

  getDefaultProps(): Avatar['props'] {
    return {
      type: 'button',
      style: {
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        overflow: 'hidden',
        padding: '0',
        border: '0',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: '0',
      },
    };
  }

  update() {
    this.style.backgroundColor = this.theme.color('surfaceVariant');
    this.style.color = this.theme.color('primary');
    this.style.borderRadius = this.theme.shape.full;
    this.style.height = this.theme.spToRem(40);
    this.style.width = this.theme.spToRem(40);
  }

  getChars() {
    try {
      const chars = [
        this.displayName.split(' ')[0][0],
        this.displayName.split(' ')[1][0],
      ];
      return chars.join('');
    } catch (error) {
      return '';
    }
  }

  render() {
    return new md.Center({
      children: [
        this.src
          ? new html.Image({
            src: this.src,
            style: {
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            },
          })
          : new md.Typography({
            typescale: 'label-large',
            text: this.getChars(),
          }),
      ],
    });
  }

  static define(name: string) {
    const defined = customElements.get(name) ?? customElements.getName(this);

    if (!defined) {
      customElements.define(name, this, { extends: 'button' });
    }

    const prefix = name.split('-')[0];

    const img = `${prefix}-img`;
    const imgDefined = customElements.get(img) ??
      customElements.getName(html.Image);

    if (!imgDefined) {
      customElements.define(img, html.Image, { extends: 'img' });
    }
  }
}
