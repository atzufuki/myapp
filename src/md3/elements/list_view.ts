import * as html from '@alexi/html';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../theme.ts';

type Axis = 'vertical' | 'horizontal' | 'both' | 'auto';

export class ListView extends ThemedElementMixin(
  html.HTMLElement<{
    scrollDirection?: Axis;
    maxHeight?: string;
    maxWidth?: string;
    reverse?: boolean;
    divider?: boolean;
    items?: HTMLElement[];
  }>,
) {
  scrollDirection?: Axis;
  maxHeight?: string;
  maxWidth?: string;
  reverse?: boolean = false;
  divider?: boolean = false;
  items?: HTMLElement[];

  update = () => {
    this.style.padding = `${this.theme.spToRem(8)} 0`;
  };

  getDefaultProps(): ListView['props'] {
    return {
      style: {
        listStyle: 'none',
        margin: '0',
        display: 'contents',
      },
    };
  }

  appendItem(item: HTMLElement): void {
    const listItems = this.querySelector('.list-items');
    if (listItems) {
      listItems.appendChild(item);
    }
  }

  render() {
    let children = this.items?.filter((child) => !!child);

    if (this.divider) {
      children = children.flatMap((item, index, array) => {
        const divider = new md.Divider({
          color: this.theme.color('surfaceTint'),
        });
        return array.length - 1 !== index ? [item, divider] : item;
      });
    }

    if (this.reverse) {
      children.reverse();
    }

    return new md.Container({
      height: '100%',
      width: '100%',
      padding: `${this.theme.spToRem(8)} 0`,
      child: new md.Scrollable({
        scrollDirection: this.scrollDirection ?? 'auto',
        maxHeight: this.maxHeight ?? this.theme.spToRem(600),
        maxWidth: this.maxWidth,
        child: new md.Column({
          className: 'list-items',
          children: children,
        }),
        style: {
          overflow: 'visible',
        },
      }),
      style: {
        overflow: 'visible',
      },
    });
  }
}
