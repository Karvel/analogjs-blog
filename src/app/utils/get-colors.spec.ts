import { Theme } from '@models/theme';
import { getColors } from './get-colors';

describe('getColors', () => {
  it('should return correct colors for "development" category', () => {
    const expected: Theme = {
      dark: 'blue-900',
      light: 'blue-200',
    };
    expect(getColors('development')).toEqual(expected);
    expect(getColors('angular')).toEqual(expected);
  });

  it('should return correct colors for "photography" category', () => {
    const expected: Theme = {
      dark: 'emerald-900',
      light: 'emerald-200',
    };
    expect(getColors('photography')).toEqual(expected);
    expect(getColors('portrait')).toEqual(expected);
  });

  it('should return correct colors for "miscellaneous" category', () => {
    const expected: Theme = {
      dark: 'rose-900',
      light: 'rose-200',
    };
    expect(getColors('miscellaneous')).toEqual(expected);
    expect(getColors('hello world')).toEqual(expected);
  });

  it('should return default colors for empty string or undefined category', () => {
    const expected: Theme = {
      dark: 'neutral-700',
      light: 'neutral-500',
      text: 'white',
    };
    expect(getColors('')).toEqual(expected);
    expect(getColors(undefined)).toEqual(expected);
  });

  it('should return default colors for unknown tags', () => {
    const expected: Theme = {
      dark: 'neutral-700',
      light: 'neutral-500',
      text: 'white',
    };
    expect(getColors('unknown tag')).toEqual(expected);
  });
});
