import { isValidDate } from './is-valid-date';

describe('isValidDate', () => {
  it('should return true for a valid date', () => {
    const validDate = new Date('2022-10-24T12:00:00Z');
    const result = isValidDate(validDate);
    expect(result).toBe(true);
  });

  it('should return false for an invalid date', () => {
    const invalidDate = new Date('invalid-date');
    const result = isValidDate(invalidDate);
    expect(result).toBe(false);
  });

  it('should return false for NaN', () => {
    const invalidDate = new Date(NaN);
    const result = isValidDate(invalidDate);
    expect(result).toBe(false);
  });
});
