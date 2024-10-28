import { setup } from '@alexi/web/setup';
import { execute } from '@alexi/management/execute';
import { AlexiWebApp } from '@alexi/web/app';
import { MyApp } from 'myapp/app';

async function main() {
  await setup({
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
  Deno.exit(0);
}

main();
