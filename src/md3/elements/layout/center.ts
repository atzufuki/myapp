import * as html from '@alexi/html';

export class Center extends html.HTMLElement {
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
