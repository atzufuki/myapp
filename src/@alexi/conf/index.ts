import { BaseDatabaseBackend } from '@alexi/db/backends/base.ts';

export const settings: any = {};

export const databases: {
  [key: string]: BaseDatabaseBackend;
} = {};
