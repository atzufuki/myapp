import { ManagerConfig } from '@alexi/apps/config';

export class AlexiWebManager extends ManagerConfig {
  name = 'alexi_web';
  getCommands = async () => {
    return {
      runserver: await import(`../commands/runserver.ts`),
      collectstatic: await import(`../commands/collectstatic.ts`),
    };
  };
}
