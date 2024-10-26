import * as md from '@alexi/md3';
import * as html from '@alexi/html';
import { ThemedElementMixin } from '../theme';

export class TextField extends ThemedElementMixin(
  html.HTMLElement<{
    labelText: string;
    leadingIcon?: md.Icon;
    trailingIcon?: md.Icon;
    supportingText?: string;
    inputProps?: any;
  }>,
) {
  labelText!: string;
  leadingIcon?: md.Icon;
  trailingIcon?: md.Icon;
  supportingText?: string;
  inputProps?: any;

  get container() {
    return this.querySelector<md.Container>(
      md.Container.getName() + '.field-container',
    )!;
  }

  get labelContainer() {
    return this.querySelector<md.Container>(
      md.Container.getName() + '.label-container',
    )!;
  }

  get fieldContainer() {
    return this.querySelector<md.Container>(
      md.Container.getName() + '.field-container',
    )!;
  }

  get input() {
    return this.querySelector<HTMLInputElement>('input')!;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this.handleFocus);
    this.input.addEventListener('focusin', this.update);
    this.input.addEventListener('focusout', this.update);
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.handleFocus);
  }

  getDefaultProps(): TextField['props'] {
    return {
      style: {
        display: 'contents',
      },
    };
  }

  update = () => {
    this.container.style.paddingLeft = this.theme.spToRem(16);
    this.container.style.paddingRight = this.theme.spToRem(16);

    if (this.leadingIcon) {
      this.container.style.paddingLeft = this.theme.spToRem(12);
    }

    if (this.trailingIcon) {
      this.container.style.paddingRight = this.theme.spToRem(12);
    }

    if (
      this.input.autofocus ||
      this.input.isEqualNode(document.activeElement)
    ) {
      this.container.style.outline = `solid ${
        this.theme.spToRem(
          2,
        )
      } ${this.theme.color('outline')}`;
    } else {
      this.container.style.outline = `solid ${
        this.theme.spToRem(
          1,
        )
      } ${this.theme.color('outline')}`;
    }

    // Set the background color of the label container to the background color of the closest
    // parent element with background color.
    let element: HTMLElement = this;
    while (element) {
      if (element.style.backgroundColor) {
        this.labelContainer.color = element.style.backgroundColor;
        this.fieldContainer.style.color = element.style.color;
        this.labelContainer.update();

        element;
        return;
      }

      element = element.parentElement;
    }
  };

  handleFocus = () => {
    this.input.focus();
  };

  render() {
    return new md.Column({
      crossAxisSize: 'max',
      children: [
        new md.Container({
          className: 'label-container',
          width: 'fit-content',
          style: {
            marginTop: this.theme.spToRem(-8),
            marginLeft: this.theme.spToRem(12),
            position: 'absolute',
            color: this.theme.color('onSurface'),
          },
          color: 'inherit',
          padding: `0 ${this.theme.spToRem(4)}`,
          child: new md.Typography({
            typescale: 'body-small',
            text: this.labelText,
          }),
        }),

        new md.Container({
          className: 'field-container',
          style: {
            height: this.theme.spToRem(56),
            outline: `solid ${this.theme.spToRem(1)} ${
              this.theme.color(
                'outline',
              )
            }`,
            borderRadius: this.theme.shape.extraSmall,
            cursor: 'text',
          },
          child: new md.Row({
            mainAxisSize: 'max',
            crossAxisAlignment: 'center',
            spacing: this.theme.spToRem(16),
            children: [
              this.leadingIcon ? this.leadingIcon : '',

              new md.Typography({
                typescale: 'body-large',
                text: '',
                child: new html.Input({
                  ...this.inputProps,
                  style: {
                    ...this.inputProps?.style,
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: '0',
                    outline: '0',
                    color: 'inherit',
                    fontSize: 'inherit',
                    boxSizing: 'border-box',
                  },
                }),
                style: {
                  boxSizing: 'border-box',
                  display: 'block',
                  width: '100%',
                },
              }),

              this.trailingIcon ? this.trailingIcon : '',
            ],
          }),
        }),
      ],
    });
  }

  static define(name: string) {
    const defined = customElements.get(name) ?? customElements.getName(this);

    if (!defined) {
      customElements.define(name, this);
    }

    const prefix = name.split('-')[0];

    const input = `${prefix}-input`;
    const inputDefined = customElements.get(input) ??
      customElements.getName(html.Input);

    if (!inputDefined) {
      customElements.define(input, html.Input, { extends: 'input' });
    }
  }
}
