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

  // static objects: Manager<User> = new Manager<User>(User);
  static get objects() {
    return new Manager<User>(User);
  }
  static meta = {
    dbTable: 'users',
  };
}

export class Asset extends Model<Asset> {
  name = new CharField();

  constructor(props?: types.ModelProps<Asset>) {
    super();
    this.init(props);
  }

  // static objects: Manager<Asset> = new Manager<Asset>(Asset);
  static get objects() {
    return new Manager<Asset>(Asset);
  }
  static meta = {
    dbTable: 'assets',
  };
}
