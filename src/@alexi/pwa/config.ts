import type { View } from '@alexi/pwa/views.ts';

export type UrlPattern = {
  path: string;
  view: View;
  name?: string;
};

export abstract class AppConfig {
  name: string | undefined;
  urls:
    | {
      urlpatterns: UrlPattern[];
    }
    | undefined;
  models: object | undefined;
  views: object | undefined;
  getUrls: (() => Promise<object>) | undefined;
  getModels: (() => Promise<object>) | undefined;
  getViews: (() => Promise<object>) | undefined;
}
