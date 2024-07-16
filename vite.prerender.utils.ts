import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';

import { ArchiveLink } from '@models/archive-link';
import { BlogPost } from '@models/post';
import { getMonth } from './src/app/utils/get-month';
import { getMonthName } from './src/app/utils/get-month-name';
import { getYear } from './src/app/utils/get-year';
import { isValidDate } from './src/app/utils/is-valid-date';
import { splitTagStringIntoTagArray } from './src/app/utils/split-tag-string-into-array';

function getPublishedPosts(): {
  attributes: BlogPost;
  body: string;
  file: string;
}[] {
  return fs
    .readdirSync('./src/content/posts')
    .map((contentFile) => {
      const fileContents = fs.readFileSync(
        path.resolve('src/content/posts', contentFile),
        'utf8',
      );
      return {
        attributes: fm(fileContents).attributes as BlogPost,
        body: fm(fileContents).body,
        file: contentFile,
      };
    })
    .filter(({ attributes }) => attributes.published)
    .sort((a1, a2) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a1.attributes as any).date > (a2.attributes as any).date ? -1 : 1,
    );
}

export function getBlogPosts(): string[] {
  const publishedPosts = getPublishedPosts().map((post) => {
    const month = getMonth(post.attributes.date);
    const year = getYear(post.attributes.date);
    return `/blog/${year}/${month}/${path.parse(post.file).name}`;
  });
  return publishedPosts;
}

export function getBlogCategories(): string[] {
  const uniqueCategories = new Set<string>();

  getPublishedPosts().map((post) => {
    if (post.attributes.category) {
      uniqueCategories.add(post.attributes.category.toLowerCase());
    }
  });

  const uniqueCategoriesArray = Array.from(uniqueCategories).sort();

  return uniqueCategoriesArray.map(
    (category) => `/category/${encodeURI(category)}`,
  );
}

export function getBlogTags(): string[] {
  const uniqueTags = new Set<string>();

  getPublishedPosts().map((post) => {
    if (post.attributes.tags?.length) {
      const tags = splitTagStringIntoTagArray(post.attributes.tags);
      tags.forEach((tag) => uniqueTags.add(tag?.name.toLowerCase()));
    }
  });

  const uniqueTagsArray = Array.from(uniqueTags).sort();

  return uniqueTagsArray.map((tag) => `/tag/${encodeURI(tag)}`);
}

export function getBlogArchives(): string[] {
  const archiveMap = new Map<string, ArchiveLink>();

  getPublishedPosts().map((post) => {
    if (post.attributes.date) {
      const date = new Date(post.attributes.date);
      const year = date.getUTCFullYear().toString();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const label = `${getMonthName(parseInt(month))} ${year}`;

      if (isValidDate(date) && post.attributes.date) {
        archiveMap.set(label, { label, month, year });
      }
    }
  });

  return Array.from(archiveMap.values()).map(
    (archiveLink) => `/${archiveLink.year}/${archiveLink.month}`,
  );
}
