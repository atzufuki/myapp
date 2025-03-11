import { HTMLPropsMixin, HTMLUtilityMixin } from '@html-props/core';

export const Input = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLInputElement>(HTMLInputElement),
).define('html-input', { extends: 'input' });

export const Button = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLButtonElement>(HTMLButtonElement),
).define('html-button', { extends: 'button' });

export const Select = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLSelectElement>(HTMLSelectElement),
).define('html-select', { extends: 'select' });

export const TextArea = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLTextAreaElement>(HTMLTextAreaElement),
).define('html-textarea', { extends: 'textarea' });

export const Anchor = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLAnchorElement>(HTMLAnchorElement),
).define('html-a', { extends: 'a' });

export const Image = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLImageElement>(HTMLImageElement),
).define('html-img', { extends: 'img' });

export const Div = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLDivElement>(HTMLDivElement),
).define('html-div', { extends: 'div' });

export const Span = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLSpanElement>(HTMLSpanElement),
).define('html-span', { extends: 'span' });

export const Paragraph = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLParagraphElement>(HTMLParagraphElement),
).define('html-paragraph', { extends: 'p' });

export const Heading = HTMLUtilityMixin(
  HTMLPropsMixin<HTMLHeadingElement>(HTMLHeadingElement),
).define('html-heading', { extends: 'h1' });
