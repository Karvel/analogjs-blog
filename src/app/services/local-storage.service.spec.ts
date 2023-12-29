import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(
      (key, value) => {
        localStorageMock[key] = value;
      },
    );
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(
      (key) => localStorageMock[key],
    );
    vi.spyOn(window.localStorage, 'removeItem').mockImplementation((key) => {
      delete localStorageMock[key];
    });
    vi.spyOn(window.localStorage, 'clear').mockImplementation(() => {
      localStorageMock = {};
    });

    service = new LocalStorageService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should store and retrieve an item', () => {
    const testKey = 'testKey';
    const testData = { data: 'testData' };

    service.setItem(testKey, testData);
    const retrievedData = service.getItem<typeof testData>(testKey);

    expect(retrievedData).toEqual(testData);
  });

  it('should remove an item', () => {
    const testKey = 'testKey';
    const testData = { data: 'testData' };

    service.setItem(testKey, testData);
    service.removeItem(testKey);
    const retrievedData = service.getItem<typeof testData>(testKey);

    expect(retrievedData).toBeNull();
  });

  it('should clear all items', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');
    service.clear();

    expect(service.getItem('key1')).toBeNull();
    expect(service.getItem('key2')).toBeNull();
  });
});
