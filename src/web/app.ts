import { AppConfig } from '@alexi/web/config';

export class AlexiWebApp extends AppConfig {
  name = 'alexi_web';
  getCommands = async () => {
    return {
      runserver: await import(`./commands/runserver.ts`),
      collectstatic: await import(`./commands/collectstatic.ts`),
    };
  };
}
