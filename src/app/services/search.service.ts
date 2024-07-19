import { Injectable } from '@angular/core';

import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { Search, SearchResult } from '@models/search';
import { getYear } from '@utils/get-year';
import { getMonth } from '@utils/get-month';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public search(posts: ContentFile<BlogPost>[], query: string): SearchResult {
    const searchResult: SearchResult = {
      isSearchTooShort: true,
      results: [],
    };
    if (query?.length > 3) {
      searchResult.isSearchTooShort = false;

      posts.forEach((post) => {
        const postValues = Object.values(post?.attributes);

        for (const value of postValues) {
          const result: Search = {
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
            searchResult.results.push(result);
            return;
          }
        }
      });
    }

    console.log('search searchResult', searchResult);
    return searchResult;
  }
}
