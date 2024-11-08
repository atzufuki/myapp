import * as html from '@alexi/html/index.ts';
import * as md from '@alexi/md3/index.ts';

import { setup } from '@alexi/pwa/setup.ts';
import { apps } from '@alexi/pwa/registry.ts';
import { settings } from '@alexi/conf/index.ts';
import { IndexedDBBackend } from '@alexi/db/backends/indexeddb.ts';
import { dispatch } from '@alexi/pwa/dispatcher.ts';

import { MyApp } from 'myapp/app.ts';
import { urlpatterns } from 'myapp/urls.ts';

async function main() {
  html.Div.define('html-div');
  html.Heading1.define('html-h1');
  html.Span.define('html-span');
  html.Anchor.define('html-a');
  html.Input.define('html-input');
  html.Button.define('html-button');
  html.Label.define('html-label');
  html.Select.define('html-select');
  html.Option.define('html-option');
  html.TextArea.define('html-textarea');
  html.Form.define('html-form');
  html.FieldSet.define('html-fieldset');
  html.Legend.define('html-legend');
  html.Dialog.define('html-dialog');
  html.Progress.define('html-progress');
  html.Meter.define('html-meter');
  html.Output.define('html-output');
  html.Canvas.define('html-canvas');
  html.Image.define('html-image');
  html.Audio.define('html-audio');
  html.Video.define('html-video');
  html.Track.define('html-track');
  html.Map.define('html-map');
  html.Area.define('html-area');
  html.Table.define('html-table');
  html.TableHead.define('html-thead');

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
      },
    },
  });

  /**
   * Create the IndexedDB database tables.
   */

  const backend = new settings.DATABASES.default.ENGINE();
  // deno-lint-ignore no-explicit-any
  await backend.init(settings.DATABASES.default.NAME, 1, (db: any) => {
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
