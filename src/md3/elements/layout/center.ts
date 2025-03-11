import HTMLProps from '@html-props/core';

export class Center extends HTMLProps<Center>(HTMLElement) {
  getDefaultProps(): Center['props'] {
    return {
      style: {
        display: 'grid',
        placeItems: 'center',
        placeContent: 'center',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
      },
    };
  }
}
