import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';

import { BlogPost } from '@models/post';
import { getMonth } from './src/app/utils/get-month';
import { getYear } from './src/app/utils/get-year';

export function getBlogPosts() {
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
