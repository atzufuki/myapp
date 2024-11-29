import { AppConfig } from '@alexi/pwa/config';

export class MyApp extends AppConfig {
  name = 'myapp';
  getModels = async () => await import(`./models.ts`);
  getTemplate = async (templateName) => {
    const [dirName, fileName] = templateName.split('/');
    const [name, extension] = fileName.split('.');
    return await import(`./templates/${dirName}/${name}.${extension}`);
  };
}
