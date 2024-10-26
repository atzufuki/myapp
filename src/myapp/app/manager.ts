import { ManagerConfig } from '@alexi/apps/config.ts';

export class MyManager extends ManagerConfig {
  name = 'myapp';
  getCommands = async () => {
    return {
      test_models: await import(`../commands/test_models.ts`),
    };
  };
  getUrls = async () => await import(`project/urls.ts`);
  getModels = async () => await import(`../models.ts`);
  getViews = async () => await import(`../views.ts`);
}
