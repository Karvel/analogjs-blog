import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';

import { ArchiveLink } from '@models/archive-link';
import { BlogPost } from '@models/post';
import { getMonth } from './src/app/utils/get-month';
import { getMonthName } from './src/app/utils/get-month-name';
import { getYear } from './src/app/utils/get-year';
import { isValidDate } from './src/app/utils/is-valid-date';
import { splitTagStringIntoArray } from './src/app/utils/split-tag-string-into-array';

export function getBlogPosts(): string[] {
  const posts = fs.readdirSync('./src/content/posts').map((file: string) => {
    const fileContents = fs.readFileSync(
      path.resolve('src/content/posts', file),
      'utf8',
    );
    const attributes = fm(fileContents).attributes as BlogPost;
    const month = getMonth(attributes.date);
    const year = getYear(attributes.date);
    return `/blog/${year}/${month}/${path.parse(file).name}`;
  });
  return posts;
}

export function getBlogCategories(): string[] {
  const uniqueCategories = new Set<string>();
  fs.readdirSync('./src/content/posts').map((file: string) => {
    const fileContents = fs.readFileSync(
      path.resolve('src/content/posts', file),
      'utf8',
    );
    const attributes = fm(fileContents).attributes as BlogPost;
    if (attributes.category) {
      uniqueCategories.add(attributes.category.toLowerCase());
    }
  });
  const uniqueCategoriesArray = Array.from(uniqueCategories).sort();

  return uniqueCategoriesArray.map(
    (category) => `/category/${encodeURI(category)}`,
  );
}

export function getBlogTags(): string[] {
  const uniqueTags = new Set<string>();
  fs.readdirSync('./src/content/posts').map((file: string) => {
    const fileContents = fs.readFileSync(
      path.resolve('src/content/posts', file),
      'utf8',
    );
    const attributes = fm(fileContents).attributes as BlogPost;
    if (attributes.tags?.length) {
      const tags = splitTagStringIntoArray(attributes.tags);
      tags.forEach((tag) => uniqueTags.add(tag?.name.toLowerCase()));
    }
  });
  const uniqueTagsArray = Array.from(uniqueTags).sort();

  return uniqueTagsArray.map((tag) => `/tag/${encodeURI(tag)}`);
}

export function getBlogArchives(): string[] {
  const archiveMap = new Map<string, ArchiveLink>();
  fs.readdirSync('./src/content/posts').map((file: string) => {
    const fileContents = fs.readFileSync(
      path.resolve('src/content/posts', file),
      'utf8',
    );
    const attributes = fm(fileContents).attributes as BlogPost;
    if (attributes.date) {
      const date = new Date(attributes.date);
      const year = date.getUTCFullYear().toString();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const label = `${getMonthName(parseInt(month))} ${year}`;

      if (isValidDate(date) && attributes.date) {
        archiveMap.set(label, { label, month, year });
      }
    }
  });
  return Array.from(archiveMap.values()).map(
    (archiveLink) => `/${archiveLink.year}/${archiveLink.month}`,
  );
}
