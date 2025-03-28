import * as md from '@alexi/md3';

import { setup } from '@alexi/pwa/setup';
import { IndexedDBBackend } from '@alexi/db/backends';
import { dispatch } from '@alexi/pwa/dispatcher';

import { MyApp } from 'myapp/app.ts';
import { urlpatterns } from 'myapp/urls.ts';

async function main() {
  // Cards

  md.OutlinedCard.define('md3-outlined-card');
  md.ElevatedCard.define('md3-elevated-card');

  // Common buttons

  md.ElevatedButton.define('md3-elevated-button');
  md.FilledButton.define('md3-filled-button');
  md.OutlinedButton.define('md3-outlined-button');
  md.TextButton.define('md3-text-button');
  md.TonalButton.define('md3-tonal-button');

  // Icon buttons

  md.FilledIconButton.define('md3-filled-icon-button');
  md.StandardIconButton.define('md3-standard-icon-button');
  md.TonalIconButton.define('md3-tonal-icon-button');

  // Layout

  md.Align.define('md3-align');
  md.Center.define('md3-center');
  md.Column.define('md3-column');
  md.Container.define('md3-container');
  md.Expanded.define('md3-exanded');
  md.Fragment.define('md3-fragment');
  md.LayoutBuilder.define('md3-layout-builder');
  md.Row.define('md3-row');
  md.Scrollable.define('md3-scrollable');
  md.Stack.define('md3-stack');
  md.Wrap.define('md3-wrap');

  // Other

  md.MaterialApp.define('md3-material-app');
  md.AnimatedOpacity.define('md3-animated-opacity');
  md.Avatar.define('md3-avatar');
  md.Fab.define('md3-fab');
  md.Icon.define('md3-icon');
  md.Overlay.define('md3-overlay');
  md.Ripple.define('md3-ripple');
  md.Typography.define('md3-typography');
  md.Scaffold.define('md3-scaffold');
  md.ListTile.define('md3-list-tile');
  md.ListView.define('md3-list-view');
  md.Menu.define('md3-menu');
  md.Dialog.define('md3-dialog');
  md.Divider.define('md3-divider');
  md.DividerLine.define('md3-divider-line');

  // Navigation

  md.NavigationBar.define('md3-navigation-bar');
  md.Navigator.define('md3-navigator');
  md.NavigationDestination.define('md3-navigation-destination');
  md.ActiveIndicator.define('md3-active-indicator');
  md.NavigationDrawer.define('md3-navigation-drawer');
  md.NavigationDrawerDestination.define('md3-navigation-drawer-destination');
  md.NavigationDrawerActiveIndicator.define(
    'md3-navigation-drawer-active-indicator',
  );

  // Progress

  md.LinearProgress.define('md3-linear-progress');
  md.Track.define('md3-linear-progress-track');
  md.Indicator.define('md3-linear-progress-indicator');

  // Bars

  md.AppBar.define('md3-app-bar');
  md.TopAppBar.define('md3-top-app-bar');
  md.TabBar.define('md3-tab-bar');
  md.TextField.define('md3-text-field');
  md.Tab.define('md3-tab');
  md.TabActiveIndicator.define('md3-tab-active-indicator');

  // Sheets

  md.BottomSheet.define('md3-bottom-sheet');

  /**
   * Setup.
   */

  await setup({
    ROOT_URLCONF: urlpatterns,
    INSTALLED_APPS: [
      //
      MyApp,
    ],
    DATABASES: {
      default: {
        NAME: 'default',
        ENGINE: IndexedDBBackend,
        VERSION: 1,
        ON_UPGRADE: (db: any) => {
          const apps = globalThis.alexi.conf.apps;
          for (const appName in apps) {
            for (const modelName in apps[appName].models) {
              const model = apps[appName].models[modelName];

              if (!db.objectStoreNames.contains(model.meta.dbTable)) {
                db.createObjectStore(model.meta.dbTable, {
                  keyPath: 'id',
                  autoIncrement: true,
                });
              }
            }
          }
        },
      },
    },
  });

  /**
   * Listen for popstate events for local navigation.
   */

  globalThis.addEventListener('popstate', (event) => {
    event.preventDefault();
    dispatch(location.pathname, 'GET');
  });

  /**
   * Dispatch the initial request.
   */

  dispatch(location.pathname, 'GET');
}

main();
