import { IconName } from './icon_names';
import * as html from '@alexi/html';
import { ThemedElementMixin } from '../theme';

export class Icon extends ThemedElementMixin(
  html.Span<{
    iconName: IconName | null;
    size?: number;
    color?: string;
  }>,
) {
  iconName!: IconName | null;
  size?: number;
  color?: string;

  getDefaultProps(): Icon['props'] {
    return {
      className: 'material-symbols-outlined',
      iconName: null,
      style: {
        color: 'inherit',
        display: 'block',
        boxSizing: 'border-box',
      },
    };
  }

  update() {
    this.style.width = this.theme.spToRem(this.size ?? 24);
    this.style.height = this.theme.spToRem(this.size ?? 24);
    this.style.fontSize = this.theme.spToRem(this.size ?? 24);

    if (this.color) {
      this.style.color = this.color;
    }
  }

  render(): string | Node {
    return this.iconName ?? '';
  }
}
