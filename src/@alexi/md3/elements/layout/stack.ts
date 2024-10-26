export class Stack extends html.HTMLElement<{
  ref?: (ref: Stack) => Stack;
  fit?: 'loose' | 'expand';
  overflow?: 'visible' | 'clip';
}> {
  ref?: (ref: Stack) => Stack;
  fit: 'loose' | 'expand';
  overflow?: 'visible' | 'clip' = 'clip';

  constructor(props?: Stack['props']) {
    super(props);

    if (this.ref) {
      this.ref(this);
    }
  }

  getDefaultProps(): Stack['props'] {
    return {
      style: {
        display: 'block',
        position: 'relative',
        boxSizing: 'border-box',
      },
    };
  }

  update() {
    switch (this.fit) {
      case 'loose':
        this.style.height = 'fit-content';
        this.style.width = 'fit-content';
        break;
      case 'expand':
        this.style.height = '100%';
        this.style.width = '100%';
        break;

      default:
        this.style.height = 'inherit';
        this.style.width = 'inherit';
        break;
    }

    switch (this.overflow) {
      case 'visible':
        this.style.overflow = 'visible';
        break;
      case 'clip':
        this.style.overflow = 'hidden';
        break;

      default:
        break;
    }

    Array.from(this.children).forEach((element: HTMLElement) => {
      element.style.position = 'absolute';
      return element;
    });
  }
}
