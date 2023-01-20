import { v4 as uuidv4 } from 'uuid';

import { ObjectEntries } from 'types/helpers';
import { ReadInterface, WriteInterface } from './interfaces';

export abstract class LocalStorageRepository<TData extends object>
  implements ReadInterface<TData>, WriteInterface<TData>
{
  private readonly storage: Storage;
  private prefixKey = '';

  constructor(prefixKey = '') {
    if (this.isStorageSupported()) {
      this.storage = localStorage;
    } else {
      throw new Error(
        'LocalStorage is not supported by this browser. Try another one'
      );
    }

    this.prefixKey = prefixKey;
  }

  find(criteria?: unknown): TData[];
  find(criteria?: { select: (keyof TData)[] }): Partial<TData>[] {
    const allKeys = Object.keys(this.storage);
    const pattern = `^${this.prefixKey}`;

    const matchedKeys = allKeys
      .filter((key) => key.match(new RegExp(pattern)))
      .map((key) => key.replace(this.prefixKey, ''));

    let result = matchedKeys.reduce((acc, key) => {
      const value = this.findOne(key);

      if (value != null) {
        acc.push(value);
      }

      return acc;
    }, [] as Partial<TData>[]);

    // Select necessary fields
    if (criteria && criteria.select.length > 0) {
      const selectSet = new Set(criteria.select);

      result = result.map((data) => {
        const selectedValues = (
          Object.entries(data) as ObjectEntries<TData>
        ).filter(([key]) => selectSet.has(key));

        return Object.fromEntries(selectedValues) as Partial<TData>;
      });
    }

    return result;
  }

  findOne(key: string): TData | null;
  findOne(key: string, defaultValue: TData): TData;
  findOne(key: string, defaultValue?: TData): TData | null {
    const keyWithPrefix = this.getKeyWithPrefix(key);
    const data: string | null = this.storage.getItem(keyWithPrefix);

    if (data !== null) {
      return this.toObject(data);
    }

    if (defaultValue) {
      return defaultValue;
    }

    return null;
  }

  create(value: object | string | unknown): TData;
  create(value: object | string | unknown, key: string): TData | never;
  create(value: object | string | unknown, key?: string): TData | never {
    if (key && this.isExist(key)) {
      throw new Error(
        `Data with the key ${key} exists. Maybe you want to update?`
      );
    }

    const keyWithPrefix = this.getKeyWithPrefix(key ?? uuidv4());
    const data = this.mapRawValueToData(value);

    this.storage.setItem(keyWithPrefix, this.toJson(data));

    return data;
  }

  update(key: string, value: Partial<TData>): TData | never {
    const keyWithPrefix = this.getKeyWithPrefix(key);

    const data = this.findOne(key);

    if (data === null) {
      throw new Error(`data with key ${key} not found`);
    }

    const updatedDate = this.mapObjectToData(value, data);

    this.storage.setItem(keyWithPrefix, this.toJson(updatedDate));

    return updatedDate;
  }

  delete(key: string): void {
    const keyWithPrefix = this.getKeyWithPrefix(key);

    this.storage.removeItem(keyWithPrefix);
  }

  deleteAll(): void {
    this.storage.clear();
  }

  private isStorageSupported(): boolean {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (error) {
      return false;
    }
  }

  private getKeyWithPrefix(key: string): string {
    return [this.prefixKey, key].join('');
  }

  private isExist(key: string): boolean {
    const keyWithPrefix = this.getKeyWithPrefix(key);

    const data = this.findOne(keyWithPrefix);

    return data !== null;
  }

  protected toJson(data: TData): string {
    return JSON.stringify(data);
  }

  protected toObject(value: string): TData {
    return JSON.parse(value);
  }

  protected mapObjectToData(value: object, defaultData: TData): TData {
    const matchedKeys = new Set<keyof TData>(
      Object.keys(defaultData) as (keyof TData)[]
    );

    return (Object.entries(value) as ObjectEntries<Partial<TData>>)
      .filter(([key]) => matchedKeys.has(key))
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), defaultData);
  }

  protected abstract mapRawValueToData(value: object | string | unknown): TData;
}
