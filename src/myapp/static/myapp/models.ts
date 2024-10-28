import * as types from '@alexi/types.ts';
import { Model } from '@alexi/db/model.ts';
import { Manager } from '@alexi/db/manager.ts';
import { CharField } from '@alexi/db/fields.ts';

export class User extends Model<User> {
  username = new CharField();

  constructor(props?: types.ModelProps<User>) {
    super();
    this.init(props);
  }

  static objects: Manager<User> = new Manager<User>(User);
  static meta = {
    dbTable: 'users',
  };
}
