import * as html from '@alexi/html';

interface Size {
  height: number;
  width: number;
}

export class LayoutBuilder extends html.HTMLElement<{
  builder: (size: Size) => HTMLElement | null;
  targetElement?: HTMLElement;
  watchMedia?: boolean;
}> {
  builder!: (size: Size) => HTMLElement;
  targetElement?: HTMLElement;
  watchMedia: boolean = false;

  compact = globalThis.matchMedia('(max-width: 600px)');
  medium = globalThis.matchMedia('(min-width: 600px and max-width: 840px)');
  expanded = globalThis.matchMedia('(min-width: 840px)');
  portrait = globalThis.matchMedia('(orientation: portrait)');
  landscape = globalThis.matchMedia('(orientation: landscape)');

  binds = {
    update: () => this.build(),
  };

  connectedCallback(): void {
    super.connectedCallback();

    if (this.watchMedia) {
      this.compact.addEventListener('change', this.binds.update);
      this.medium.addEventListener('change', this.binds.update);
      this.expanded.addEventListener('change', this.binds.update);
      this.portrait.addEventListener('change', this.binds.update);
      this.landscape.addEventListener('change', this.binds.update);
    }
  }

  disconnectedCallback(): void {
    if (this.watchMedia) {
      this.compact.removeEventListener('change', this.binds.update);
      this.medium.removeEventListener('change', this.binds.update);
      this.expanded.removeEventListener('change', this.binds.update);
      this.portrait.removeEventListener('change', this.binds.update);
      this.landscape.removeEventListener('change', this.binds.update);
    }
  }

  getDefaultProps(): LayoutBuilder['props'] {
    return {
      style: {
        display: 'contents',
      },
    };
  }

  render() {
    let height = 0;
    let width = 0;

    if (this.targetElement) {
      height = this.targetElement.offsetHeight;
      width = this.targetElement.offsetWidth;
    } else {
      height = globalThis.innerHeight;
      width = globalThis.innerWidth;
    }

    const layout = this.builder({
      height,
      width,
    });

    return layout;
  }
}
