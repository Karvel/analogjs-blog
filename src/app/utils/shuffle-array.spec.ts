import { shuffleArray } from './shuffle-array';

describe('shuffleArray', () => {
  it('should shuffle an array', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);

    // Check if the length remains the same
    expect(shuffledArray.length).toBe(originalArray.length);

    // Check if the shuffled array contains the same elements
    originalArray.forEach((element) => {
      expect(shuffledArray).toContain(element);
    });

    // Check if the shuffled array is not the same as the original array
    expect(shuffledArray).not.toEqual(originalArray);
  });

  it('should return an empty array when called with an empty array', () => {
    const originalArray: number[] = [];
    const shuffledArray = shuffleArray(originalArray);
    expect(shuffledArray).toEqual([]);
  });

  it('should return the same array when called with a single-element array', () => {
    const originalArray = [42];
    const shuffledArray = shuffleArray(originalArray);
    expect(shuffledArray).toEqual(originalArray);
  });
});
