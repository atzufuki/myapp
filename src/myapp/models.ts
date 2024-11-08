import { ModelProps } from '@alexi/db/types';
import { Model } from '@alexi/db/model';
import { Manager } from '@alexi/db/manager';
import { CharField } from '@alexi/db/fields';

export class User extends Model<User> {
  username = new CharField();

  constructor(props?: ModelProps<User>) {
    super();
    this.init(props);
  }

  static objects: Manager<User> = new Manager<User>(User);
  static meta = {
    dbTable: 'users',
  };
}
