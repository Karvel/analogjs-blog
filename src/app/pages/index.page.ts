import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { RecentPhotoAlbumsComponent } from '@components/recent-photo-albums/recent-photo-albums.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { MetadataService } from '@services/metadata.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

export const pageTitle = {
  title: `${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

export const metaTagList: MetaDefinition[] = [
  {
    name: 'description',
    content: 'Elanna Grossman - Web Developer, Photographer, Linguist.',
  },
  {
    name: 'author',
    content: 'Elanna Grossman',
  },
  {
    property: 'og:description',
    content: 'Elanna Grossman - Web Developer, Photographer, Linguist.',
  },
  {
    property: 'twitter:description',
    content: 'Elanna Grossman - Web Developer, Photographer, Linguist.',
  },
  {
    name: 'keywords',
    content:
      'Elanna Grossman, Blog, Web Development, Angular, TypeScript, Photography',
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BlogCardComponent,
    NgIf,
    NgFor,
    RecentPhotoAlbumsComponent,
    RouterLink,
  ],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="sr-only">Home</h1>
          <div
            class="flex flex-col sm:flex-row justify-evenly items-center pb-4 sm:flex-nowrap"
          >
            <img
              src="images/self/me-sq.jpg"
              class="rounded-xl max-h-32 sm:max-h-36"
              alt="Me in Norway"
            />
            <div class="pt-4 sm:pl-4 sm:pt-0">
              My name is Elanna Grossman. I am a full-stack developer, primarily
              focused on Angular and .NET. I work at
              <a
                href="https://www.crexi.com"
                class=""
                target="_blank"
                rel="noopener"
                >Crexi</a
              >
              as a front end lead software engineer. I enjoy mentoring in code
              and helping dismantle some of the built-in barriers found in the
              coding world. There is more about me
              <a routerLink="/about">here</a>.
            </div>
          </div>
          <h2 class="text-xl">Latest Blog Posts:</h2>
          <ng-container *ngIf="posts?.length; else emptyResult">
            <ul>
              <li *ngFor="let post of posts">
                <app-blog-card [post]="post" />
              </li>
            </ul>
          </ng-container>
          <ng-template #emptyResult
            ><div class="py-4">There are no posts yet.</div></ng-template
          >
          <app-recent-photo-albums />
        </div>
      </div>
    </div>
  `,
})
export default class HomeComponent implements OnInit {
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  )
    .sort(sortByUpdatedOrOriginalDate)
    .slice(0, 3);

  private metadataService = inject(MetadataService);

  ngOnInit(): void {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }
}
