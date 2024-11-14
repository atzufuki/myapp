import { AppConfig } from '@alexi/pwa/config.ts';

export class MyApp extends AppConfig {
  name = 'myapp';
  getModels = async () => await import(`./models.ts`);
}
