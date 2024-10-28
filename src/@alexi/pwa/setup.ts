import { settings as globalSettings } from '@alexi/conf/index.ts';
import { apps } from '@alexi/pwa/registry.ts';

export async function setup(settings: any) {
  /**
   * Load global settings.
   */

  Object.assign(globalSettings, settings);

  /**
   * Load all apps and their models, views and urls.
   */

  for (const AppConfig of settings.INSTALLED_APPS) {
    const app = new (AppConfig as any)();
    apps[app.name] = app;
    apps[app.name].models = await app.getModels?.();
    apps[app.name].views = await app.getViews?.();
    apps[app.name].urls = await app.getUrls?.();
  }
}
