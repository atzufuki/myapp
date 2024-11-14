import { BaseCommand } from '@alexi/web/base_command';
import { User } from '../models.ts';

export class Command extends BaseCommand {
  help = 'Test models.';

  async handle() {
    const user = await User.objects.create({ username: 'John Doe' });
    console.info(user.serialize());
  }
}
