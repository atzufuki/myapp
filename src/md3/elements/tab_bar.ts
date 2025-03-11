import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../theme.ts';

export class Tab extends ThemedElementMixin(
  HTMLProps<Tab>(HTMLElement),
) {
  icon?: md.Icon;
  label?: string;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this.handleclick);
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.handleclick);
  }

  get tabBar() {
    return this.closest<TabBar>(TabBar.getName())!;
  }

  activate = (options?: { initial?: boolean }) => {
    const tabs = this.tabBar.querySelectorAll<Tab>(Tab.getName());
    const index = Array.from(tabs).indexOf(this);

    const activeIndicator = this.querySelector<TabActiveIndicator>(
      TabActiveIndicator.getName(),
    )!;

    activeIndicator.in(!options?.initial);

    if (!options?.initial) {
      this.tabBar.handleTabSelect(index);
    }
  };

  deactivate = () => {
    const tabs = this.tabBar.querySelectorAll<Tab>(Tab.getName());
    const activeTab = tabs[this.tabBar.selectedIndex];

    const activeIndicator = activeTab.querySelector<TabActiveIndicator>(
      TabActiveIndicator.getName(),
    )!;

    activeIndicator.out();
  };

  handleclick = () => {
    const tabs = this.tabBar.querySelectorAll<Tab>(Tab.getName());
    const index = Array.from(tabs).indexOf(this);

    const isActive = this.tabBar.selectedIndex === index;
    if (isActive) return;

    tabs[this.tabBar.selectedIndex].deactivate();

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
    };
    Object.assign(this.style, style);
  }

  render() {
    return new md.Fragment({
      children: [
        new md.Column({
          children: [
            new md.Center({
              style: {
                padding: `${this.theme.spToRem(16)} 0 ${
                  this.theme.spToRem(
                    16,
                  )
                } 0`,
              },
              child: this.label
                ? new md.Typography({
                  typescale: 'label-large',
                  text: this.label,
                })
                : '',
            }),
            new TabActiveIndicator({
              icon: this.icon,
              style: {},
            }),
          ],
        }),

        new md.Ripple({
          color: this.theme.color('onSurface'),
        }),
      ],
    });
  }
}

export class TabBar extends ThemedElementMixin(
  HTMLProps<TabBar>(HTMLElement),
) {
  static Tab = Tab;

  handleTabSelect = (index: number) => {
    this.selectedIndex = index;
    this.onTabSelected?.(this.selectedIndex);
  };
  selectedIndex: number = 0;
  tabs!: Tab[];
  onTabSelected?: (index: number) => void;

  connectedCallback(): void {
    super.connectedCallback();

    const tabs = this.querySelectorAll<Tab>(Tab.getName());
    tabs[this.selectedIndex].activate({ initial: true });
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
        new md.Row({
          mainAxisSize: 'max',
          mainAxisAlignment: 'stretch',
          spacing: this.theme.spToRem(8),
          children: this.tabs,
        }),
      ],
    });
  }
}

export class TabActiveIndicator extends ThemedElementMixin(
  HTMLProps<TabActiveIndicator>(HTMLElement),
) {
  icon?: md.Icon;

  getDefaultProps(): TabActiveIndicator['props'] {
    return {
      style: {
        display: 'flex',
        placeContent: 'center',
      },
    };
  }

  update() {
    const style: Partial<CSSStyleDeclaration> = {
      color: this.theme.color('onSurface'),
      height: this.theme.spToRem(2),
      width: '100%',
    };
    Object.assign(this.style, style);

    const line = this.querySelector<md.Center>(md.Center.getSelectors())!;
    line.style.backgroundColor = this.theme.color('primary');
  }

  render() {
    return new md.Center({
      style: {
        backgroundColor: this.theme.color('primary'),
        borderRadius: this.theme.spToRem(16),
        width: '0',
      },
      child: this.icon,
    });
  }

  in = (animate = true) => {
    const pill = this.firstChild! as md.Center;
    if (animate) {
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
    } else {
      pill.style.width = '100%';
    }
  };

  out = () => {
    const pill = this.firstChild! as md.Center;
    pill.style.width = '0';
  };
}
