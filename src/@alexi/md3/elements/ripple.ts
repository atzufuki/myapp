import * as html from '@alexi/html/index.ts';
import { ThemedElementMixin } from '../theme.ts';

export class Ripple extends ThemedElementMixin(
  html.HTMLElement<{
    color?: string;
  }>,
) {
  color?: string = '#ffffff';

  getDefaultProps(): Ripple['props'] {
    return {
      className: 'ripple',
      style: {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
    };
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('pointerdown', this.in);
    this.addEventListener('pointerup', this.out);
    this.addEventListener('pointerleave', this.out);
  }

  disconnectedCallback(): void {
    this.removeEventListener('pointerdown', this.in);
    this.removeEventListener('pointerup', this.out);
    this.removeEventListener('pointerleave', this.out);
  }

  render() {
    return new html.Div({
      style: {
        width: '100%',
        height: '100%',
        display: 'relative',
      },
    });
  }

  in = (event: MouseEvent) => {
    const currentTarget = event.currentTarget as HTMLElement;
    const rect = currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const w = currentTarget.offsetWidth;

    const drop = new html.Span({
      style: {
        width: '2px',
        height: '2px',
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: this.color,
        transform: 'scale(0)',
        opacity: '0.1',
      },
    });

    drop.style.left = x + 'px';
    drop.style.top = y + 'px';

    const dropArea = this.firstChild! as HTMLDivElement;
    dropArea.append(drop);

    const inAnimation = drop.animate(
      [{ transform: drop.style.transform }, { transform: `scale(${w})` }],
      {
        duration: 500,
        easing: 'ease-in-out',
      },
    );

    inAnimation.finished.then(() => {
      drop.style.transform = `scale(${w})`;
    });
  };

  out = () => {
    const drops = this.querySelectorAll<HTMLSpanElement>('span');
    const lastDrop: HTMLSpanElement | undefined = drops[drops.length - 1];

    const outAnimation = lastDrop?.animate(
      [{ opacity: lastDrop.style.opacity }, { opacity: '0' }],
      {
        duration: 500,
        easing: 'ease-in-out',
      },
    );

    outAnimation?.finished.then(() => {
      lastDrop.remove();
    });
  };

  static define(name: string) {
    const defined = customElements.get(name) ?? customElements.getName(this);

    if (!defined) {
      customElements.define(name, this);
    }

    const prefix = name.split('-')[0];

    const span = `${prefix}-span`;
    const spanDefined = customElements.get(span) ??
      customElements.getName(html.Span);

    if (!spanDefined) {
      customElements.define(span, html.Span, { extends: 'span' });
    }

    const div = `${prefix}-div`;
    const divDefined = customElements.get(div) ??
      customElements.getName(html.Div);

    if (!divDefined) {
      customElements.define(div, html.Div, { extends: 'div' });
    }
  }
}
