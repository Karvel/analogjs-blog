import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { Tag } from '@models/tag';

export const aggregateAndWeighTags = (
  posts: ContentFile<BlogPost>[],
): Tag[] => {
  const tagMap: { [key: string]: Tag } = {};

  posts.forEach((post) => {
    if (post.attributes.tags) {
      const tags = post.attributes.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tagName) => tagName !== '');
      tags.forEach((tag) => {
        if (tagMap[tag]) {
          tagMap[tag].weight!++;
        } else {
          tagMap[tag] = { name: tag, weight: 1 };
        }
      });
    }
  });

  return Object.values(tagMap);
};
