import { Field } from '@alexi/db/fields';

export abstract class Migration {
  dependencies = [];
  operations = [];

  public async apply(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async unapply(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export interface ModelOptions {
  name: string;
  fields: [string, Field][];
}

export function createModel(options: ModelOptions) {
  // Implement your logic to create a model in IndexedDB here

  return {
    tableName: options.name.toLowerCase() + 's',
    fields: options.fields.map(([name, field]) => {
      return { fieldName: name, dbIndex: field.options.dbIndex || false };
    }),
  };
}
