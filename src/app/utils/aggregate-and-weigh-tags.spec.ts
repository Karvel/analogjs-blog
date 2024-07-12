import { ContentFile } from '@analogjs/content';

import { aggregateAndWeighTags } from './aggregate-and-weigh-tags';
import { BlogPost } from '@models/post';

describe('aggregateAndWeighTags', () => {
  it('should return an empty array if no posts are provided', () => {
    const posts: ContentFile<BlogPost>[] = [];
    const result = aggregateAndWeighTags(posts);
    expect(result).toEqual([]);
  });

  it('should return an empty array if no tags are present in the posts', () => {
    const posts: ContentFile<BlogPost>[] = [
      { attributes: { tags: '' }, filename: '', slug: '' },
      { attributes: { tags: '' }, filename: '', slug: '' },
    ];
    const result = aggregateAndWeighTags(posts);
    expect(result).toEqual([]);
  });

  it('should correctly aggregate and weigh tags', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: { tags: 'typescript, javascript, programming' },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: 'typescript, web development' },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: 'javascript, programming' },
        filename: '',
        slug: '',
      },
    ];

    const result = aggregateAndWeighTags(posts);
    expect(result).toEqual([
      { name: 'typescript', weight: 2 },
      { name: 'javascript', weight: 2 },
      { name: 'programming', weight: 2 },
      { name: 'web development', weight: 1 },
    ]);
  });

  it('should ignore empty tags and trim whitespaces', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: { tags: 'typescript, , javascript , programming' },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: 'typescript, web development, ' },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: ' javascript,  programming  ' },
        filename: '',
        slug: '',
      },
    ];

    const result = aggregateAndWeighTags(posts);
    expect(result).toEqual([
      { name: 'typescript', weight: 2 },
      { name: 'javascript', weight: 2 },
      { name: 'programming', weight: 2 },
      { name: 'web development', weight: 1 },
    ]);
  });

  it('should handle posts without the tags attribute gracefully', () => {
    const posts: ContentFile<BlogPost>[] = [
      { attributes: {}, filename: '', slug: '' },
      {
        attributes: { tags: 'typescript, javascript' },
        filename: '',
        slug: '',
      },
      { attributes: {}, filename: '', slug: '' },
    ];

    const result = aggregateAndWeighTags(posts);
    expect(result).toEqual([
      { name: 'typescript', weight: 1 },
      { name: 'javascript', weight: 1 },
    ]);
  });
});
