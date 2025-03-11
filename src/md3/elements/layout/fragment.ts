import HTMLProps from '@html-props/core';

export class Fragment extends HTMLProps<Fragment>(HTMLElement) {
  getDefaultProps(): Fragment['props'] {
    return {
      style: {
        display: 'contents',
      },
    };
  }
}
