import { Injectable } from '@angular/core';

import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { SearchResult, SearchResultSection } from '@models/search';
import { getYear } from '@utils/get-year';
import { getMonth } from '@utils/get-month';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public search(
    posts: ContentFile<BlogPost>[],
    query: string,
  ): SearchResultSection[] {
    const searchResult = new Array<SearchResultSection>();
    this.searchPosts(posts, searchResult, query);

    return searchResult;
  }

  private searchPosts(
    posts: ContentFile<BlogPost>[],
    resultList: SearchResultSection[],
    query: string,
  ): SearchResultSection[] {
    const section: SearchResultSection = {
      results: [],
    };

    posts.forEach((post) => {
      const postProperties = Object.values(post);

      for (const property of postProperties) {
        const result: SearchResult = {
          title: '',
          slug: '',
          matchResult: '',
        };
        if (
          query &&
          typeof property === 'string' &&
          property.toLowerCase().includes(query.toLowerCase())
        ) {
          result.title = post.attributes.title ?? '';
          const year = getYear(post.attributes.date);
          const month = getMonth(post.attributes.date);
          result.slug = `${year}/${month}/${post.attributes.slug}` ?? '';
          result.matchResult = property;
          section.results.push(result);
          return;
        }
      }

      return undefined;
    });

    if (section.results.length > 0) {
      resultList.push(section);
    }

    return resultList;
  }
}
