import { BaseCommand } from '@alexi/management/base';
import { runserver } from '@alexi/web/server';

export class Command extends BaseCommand {
  help = 'Starts a lightweight web server.';

  async handle() {
    await runserver();
  }
}
