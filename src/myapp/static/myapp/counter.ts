import './setup.ts';
import * as html from '@alexi/html/index.ts';
import * as md from '@alexi/md3/index.ts';

class Counter extends md.ThemedElementMixin(
  html.HTMLElement,
) {
  static observedAttributes = ['user'];

  theme = new md.ThemeData({});
  user = {
    displayName: '',
  };
  count = 0;

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = JSON.parse(newValue);
  }

  get progress() {
    return this.querySelector<md.LinearProgress>(md.LinearProgress.getName());
  }

  render() {
    return new md.Scaffold({
      progress: new md.LinearProgress({
        useDelay: true,
      }),
      appBar: new md.AppBar({
        leading: new md.Icon({
          iconName: 'menu',
        }),
        color: this.theme.coreColor('primary'),
        onColor: this.theme.color('onPrimary'),
        actions: [
          new md.Avatar({
            displayName: this.user.displayName,
            onclick: async () => {
              location.href = '/auth/signin/';
            },
          }),
        ],
      }),
      body: new md.Container({
        padding: this.theme.spToRem(8),
        height: '100%',
        style: {
          color: this.theme.color('onBackground'),
        },
        child: new md.Column({
          crossAxisSize: 'max',
          children: [
            new md.TabBar({
              selectedIndex: 0,
              tabs: [
                new md.Tab({
                  label: 'Counter',
                  onclick: async () => {
                    setTimeout(() => {
                      location.href = '/';
                    }, 200);
                  },
                }),
                new md.Tab({
                  label: 'Assets',
                  onclick: async () => {
                    setTimeout(() => {
                      location.href = '/assets/';
                    }, 200);
                  },
                }),
              ],
            }),
            new md.Center({
              child: new md.Column({
                crossAxisSize: 'max',
                spacing: this.theme.spToRem(16),
                crossAxisAlignment: 'center',
                children: [
                  new md.Typography({
                    typescale: 'title-medium',
                    text: this.count.toString(),
                  }),
                  new md.ElevatedButton({
                    text: 'Increment',
                    onclick: () => {
                      this.progress.open();
                      setTimeout(() => {
                        this.count++;
                        this.progress.close();
                        this.build();
                      }, 1000);
                    },
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    });
  }
}

Counter.define('myapp-counter');
