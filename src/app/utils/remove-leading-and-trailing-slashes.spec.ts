import { describe, it, expect } from 'vitest';
import { removeLeadingAndTrailingSlashes } from './remove-leading-and-trailing-slashes';

describe('removeLeadingAndTrailingSlashes', () => {
  it('removes leading slashes from a string', () => {
    const input = '/leading/slash';
    const expectedValue = 'leading/slash';
    const actualValue = removeLeadingAndTrailingSlashes(input);
    expect(actualValue).toBe(expectedValue);
  });

  it('removes trailing slashes from a string', () => {
    const input = 'trailing/slash/';
    const expectedValue = 'trailing/slash';
    const actualValue = removeLeadingAndTrailingSlashes(input);
    expect(actualValue).toBe(expectedValue);
  });

  it('removes both leading and trailing slashes from a string', () => {
    const input = '/both/sides/';
    const expectedValue = 'both/sides';
    const actualValue = removeLeadingAndTrailingSlashes(input);
    expect(actualValue).toBe(expectedValue);
  });

  it('does nothing if there are no leading or trailing slashes', () => {
    const input = 'test/test/test';
    const expectedValue = 'test/test/test';
    const actualValue = removeLeadingAndTrailingSlashes(input);
    expect(actualValue).toBe(expectedValue);
  });

  it('returns an empty string if the input is just slashes', () => {
    const input = '/////';
    const expectedValue = '';
    const actualValue = removeLeadingAndTrailingSlashes(input);
    expect(actualValue).toBe(expectedValue);
  });

  it('handles strings with only whitespace and slashes correctly', () => {
    const input = ' / / ';
    const expectedValue = ' / / ';
    const actualValue = removeLeadingAndTrailingSlashes(input);
    expect(actualValue).toBe(expectedValue);
  });
});
