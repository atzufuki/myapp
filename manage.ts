import '@open-wc/dedupe-mixin';
import { setupManagers } from '@alexi/apps/setup';
import { execute } from '@alexi/management/execute';
import { AlexiWebManager } from '@alexi/web/app/manager';
import { MyManager } from 'myapp/app/manager';

async function main() {
  await setupManagers({
    INSTALLED_MANAGERS: [
      //
      MyManager,
      AlexiWebManager,
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
