import * as html from '@alexi/html/index.ts';
import { ThemedElementMixin } from '../theme.ts';

export class Overlay extends ThemedElementMixin(html.HTMLElement) {
  getDefaultProps(): Overlay['props'] {
    return {
      style: {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        pointerEvents: 'none',
      },
    };
  }

  set opacity(value: string) {
    this.style.opacity = value;
  }

  set color(value: string) {
    this.style.backgroundColor = value;
  }
}
