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
      { attributes: { tags: '', published: true }, filename: '', slug: '' },
      { attributes: { tags: '', published: true }, filename: '', slug: '' },
    ];
    const result = aggregateAndWeighTags(posts);
    expect(result).toEqual([]);
  });

  it('should correctly aggregate and weigh tags for published posts', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: {
          tags: 'typescript, javascript, programming',
          published: true,
        },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: 'typescript, web development', published: true },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: 'javascript, programming', published: true },
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

  it('should ignore tags from unpublished posts', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: {
          tags: 'typescript, javascript, programming',
          published: false,
        },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: 'typescript, web development', published: true },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: 'javascript, programming', published: false },
        filename: '',
        slug: '',
      },
    ];

    const result = aggregateAndWeighTags(posts);
    expect(result).toEqual([
      { name: 'typescript', weight: 1 },
      { name: 'web development', weight: 1 },
    ]);
  });

  it('should ignore empty tags and trim whitespace for published posts', () => {
    const posts: ContentFile<BlogPost>[] = [
      {
        attributes: {
          tags: 'typescript, , javascript , programming',
          published: true,
        },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: 'typescript, web development, ', published: true },
        filename: '',
        slug: '',
      },
      {
        attributes: { tags: ' javascript,  programming  ', published: true },
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
        attributes: { tags: 'typescript, javascript', published: true },
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
