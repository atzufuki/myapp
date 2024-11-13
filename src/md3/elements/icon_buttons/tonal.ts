import { AbstractIconButton } from './_abstract.ts';

export class TonalIconButton extends AbstractIconButton {
  update() {
    this.elevation = 0;

    this.style.color = this.theme.color('onSecondaryContainer');
    this.style.backgroundColor = this.theme.color('secondaryContainer');
    this.stateLayer.color = this.theme.color('onPrimary');
    this.stateLayer.opacity = '0.05';
    this.ripple.color = this.theme.color('onSecondaryContainer');

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

    this.ripple.color = this.theme.color('onSecondaryContainer');

    super.update();
  }
}
