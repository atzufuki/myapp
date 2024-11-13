import * as html from '@alexi/html';
import * as md from '../index.ts';

import { ThemedElementMixin } from '../theme.ts';

export class NavigationDestination extends ThemedElementMixin(
  html.HTMLElement<{
    icon?: md.Icon;
    label?: string;
  }>,
) {
  icon?: md.Icon;
  label?: string;

  getDefaultProps(): NavigationDestination['props'] {
    return {
      className: 'navigation-destination',
    };
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this.handleclick);
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.handleclick);
  }

  get navigationBar() {
    return this.closest<NavigationBar>('.navigation-bar')!;
  }

  get ripple() {
    return this.querySelector<md.Ripple>('.ripple')!;
  }

  activate = (options?: { initial?: boolean }) => {
    const destinations = this.navigationBar.querySelectorAll<
      NavigationDestination
    >(
      '.navigation-destination',
    );
    const index = Array.from(destinations).indexOf(this);

    const activeIndicator = this.querySelector<ActiveIndicator>(
      ActiveIndicator.getName(),
    )!;

    activeIndicator.in();

    if (!options?.initial) {
      this.navigationBar.handleDestinationSelect(index);
    }
  };

  deactivate = () => {
    const destinations = this.navigationBar.querySelectorAll<
      NavigationDestination
    >(
      '.navigation-destination',
    );
    const activeDestination = destinations[this.navigationBar.selectedIndex];

    const activeIndicator = activeDestination.querySelector<ActiveIndicator>(
      ActiveIndicator.getName(),
    )!;

    activeIndicator.out();
  };

  handleclick = () => {
    const destinations = this.navigationBar.querySelectorAll<
      NavigationDestination
    >(
      '.navigation-destination',
    );
    const index = Array.from(destinations).indexOf(this);

    const isActive = this.navigationBar.selectedIndex === index;

    if (!isActive) {
      destinations[this.navigationBar.selectedIndex].deactivate();
    }

    this.activate();
  };

  update() {
    const style: Partial<CSSStyleDeclaration> = {
      display: 'block',
      position: 'relative',
      cursor: 'pointer',
      width: '100%',
      overflow: 'hidden',
      color: this.theme.color('onSurface'),
      minWidth: this.theme.spToRem(48),
      // minHeight: this.theme.spToRem(48),
      padding: `${this.theme.spToRem(12)} 0 ${this.theme.spToRem(16)} 0`,
    };
    Object.assign(this.style, style);
  }

  render() {
    return new md.Fragment({
      children: [
        new md.Column({
          crossAxisAlignment: 'center',
          spacing: this.theme.spToRem(4),
          children: [
            new ActiveIndicator({
              icon: this.icon,
            }),

            this.label
              ? new md.Typography({
                typescale: 'label-medium',
                text: this.label,
              })
              : '',
          ],
        }),
        new md.Ripple({ color: this.theme.color('onSurface') }),
      ],
    });
  }
}

export class NavigationBar extends ThemedElementMixin(
  html.HTMLElement<{
    onDestinationSelected?: (index: number) => void;
    selectedIndex?: number;
    destinations: NavigationDestination[];
  }>,
) {
  static Destination = NavigationDestination;

  handleDestinationSelect = (index: number) => {
    this.selectedIndex = index;
    this.onDestinationSelected?.(this.selectedIndex);
  };
  selectedIndex: number = 0;
  destinations!: NavigationDestination[];
  onDestinationSelected?: (index: number) => void;

  getDefaultProps(): NavigationBar['props'] {
    return {
      className: 'navigation-bar',
    };
  }

  connectedCallback(): void {
    super.connectedCallback();

    const destinations = this.querySelectorAll<NavigationDestination>(
      '.navigation-destination',
    );

    destinations[this.selectedIndex].activate({ initial: true });
  }

  update() {
    const style: Partial<CSSStyleDeclaration> = {
      backgroundColor: this.theme.color('surface'),
      position: 'relative',
      width: '100%',
      userSelect: 'none',
    };
    Object.assign(this.style, style);
  }

  render() {
    return new md.Fragment({
      children: [
        new md.Overlay({
          style: {
            backgroundColor: this.theme.color('surfaceTint'),
            opacity: this.theme.elevation[2].opacity,
          },
        }),

        new md.Row({
          mainAxisSize: 'max',
          mainAxisAlignment: 'stretch',
          spacing: this.theme.spToRem(8),
          children: this.destinations,
        }),
      ],
    });
  }
}

export class ActiveIndicator extends ThemedElementMixin(
  html.HTMLElement<{
    icon?: md.Icon;
  }>,
) {
  icon?: md.Icon;

  getDefaultProps(): ActiveIndicator['props'] {
    return {
      style: {
        display: 'flex',
        placeContent: 'center',
      },
    };
  }

  update() {
    const style: Partial<CSSStyleDeclaration> = {
      height: this.theme.spToRem(32),
      width: this.theme.spToRem(64),
    };
    Object.assign(this.style, style);
  }

  render() {
    return new md.Center({
      style: {
        backgroundColor: this.theme.color('secondaryContainer'),
        borderRadius: this.theme.spToRem(16),
        width: '0',
      },
      child: this.icon ??
        new html.Span({
          style: {
            backgroundColor: this.theme.color('onSecondaryContainer'),
            width: this.theme.spToRem(12),
            height: this.theme.spToRem(12),
            borderRadius: this.theme.spToRem(999),
          },
        }),
    });
  }

  in = () => {
    this.style.color = this.theme.color('primary');

    const pill = this.firstChild! as md.Center;
    const inAnimation = pill.animate(
      [{ width: pill.style.width }, { width: '100%' }],
      {
        duration: 150,
        easing: 'ease-out',
      },
    );
    inAnimation.onfinish = () => {
      pill.style.width = '100%';
    };
  };

  out = () => {
    const pill = this.firstChild! as md.Center;
    pill.style.width = '0';
    this.style.color = this.theme.color('onSecondaryContainer');
  };

  static define(name: string) {
    const defined = customElements.get(name) ?? customElements.getName(this);

    if (!defined) {
      customElements.define(name, this);
    }

    const prefix = name.split('-')[0];

    const span = `${prefix}-span`;
    const spanDefined = customElements.get(span) ??
      customElements.getName(html.Span);

    if (!spanDefined) {
      customElements.define(span, html.Span, { extends: 'span' });
    }
  }
}
