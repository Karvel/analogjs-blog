import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';

import { ContentFile, injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import { ArchiveComponent } from '@components/archive/archive.component';
import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { PaginatorComponent } from '@components/paginator/paginator.component';
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
  imports: [
    ArchiveComponent,
    BlogCardComponent,
    NgFor,
    NgIf,
    PaginatorComponent,
  ],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="text-xl">Blog Posts:</h1>
          <ul>
            <ng-container *ngIf="posts?.length; else emptyList">
              <li *ngFor="let post of displayedPosts">
                <app-blog-card [post]="post" />
              </li>
              <app-paginator
                [itemsPerPage]="itemsPerPage"
                [totalItems]="totalItems"
                (pageChanged)="onPageChanged($event)"
              />
            </ng-container>
            <ng-template #emptyList
              ><li
                class="py-5 flex flex-col-reverse sm:flex-row text-lg font-bold"
              >
                No posts yet!
              </li></ng-template
            >
          </ul>
          <app-archive [posts]="posts" />
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent {
  public displayedPosts: ContentFile<BlogPost>[] = [];
  public itemsPerPage = 5;
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  )
    .filter((post) => post.attributes.published)
    .sort(sortByUpdatedOrOriginalDate);
  public totalItems = this.posts.length;

  private cd = inject(ChangeDetectorRef);
  private metadataService = inject(MetadataService);

  constructor() {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }

  public onPageChanged(page: number = 1): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPosts = this.posts.slice(startIndex, endIndex);
    this.cd.detectChanges();
  }
}
