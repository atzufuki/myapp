import { ManagerConfig } from '@alexi/apps/config';

export class AlexiHTMLManager extends ManagerConfig {
  name = 'alexi_html';
  getCommands = async () => {
    return {
      generate_elements: await import(
        `../management/commands/generate_elements`
      ),
    };
  };
}
