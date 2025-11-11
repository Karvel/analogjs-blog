import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { sortByDate } from './sort-by-date';

describe('sortByDate', () => {
  it('should consider both null or undefined parameters as equal', () => {
    const actualValue = sortByDate(null, undefined);
    // Both are null or undefined, should be considered equal
    const expectedValue = 0;
    expect(actualValue).toBe(expectedValue);
  });

  it('should sort "b" before "a" when "a" is null or undefined', () => {
    const fileA: ContentFile<BlogPost> | null | undefined = null;
    const fileB: ContentFile<BlogPost> = {
      attributes: {
        date: '2023-09-10T00:28:38-07:00',
      },
      filename: 'test2.md',
      slug: 'test2',
    };
    const actualValue = sortByDate(fileA, fileB);
    // a is null or undefined, b comes first
    const expectedValue = 1;
    expect(actualValue).toBe(expectedValue);
  });

  it('should sort "a" before "b" when "b" is null or undefined', () => {
    const fileA: ContentFile<BlogPost> = {
      attributes: {
        date: '2023-09-10T00:28:38-07:00',
      },
      filename: 'test1.md',
      slug: 'test1',
    };
    const fileB: ContentFile<BlogPost> | null | undefined = null;
    const actualValue = sortByDate(fileA, fileB);
    // b is null or undefined, a comes first
    const expectedValue = -1;
    expect(actualValue).toBe(expectedValue);
  });

  it('should correctly sort by date when both dates are present and a is greater than b', () => {
    const fileA: ContentFile<BlogPost> = {
      attributes: {
        date: '2023-09-14T00:28:38-07:00',
      },
      filename: 'test1.md',
      slug: 'test1',
    };
    const fileB: ContentFile<BlogPost> = {
      attributes: {
        date: '2023-09-10T00:28:38-07:00',
      },
      filename: 'test2.md',
      slug: 'test2',
    };
    const actualValue = sortByDate(fileA, fileB);
    // fileA should come before fileB
    const expectedValue = 0;
    expect(actualValue).toBeLessThan(expectedValue);
  });

  it('should correctly sort by date when both dates are present and b is greater than a', () => {
    const fileA: ContentFile<BlogPost> = {
      attributes: {
        date: '2023-09-10T00:28:38-07:00',
      },
      filename: 'test1.md',
      slug: 'test1',
    };
    const fileB: ContentFile<BlogPost> = {
      attributes: {
        date: '2023-09-14T00:28:38-07:00',
      },
      filename: 'test2.md',
      slug: 'test2',
    };
    const actualValue = sortByDate(fileA, fileB);
    // fileB should come before fileA
    const expectedValue = 0;
    expect(actualValue).toBeGreaterThan(expectedValue);
  });

  it('should correctly sort by date when only one date is present', () => {
    const fileA: ContentFile<BlogPost> = {
      attributes: { date: '2023-09-10T00:28:38-07:00' },
      filename: 'test1.md',
      slug: 'test1',
    };
    const fileB: ContentFile<BlogPost> = {
      attributes: {},
      filename: 'test2.md',
      slug: 'test2',
    };
    const actualValue = sortByDate(fileA, fileB);
    // b is null or undefined, a comes first
    const expectedValue = -1;
    expect(actualValue).toBe(expectedValue);
  });

  it('should correctly sort by date when only one date is present', () => {
    const fileA: ContentFile<BlogPost> = {
      attributes: {},
      filename: 'test1.md',
      slug: 'test1',
    };
    const fileB: ContentFile<BlogPost> = {
      attributes: { date: '2023-09-10T00:28:38-07:00' },
      filename: 'test2.md',
      slug: 'test2',
    };
    const actualValue = sortByDate(fileA, fileB);
    // a is null or undefined, b comes first
    const expectedValue = 1;
    expect(actualValue).toBe(expectedValue);
  });

  it('should return 0 when both files have no date information', () => {
    const fileA: ContentFile<BlogPost> = {
      attributes: {},
      filename: 'test1.md',
      slug: 'test1',
    };
    const fileB: ContentFile<BlogPost> = {
      attributes: {},
      filename: 'test2.md',
      slug: 'test2',
    };
    const actualValue = sortByDate(fileA, fileB);
    // Both are null or undefined, should be considered equal
    const expectedValue = 0;
    expect(actualValue).toBe(expectedValue);
  });
});
