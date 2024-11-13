import { AppConfig } from '@alexi/web/config';

export class MyApp extends AppConfig {
  name = 'myapp';
  getCommands = async () => {
    return {
      test_models: await import(`./commands/test_models.ts`),
    };
  };
  getUrls = async () => await import(`project/urls.ts`);
  getModels = async () => await import(`./models.ts`);
  getViews = async () => await import(`./views.ts`);
}
