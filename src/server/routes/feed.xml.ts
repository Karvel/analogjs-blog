import { defineEventHandler } from 'h3';
import { Feed } from 'feed';
import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

import { BlogPost } from '@models/post';
import { getMonth } from '../../app/utils/get-month';
import { getYear } from '../../app/utils/get-year';
import { splitTagStringIntoTagArray } from '../../app/utils/split-tag-string-into-array';

const posts = fs.readdirSync('./src/content/posts');
async function generateRssFeed() {
  const site_url = 'https://elanna.me';
  const feedOptions = {
    title: 'Hapax Legomenon | RSS Feed',
    description: 'Hapax Legomenon Blog Posts',
    id: site_url,
    link: `${site_url}/api/feed.xml`,
    updated: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new Feed(feedOptions);

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
      const dirtyHTML = marked.parse(
        body.replace(/^(\u200B|\u200C|\u200D|\u200E|\u200F|\uFEFF)/, ''),
      );
      const cleanHTML = DOMPurify.sanitize(dirtyHTML);
      const month = getMonth(attributes.date);
      const year = getYear(attributes.date);
      const content = cleanHTML ?? '';
      const description = attributes.description ?? '';
      const imageMarkup = attributes.cover_image
        ? `<img src="${attributes.cover_image}" /><br />`
        : `<img src="${site_url}/images/self/fallback_cover_image.png" /><br />`;
      const contentWithMarkup = imageMarkup
        ? `${imageMarkup}${content}`
        : content;
      const descriptionWithMarkup = imageMarkup
        ? `${imageMarkup}${description}`
        : content;
      feed.addItem({
        id: `${site_url}/blog/${year}/${month}/${attributes.slug}` ?? '',
        title: attributes.title ?? '',
        author: [
          {
            name: attributes.author ?? '',
          },
        ],
        description: descriptionWithMarkup ?? '',
        content: contentWithMarkup ?? '',
        link: `${site_url}/blog/${year}/${month}/${attributes.slug}` ?? '',
        date: new Date(attributes.date || ''),
        category: splitTagStringIntoTagArray(attributes.tags) ?? [],
      });
    });

  return feed.rss2();
}

export default defineEventHandler(async (event) => {
  const feedString = await generateRssFeed();
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feedString);
});
