import HTMLProps from '@html-props/core';

import * as md from '@alexi/md3';
import * as html from '../html.ts';

import { ThemedElementMixin } from '../../theme.ts';

export class BottomSheet extends ThemedElementMixin(
  HTMLProps<BottomSheet>(HTMLElement),
) {
  type: 'standard' | 'modal' = 'standard';
  isOpen?: boolean;
  content?: Node;
  height?: string;
  width?: string;

  connectedCallback(): void {
    super.connectedCallback();
    this.update();
  }

  getDefaultProps(): BottomSheet['props'] {
    return {
      style: {
        boxSizing: 'border-box',
        position: 'absolute',
        height: '100%',
        width: '100%',
        pointerEvents: 'none',
        zIndex: '5',
      },
    };
  }

  update() {
    if (!this.height) {
      this.height = this.theme.spToRem(200);
    }

    if (!this.width) {
      this.width = this.theme.spToRem(640);
    }

    const container = this.querySelector<md.Container>('.sheet')!;

    if (this.isOpen) {
      const animation = container.animate(
        [
          {
            //
            transformOrigin: 'bottom',
            transform: `translateY(${this.height})`,
          },
          {
            //
            transformOrigin: 'bottom',
            transform: 'translateY(0px)',
          },
        ],
        {
          iterations: 1,
          duration: 200,
          easing: 'ease',
        },
      );
      animation.onfinish = () => {
        container.style.transform = 'translateY(0px)';
      };
    } else if (container.style.transform === 'translateY(0px)') {
      const animation = container.animate(
        [
          {
            //
            transformOrigin: 'bottom',
            transform: 'translateY(0px)',
          },
          {
            //
            transformOrigin: 'bottom',
            transform: `translateY(${this.height})`,
          },
        ],
        {
          iterations: 1,
          duration: 200,
          easing: 'ease',
        },
      );
      animation.onfinish = () => {
        container.style.transform = `translateY(${this.height})`;
      };
    }
  }

  render() {
    return new md.Container({
      height: '100%',
      width: '100%',
      alignment: 'bottom-center',
      children: [
        new md.Container({
          className: 'sheet',
          style: {
            color: this.theme.color('onSurface'),
            borderTopLeftRadius: this.theme.shape.extraLarge,
            borderTopRightRadius: this.theme.shape.extraLarge,
            transform: `translateY(${this.height})`,
            width: '100%',
            height: '100%',
            maxWidth: this.width,
            maxHeight: this.height,
            pointerEvents: 'all',
          },
          color: this.theme.color('surface'),
          // padding: `${this.theme.spToRem(16)} ${this.theme.spToRem(
          //   16,
          // )} 0 ${this.theme.spToRem(16)}`,
          child: new md.Column({
            crossAxisSize: 'max',
            // spacing: this.theme.spToRem(24),
            children: [
              new md.Container({
                alignment: 'center',
                padding: `${this.theme.spToRem(16)} 0`,
                child: new html.Div({
                  style: {
                    backgroundColor: this.theme.color('onSurfaceVariant'),
                    opacity: '0.4',
                    width: this.theme.spToRem(32),
                    height: this.theme.spToRem(4),
                    borderRadius: this.theme.shape.full,
                  },
                  onclick: () => {
                    this.close();
                  },
                }),
              }),

              this.content ? this.content : '',
            ],
          }),
        }),
        // Scrim
        // new md.Container({
        //   alignment: 'center',
        //   color: '#0000002c',
        // }),
      ],
    });
  }

  open = () => {
    this.isOpen = true;
    this.update();
  };

  close = () => {
    this.isOpen = false;
    this.update();
    this.dispatchEvent(new Event('close'));
  };

  static define(name: string) {
    const defined = customElements.get(name) ?? customElements.getName(this);

    if (!defined) {
      customElements.define(name, this);
    }

    const prefix = name.split('-')[0];

    const div = `${prefix}-div`;
    const divDefined = customElements.get(div) ??
      customElements.getName(html.Div);

    if (!divDefined) {
      customElements.define(div, html.Div, { extends: 'div' });
    }

    return this;
  }
}
