import { AbstractButton } from './_abstract.ts';

export class OutlinedButton extends AbstractButton {
  update() {
    this.elevation = 0;

    this.style.color = this.theme.color('primary');
    this.style.outline = `1px solid ${this.theme.color('outline')}`;
    this.style.backgroundColor = 'transparent';
    this.stateLayer.color = this.theme.color('primary');
    this.stateLayer.opacity = '0';

    if (this.disabled) {
      this.style.outline = `1px solid ${this.theme.hexWithOpacity(
        this.theme.color('outline'),
        0.12,
      )}`;
      this.style.color = this.theme.hexWithOpacity(
        this.theme.color('onSurface'),
        0.38,
      );
    }

    this.ripple.color = this.theme.color('primary');

    super.update();
  }

  static define(name: string) {
    const defined = customElements.get(name) ?? customElements.getName(this);

    if (!defined) {
      customElements.define(name, this, { extends: 'button' });
    }

    const prefix = name.split('-')[0];
    const a = `${prefix}-a`;
    const aDefined =
      customElements.get(a) ?? customElements.getName(html.Anchor);

    if (!aDefined) {
      customElements.define(a, html.Anchor, { extends: 'a' });
    }
  }
}
