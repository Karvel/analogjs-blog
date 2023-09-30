import { Tag } from '@models/tag';
import { splitTagStringIntoArray } from './split-tag-string-into-array'; // Import the function and interface you want to test

describe('splitTagStringIntoArray', () => {
  it('should return an empty array when tagString is undefined', () => {
    const result = splitTagStringIntoArray(undefined);
    expect(result).toEqual([]); // Expect an empty array to be returned
  });

  it('should return an empty array when tagString is null', () => {
    const result = splitTagStringIntoArray(null);
    expect(result).toEqual([]); // Expect an empty array to be returned
  });

  it('should split a comma-separated tagString into an array of Tag objects', () => {
    const tagString = 'tag1, tag2, tag3';
    const result = splitTagStringIntoArray(tagString);

    const expectedTags: Tag[] = [
      { name: 'tag1' },
      { name: 'tag2' },
      { name: 'tag3' },
    ];

    expect(result).toEqual(expectedTags); // Expect an array of Tag objects
  });

  it('should trim whitespace from tag names', () => {
    const tagString = ' tag1,tag2 , tag3 ';
    const result = splitTagStringIntoArray(tagString);

    const expectedTags: Tag[] = [
      { name: 'tag1' },
      { name: 'tag2' },
      { name: 'tag3' },
    ];

    expect(result).toEqual(expectedTags); // Expect tag names to be trimmed
  });

  it('should handle an empty tagString and return an empty array', () => {
    const tagString = '';
    const result = splitTagStringIntoArray(tagString);
    expect(result).toEqual([]); // Expect an empty array to be returned
  });

  it('should handle a single tag without commas', () => {
    const tagString = 'tag1';
    const result = splitTagStringIntoArray(tagString);

    const expectedTags: Tag[] = [{ name: 'tag1' }];

    expect(result).toEqual(expectedTags); // Expect an array with a single Tag object
  });

  it('should handle leading and trailing commas', () => {
    const tagString = ',tag1,tag2,tag3,';
    const result = splitTagStringIntoArray(tagString);

    const expectedTags: Tag[] = [
      { name: 'tag1' },
      { name: 'tag2' },
      { name: 'tag3' },
    ];

    expect(result).toEqual(expectedTags); // Expect leading and trailing commas to be ignored
  });
});
