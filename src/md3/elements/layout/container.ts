import * as html from '@alexi/html';

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

type Constraints = {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
};

export class Container extends html.HTMLElement<{
  height?: string;
  width?: string;
  shape?: string;
  color?: string;
  padding?: string;
  margin?: string;
  alignment?: Alignment;
  constraints?: Constraints;
  // TODO:
  // decoration
  // transform
}> {
  height?: string;
  width?: string;
  shape?: string;
  color?: string;
  padding?: string;
  margin?: string;
  alignment?: Alignment;
  constraints?: Constraints;

  getDefaultProps(): Container['props'] {
    return {
      style: {
        display: 'flex',
        boxSizing: 'border-box',
        height: 'fit-content',
        width: 'inherit',
      },
    };
  }

  update() {
    if (this.height) {
      this.style.height = this.height;
    }

    if (this.width) {
      this.style.width = this.width;
    }

    if (this.shape) {
      this.style.borderRadius = this.shape;
      this.style.overflow = 'hidden';
    }

    if (this.color) {
      this.style.backgroundColor = this.color;
    }

    if (this.padding) {
      this.style.padding = this.padding;
    }

    if (this.margin) {
      this.style.margin = this.margin;
    }

    if (this.alignment) {
      switch (this.alignment) {
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

    if (this.constraints?.minWidth) {
      this.style.minWidth = this.constraints.minWidth;
    }

    if (this.constraints?.minHeight) {
      this.style.minHeight = this.constraints.minHeight;
    }

    if (this.constraints?.maxWidth) {
      this.style.maxWidth = this.constraints.maxWidth;
    }

    if (this.constraints?.maxHeight) {
      this.style.maxHeight = this.constraints.maxHeight;
    }
  }
}
