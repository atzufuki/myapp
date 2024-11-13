import * as html from '@alexi/html';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../../theme.ts';

type Elevation = 0 | 1 | 2 | 3 | 4 | 5;

export class AbstractIconButton extends ThemedElementMixin(
  html.Button<{
    icon: md.Icon;
  }>,
) {
  icon?: md.Icon;

  stateLayer = new md.Overlay({});
  ripple = new md.Ripple({});

  elevation: Elevation = 0;
  focused = false;
  hovered = false;
  pressed = false;
  dragged = false;

  connectedCallback(): void {
    super.connectedCallback();

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
  };

  onHover = (event: MouseEvent) => {
    this.hovered = event.type === 'mouseenter';

    // Abort pressing on hover out
    if (!this.hovered) {
      this.pressed = false;
    }
  };

  onPressed = (event: MouseEvent) => {
    this.pressed = event.type === 'pointerdown';
  };

  onDragged = (event: MouseEvent) => {
    this.dragged = event.type === 'dragstart';
  };

  update() {
    this.style.borderRadius = this.theme.shape.full;
    this.style.height = this.theme.spToRem(40);
    this.style.width = this.theme.spToRem(40);

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
  }

  getDefaultProps(): AbstractIconButton['props'] {
    return {
      type: 'button',
      style: {
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
        border: '0',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        outline: 'none',
        flexShrink: '0',
      },
    };
  }

  render() {
    return [
      new md.Center({
        child: this.icon,
      }),
      this.stateLayer,
      this.ripple,
    ];
  }
}
