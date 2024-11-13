export type STORAGE = {
  NAME: string;
  ENGINE: any;
};

export type STORAGES = {
  default: STORAGE;
  [key: string]: STORAGE;
};
