import { getMonthName } from './get-month-name';

describe('getMonthName', () => {
  it('should return the correct month name for valid month indices', () => {
    expect(getMonthName(1)).toBe('January');
    expect(getMonthName(6)).toBe('June');
    expect(getMonthName(12)).toBe('December');
  });

  it('should return an empty string for invalid month indices', () => {
    expect(getMonthName(0)).toBe('');
    expect(getMonthName(13)).toBe('');
    expect(getMonthName(-1)).toBe('');
  });
});
