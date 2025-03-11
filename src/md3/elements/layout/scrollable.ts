import HTMLProps from '@html-props/core';

type Axis = 'horizontal' | 'vertical' | 'both' | 'auto';

export class Scrollable extends HTMLProps<Scrollable>(HTMLElement) {
  scrollDirection?: Axis;
  maxHeight?: string;
  maxWidth?: string;

  getDefaultProps(): Scrollable['props'] {
    return {
      scrollDirection: 'auto',
      style: {
        display: 'block',
        boxSizing: 'border-box',
        scrollBehavior: 'smooth',
        position: 'relative',
        height: '100%',
        width: '100%',
      },
    };
  }

  update() {
    switch (this.scrollDirection) {
      case 'horizontal':
        this.style.overflowX = 'scroll';
        this.style.overflowY = 'hidden';
        break;
      case 'vertical':
        this.style.overflowY = 'scroll';
        this.style.overflowX = 'hidden';
        break;
      case 'both':
        this.style.overflowY = 'scroll';
        this.style.overflowX = 'scroll';
        break;
      case 'auto':
        this.style.overflowY = 'auto';
        this.style.overflowX = 'auto';
        break;

      default:
        break;
    }

    if (this.maxHeight) {
      this.style.maxHeight = this.maxHeight;
    }

    if (this.maxWidth) {
      this.style.maxWidth = this.maxWidth;
    }
  }
}
