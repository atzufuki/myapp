import * as html from '@alexi/html/index.ts';
import { ThemedElementMixin } from '../theme.ts';

export class MaterialApp extends ThemedElementMixin(html.HTMLElement) {
  scheme = globalThis.matchMedia('(prefers-color-scheme: dark)');

  binds = {
    update: () => this.build(),
  };

  getDefaultProps(): MaterialApp['props'] {
    return {
      style: {
        display: 'block',
        height: '100%',
        width: '100%',
        position: 'absolute',
      },
    };
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.scheme.addEventListener('change', this.binds.update);
  }

  disconnectedCallback(): void {
    this.scheme.removeEventListener('change', this.binds.update);
  }

  update(): void {
    this.style.backgroundColor = this.theme.color('background');
  }
}
