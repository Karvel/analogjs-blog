import { describe, it, expect } from 'vitest';

import { splitValuesOnSlash } from './split-values-on-slash';

describe('splitValuesOnSlash', () => {
  it('should return an array of values split by slashes', () => {
    const input = 'test1/test2/test3';
    const expectedValue = ['test1', 'test2', 'test3'];
    const actualValue = splitValuesOnSlash(input);
    expect(actualValue).toEqual(expectedValue);
  });

  it('should remove leading and trailing slashes and return correct array', () => {
    const input = '/test1/test2/test3/';
    const expectedValue = ['test1', 'test2', 'test3'];
    const actualValue = splitValuesOnSlash(input);
    expect(actualValue).toEqual(expectedValue);
  });

  it('should return an empty array when input is an empty string', () => {
    const input = '';
    const expectedValue: string[] = [];
    const actualValue = splitValuesOnSlash(input);
    expect(actualValue).toEqual(expectedValue);
  });

  it('should handle a single value without slashes', () => {
    const input = 'test1';
    const expectedValue = ['test1'];
    const actualValue = splitValuesOnSlash(input);
    expect(actualValue).toEqual(expectedValue);
  });

  it('should return array with empty strings for consecutive slashes', () => {
    const input = 'test1//test3';
    const expectedValue = ['test1', '', 'test3'];
    const actualValue = splitValuesOnSlash(input);
    expect(actualValue).toEqual(expectedValue);
  });
});
