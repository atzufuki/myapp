import type { UrlPattern } from '@alexi/types.ts';

export abstract class ManagerConfig {
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

export abstract class ServiceConfig {
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
