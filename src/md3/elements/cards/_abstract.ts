import * as html from '@alexi/html';
import { ThemedElementMixin } from '@alexi/md3/theme.ts';
import { Column } from '@alexi/md3/elements/layout/column.ts';

export abstract class AbstractCard extends ThemedElementMixin(
  html.HTMLElement<{
    heading?: Node;
    content?: (Node | string)[];
  }>,
) {
  heading?: Node;
  content?: (Node | string)[];

  connectedCallback(): void {
    super.connectedCallback();
  }

  getDefaultProps(): AbstractCard['props'] {
    return {
      style: {
        boxSizing: 'border-box',
        overflow: 'hidden',
        height: 'fit-content',
      },
    };
  }

  update() {
    this.style.backgroundColor = this.theme.color('surface');
    this.style.color = this.theme.color('onSurface');
    this.style.borderRadius = this.theme.shape.medium;
  }

  render() {
    return new Column({
      mainAxisSize: 'max',
      crossAxisSize: 'max',
      children: [...(this.content ?? [])],
    });
  }
}