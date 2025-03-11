import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';
import * as html from './html.ts';

import { ThemedElementMixin } from '../theme.ts';

export class NavigationDrawerDestination extends ThemedElementMixin(
  HTMLProps<NavigationDrawerDestination>(HTMLElement),
) {
  icon?: md.Icon;
  label?: string;

  get drawer() {
    return this.closest<NavigationDrawer>(NavigationDrawer.getName())!;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this.handleclick);
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.handleclick);
  }

  activate = (options?: { initial?: boolean }) => {
    const destinations = this.drawer.querySelectorAll<
      NavigationDrawerDestination
    >(
      NavigationDrawerDestination.getName(),
    );
    const index = Array.from(destinations).indexOf(this);

    const activeIndicator = this.querySelector<NavigationDrawerActiveIndicator>(
      NavigationDrawerActiveIndicator.getName(),
    )!;

    activeIndicator.in();

    if (!options?.initial) {
      this.drawer.handleDestinationSelect(index);
    }
  };

  deactivate = () => {
    const destinations = this.drawer.querySelectorAll<
      NavigationDrawerDestination
    >(
      NavigationDrawerDestination.getName(),
    );
    const activeDestination = destinations[this.drawer.selectedIndex];

    const activeIndicator = activeDestination.querySelector<
      NavigationDrawerActiveIndicator
    >(
      NavigationDrawerActiveIndicator.getName(),
    )!;

    activeIndicator.out();
  };

  handleclick = () => {
    const destinations = this.drawer.querySelectorAll<
      NavigationDrawerDestination
    >(
      NavigationDrawerDestination.getName(),
    );
    const index = Array.from(destinations).indexOf(this);

    const isActive = this.drawer.selectedIndex === index;
    if (isActive) return;

    destinations[this.drawer.selectedIndex].deactivate();

    this.activate();
  };

  render() {
    return new md.Container({
      height: this.theme.spToRem(48),
      child: new NavigationDrawerActiveIndicator({
        icon: this.icon,
        label: this.label,
      }),
    });
  }
}

export class NavigationDrawer extends ThemedElementMixin(
  HTMLProps<NavigationDrawer>(HTMLElement),
) {
  static Destination = md.NavigationDrawerDestination;

  handleDestinationSelect = (index: number) => {
    this.selectedIndex = index;
    this.onDestinationSelected?.(this.selectedIndex);
  };
  selectedIndex: number = 0;
  destinations!: md.NavigationDrawerDestination[];
  onDestinationSelected?: (index: number) => void;

  connectedCallback(): void {
    super.connectedCallback();

    const destinations = this.querySelectorAll<md.NavigationDrawerDestination>(
      md.NavigationDrawerDestination.getName(),
    );
    destinations[this.selectedIndex].activate({ initial: true });
  }

  getDefaultProps(): NavigationDrawer['props'] {
    return {
      style: {
        position: 'relative',
        height: '100%',
        userSelect: 'none',
        boxSizing: 'border-box',
      },
    };
  }

  update() {
    this.style.backgroundColor = this.theme.color('surface');
    this.style.padding = `${this.theme.spToRem(16)} ${
      this.theme.spToRem(
        12,
      )
    } ${this.theme.spToRem(16)} ${this.theme.spToRem(12)}`;
    this.style.width = this.theme.spToRem(360);
  }

  render() {
    return new md.Column({
      crossAxisSize: 'max',
      mainAxisAlignment: 'stretch',
      spacing: this.theme.spToRem(8),
      children: this.destinations,
    });
  }
}

export class NavigationDrawerActiveIndicator extends ThemedElementMixin(
  HTMLProps<NavigationDrawerActiveIndicator>(HTMLElement),
) {
  icon?: md.Icon;
  label?: string;

  getDefaultProps(): NavigationDrawerActiveIndicator['props'] {
    return {
      style: {
        display: 'flex',
        placeContent: 'center',
        height: '100%',
        width: '100%',
      },
    };
  }

  update() {
    this.style.color = this.theme.color('onSurfaceVariant');
  }

  render() {
    return new md.Container({
      className: 'active-indicator__pill',
      color: 'transparent',
      shape: this.theme.spToRem(25),
      height: '100%',
      padding: `0 ${this.theme.spToRem(24)} 0 ${this.theme.spToRem(16)}`,
      child: new md.Row({
        mainAxisSize: 'max',
        mainAxisAlignment: 'start',
        crossAxisAlignment: 'center',
        spacing: this.theme.spToRem(8),
        children: [
          this.icon ??
            new html.Span({
              style: {
                backgroundColor: this.theme.color('onSecondaryContainer'),
                width: this.theme.spToRem(12),
                height: this.theme.spToRem(12),
                borderRadius: this.theme.spToRem(999),
              },
            }),

          this.label
            ? new md.Typography({
              typescale: 'label-large',
              text: this.label,
            })
            : '',
        ],
      }),
    });
  }

  in = () => {
    const pill = this.querySelector<md.Container>('.active-indicator__pill')!;
    const inAnimation = pill.animate(
      [
        { backgroundColor: pill.style.backgroundColor },
        { backgroundColor: this.theme.color('secondaryContainer') },
      ],
      {
        duration: 250,
        easing: 'ease-out',
      },
    );
    inAnimation.onfinish = () => {
      pill.style.backgroundColor = this.theme.color('secondaryContainer');
      this.style.color = this.theme.color('onSecondaryContainer');
    };
    this.style.color = this.theme.color('onSecondaryContainer');
  };

  out = () => {
    const pill = this.querySelector<md.Container>('.active-indicator__pill')!;
    pill.style.backgroundColor = 'transparent';
    this.style.color = this.theme.color('onSurfaceVariant');
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

    return this;
  }
}
