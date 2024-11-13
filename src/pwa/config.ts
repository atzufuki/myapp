import type { View } from "@alexi/pwa/views.ts";
import type { Model } from "@alexi/db/model.ts";

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
  models?: {
    // deno-lint-ignore no-explicit-any
    [key: string]: typeof Model<any>;
  };
  views: object | undefined;
  getUrls: (() => Promise<object>) | undefined;
  getModels: (() => Promise<object>) | undefined;
  getViews: (() => Promise<object>) | undefined;
}
