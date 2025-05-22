import { getCategoryFromLabel } from './get-category-from-label';

describe('getCategoryFromLabel', () => {
  it('should return "development" for known development tags', () => {
    expect(getCategoryFromLabel('angular')).toBe('development');
    expect(getCategoryFromLabel('reactive forms')).toBe('development');
    expect(getCategoryFromLabel('git')).toBe('development');
  });

  it('should return "photography" for known photography tags', () => {
    expect(getCategoryFromLabel('fujifilm')).toBe('photography');
  });

  it('should return "miscellaneous" for known miscellaneous tags', () => {
    expect(getCategoryFromLabel('hello world')).toBe('miscellaneous');
    expect(getCategoryFromLabel('imposter syndrome')).toBe('miscellaneous');
  });

  it('should return an empty string for unknown or empty tags', () => {
    expect(getCategoryFromLabel('unknown tag')).toBe('');
    expect(getCategoryFromLabel('')).toBe('');
  });

  it('should be case insensitive', () => {
    expect(getCategoryFromLabel('ANGULAR')).toBe('development');
    expect(getCategoryFromLabel('Fujifilm')).toBe('photography');
    expect(getCategoryFromLabel('HeLLo wOrLd')).toBe('miscellaneous');
  });
});
