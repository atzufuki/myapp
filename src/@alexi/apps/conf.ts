import { BaseDatabaseBackend } from '@alexi/db/backends/base';

export const settings: any = {};

export const databases: {
  [key: string]: BaseDatabaseBackend;
} = {};
