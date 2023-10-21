import { defineEventHandler } from 'h3';
import RSS from 'rss';
import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';

import { BlogPost } from '@models/post';

const posts = fs.readdirSync('./src/content');
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
        path.resolve('src/content', contentFile),
        'utf8',
      );
      return {
        attributes: fm(fileContents).attributes as BlogPost,
      };
    })
    .sort((a1, a2) =>
      (a1.attributes as any).date > (a2.attributes as any).date ? -1 : 1,
    )
    .forEach(({ attributes }) => {
      feed.item({
        title: attributes.title,
        author: attributes.author,
        description: attributes.description,
        url: `${site_url}/blog/${attributes.slug}`,
        date: attributes.date,
      });
    });

  return feed.xml({ indent: true });
}

export default defineEventHandler(async (event) => {
  const feedString = await generateRssFeed();
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feedString);
});
