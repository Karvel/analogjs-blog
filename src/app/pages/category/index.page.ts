import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile, injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import PillComponent from '@components/pill/pill.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

export const routeMeta: RouteMeta = {
  title: `Categories | ${siteName}`,
};

@Component({
  standalone: true,
  imports: [NgFor, PillComponent, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start">Categories:</h1>
          <ul class="pt-5 flex flex-wrap justify-evenly">
            <li *ngFor="let category of categories" class="flex m-1">
              <app-pill
                [label]="category"
                [route]="'/category'"
                [slug]="category"
              />
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
  public categories = this.extractUniqueCategories(this.posts);

  private extractUniqueCategories(
    blogPosts: ContentFile<BlogPost>[],
  ): string[] {
    const uniqueCategories = new Set<string>();

    for (const post of blogPosts) {
      if (post.attributes.category) {
        uniqueCategories.add(post.attributes.category.toLowerCase());
      }
    }

    const uniqueCategoriesArray = Array.from(uniqueCategories).sort();

    return uniqueCategoriesArray;
  }
}
