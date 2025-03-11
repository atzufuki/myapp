import HTMLProps from '@html-props/core';

type AxisSize = 'min' | 'max';

type AxisAlignment =
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-evenly'
  | 'space-around'
  | 'stretch'
  | 'center';

type Axis = 'vertical' | 'horizontal';

export class Wrap extends HTMLProps<Wrap>(HTMLElement) {
  direction?: Axis;
  mainAxisSize?: AxisSize;
  crossAxisSize?: AxisSize;
  mainAxisAlignment?: AxisAlignment;
  crossAxisAlignment?: AxisAlignment;
  spacing?: string;

  connectedCallback() {
    super.connectedCallback();
    this.update();
  }

  getDefaultProps(): Wrap['props'] {
    return {
      style: {
        display: 'flex',
        flexFlow: 'wrap',
      },
    };
  }

  update() {
    if (this.spacing) {
      this.style.gap = this.spacing;
    }

    switch (this.direction) {
      case 'vertical':
        this.style.flexDirection = 'column';

        switch (this.mainAxisSize) {
          case 'min':
            this.style.height = 'unset';
            break;
          case 'max':
            this.style.height = '100%';
            break;
          default:
            break;
        }

        switch (this.crossAxisSize) {
          case 'min':
            this.style.width = 'unset';
            break;
          case 'max':
            this.style.width = '100%';
            break;
          default:
            break;
        }

        if (
          this.mainAxisAlignment === 'start' ||
          this.mainAxisAlignment === 'end' ||
          this.mainAxisAlignment === 'center'
        ) {
          this.style.justifyItems = this.mainAxisAlignment;
        } else if (this.mainAxisAlignment) {
          this.style.justifyContent = this.mainAxisAlignment;
        }

        if (
          this.crossAxisAlignment === 'start' ||
          this.crossAxisAlignment === 'end' ||
          this.crossAxisAlignment === 'center'
        ) {
          this.style.alignItems = this.crossAxisAlignment;
        } else if (this.crossAxisAlignment) {
          this.style.alignContent = this.crossAxisAlignment;
        }

        break;

      case 'horizontal':
        this.style.flexDirection = 'row';

        switch (this.mainAxisSize) {
          case 'min':
            this.style.width = 'fit-content';
            break;
          case 'max':
            this.style.width = '100%';
            break;
          default:
            break;
        }

        switch (this.crossAxisSize) {
          case 'min':
            this.style.height = 'fit-content';
            break;
          case 'max':
            this.style.height = '100%';
            break;
          default:
            break;
        }

        if (
          this.mainAxisAlignment === 'start' ||
          this.mainAxisAlignment === 'end' ||
          this.mainAxisAlignment === 'center'
        ) {
          this.style.justifyItems = this.mainAxisAlignment;
        } else if (this.mainAxisAlignment) {
          this.style.justifyContent = this.mainAxisAlignment;
        }

        if (
          this.crossAxisAlignment === 'start' ||
          this.crossAxisAlignment === 'end' ||
          this.crossAxisAlignment === 'center'
        ) {
          this.style.alignItems = this.crossAxisAlignment;
        } else if (this.crossAxisAlignment) {
          this.style.alignContent = this.crossAxisAlignment;
        }

        break;

      default:
        break;
    }
  }
}
