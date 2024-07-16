import { describe, it, expect } from 'vitest';
import { defaultPageOptions, setPageSizeOptions } from './get-page-options';

describe('setPageSizeOptions', () => {
  it('includes options less than total items and adds an All option', () => {
    const totalItems = 30;
    const expectedOptions = [
      { label: '5', value: 5 },
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: 'All', value: totalItems },
    ];

    const result = setPageSizeOptions(totalItems);
    expect(result).toEqual(expectedOptions);
  });

  it('includes all default options and an All option when total items is large', () => {
    const totalItems = 150;
    const expectedOptions = [
      ...defaultPageOptions,
      { label: 'All', value: totalItems },
    ];

    const result = setPageSizeOptions(totalItems);
    expect(result).toEqual(expectedOptions);
  });

  it('returns only the All option when total items is less than the smallest option', () => {
    const totalItems = 3;
    const expectedOptions = [{ label: 'All', value: totalItems }];

    const result = setPageSizeOptions(totalItems);
    expect(result).toEqual(expectedOptions);
  });
});
