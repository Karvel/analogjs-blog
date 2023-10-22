import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

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

@Component({
  selector: 'app-blog-index',
  standalone: true,
  imports: [BlogCardComponent, NgFor, NgIf],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1>Blog Posts:</h1>
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
  ).sort(sortByUpdatedOrOriginalDate);

  private metadataService = inject(MetadataService);

  constructor() {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
  }
}
