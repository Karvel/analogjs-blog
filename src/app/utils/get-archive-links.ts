import { ContentFile } from '@analogjs/content';

import { ArchiveLink } from '@models/archive-link';
import { BlogPost } from '@models/post';

import { getMonthName } from './get-month-name';
import { isValidDate } from './is-valid-date';

export const getArchiveLinks = (
  posts: ContentFile<BlogPost>[],
): ArchiveLink[] => {
  const archiveMap = new Map<string, ArchiveLink>();

  for (const post of posts) {
    if (post.attributes.date) {
      const date = new Date(post.attributes.date);
      const year = date.getUTCFullYear().toString();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const label = `${getMonthName(parseInt(month))} ${year}`;

      if (isValidDate(date) && post.attributes.date) {
        archiveMap.set(label, { label, month, year });
      }
    }
  }

  return Array.from(archiveMap.values());
};
