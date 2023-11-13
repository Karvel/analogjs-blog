import { getYear } from './get-year';

describe('getYear', () => {
  it('should return the correct year when a valid date string is provided', () => {
    const validDateString = '2022-10-26T12:34:56Z';
    const result = getYear(validDateString);
    expect(result).toBe('2022');
  });

  it('should return an empty string when an invalid date string is provided', () => {
    const invalidDateString = 'invalid-date';
    const result = getYear(invalidDateString);
    expect(result).toBe('');
  });

  it('should return an empty string for an empty date string', () => {
    const emptyDateString = '';
    const result = getYear(emptyDateString);
    expect(result).toBe('');
  });

  it('should return an empty string for an undefined date string', () => {
    const undefinedDateString = undefined;
    const result = getYear(undefinedDateString);
    expect(result).toBe('');
  });

  it('should return the correct year for a valid date string with UTC time', () => {
    const dateStringUTC = '2023-01-15T00:00:00Z';
    const result = getYear(dateStringUTC);
    expect(result).toBe('2023');
  });

  it('should return the correct year for a valid date string with a time offset', () => {
    const dateStringWithOffset = '2024-07-31T23:59:59-07:00';
    const result = getYear(dateStringWithOffset);
    expect(result).toBe('2024');
  });

  it('should return an empty string for a date string with a missing year', () => {
    const dateStringMissingYear = '12-31T23:59:59-07:00';
    const result = getYear(dateStringMissingYear);
    expect(result).toBe('');
  });
});
