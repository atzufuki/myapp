import { AppConfig } from '@alexi/apps/config.ts';

export class MyApp extends AppConfig {
  name = 'myapp';
  getUrls = async () => await import(`../urls.ts`);
  getModels = async () => await import(`../models.ts`);
  getViews = async () => await import(`../views.ts`);
}
