import { BaseCommand } from '@alexi/management/base';
import { User } from '../models.ts';

export class Command extends BaseCommand {
  help = 'Test models.';

  async handle() {
    const user = await User.objects.create({ username: 'John Doe' });
    console.info(user.serialize());
  }
}
