import HTMLProps from '@html-props/core';
import { ThemedElementMixin } from '../theme.ts';

export class AnimatedOpacity extends ThemedElementMixin(
  HTMLProps<AnimatedOpacity>(HTMLElement),
) {
  opacity?: string;
  onupdate?: () => void;

  connectedCallback(): void {
    super.connectedCallback();

    this.update();

    if (this.onupdate) {
      this.addEventListener('update', this.onupdate);
    }
  }

  disconnectedCallback(): void {
    if (this.onupdate) {
      this.removeEventListener('update', this.onupdate);
    }
  }

  update() {
    this.style.opacity = this.opacity ?? '0';
  }

  async setOpacity(opacity: number, animate: boolean = true) {
    return new Promise((resolve) => {
      if (animate) {
        const animation = this.animate(
          [{ opacity: this.opacity }, { opacity: opacity.toString() }],
          {
            iterations: 1,
            duration: 200,
            easing: 'cubic-bezier(.46,.76,.69,.91)',
          },
        );

        animation.onfinish = () => {
          this.opacity = opacity.toString();
          this.update();
          resolve(this.opacity);
        };
      } else {
        this.opacity = opacity.toString();
        this.update();
        resolve(this.opacity);
      }
    });
  }

  getDefaultProps(): AnimatedOpacity['props'] {
    return {
      style: {
        opacity: '0',
        width: '100%',
        height: '100%',
        display: 'block',
        boxSizing: 'border-box',
      },
    };
  }
}
