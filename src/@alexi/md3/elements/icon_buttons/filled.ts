import { AbstractIconButton } from './_abstract';

export class FilledIconButton extends AbstractIconButton {
  update() {
    this.elevation = 0;

    this.style.color = this.theme.color('onPrimary');
    this.style.backgroundColor = this.theme.color('primary');
    this.stateLayer.color = this.theme.color('onPrimary');
    this.stateLayer.opacity = '0.05';
    this.ripple.color = this.theme.color('onPrimary');

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

    this.ripple.color = this.theme.color('onPrimary');

    super.update();
  }
}
