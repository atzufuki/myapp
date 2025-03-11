import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../theme.ts';

export class Scaffold extends ThemedElementMixin(
  HTMLProps<Scaffold>(HTMLElement),
) {
  appBar?: HTMLElement;
  progress?: HTMLElement;
  tabBar?: HTMLElement;
  body?: HTMLElement;
  drawer?: HTMLElement;
  floatingActionButton?: HTMLElement;
  bottomNavigationBar?: HTMLElement;
  bottomSheet?: HTMLElement;
  useScroll?: boolean = true;

  getDefaultProps(): Scaffold['props'] {
    return {
      style: {
        display: 'block',
        height: '100%',
        width: '100%',
        backgroundColor: this.theme.color('background'),
      },
    };
  }

  render() {
    return new md.LayoutBuilder({
      watchMedia: true,
      builder: (size) => {
        if (size.width > 840) {
          return this.drawer
            ? new md.Row({
              mainAxisAlignment: 'start',
              mainAxisSize: 'max',
              crossAxisSize: 'max',
              children: [
                //
                this.drawer,
                this.MainContent(),
              ],
            })
            : this.MainContent();
        }

        if (size.width >= 600 && size.width <= 840) {
          return new md.Column({
            mainAxisSize: 'max',
            crossAxisSize: 'max',
            children: [
              //
              this.MainContent(),
              this.bottomNavigationBar ?? '',
            ],
          });
        }

        return new md.Column({
          mainAxisSize: 'max',
          crossAxisSize: 'max',
          children: [
            //
            this.MainContent(),
            this.bottomNavigationBar ?? '',
          ],
        });
      },
    });
  }

  MainContent() {
    return new md.Stack({
      fit: 'expand',
      children: [
        new md.Column({
          mainAxisSize: 'max',
          crossAxisSize: 'max',
          style: {
            overflow: 'hidden',
          },
          children: [
            this.appBar ?? '',
            this.progress ?? '',
            this.tabBar ?? '',
            this.body
              ? new md.Expanded({
                child: this.useScroll
                  ? new md.Scrollable({
                    scrollDirection: 'auto',
                    child: this.body,
                  })
                  : this.body,
              })
              : '',
          ],
        }),

        new md.Container({
          child: this.floatingActionButton ?? '',
          width: 'inherit',
          padding: `0 ${this.theme.spToRem(24)} ${
            this.theme.spToRem(
              24,
            )
          } ${this.theme.spToRem(24)}`,
          style: {
            position: 'fixed',
            bottom: '0',
          },
        }),

        this.bottomSheet ?? '',
      ],
    });
  }
}
