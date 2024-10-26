import { settings as globalSettings } from '@alexi/apps/conf';
import { apps, managers, services } from '@alexi/apps/registry';

export async function setupManagers(settings: any) {
  /**
   * Load global settings.
   */

  Object.assign(globalSettings, settings);

  /**
   * Load all managers and their models and commands.
   */

  for (const ManagerConfig of settings.INSTALLED_MANAGERS) {
    const manager = new (ManagerConfig as any)();
    managers[manager.name] = manager;
    managers[manager.name].models = await manager.getModels?.();
    managers[manager.name].views = await manager.getViews?.();
    managers[manager.name].urls = await manager.getUrls?.();
    managers[manager.name].commands = await manager.getCommands?.();
  }
}

export async function setupServices(settings: any) {
  /**
   * Load global settings.
   */

  Object.assign(globalSettings, settings);

  /**
   * Load all services and their models and functions.
   */

  for (const ServiceConfig of settings.INSTALLED_SERVICES) {
    const service = new (ServiceConfig as any)();
    services[service.name] = service;
    services[service.name].models = await service.getModels?.();
    services[service.name].views = await service.getViews?.();
    services[service.name].urls = await service.getUrls?.();
    services[service.name].commands = await service.getCommands?.();
  }
}

export async function setupApps(settings: any) {
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
