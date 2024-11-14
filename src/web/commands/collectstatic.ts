import { BaseCommand } from '@alexi/web/base_command';
import { bundle, collectstatic } from '@alexi/web/server';

export class Command extends BaseCommand {
  help = 'Collects static files.';

  async handle() {
    await collectstatic();
    await bundle();
  }
}
