import { execute, setup } from '@alexi/web';
import { AlexiWebApp } from '@alexi/web/app';
import { DenoKVBackend } from '@alexi/db/backends';
import { urlpatterns } from 'myapp/urls.ts';
import { MyApp } from 'myapp/app.ts';

async function main() {
  await setup({
    ROOT_URLCONF: urlpatterns,
    INSTALLED_APPS: [
      MyApp,
      AlexiWebApp,
    ],
    DATABASES: {
      default: {
        NAME: 'default',
        ENGINE: DenoKVBackend,
      },
    },
    STATIC_ROOT: './static/',
    STATICFILES: [
      './src/myapp/static/myapp/index.ts',
    ],
    WATCHFILES_DIRS: [
      './src/myapp/',
      './src/md3/',
    ],
    WATCHER_USE_POLLING: false,
  });

  await execute();
}

main();
