import { AbstractIconButton } from './_abstract.ts';

export class StandardIconButton extends AbstractIconButton {
  update() {
    this.elevation = 0;

    this.style.color = this.theme.color('onSurfaceVariant');
    this.style.backgroundColor = 'transparent';
    this.stateLayer.color = this.theme.color('onPrimary');
    this.stateLayer.opacity = '0.05';
    this.ripple.color = this.theme.color('onSurfaceVariant');

    if (this.disabled) {
      this.style.backgroundColor = this.theme.hexWithOpacity(
        this.theme.color('onSurface'),
        0.12,
      );
      this.style.color = this.theme.hexWithOpacity(
        this.theme.color('onSurface'),
        0.38,
      );
    }

    this.ripple.color = this.theme.color('onSurfaceVariant');

    super.update();
  }
}
