import { AbstractCard } from './_abstract';

export class OutlinedCard extends AbstractCard {
  update() {
    super.update();
    this.style.border = `solid ${this.theme.spToRem(1)} ${this.theme.color(
      'outline',
    )}`;
  }
}
