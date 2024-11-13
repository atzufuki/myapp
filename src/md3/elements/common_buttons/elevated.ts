import * as html from '@alexi/html';

import { AbstractButton } from './_abstract.ts';

export class ElevatedButton extends AbstractButton {
  update() {
    this.elevation = 1;

    this.style.color = this.theme.color('primary');
    this.style.backgroundColor = this.theme.color('surface');
    this.stateLayer.color = this.theme.color('primary');
    this.stateLayer.opacity = '0.05';

    if (this.focused) {
      this.elevation = 1;
    }

    if (this.hovered) {
      this.elevation = 2;
    }

    if (this.pressed) {
      this.elevation = 1;
    }

    if (this.dragged) {
      this.elevation = 1;
    }

    if (this.disabled) {
      this.elevation = 0;
      this.style.backgroundColor = this.theme.hexWithOpacity(
        this.theme.color('onSurface'),
        0.12,
      );
      this.style.color = this.theme.hexWithOpacity(
        this.theme.color('onSurface'),
        0.38,
      );
    }

    this.ripple.color = this.theme.color('onSurface');

    super.update();
  }

  static define(name: string) {
    const defined = customElements.get(name) ?? customElements.getName(this);

    if (!defined) {
      customElements.define(name, this, { extends: 'button' });
    }

    const prefix = name.split('-')[0];
    const a = `${prefix}-a`;
    const aDefined = customElements.get(a) ??
      customElements.getName(html.Anchor);

    if (!aDefined) {
      customElements.define(a, html.Anchor, { extends: 'a' });
    }
  }
}
