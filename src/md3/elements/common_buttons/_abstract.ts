import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';
import * as html from '../html.ts';

import { ThemedElementMixin } from '../../theme.ts';

type Elevation = 0 | 1 | 2 | 3 | 4 | 5;

export abstract class AbstractButton extends ThemedElementMixin(
  HTMLProps<AbstractButton & HTMLButtonElement>(HTMLButtonElement),
) {
  disabled = false;
  ref?: { current: any };
  text?: string;
  icon?: md.Icon;
  href?: string;

  getDefaultProps(): AbstractButton['props'] {
    return {
      type: 'button',
      style: {
        width: 'min-content',
        border: '0',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        position: 'relative',
        userSelect: 'none',
        outline: '0',
        display: 'block',
        boxSizing: 'border-box',
        overflow: 'hidden',
      },
    };
  }

  stateLayer = new md.Overlay({});
  ripple = new md.Ripple({});

  elevation: Elevation = 0;
  focused = false;
  hovered = false;
  pressed = false;
  dragged = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.update();

    if (this.ref) {
      this.ref.current = this;
    }

    // const ripple = this.querySelector<md.Ripple>(md.Ripple.getName())!;
    // this.addEventListener('pointerdown', ripple.in);

    this.addEventListener('focusin', this.onFocus);
    this.addEventListener('focusout', this.onFocus);

    this.addEventListener('mouseenter', this.onHover);
    this.addEventListener('mouseleave', this.onHover);

    this.addEventListener('pointerdown', this.onPressed);
    this.addEventListener('pointerup', this.onPressed);

    this.addEventListener('dragstart', this.onDragged);
    this.addEventListener('dragend', this.onDragged);
  }

  disconnectedCallback(): void {
    this.removeEventListener('focusin', this.onFocus);
    this.removeEventListener('focusout', this.onFocus);

    this.removeEventListener('mouseenter', this.onHover);
    this.removeEventListener('mouseleave', this.onHover);

    this.removeEventListener('pointerdown', this.onPressed);
    this.removeEventListener('pointerup', this.onPressed);

    this.removeEventListener('dragstart', this.onDragged);
    this.removeEventListener('dragend', this.onDragged);
  }

  onFocus = (event: FocusEvent) => {
    this.focused = event.type === 'focusin';

    this.update();
  };

  onHover = (event: MouseEvent) => {
    this.hovered = event.type === 'mouseenter';

    // Abort pressing on hover out
    if (!this.hovered) {
      this.pressed = false;
    }

    this.update();
  };

  onPressed = (event: MouseEvent) => {
    this.pressed = event.type === 'pointerdown';

    this.update();
  };

  onDragged = (event: MouseEvent) => {
    this.dragged = event.type === 'dragstart';

    this.update();
  };

  update() {
    if (this.focused) {
      this.stateLayer.opacity = '0.12';
    }

    if (this.hovered) {
      this.stateLayer.opacity = '0.08';
    }

    if (this.pressed) {
      this.stateLayer.opacity = '0.12';
    }

    if (this.dragged) {
      this.stateLayer.opacity = '0.16';
    }

    if (this.disabled) {
      this.stateLayer.opacity = '0';
      this.style.pointerEvents = 'none';
    }

    this.style.boxShadow = this.theme.elevation[this.elevation].shadow;
    this.style.borderRadius = this.theme.spToRem(20);
    this.style.height = this.theme.spToRem(40);
    this.style.padding = `0 ${this.theme.spToRem(16)}`;

    if (this.icon) {
      this.icon.style.height = 'unset';
      this.icon.style.fontSize = this.theme.spToRem(18);
      this.style.padding = `0 ${this.theme.spToRem(24)} 0 ${
        this.theme.spToRem(
          16,
        )
      }`;
    } else {
      // this.style.padding = this.props.style!.padding!;
    }
  }

  get progress() {
    return this.querySelector<md.LinearProgress>(
      md.LinearProgress.getSelectors(),
    )!;
  }

  startLoading() {
    this.progress.open();
    this.style.pointerEvents = 'none';
  }

  stopLoading() {
    this.progress.close();
    this.style.pointerEvents = 'unset';
  }

  render() {
    return [
      new md.Row({
        mainAxisSize: 'max',
        mainAxisAlignment: 'center',
        crossAxisAlignment: 'center',
        crossAxisSize: 'max',
        spacing: this.theme.spToRem(8),
        children: [
          this.icon ?? '',

          this.href
            ? new html.Anchor({
              href: this.href,
              child: new md.Typography({
                typescale: 'label-large',
                text: this.text ?? '',
              }),
              style: {
                color: 'inherit',
                textDecoration: 'none',
              },
              onclick: (event) => {
                event.preventDefault();
              },
            })
            : new md.Typography({
              typescale: 'label-large',
              text: this.text ?? '',
              style: {
                overflow: 'visible',
              },
            }),
        ],
      }),
      new md.LinearProgress({
        defaultOpen: false,
        trackColor: 'transparent',
        indicatorColor: '#fff',
        style: {
          top: '0',
          left: '0',
          position: 'absolute',
          opacity: '0.1',
          height: '100%',
        },
      }),
      this.stateLayer,
      this.ripple,
    ];
  }
}
