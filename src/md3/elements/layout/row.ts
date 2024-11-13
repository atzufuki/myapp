import * as html from '@alexi/html';

type AxisSize = 'min' | 'max';

type AxisAlignment =
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-evenly'
  | 'space-around'
  | 'stretch'
  | 'center';

export class Row extends html.HTMLElement<{
  mainAxisSize?: AxisSize;
  crossAxisSize?: AxisSize;
  mainAxisAlignment?: AxisAlignment;
  crossAxisAlignment?: AxisAlignment;
  spacing?: string;
}> {
  getDefaultProps(): Row['props'] {
    return {
      style: {
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
      },
    };
  }

  set mainAxisSize(value: AxisSize) {
    switch (value) {
      case 'min':
        this.style.width = 'fit-content';
        break;
      case 'max':
        this.style.width = '100%';
        break;
      default:
        break;
    }
  }

  set crossAxisSize(value: AxisSize) {
    switch (value) {
      case 'min':
        this.style.height = 'fit-content';
        break;
      case 'max':
        this.style.height = '100%';
        break;
      default:
        break;
    }
  }

  set mainAxisAlignment(value: AxisAlignment) {
    if (value === 'start' || value === 'end' || value === 'center') {
      this.style.justifyItems = value;
    }
    this.style.justifyContent = value;
  }

  set crossAxisAlignment(value: AxisAlignment) {
    if (value === 'start' || value === 'end' || value === 'center') {
      this.style.alignItems = value;
    }
    this.style.alignContent = value;
  }

  set spacing(value: string) {
    this.style.columnGap = value;
  }
}
