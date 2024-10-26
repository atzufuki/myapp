import * as html from '@alexi/html/index.ts';
import { ThemedElementMixin } from '../theme.ts';

type Typescale =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small';

type Typeface = 'Roboto' | 'Roboto Flex' | 'Roboto Serif' | 'Noto' | string;
type Typespace = 'normal' | 'nowrap' | 'pre-wrap' | 'pre-line' | 'ellipsis';

export class Typography extends ThemedElementMixin(
  html.HTMLElement<{
    typescale: Typescale;
    text: string;
    typeface?: Typeface;
    typespace?: Typespace;
  }>,
) {
  typescale!: Typescale;
  text!: string;
  typeface?: Typeface;
  typespace?: Typespace;

  getDefaultProps(): Typography['props'] {
    return {
      style: {
        color: 'inherit',
      },
      typescale: 'label-large',
    };
  }

  update() {
    if (this.text) {
      this.textContent = this.text;
    }

    this.style.fontFamily = this.typeface ?? 'Roboto';

    if (this.typespace) {
      if (this.typespace === 'ellipsis') {
        this.style.textOverflow = 'ellipsis';
        this.style.overflow = 'hidden';
      } else {
        this.style.whiteSpace = this.typespace;
        this.style.overflowWrap = 'break-word';
      }
    }

    switch (this.typescale) {
      case 'display-large':
        this.style.lineHeight = this.theme.spToRem(64);
        this.style.fontSize = this.theme.spToRem(57);
        this.style.fontWeight = '400';
        break;
      case 'display-medium':
        this.style.lineHeight = this.theme.spToRem(52);
        this.style.fontSize = this.theme.spToRem(45);
        this.style.fontWeight = '400';
        break;
      case 'display-small':
        this.style.lineHeight = this.theme.spToRem(44);
        this.style.fontSize = this.theme.spToRem(36);
        this.style.fontWeight = '400';
        break;

      case 'headline-large':
        this.style.lineHeight = this.theme.spToRem(40);
        this.style.fontSize = this.theme.spToRem(32);
        this.style.fontWeight = '400';
        break;
      case 'headline-medium':
        this.style.lineHeight = this.theme.spToRem(36);
        this.style.fontSize = this.theme.spToRem(28);
        this.style.fontWeight = '400';
        break;
      case 'headline-small':
        this.style.lineHeight = this.theme.spToRem(32);
        this.style.fontSize = this.theme.spToRem(24);
        this.style.fontWeight = '400';
        break;

      case 'title-large':
        this.style.lineHeight = this.theme.spToRem(28);
        this.style.fontSize = this.theme.spToRem(22);
        this.style.fontWeight = '400';
        break;
      case 'title-medium':
        this.style.lineHeight = this.theme.spToRem(24);
        this.style.fontSize = this.theme.spToRem(16);
        this.style.fontWeight = '500';
        break;
      case 'title-small':
        this.style.lineHeight = this.theme.spToRem(20);
        this.style.fontSize = this.theme.spToRem(14);
        this.style.fontWeight = '500';
        break;

      case 'label-large':
        this.style.lineHeight = this.theme.spToRem(20);
        this.style.fontSize = this.theme.spToRem(14);
        this.style.fontWeight = '500';
        break;
      case 'label-medium':
        this.style.lineHeight = this.theme.spToRem(16);
        this.style.fontSize = this.theme.spToRem(12);
        this.style.fontWeight = '500';
        break;
      case 'label-small':
        this.style.lineHeight = this.theme.spToRem(16);
        this.style.fontSize = this.theme.spToRem(11);
        this.style.fontWeight = '500';
        break;

      case 'body-large':
        this.style.lineHeight = this.theme.spToRem(24);
        this.style.fontSize = this.theme.spToRem(16);
        this.style.fontWeight = '400';
        break;
      case 'body-medium':
        this.style.lineHeight = this.theme.spToRem(20);
        this.style.fontSize = this.theme.spToRem(14);
        this.style.fontWeight = '400';
        break;
      case 'body-small':
        this.style.lineHeight = this.theme.spToRem(16);
        this.style.fontSize = this.theme.spToRem(12);
        this.style.fontWeight = '400';
        break;

      default:
        break;
    }
  }
}
