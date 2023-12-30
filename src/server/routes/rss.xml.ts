import { defineEventHandler } from 'h3';
import RSS from 'rss';
import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { marked } from 'marked';

import { BlogPost } from '@models/post';
import { getMonth } from '../../app/utils/get-month';
import { getYear } from '../../app/utils/get-year';
import { splitTagStringIntoStringArray } from '../../app/utils/split-tag-string-into-array';

const posts = fs.readdirSync('./src/content/posts');
async function generateRssFeed() {
  const site_url = 'https://elanna.me';

  const feedOptions = {
    title: 'Hapax Legomenon | RSS Feed',
    description: 'Hapax Legomenon Blog Posts',
    site_url: site_url,
    feed_url: `${site_url}/api/rss.xml`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  posts
    .map((contentFile) => {
      const fileContents = fs.readFileSync(
        path.resolve('src/content/posts', contentFile),
        'utf8',
      );
      return {
        attributes: fm(fileContents).attributes as BlogPost,
        body: fm(fileContents).body,
      };
    })
    .filter(({ attributes }) => attributes.published)
    .sort((a1, a2) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a1.attributes as any).date > (a2.attributes as any).date ? -1 : 1,
    )
    .forEach(({ attributes, body }) => {
      const html = marked.parse(
        body.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''),
      );
      const month = getMonth(attributes.date);
      const year = getYear(attributes.date);
      const description = html ?? '';
      const imageMarkup = attributes.cover_image
        ? `<img src="${attributes.cover_image}" /><br />`
        : `<img src="${site_url}/images/self/fallback_cover_image.png" /><br />`;
      const descriptionWithMarkup = imageMarkup
        ? `${imageMarkup}${description}`
        : description;
      feed.item({
        title: attributes.title ?? '',
        author: attributes.author ?? '',
        description: descriptionWithMarkup ?? '',
        url: `${site_url}/blog/${year}/${month}/${attributes.slug}` ?? '',
        date: attributes.date ?? '',
        categories: [splitTagStringIntoStringArray(attributes.tags) ?? []],
      });
    });

  return feed.xml({ indent: true });
}

export default defineEventHandler(async (event) => {
  const feedString = await generateRssFeed();
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feedString);
});
