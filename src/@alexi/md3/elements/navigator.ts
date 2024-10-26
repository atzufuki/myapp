import * as html from '@alexi/html';
import { ThemedElementMixin } from '../theme';

export class Navigator extends ThemedElementMixin(
  html.HTMLElement<{
    defaultPage?: number;
    pages?: HTMLElement[];
  }>,
) {
  defaultPage?: number;
  pages?: HTMLElement[];

  static of(element: HTMLElement) {
    const navigator = element.closest<Navigator>(this.getName());

    if (!navigator) {
      throw new Error(
        `No closest navigator element was found for this (${element.localName}) element.`,
      );
    }

    return navigator;
  }

  getDefaultProps(): Navigator['props'] {
    return {
      style: {
        display: 'contents',
      },
    };
  }

  navigate(page: HTMLElement | number) {
    if (page instanceof HTMLElement) {
      this.replaceChildren(page);
    } else if (this.pages) {
      this.replaceChildren(this.pages[page]);
    }
  }

  render() {
    return this.defaultPage !== undefined && this.pages
      ? this.pages[this.defaultPage]
      : '';
  }
}
