import HTMLProps from '@html-props/core';

export class Expanded extends HTMLProps<Expanded>(HTMLElement) {
  getDefaultProps(): Expanded['props'] {
    return {
      style: {
        display: 'flex',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      },
    };
  }

  set flex(value: string) {
    this.style.flex = value;
  }
}
