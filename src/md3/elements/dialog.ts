import HTMLProps from '@html-props/core';
import * as md from '@alexi/md3';

import { ThemedElementMixin } from '../theme.ts';

export class Dialog extends ThemedElementMixin(
  HTMLProps<Dialog>(HTMLElement),
) {
  ref?: { current: any };
  icon?: md.Icon;
  headline?: string;
  supportingText?: string;
  textButton?: md.TextButton;
  isOpen?: boolean;
  isHidden = false;
  content?: Node;

  get opacity() {
    return this.querySelector<md.AnimatedOpacity>(
      md.AnimatedOpacity.getSelector(),
    )!;
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.ref) {
      this.ref.current = this;
    }

    this.open();
  }

  getDefaultProps(): Dialog['props'] {
    return {
      style: {
        display: 'block',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: '2',
        top: '0',
      },
    };
  }

  async update() {
    if (this.isHidden) {
      await this.opacity.setOpacity(0);

      if (!this.isOpen) {
        this.remove();
      }
    } else {
      await this.opacity.setOpacity(1);
    }
  }

  render() {
    return new md.LayoutBuilder({
      builder: (size) => {
        if (size.width > 600) {
          return new md.AnimatedOpacity({
            onupdate: () => {
              if (!this.isOpen) {
                this.remove();
              }
            },
            opacity: '0',
            child: new md.Container({
              height: '100%',
              width: '100%',
              style: {
                backgroundColor: '#00000050',
              },
              alignment: 'center',
              children: [
                new md.Container({
                  constraints: {
                    minWidth: this.theme.spToRem(280),
                    maxWidth: this.theme.spToRem(560),
                  },
                  style: {
                    color: this.theme.color('onSurface'),
                    borderRadius: this.theme.shape.extraLarge,
                  },
                  color: this.theme.color('surface'),
                  padding: this.theme.spToRem(24),
                  child: new md.Column({
                    crossAxisSize: 'max',
                    spacing: this.theme.spToRem(24),
                    children: [
                      new md.Column({
                        crossAxisSize: 'max',
                        spacing: this.theme.spToRem(16),
                        children: [
                          this.icon
                            ? new md.Align({
                              alignment: 'center',
                              child: this.icon,
                            })
                            : '',

                          this.headline
                            ? new md.Typography({
                              typescale: 'headline-small',
                              text: this.headline,
                            })
                            : '',

                          this.supportingText
                            ? new md.Typography({
                              typescale: 'body-medium',
                              text: this.supportingText,
                            })
                            : '',
                        ],
                      }),

                      this.content ? this.content : '',

                      new md.Row({
                        mainAxisAlignment: 'end',
                        spacing: this.theme.spToRem(8),
                        children: [
                          new md.TextButton({
                            text: 'Cancel',
                            onclick: this.close,
                          }),

                          this.textButton ? this.textButton : '',
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          });
        }

        return new md.AnimatedOpacity({
          onupdate: () => {
            if (!this.isOpen) {
              this.remove();
            }
          },
          opacity: '0',
          child: new md.Container({
            height: '100%',
            width: '100%',
            style: {
              color: this.theme.color('onSurface'),
            },
            color: this.theme.color('surface'),
            child: new md.Column({
              crossAxisSize: 'max',
              children: [
                new md.Column({
                  crossAxisSize: 'max',
                  spacing: this.theme.spToRem(16),
                  children: [
                    new md.Container({
                      height: this.theme.spToRem(56),
                      padding: `0 ${
                        this.theme.spToRem(
                          16,
                        )
                      } 0 ${this.theme.spToRem(16)}`,

                      child: new md.Row({
                        mainAxisSize: 'max',
                        mainAxisAlignment: 'space-between',
                        crossAxisAlignment: 'center',
                        children: [
                          new md.Row({
                            mainAxisSize: 'min',
                            crossAxisAlignment: 'center',
                            children: [
                              new md.Icon({
                                iconName: 'close',
                                onclick: this.close,
                                style: {
                                  backgroundColor: 'transparent',
                                  color: this.theme.color('onSurface'),
                                  cursor: 'pointer',
                                },
                              }),

                              this.headline
                                ? new md.Typography({
                                  typescale: 'title-large',
                                  text: this.headline,
                                })
                                : '',
                            ],
                          }),

                          this.textButton ? this.textButton : '',
                        ],
                      }),
                    }),

                    this.supportingText
                      ? new md.Typography({
                        typescale: 'body-medium',
                        text: this.supportingText,
                      })
                      : '',
                  ],
                }),

                new md.Container({
                  padding: this.theme.spToRem(24),
                  child: this.content ? this.content : '',
                }),
              ],
            }),
          }),
        });
      },
    });
  }

  open = () => {
    this.isOpen = true;
    this.isHidden = false;
    this.update();
    this.dispatchEvent(new Event('open'));
  };

  close = () => {
    this.isHidden = true;
    this.isOpen = false;
    this.update();
    this.dispatchEvent(new Event('close'));
  };

  show = () => {
    this.isHidden = false;
    this.update();
    this.dispatchEvent(new Event('show'));
  };

  hide = () => {
    this.isHidden = true;
    this.update();
    this.dispatchEvent(new Event('hide'));
  };
}
