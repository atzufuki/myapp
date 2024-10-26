import * as html from '@alexi/html/index.ts';
import { ThemedElementMixin } from '../theme.ts';

export class Divider extends ThemedElementMixin(
  html.HTMLElement<{
    height?: number;
    thickness?: number;
    color?: string;
    indent?: number;
    endIndent?: number;
  }>,
) {
  height?: number = 1;
  thickness?: number = 1;
  color?: string = '#000000';
  indent?: number;
  endIndent?: number;

  get dividerLine() {
    return this.querySelector<DividerLine>(DividerLine.getSelector())!;
  }

  getDefaultProps(): Divider['props'] {
    return {
      style: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        pointerEvents: 'none',
      },
    };
  }

  update() {
    if (this.height) {
      this.style.height = this.theme.spToRem(this.height);
    }

    if (this.indent) {
      this.style.paddingLeft = this.theme.spToRem(this.indent);
    }

    if (this.endIndent) {
      this.style.paddingLeft = this.theme.spToRem(this.endIndent);
    }

    this.color = this.theme.color('outlineVariant');
    this.dividerLine.color = this.color;
    this.dividerLine.update();
  }

  render() {
    return new DividerLine({
      thickness: this.thickness,
      color: this.color,
    });
  }
}

export class DividerLine extends ThemedElementMixin(
  html.HTMLElement<{
    thickness?: number;
    color?: string;
  }>,
) {
  thickness?: number;
  color?: string;

  getDefaultProps(): DividerLine['props'] {
    return {
      style: {
        display: 'block',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      },
    };
  }

  update() {
    if (this.thickness) {
      this.style.height = this.theme.spToRem(this.thickness);
    }

    if (this.color) {
      this.style.backgroundColor = this.color;
    }
  }
}
