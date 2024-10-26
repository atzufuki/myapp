import { Model } from '@alexi/db/model';
import { Manager } from '@alexi/db/manager';
import { Field } from '@alexi/db/fields';
import { QuerySet } from '@alexi/db/query';
import { View } from '@alexi/web/views';
import { BaseDatabaseBackend } from '@alexi/db/backends/base';
import { AppConfig, ManagerConfig, ServiceConfig } from '@alexi/apps/config';
import { Storage } from '@alexi/files/storage';

type FieldValue<F> = F extends Field ? F['value'] : never;

type AllProps<T extends Model<T>> = {
  [K in keyof T]: FieldValue<T[K]>;
};

export type ModelProps<T extends Model<T>> = Partial<
  Omit<
    AllProps<T>,
    | 'objects'
    | 'save'
    | 'delete'
    | 'serialize'
    | 'init'
    | 'clean'
    | 'fullClean'
    | 'props'
  >
>;

type AllOptions<T> = {
  [K in keyof T]: T[K];
};

export type FieldOptions<T> = Partial<
  Omit<
    AllOptions<T>,
    'init' | 'validate' | 'runValidators' | 'get' | 'set' | 'value'
  >
>;

type QueryEq<T extends Model<T>> = {
  [P in keyof ModelProps<T> as P & string]?: ModelProps<T>[P];
};

type QueryIn<T extends Model<T>> = {
  [P in keyof ModelProps<T> as `${P & string}__in`]?: ModelProps<T>[P][];
};

export type FilterProps<T extends Model<T>> = QueryEq<T> & QueryIn<T>;

export interface ModelClass<T extends Model<T>> {
  new (data: ModelProps<T>): T;
  objects: Manager<T>;
  meta: {
    dbTable: string;
  };
}
export type QuerySetClass<T extends Model<T>> = typeof QuerySet<T>;

export type ExecuteAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'list'
  | 'get'
  | 'count'
  | 'exists'
  | 'clear';

export type AsView = View;

export type UrlPattern = {
  path: string;
  view: View;
  name?: string;
};

type ResolvedReturnType<T> = T extends (...args: any[]) => Promise<infer R> ? R
  : any;

export type Context<T extends View> = ResolvedReturnType<T['get']>;

export type DATABASE = {
  NAME: string;
  ENGINE: typeof BaseDatabaseBackend;
};

export type DATABASES = {
  default: DATABASE;
  [key: string]: DATABASE;
};

export type STORAGE = {
  NAME: string;
  ENGINE: typeof Storage;
};

export type STORAGES = {
  default: STORAGE;
  [key: string]: STORAGE;
};

export type ManagerSettings = {
  DATABASES: DATABASES;
  STORAGES: STORAGES;
  INSTALLED_MANAGERS: (typeof ManagerConfig)[];
  [key: string]: any;
};

export type ServiceSettings = {
  DATABASES: DATABASES;
  STORAGES: STORAGES;
  INSTALLED_SERVICES: (typeof ServiceConfig)[];
  [key: string]: any;
};

export type AppSettings = {
  DATABASES: DATABASES;
  STORAGES: STORAGES;
  SPA_ENTRY: string;
  INSTALLED_APPS: (typeof AppConfig)[];
  APPEND_SLASH: boolean;
  ROOT_URLCONF: string;
  [key: string]: any;
};

// v1

export interface GetOrCreateParams {
  [key: string]: any;
  defaults: {
    [key: string]: any;
  };
}

export interface UpdateOrCreateParams {
  [key: string]: any;
  defaults: {
    [key: string]: any;
  };
  createDefaults?: {
    [key: string]: any;
  };
}

export interface GetParams {
  [key: string]: any;
}

export interface CreateParams {
  [key: string]: any;
}

export interface UpdateParams {
  [key: string]: any;
}

export interface FilterParams {
  [key: string]: any;
}

export interface ExcludeParams {
  [key: string]: any;
}
export type OrderByParams<T extends Model<T>> = (
  | keyof ModelProps<T>
  | `-${keyof ModelProps<T> & string}`
)[];

export type UpdateOrCreateResponse<T extends Model<T>> = Promise<[T, boolean]>;

export type GetOrCreateResponse<T extends Model<T>> = Promise<[T, boolean]>;
