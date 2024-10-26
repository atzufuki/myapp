type AxisSize = 'min' | 'max';

type AxisAlignment =
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-evenly'
  | 'space-around'
  | 'stretch'
  | 'center';

export class Column extends html.HTMLElement<{
  mainAxisSize?: AxisSize;
  crossAxisSize?: AxisSize;
  mainAxisAlignment?: AxisAlignment;
  crossAxisAlignment?: AxisAlignment;
  spacing?: string;
}> {
  getDefaultProps(): Column['props'] {
    return {
      style: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      },
    };
  }

  set mainAxisSize(value: AxisSize) {
    switch (value) {
      case 'min':
        this.style.height = 'unset';
        break;
      case 'max':
        this.style.height = '100%';
        break;
      default:
        this.style.height = value;
        break;
    }
  }

  set crossAxisSize(value: AxisSize) {
    switch (value) {
      case 'min':
        this.style.width = 'unset';
        break;
      case 'max':
        this.style.width = '100%';
        break;
      default:
        this.style.width = value;
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
    this.style.rowGap = value;
  }
}
