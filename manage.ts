import { setup } from '@alexi/web/setup';
import { execute } from '@alexi/management/execute';
import { AlexiWebApp } from '@alexi/web/app';
import { urlpatterns } from 'project/urls';
import { MyApp } from 'myapp/app';

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
  });

  await execute();
}

main();
