import { ContentFile } from '@analogjs/content';
import { BlogPost } from '@models/post';
import { getArchiveLinks } from './get-archive-links'; // Adjust the path as needed

describe('getArchiveLinks', () => {
  it('should return an empty array when no valid posts are provided', () => {
    const posts: ContentFile<BlogPost>[] = [];
    const archiveLinks = getArchiveLinks(posts);
    expect(archiveLinks).toEqual([]);
  });

  it('should generate ArchiveLinks for valid posts', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: { date: '2021-06-16 04:42:07 UTC' },
        filename: 'test-1.md',
        slug: 'test-1',
      },
      {
        attributes: { date: '2021-06-14 04:42:07 UTC' },
        filename: 'test-1.md',
        slug: 'test-1',
      },
      {
        attributes: { date: '2021-07-22T20:56:30-07:00' },
        filename: 'test-2.md',
        slug: 'test-2',
      },
      {
        attributes: { date: '2022-08-15T12:34:56Z' },
        filename: 'test-3.md',
        slug: 'test-3',
      },
    ];

    const archiveLinks = getArchiveLinks(posts);

    expect(archiveLinks).toEqual([
      { label: 'June 2021', month: '06', year: '2021' },
      { label: 'July 2021', month: '07', year: '2021' },
      { label: 'August 2022', month: '08', year: '2022' },
    ]);
  });

  it('should ignore posts with missing or invalid dates', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: { date: '2021-06-16 04:42:07 UTC' },
        filename: 'test-4.md',
        slug: 'test-4',
      },
      {
        attributes: { date: '' }, // Missing date
        filename: 'test-5.md',
        slug: 'test-5',
      },
      {
        attributes: { date: 'invalid-date' }, // Invalid date
        filename: 'test-6.md',
        slug: 'test-6',
      },
    ];

    const archiveLinks = getArchiveLinks(posts);

    expect(archiveLinks).toEqual([
      { label: 'June 2021', month: '06', year: '2021' },
    ]);
  });
});
