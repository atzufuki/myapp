export type BrowserStorageFile = File | Blob | Uint8Array | ArrayBuffer;
export type NodeStorageFile = string | Buffer;
export type StorageFile = BrowserStorageFile | NodeStorageFile;

export abstract class Storage {
  abstract init();
  abstract uploadFile(file: StorageFile, path: string);
  abstract deleteFile(path: string);
  abstract getAbsoluteUri(path: string);
}
