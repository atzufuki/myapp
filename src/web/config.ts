import type { UrlPattern } from '@alexi/web/types.ts';

export abstract class AppConfig {
  name: string | undefined;
  commands: object | undefined;
  urls:
    | {
      urlpatterns: UrlPattern[];
    }
    | undefined;
  models: object | undefined;
  views: object | undefined;
  getCommands: (() => Promise<object>) | undefined;
  getUrls: (() => Promise<object>) | undefined;
  getModels: (() => Promise<object>) | undefined;
  getViews: (() => Promise<object>) | undefined;
}
