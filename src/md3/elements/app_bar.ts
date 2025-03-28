import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';
import { ThemedElementMixin } from '../theme.ts';

export class AppBar extends ThemedElementMixin(
  HTMLProps<AppBar>(HTMLElement),
) {
  leading?: HTMLElement | string;
  appBarTitle?: HTMLElement | string;
  actions?: (HTMLElement | string)[];
  bottom?: HTMLElement | string;
  color?: string;
  onColor?: string;

  getDefaultProps(): AppBar['props'] {
    return {
      style: {
        display: 'block',
        boxSizing: 'border-box',
        userSelect: 'none',
        backgroundColor: this.props.color ?? this.theme.color('surface'),
        color: this.props.onColor ?? this.theme.color('onSurface'),
      },
    };
  }

  render() {
    return new md.Column({
      mainAxisAlignment: 'center',
      crossAxisSize: 'max',
      children: [
        new md.Row({
          style: {
            minHeight: this.theme.spToRem(64),
            height: this.theme.spToRem(64),
            padding: `0 ${this.theme.spToRem(16)}`,
            overflow: 'hidden',
          },
          mainAxisSize: 'max',
          mainAxisAlignment: 'space-between',
          crossAxisAlignment: 'center',
          spacing: this.theme.spToRem(16),
          children: [
            new md.Row({
              mainAxisSize: 'min',
              crossAxisSize: 'max',
              crossAxisAlignment: 'center',
              spacing: this.theme.spToRem(16),
              children: [
                this.leading ? this.leading : '',
                this.appBarTitle ? this.appBarTitle : '',
              ],
            }),

            this.actions
              ? new md.Align({
                alignment: 'center-right',
                child: new md.Row({
                  mainAxisSize: 'min',
                  crossAxisSize: 'max',
                  crossAxisAlignment: 'center',
                  spacing: this.theme.spToRem(8),
                  children: this.actions,
                }),
                style: {
                  width: 'unset',
                },
              })
              : '',
          ],
        }),

        this.bottom
          ? new md.Align({
            alignment: 'bottom-center',
            child: this.bottom,
          })
          : '',
      ],
    });
  }
}
