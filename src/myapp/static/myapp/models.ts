import type { ModelProps } from '@alexi/db/models';
import { CharField, Manager, Model } from '@alexi/db/models';

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

export class Asset extends Model<Asset> {
  name = new CharField();

  constructor(props?: ModelProps<Asset>) {
    super();
    this.init(props);
  }

  static objects: Manager<Asset> = new Manager<Asset>(Asset);
  static meta = {
    dbTable: 'assets',
  };
}
