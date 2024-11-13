import { apps } from '@alexi/web/registry';

export async function setup(settings: any) {
  globalThis.alexi = { conf: { settings: settings } };

  for (const AppConfig of settings.INSTALLED_APPS) {
    const app = new (AppConfig as any)();
    apps[app.name] = app;
    apps[app.name].models = await app.getModels?.();
    apps[app.name].views = await app.getViews?.();
    apps[app.name].urls = await app.getUrls?.();
    apps[app.name].commands = await app.getCommands?.();
  }
}
