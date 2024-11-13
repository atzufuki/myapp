export type StorageFile = any;

export abstract class Storage {
  abstract init();
  abstract uploadFile(file: StorageFile, path: string);
  abstract deleteFile(path: string);
  abstract getAbsoluteUri(path: string);
}

export default Storage;
