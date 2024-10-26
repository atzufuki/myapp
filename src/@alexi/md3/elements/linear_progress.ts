import * as html from '@alexi/html/index.ts';
import { ThemedElementMixin } from '../theme.ts';

export class LinearProgress extends ThemedElementMixin(
  html.HTMLElement<{
    defaultOpen?: boolean;
    duration?: number;
    useDelay?: boolean;
    trackColor?: string;
    indicatorColor?: string;
  }>,
) {
  defaultOpen?: boolean;
  duration!: number;
  useDelay!: boolean;
  delay: Promise<unknown> | null = null;
  trackColor?: string;
  indicatorColor?: string;

  get indicator() {
    return this.querySelector<Indicator>(Indicator.getSelector())!;
  }

  get isloading() {
    return this.indicator.isloading;
  }

  getDefaultProps(): LinearProgress['props'] {
    return {
      duration: 1000,
      useDelay: false,
      style: {
        display: 'block',
        width: '100%',
        height: '4px',
        flexShrink: '0',
      },
    };
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.defaultOpen) {
      this.open();
    }
  }

  update() {
    this.indicator.color = this.indicatorColor;
    this.indicator.update();
  }

  open(): void {
    if (this.useDelay) {
      this.delay = new Promise((resolve) => setTimeout(resolve, this.duration));
    }

    const indicator = this.querySelector<Indicator>(Indicator.getName())!;
    indicator.startAnimation();
  }

  async close(): Promise<void> {
    const indicator = this.querySelector<Indicator>(Indicator.getName())!;

    if (this.useDelay) {
      await this.delay;
      this.delay = null;
    }

    indicator.endAnimation();
  }

  render() {
    return new Track({
      color: this.trackColor,
      child: new Indicator({
        color: this.indicatorColor,
      }),
    });
  }
}

export class Track extends ThemedElementMixin(
  html.HTMLElement<{
    color?: string;
  }>,
) {
  color?: string;

  getDefaultProps(): Track['props'] {
    return {
      style: {
        display: 'block',
        width: '100%',
        height: '100%',
      },
    };
  }

  update = () => {
    this.style.backgroundColor = this.color ??
      this.theme.color('surfaceVariant');
  };
}

export class Indicator extends ThemedElementMixin(
  html.HTMLElement<{
    duration?: number;
    repeat?: boolean;
    easing?: string;
    color?: string;
  }>,
) {
  duration!: number;
  repeat!: boolean;
  easing!: string;
  color?: string;

  animation?: Animation;

  get isloading() {
    return this.animation?.playState === 'running';
  }

  getDefaultProps(): Indicator['props'] {
    return {
      duration: 1000,
      repeat: true,
      easing: 'cubic-bezier(.75, 0, .25, 1)',
      style: {
        display: 'block',
        width: '100%',
        height: '100%',
        transform: 'scaleX(0%)',
      },
    };
  }

  update = () => {
    this.style.backgroundColor = this.color ?? this.theme.color('primary');
  };

  async startAnimation() {
    if (this.animation && this.animation.playState === 'running') {
      this.endAnimation();
    }

    this.animation = this.animate(
      [
        {
          //
          transformOrigin: 'top left',
          transform: 'scaleX(0%)',
        },
        {
          //
          transformOrigin: 'top left',
          transform: 'scaleX(100%)',
        },
        {
          //
          transformOrigin: 'top right',
          transform: 'scaleX(100%)',
        },
        {
          //
          transformOrigin: 'top right',
          transform: 'scaleX(0%)',
        },
      ],
      {
        iterations: this.repeat ? Infinity : 1,
        duration: this.duration,
        easing: this.easing,
      },
    );
  }

  endAnimation() {
    this.animation?.cancel();
  }
}
