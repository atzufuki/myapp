import { BaseCommand } from '@alexi/management/base';
import { collectstatic } from '@alexi/web/server';

export class Command extends BaseCommand {
  help = 'Collects static files.';

  async handle() {
    await collectstatic();
  }
}
