/**
 * Robust IndexedDB Storage Adapter for Custom Images.
 * Provides multi-megabyte durable storage in the client browser that persists across
 * reloads, tab closes, and cache cleanups without 5MB localStorage quota limitations.
 */

import { CustomImageConfig } from '../types';

const DB_NAME = 'FaliqPortfolioImagesDB';
const DB_VERSION = 1;
const STORE_NAME = 'custom_images';

let dbInstance: IDBDatabase | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export interface StoredImageRecord extends CustomImageConfig {
  id: string;
}

export async function getAllImagesFromIndexedDb(): Promise<Record<string, CustomImageConfig>> {
  try {
    const db = await getDb();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const records = request.result as StoredImageRecord[];
        const map: Record<string, CustomImageConfig> = {};
        if (Array.isArray(records)) {
          records.forEach((rec) => {
            if (rec && rec.id) {
              map[rec.id] = {
                url: rec.url,
                zoom: rec.zoom,
                offsetX: rec.offsetX,
                offsetY: rec.offsetY,
                customName: rec.customName,
                updatedAt: rec.updatedAt
              };
            }
          });
        }
        resolve(map);
      };

      request.onerror = () => {
        resolve({});
      };
    });
  } catch (err) {
    console.warn('IndexedDB read error, falling back:', err);
    return {};
  }
}

export async function saveImageToIndexedDb(id: string, config: CustomImageConfig): Promise<boolean> {
  try {
    const db = await getDb();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const record: StoredImageRecord = {
        id,
        ...config
      };
      const request = store.put(record);

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn('IndexedDB save error:', err);
    return false;
  }
}

export async function deleteImageFromIndexedDb(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn('IndexedDB delete error:', err);
    return false;
  }
}

export async function clearAllImagesFromIndexedDb(): Promise<boolean> {
  try {
    const db = await getDb();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn('IndexedDB clear error:', err);
    return false;
  }
}
