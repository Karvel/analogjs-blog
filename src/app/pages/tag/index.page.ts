import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile, injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import PillComponent from '@components/pill/pill.component';
import { BlogPost } from '@models/post';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';
import { splitTagStringIntoArray } from '@utils/split-tag-string-into-array';

export const routeMeta: RouteMeta = {
  title: `Tags | Hapax Legomenon`,
};

@Component({
  standalone: true,
  imports: [NgFor, PillComponent, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start">Tags:</h1>
          <ul class="pt-5 flex flex-wrap justify-evenly">
            <li *ngFor="let tag of tags" class="flex m-1">
              <app-pill [label]="tag" [route]="'/tag'" [slug]="tag" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent {
  public posts = injectContentFiles<BlogPost>().sort(
    sortByUpdatedOrOriginalDate,
  );
  public tags = this.extractUniqueTags(this.posts);

  private extractUniqueTags(blogPosts: ContentFile<BlogPost>[]): string[] {
    const uniqueTags = new Set<string>();

    for (const post of blogPosts) {
      if (post.attributes.tags?.length) {
        const tags = splitTagStringIntoArray(post.attributes.tags);
        tags.forEach((tag) => uniqueTags.add(tag?.name.toLowerCase()));
      }
    }

    const uniqueCategoriesArray = Array.from(uniqueTags).sort();

    return uniqueCategoriesArray;
  }
}
