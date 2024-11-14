export async function setup(settings: any) {
  globalThis.alexi = { conf: { settings: settings, apps: {}, databases: {} } };

  for (const AppConfig of settings.INSTALLED_APPS) {
    const app = new (AppConfig as any)();
    globalThis.alexi.conf.apps[app.name] = app;
    globalThis.alexi.conf.apps[app.name].models = await app.getModels?.();
    globalThis.alexi.conf.apps[app.name].views = await app.getViews?.();
    globalThis.alexi.conf.apps[app.name].urls = await app.getUrls?.();
  }
}
