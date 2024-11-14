import { execute, setup } from '@alexi/web';
import { AlexiWebApp } from '@alexi/web/app';
import { urlpatterns } from 'project/urls.ts';
import { MyApp } from 'myapp/app.ts';

async function main() {
  await setup({
    ROOT_URLCONF: urlpatterns,
    INSTALLED_APPS: [
      //
      MyApp,
      AlexiWebApp,
    ],
    DATABASES: {
      default: {
        NAME: 'default',
        ENGINE: null,
      },
    },
    STATIC_ROOT: './static',
    STATICFILES: [
      './src/myapp/static/myapp/index.ts',
      './src/myapp/static/myapp/templates/myapp/counter.ts',
      './src/myapp/static/myapp/templates/myapp/assets.ts',
    ],
  });

  await execute();
}

main();
