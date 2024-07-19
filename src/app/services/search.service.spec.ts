import { ContentFile } from '@analogjs/content';

import { SearchService } from './search.service';
import { BlogPost } from '@models/post';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    service = new SearchService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if query is empty', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: {
          title: 'Test Post',
          date: '2024-07-18',
          slug: 'test-post',
        },
        content: 'This is test post content.',
        filename: '',
        slug: '',
      },
    ];

    const actualValue = service.search(posts, '');
    expect(actualValue).toEqual([]);
  });

  it('should return an empty array if no posts match the query', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: {
          title: 'Test Post',
          date: '2024-07-18',
          slug: 'test-post',
        },
        content: 'This is test post content.',
        filename: '',
        slug: '',
      },
    ];

    const actualValue = service.search(posts, 'no-match');
    expect(actualValue).toEqual([]);
  });

  it('should return posts that match the query', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: {
          title: 'Test Post',
          date: '2024-07-18',
          slug: 'test-post',
        },
        content: 'This is test post content.',
        filename: '',
        slug: '',
      },
      {
        attributes: {
          title: 'Another Post',
          date: '2024-07-18',
          slug: 'another-post',
        },
        content: 'Additional content.',
        filename: '',
        slug: '',
      },
    ];

    const actualValue = service.search(posts, 'test');
    const expectedValue = [
      {
        title: 'Test Post',
        slug: '2024/07/test-post',
      },
    ];
    expect(actualValue).toEqual(expectedValue);
  });

  it('should return multiple posts that match the query', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: {
          title: 'Test Post',
          date: '2024-07-18',
          slug: 'test-post',
        },
        content: 'This is test post content.',
        filename: '',
        slug: '',
      },
      {
        attributes: {
          title: 'Another Test Post',
          date: '2024-07-18',
          slug: 'another-test-post',
        },
        content: 'Additional content.',
        filename: '',
        slug: '',
      },
    ];

    const actualValue = service.search(posts, 'test');
    const expectedValue = [
      {
        title: 'Test Post',
        slug: '2024/07/test-post',
      },
      {
        title: 'Another Test Post',
        slug: '2024/07/another-test-post',
      },
    ];
    expect(actualValue).toEqual(expectedValue);
  });

  it('should should ignore case sensitivity when matching', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: {
          title: 'Test Post',
          date: '2024-07-18',
          slug: 'test-post',
        },
        content: 'This is test post content.',
        filename: '',
        slug: '',
      },
    ];

    const actualValue = service.search(posts, 'TEST');
    const expectedValue = [
      {
        title: 'Test Post',
        slug: '2024/07/test-post',
      },
    ];
    expect(actualValue).toEqual(expectedValue);
  });
});
