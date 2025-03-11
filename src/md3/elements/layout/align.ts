import HTMLProps from '@html-props/core';

type Alignment =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'center-left'
  | 'center-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

export class Align extends HTMLProps<Align>(HTMLElement) {
  getDefaultProps(): Align['props'] {
    return {
      style: {
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
      },
      alignment: null,
    };
  }

  set alignment(value: Alignment) {
    switch (value) {
      case 'bottom-center':
        this.style.alignItems = 'end';
        this.style.alignContent = 'end';
        this.style.justifyItems = 'center';
        this.style.justifyContent = 'center';
        break;
      case 'bottom-left':
        this.style.alignItems = 'end';
        this.style.alignContent = 'end';
        this.style.justifyItems = 'start';
        this.style.justifyContent = 'start';
        break;
      case 'bottom-right':
        this.style.alignItems = 'end';
        this.style.alignContent = 'end';
        this.style.justifyItems = 'end';
        this.style.justifyContent = 'end';
        break;
      case 'center':
        this.style.alignItems = 'center';
        this.style.alignContent = 'center';
        this.style.justifyItems = 'center';
        this.style.justifyContent = 'center';
        break;
      case 'center-left':
        this.style.alignItems = 'center';
        this.style.alignContent = 'center';
        this.style.justifyItems = 'start';
        this.style.justifyContent = 'start';
        break;
      case 'center-right':
        this.style.alignItems = 'center';
        this.style.alignContent = 'center';
        this.style.justifyItems = 'end';
        this.style.justifyContent = 'end';
        break;
      case 'top-center':
        this.style.alignItems = 'start';
        this.style.alignContent = 'start';
        this.style.justifyItems = 'center';
        this.style.justifyContent = 'center';
        break;
      case 'top-left':
        this.style.alignItems = 'start';
        this.style.alignContent = 'start';
        this.style.justifyItems = 'start';
        this.style.justifyContent = 'start';
        break;
      case 'top-right':
        this.style.alignItems = 'start';
        this.style.alignContent = 'start';
        this.style.justifyItems = 'end';
        this.style.justifyContent = 'end';
        break;
      default:
        break;
    }
  }
}
