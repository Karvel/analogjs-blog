import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';

import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { MetadataService } from '@services/metadata.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

export const pageTitle = {
  title: `Blog Posts | ${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

export const metaTagList: MetaDefinition[] = [
  {
    name: 'description',
    content: 'A collection of all of my blog posts.',
  },
  {
    name: 'author',
    content: 'Elanna Grossman',
  },
  {
    property: 'og:description',
    content: 'A collection of all of my blog posts.',
  },
  {
    property: 'twitter:description',
    content: 'A collection of all of my blog posts.',
  },
];

@Component({
  selector: 'app-blog-index',
  standalone: true,
  imports: [BlogCardComponent, NgFor, NgIf],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="text-xl">Blog Posts:</h1>
          <ul>
            <ng-container *ngIf="posts?.length; else emptyList">
              <li *ngFor="let post of posts">
                <app-blog-card [post]="post" />
              </li>
            </ng-container>
            <ng-template #emptyList
              ><li
                class="py-5 flex flex-col-reverse sm:flex-row text-lg font-bold"
              >
                No posts yet!
              </li></ng-template
            >
          </ul>
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent {
  posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  )
    .filter((post) => post.attributes.published)
    .sort(sortByUpdatedOrOriginalDate);

  private metadataService = inject(MetadataService);

  constructor() {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }
}
