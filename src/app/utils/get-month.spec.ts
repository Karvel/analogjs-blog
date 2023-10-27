import { getMonth } from './get-month';

describe('getMonth', () => {
  it('should return the correct month when a valid date string is provided', () => {
    const validDateString = '2022-10-26T12:34:56Z';
    const result = getMonth(validDateString);
    expect(result).toBe('10'); // October
  });

  it('should return "01" when January is provided', () => {
    const januaryDateString = '2022-01-15T00:00:00Z';
    const result = getMonth(januaryDateString);
    expect(result).toBe('01');
  });

  it('should return "12" when December is provided', () => {
    const decemberDateString = '2022-12-31T23:59:59Z';
    const result = getMonth(decemberDateString);
    expect(result).toBe('12');
  });

  it('should return "" for an empty date string', () => {
    const emptyDateString = '';
    const result = getMonth(emptyDateString);
    expect(result).toBe('');
  });

  it('should return "" for an undefined date string', () => {
    const undefinedDateString = undefined;
    const result = getMonth(undefinedDateString);
    expect(result).toBe('');
  });

  it('should return "" for an invalid date string', () => {
    const invalidDateString = 'invalid-date';
    const result = getMonth(invalidDateString);
    expect(result).toBe('');
  });
});
