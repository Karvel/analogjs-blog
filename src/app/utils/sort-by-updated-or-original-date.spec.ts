import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

describe('sortByUpdatedOrOriginalDate', () => {
  it('should consider both null or undefined parameters as equal', () => {
    const result = sortByUpdatedOrOriginalDate(null, undefined);
    expect(result).toBe(0); // Both are null or undefined, should be considered equal
  });

  it('should consider null or undefined "a" as "b" comes first', () => {
    const fileA: ContentFile<BlogPost> | null | undefined = null;
    const fileB: ContentFile<BlogPost> = {
      attributes: {
        last_updated: '2023-09-15T00:28:38-07:00',
        date: '2023-09-10T00:28:38-07:00',
      },
      filename: 'test2.md',
      slug: 'test2',
    };
    const result = sortByUpdatedOrOriginalDate(fileA, fileB);
    expect(result).toBe(1); // a is null or undefined, b comes first
  });

  it('should consider null or undefined "b" as "a" comes first', () => {
    const fileA: ContentFile<BlogPost> = {
      attributes: {
        last_updated: '2023-09-15T00:28:38-07:00',
        date: '2023-09-10T00:28:38-07:00',
      },
      filename: 'test1.md',
      slug: 'test1',
    };
    const fileB: ContentFile<BlogPost> | null | undefined = null;
    const result = sortByUpdatedOrOriginalDate(fileA, fileB);
    expect(result).toBe(-1); // b is null or undefined, a comes first
  });

  it('should correctly sort by date when both dates are present', () => {
    const file1: ContentFile<BlogPost> = {
      attributes: {
        last_updated: '2023-09-12T00:28:38-07:00',
        date: '2023-09-14T00:28:38-07:00',
      },
      filename: 'test1.md',
      slug: 'test1',
    };
    const file2: ContentFile<BlogPost> = {
      attributes: {
        last_updated: '2023-09-15T00:28:38-07:00',
        date: '2023-09-10T00:28:38-07:00',
      },
      filename: 'test2.md',
      slug: 'test2',
    };
    const result = sortByUpdatedOrOriginalDate(file1, file2);
    expect(result).toBeGreaterThan(0); // file2 should come before file1
  });

  it('should correctly sort by date when only one date is present', () => {
    const file1: ContentFile<BlogPost> = {
      attributes: { date: '2023-09-10T00:28:38-07:00' },
      filename: 'test1.md',
      slug: 'test1',
    };
    const file2: ContentFile<BlogPost> = {
      attributes: { last_updated: '2023-09-12T00:28:38-07:00' },
      filename: 'test2.md',
      slug: 'test2',
    };
    const result = sortByUpdatedOrOriginalDate(file1, file2);
    expect(result).toBeGreaterThan(0); // file2 should come before file1
  });

  it('should return 0 when both files have no date information', () => {
    const file1: ContentFile<BlogPost> = {
      attributes: {},
      filename: 'test1.md',
      slug: 'test1',
    };
    const file2: ContentFile<BlogPost> = {
      attributes: {},
      filename: 'test2.md',
      slug: 'test2',
    };
    const result = sortByUpdatedOrOriginalDate(file1, file2);
    expect(result).toBe(0); // Both files have no date information, so they should be considered equal
  });
});
