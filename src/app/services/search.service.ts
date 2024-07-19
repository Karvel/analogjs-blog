import { Injectable } from '@angular/core';

import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { SearchResult } from '@models/search';
import { getYear } from '@utils/get-year';
import { getMonth } from '@utils/get-month';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public search(posts: ContentFile<BlogPost>[], query: string): SearchResult[] {
    const resultList = new Array<SearchResult>();

    posts.forEach((post) => {
      const postValues = Object.values(post?.attributes);

      for (const value of postValues) {
        const result: SearchResult = {
          title: '',
          slug: '',
        };
        if (
          query &&
          typeof value === 'string' &&
          value.toLowerCase().includes(query.toLowerCase())
        ) {
          result.title = post.attributes.title ?? '';
          const year = getYear(post.attributes.date);
          const month = getMonth(post.attributes.date);
          result.slug = `${year}/${month}/${post.attributes.slug}` ?? '';
          resultList.push(result);
          return;
        }
      }
    });

    return resultList;
  }
}
