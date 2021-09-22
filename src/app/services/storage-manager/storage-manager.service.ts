import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageManagerService {
  constructor() {}

  saveOnStorage<T>(key: string, object: T) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  getFromStorage<T>(key: string) {
    const stringList = localStorage.getItem(key);

    if (!stringList) return;
    const storageList: T = JSON.parse(stringList);
    return storageList;
  }
}
