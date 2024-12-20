import { AppConfig } from '@alexi/web/config';

export class MyApp extends AppConfig {
  name = 'myapp';
  getModels = async () => await import(`./models.ts`);
  getFunctions = async () => await import(`./functions.ts`);
  getCommands = async () => {
    return {
      test_models: await import(`./commands/test_models.ts`),
    };
  };
}
