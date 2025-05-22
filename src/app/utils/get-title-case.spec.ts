import { getTitleCase } from './get-title-case';

describe('getTitleCase', () => {
  it('should convert a single lowercase word to title case', () => {
    expect(getTitleCase('hello')).toBe('Hello');
  });

  it('should convert a single uppercase word to title case', () => {
    expect(getTitleCase('WORLD')).toBe('World');
  });

  it('should convert a sentence with mixed case to title case', () => {
    expect(getTitleCase('haPaX LegoMENon')).toBe('Hapax Legomenon');
  });

  it('should handle multiple spaces between words', () => {
    expect(getTitleCase('   hello   world   ')).toBe('   Hello   World   ');
    expect(getTitleCase('MULTIPLE     spaces')).toBe('Multiple     Spaces');
  });

  it('should handle empty strings', () => {
    expect(getTitleCase('')).toBe('');
  });

  it('should handle single character words correctly', () => {
    expect(getTitleCase('a b c d e')).toBe('A B C D E');
  });

  it('should not change already title-cased input', () => {
    expect(getTitleCase('This Is Already Title Case')).toBe(
      'This Is Already Title Case',
    );
  });

  it('should handle special characters and numbers correctly', () => {
    expect(getTitleCase('123 abc! @test')).toBe('123 Abc! @test');
    expect(getTitleCase('hello-world')).toBe('Hello-world');
  });
});
