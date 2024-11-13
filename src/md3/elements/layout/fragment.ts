import * as html from '@alexi/html';

export class Fragment extends html.HTMLElement {
  getDefaultProps(): Fragment['props'] {
    return {
      style: {
        display: 'contents',
      },
    };
  }
}
