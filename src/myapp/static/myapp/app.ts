import { AppConfig } from '@alexi/pwa/config';

export class MyApp extends AppConfig {
  name = 'myapp';
  getModels = async () => await import(`./models.ts`);
  getTemplate = async (appName, templateName, extension, context) => {
    const templates = await import(
      `./templates/${appName}/${templateName}.${extension}`
    );
    return new templates.default(context);
  };
}
