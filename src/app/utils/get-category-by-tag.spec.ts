import { getCategoryByTag } from './get-category-by-tag';

describe('getCategoryByTag', () => {
  it('should return "development" for known development tags', () => {
    expect(getCategoryByTag('angular')).toBe('development');
    expect(getCategoryByTag('reactive forms')).toBe('development');
    expect(getCategoryByTag('git')).toBe('development');
  });

  it('should return "photography" for known photography tags', () => {
    expect(getCategoryByTag('portrait')).toBe('photography');
    expect(getCategoryByTag('landscape')).toBe('photography');
  });

  it('should return "miscellaneous" for known miscellaneous tags', () => {
    expect(getCategoryByTag('hello world')).toBe('miscellaneous');
    expect(getCategoryByTag('imposter syndrome')).toBe('miscellaneous');
  });

  it('should return an empty string for unknown or empty tags', () => {
    expect(getCategoryByTag('unknown tag')).toBe('');
    expect(getCategoryByTag('')).toBe('');
  });

  it('should be case insensitive', () => {
    expect(getCategoryByTag('ANGULAR')).toBe('development');
    expect(getCategoryByTag('Landscape')).toBe('photography');
    expect(getCategoryByTag('HeLLo wOrLd')).toBe('miscellaneous');
  });
});
