import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import {
  ContentFile,
  injectContent,
  injectContentFiles,
  MarkdownComponent,
} from '@analogjs/content';

import PillComponent from '@components/pill/pill.component';
import ImageInfoPopoverContentComponent from '@components/popover/image-info-popover-content';
import PopoverComponent from '@components/popover/popover.component';
import { siteName } from '@constants/site-name';
import { ReplaceBrokenImageDirective } from '@directives/replace-broken-image.directive';
import { BlogPost } from '@models/post';
import { Tag } from '@models/tag';
import { MetadataService } from '@services/metadata.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';
import { splitTagStringIntoArray } from '@utils/split-tag-string-into-array';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    ImageInfoPopoverContentComponent,
    MarkdownComponent,
    NgClass,
    NgFor,
    NgIf,
    PillComponent,
    PopoverComponent,
    ReplaceBrokenImageDirective,
    RouterLink,
  ],
  styleUrls: ['./[slug].page.css'],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div *ngIf="post$ | async as post" class="md:w-[48rem] p-4">
        <div class="max-w mx-auto">
          <div [ngClass]="{ relative: post.attributes.cover_image }">
            <img
              *ngIf="post.attributes.cover_image"
              [src]="post.attributes.cover_image"
              [alt]="post.attributes.cover_image_title"
              appReplaceBrokenImage
              class="w-full max-w-full rounded-md"
            />
            <div [ngClass]="{ image_container: post.attributes.cover_image }">
              <h1 class="text-white text-xl font-bold text-shadow shadow-black">
                {{ post.attributes.title }}
              </h1>
              <div
                *ngIf="post.attributes.author"
                class="text-white text-xs text-shadow shadow-black"
              >
                By: {{ post.attributes.author }}
              </div>
              <div class="flex justify-between items-center text-white text-xs">
                <div class="flex text-shadow shadow-black">
                  <div *ngIf="post?.attributes?.last_updated">
                    Updated {{ post.attributes.last_updated | date }}
                  </div>
                  <div
                    *ngIf="
                      post?.attributes?.date && post?.attributes?.last_updated
                    "
                    class="pl-2"
                  >
                    | &nbsp;
                  </div>
                  <div *ngIf="post?.attributes?.date">
                    Posted {{ post.attributes.date | date }}
                  </div>
                </div>
                <div
                  *ngIf="
                    post.attributes.cover_image &&
                    post?.attributes?.cover_image_source &&
                    post?.attributes?.cover_image_title
                  "
                  class="flex"
                >
                  <app-popover
                    [altText]="'Image information'"
                    [icon]="'svg/info.svg'"
                  >
                    <app-image-info-popover-content
                      [cover_image_author]="
                        post?.attributes?.cover_image_author
                      "
                      [cover_image_source]="post.attributes.cover_image_source"
                      [cover_image_title]="post?.attributes?.cover_image_title"
                    />
                  </app-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <analog-markdown
          class="prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden"
          [content]="post.content"
        />
        <div class="flex flex-col">
          <div *ngIf="post.attributes.category" class="text-sm">
            Category:
            <app-pill
              [label]="post.attributes.category"
              [route]="'/category'"
              [slug]="post.attributes.category"
              class="m-1"
            />
          </div>
          <div *ngIf="post.attributes.tags?.length" class="text-sm">
            Tags:
            <ng-container
              *ngFor="let tag of splitTagStringIntoArray(post.attributes.tags)"
            >
              <app-pill
                [label]="tag.name"
                [route]="'/tag'"
                [slug]="tag.name"
                class="mx-1"
              />
            </ng-container>
          </div>
        </div>
        <div class="flex justify-between text-sm mt-2 gap-2">
          <button
            *ngIf="prevPost"
            [routerLink]="['/blog', prevPost.slug]"
            attr.alt="Click to go to the previous post: {{
              prevPost.attributes.title
            }}"
            type="button"
            class="inline-flex focus:outline-none bg-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 truncate"
          >
            <span>&laquo; &nbsp;</span
            ><span class="truncate">{{ prevPost.attributes.title }}</span>
          </button>
          <button
            *ngIf="nextPost"
            [routerLink]="['/blog', nextPost.slug]"
            attr.alt="Click to go to the next post: {{
              nextPost.attributes.title
            }}"
            type="button"
            class="inline-flex ml-auto focus:outline-none bg-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 truncate"
          >
            <span class="truncate">{{ nextPost.attributes.title }}</span
            ><span>&nbsp; &raquo;</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class BlogPostPageComponent {
  public nextPost!: ContentFile<BlogPost>;
  public post$ = injectContent<BlogPost>();
  private posts = injectContentFiles<BlogPost>().sort(
    sortByUpdatedOrOriginalDate,
  );
  public prevPost!: ContentFile<BlogPost>;
  public splitTagStringIntoArray = splitTagStringIntoArray;
  public tagList: Tag[] = [];

  private metadataService = inject(MetadataService);

  constructor() {
    this.post$.pipe(takeUntilDestroyed()).subscribe((post) => {
      this.setPageTitle(post);
      this.setNavigation(post, this.posts);
      this.metadataService.setMetaTagsFromFrontMatter(post);
    });
  }

  private setNavigation(
    post: ContentFile<BlogPost | Record<string, never>>,
    posts: ContentFile<BlogPost>[],
  ): void {
    const index = posts.findIndex((p) => p.slug === post.slug);
    const nextPost = posts[index + 1];
    const previousPost = posts[index - 1];

    this.nextPost = nextPost;
    this.prevPost = previousPost;
  }

  /**
   * Setting dynamic page title in component
   */
  private setPageTitle(
    post: ContentFile<BlogPost | Record<string, never>>,
  ): void {
    const title = post?.attributes?.title
      ? `${post.attributes.title} | ${siteName}`
      : `Post | ${siteName}`;
    this.metadataService.setTitle(title);
    this.metadataService.setPageURLMetaTitle(title);
  }
}
