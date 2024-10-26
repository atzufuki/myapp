import './setup';
import * as html from '@alexi/html';
import * as md from '@alexi/md3';

class Assets extends md.ThemedElementMixin(
  html.HTMLElement,
) {
  static observedAttributes = ['user', 'assets'];

  theme = new md.ThemeData({});
  user = {
    displayName: '',
  };
  assets = [];

  get progress() {
    return this.querySelector<md.LinearProgress>(md.LinearProgress.getName());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = JSON.parse(newValue);
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
              selectedIndex: 1,
              tabs: [
                new md.Tab({
                  label: 'Counter',
                  onclick: async () => {
                    this.progress.open();
                    await this.progress.close();
                    location.href = '/';
                  },
                }),
                new md.Tab({
                  label: 'Assets',
                  onclick: async () => {
                    this.progress.open();
                    await this.progress.close();
                    location.href = '/assets/';
                  },
                }),
              ],
            }),
            new md.ListView({
              divider: true,
              items: this.assets.map((asset) => {
                return new md.ListTile({
                  leading: new md.Icon({
                    iconName: 'image',
                  }),
                  maintitle: asset.name,
                  subtitle: `ID: ${asset.id}`,
                  trailing: new md.Icon({
                    iconName: 'open_in_new',
                  }),
                });
              }),
            }),
          ],
        }),
      }),
      floatingActionButton: new md.Align({
        alignment: 'bottom-right',
        child: new md.Fab({
          text: 'Add',
          onclick: async () => {
            this.progress.open();
            await this.progress
              .close();
            // send post to current location
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/assets/';
            document.body.appendChild(form);
            form.submit();
          },
        }),
      }),
    });
  }
}

customElements.define('myapp-assets', Assets);
