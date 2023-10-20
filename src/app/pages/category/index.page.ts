import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ContentFile, injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import PillComponent from '@components/pill/pill.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { MetadataService } from '@services/metadata.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

export const pageTitle = {
  title: `Categories | ${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

export const metaTagList: MetaDefinition[] = [
  {
    name: 'description',
    content: 'A collection of all of the site categories.',
  },
  {
    name: 'author',
    content: 'Elanna Grossman',
  },
  {
    property: 'og:description',
    content: 'A collection of all of the site categories.',
  },
  {
    property: 'twitter:description',
    content: 'A collection of all of the site categories.',
  },
];

@Component({
  selector: 'app-category-index',
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
export default class IndexPageComponent implements OnInit {
  public posts = injectContentFiles<BlogPost>().sort(
    sortByUpdatedOrOriginalDate,
  );
  public categories = this.extractUniqueCategories(this.posts);

  private metadataService = inject(MetadataService);

  public ngOnInit(): void {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }

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
