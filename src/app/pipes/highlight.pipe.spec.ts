import { HighlightPipe } from './highlight.pipe';

describe('[Unit] HighlightPipe', () => {
  const pipe = new HighlightPipe();
  it('should return a transformed string with each instance of the search value wrapped in <strong>', () => {
    const testValue: string = 'test';
    const searchValue: string = 't';
    const expectedValue: string = '<strong>t</strong>es<strong>t</strong>';
    expect(pipe.transform(testValue, searchValue)).toEqual(expectedValue);
  });

  it('should return a transformed string with the search value wrapped in <strong>', () => {
    const testValue: string = 'test data';
    const searchValue: string = 'te';
    const expectedValue: string = '<strong>te</strong>st data';
    expect(pipe.transform(testValue, searchValue)).toEqual(expectedValue);
  });

  it('should return the original value when the test data is not found', () => {
    const testValue: string = 'test data';
    const searchValue: string = 'x';
    const expectedValue: string = 'test data';
    expect(pipe.transform(testValue, searchValue)).toEqual(expectedValue);
  });

  it('should return the original value when there is no search value', () => {
    const testValue: string = 'test data';
    const searchValue: string = '';
    const expectedValue: string = 'test data';
    expect(pipe.transform(testValue, searchValue)).toEqual(expectedValue);
  });

  it('should return the original value when there is no test value or search value', () => {
    const testValue: string = '';
    const searchValue: string = '';
    const expectedValue: string = '';
    expect(pipe.transform(testValue, searchValue)).toEqual(expectedValue);
  });
});
