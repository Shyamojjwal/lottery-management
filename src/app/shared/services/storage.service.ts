import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageEngine: any;

  /**
   * Creates an instance of storage service.
   * Sets storageEngine to localStorage by default.
   */
  constructor() {
    //this.storageEngine = (+localStorage.getItem('authStatus')) ? localStorage : sessionStorage;
    this.storageEngine = localStorage;
  }

  /**
   * Switches storage engines.
   * @param engine
   */
  setEngine(engine:any) {
    this.storageEngine = localStorage;
  }

  /**
   * Get's item from specific engine.
   * @param key String index of object
   * @param engine Engine to use
   * @returns  Value of that key in the engine
   */
  getWith(key:any, engine:any) {
    return engine.getItem(key);
  }

  /**
   * Get a specific value
   * @param key String index of object
   * @returns  Value of the key
   */
  get(key:any) {
    return this.storageEngine.getItem(key);
  }

  /**
   * Saves a specific key-value pair
   * @param key String index of object
   * @param value Value to save for it
   */
  save(key:any, value:any) {
    this.storageEngine.setItem(key, value);
  }

  /**
   * Removes a specific value
   * @param key String index of object to delete
   */
  remove(key:any) {
    this.storageEngine.removeItem(key);
  }

  /**
   * Clears both storage engines
   */
  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * Saves iterates of sets of key-value pairs and saves all of them
   * Used to bulk insert
   * @param items List of key-value pairs
   */
  saveAll(items:any) {
    items.forEach((item: any) => {
      this.save(item.key, item.value);
    });
  }

  /**
   * Returns all save items in the storage engine
   * @returns  Object containing all saved key-value pairs
   */
  getAll() {
    return Object.keys(this.storageEngine).reduce((a:any, itemKey:any) => {
      a[itemKey] = this.storageEngine.getItem(itemKey);
      return a;
    }, {});
  }
}
