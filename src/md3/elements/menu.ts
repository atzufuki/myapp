import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../theme.ts';

export class Menu extends ThemedElementMixin(
  HTMLProps<Menu>(HTMLElement),
) {
  x?: number;
  y?: number;

  get app() {
    return document.querySelector<md.MaterialApp>(
      md.MaterialApp.getSelectors(),
    )!;
  }

  getDefaultProps(): Menu['props'] {
    return {
      style: {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        overflow: 'hidden',
        outline: 'none',
        zIndex: '3',
        minWidth: this.theme.spToRem(280),
        maxWidth: this.theme.spToRem(280),
        borderRadius: this.theme.spToRem(4),
        backgroundColor: this.theme.color('surface'),
        boxShadow: this.theme.elevation[2].shadow,
      },
    };
  }

  disconnectedCallback(): void {
    this.removeEventListener('focusout', this.out);
  }

  showMenu() {
    this.app.append(this);
    this.in();
  }

  in = () => {
    if (this.x && this.y) {
      this.style.position = 'absolute';
      this.style.right = globalThis.innerWidth - this.x + 'px';
      this.style.top = this.y + 'px';
    }

    const inAnimation = this.animate([{ opacity: '0' }, { opacity: '1' }], {
      duration: 300,
      easing: 'ease-in-out',
    });

    inAnimation.finished.then(() => {
      this.style.opacity = '1';
    });

    this.tabIndex = -1;

    this.focus();

    this.addEventListener('focusout', this.out);
  };

  out = () => {
    const outAnimation = this.animate([{ opacity: '1' }, { opacity: '0' }], {
      duration: 300,
      easing: 'ease-in-out',
    });

    outAnimation.finished.then(() => {
      this.style.opacity = '0';
      this.remove();
    });

    this.removeEventListener('focusout', this.out);
  };
}
