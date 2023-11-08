import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  ContentFile,
  injectContent,
  injectContentFiles,
  MarkdownComponent,
} from '@analogjs/content';

import { ArchiveComponent } from '@components/archive/archive.component';
import PillComponent from '@components/pill/pill.component';
import ImageInfoPopoverContentComponent from '@components/popover/image-info-popover-content.component';
import PopoverComponent from '@components/popover/popover.component';
import { PostNavigationComponent } from '@components/post-navigation/post-navigation.component';
import { siteName } from '@constants/site-name';
import { ReplaceBrokenImageDirective } from '@directives/replace-broken-image.directive';
import { BlogPost } from '@models/post';
import { Tag } from '@models/tag';
import { MetadataService } from '@services/metadata.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';
import { splitTagStringIntoArray } from '@utils/split-tag-string-into-array';

@Component({
  selector: 'app-blog-slug',
  standalone: true,
  imports: [
    ArchiveComponent,
    AsyncPipe,
    DatePipe,
    ImageInfoPopoverContentComponent,
    MarkdownComponent,
    NgClass,
    NgFor,
    NgIf,
    PillComponent,
    PopoverComponent,
    PostNavigationComponent,
    ReplaceBrokenImageDirective,
  ],
  styleUrls: ['./[year].[month].[slug].page.css'],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div class="md:w-[48rem] p-4">
        <div *ngIf="post$ | async as post; else emptyResult" class="flex-1">
          <div class="max-w mx-auto">
            <div [ngClass]="{ relative: post.attributes.cover_image }">
              <img
                *ngIf="post.attributes.cover_image"
                appReplaceBrokenImage
                [src]="post.attributes.cover_image"
                [alt]="post.attributes.cover_image_title"
                class="w-full max-w-full rounded-md"
              />
              <div [ngClass]="{ image_container: post.attributes.cover_image }">
                <h1
                  class="text-white text-xl font-bold text-shadow-sm shadow-black"
                >
                  {{ post.attributes.title }}
                </h1>
                <div
                  *ngIf="post.attributes.author"
                  class="text-white text-xs text-shadow-sm shadow-black"
                >
                  By: {{ post.attributes.author }}
                </div>
                <div
                  class="flex justify-between items-center text-white text-xs"
                >
                  <div class="flex text-shadow-sm shadow-black">
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
                        [cover_image_source]="
                          post.attributes.cover_image_source
                        "
                        [cover_image_title]="
                          post?.attributes?.cover_image_title
                        "
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
                *ngFor="
                  let tag of splitTagStringIntoArray(post.attributes.tags)
                "
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
          <app-post-navigation [post]="post" [posts]="posts" />
        </div>
      </div>
      <ng-template #emptyResult>
        <div>
          <div class="pt-5">There is no matching post.</div>
          <div class="mt-5">
            <app-archive [posts]="posts" />
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export default class BlogPostPageComponent {
  public post$ = injectContent<BlogPost>({
    param: 'slug',
    subdirectory: 'posts',
  });
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  ).sort(sortByUpdatedOrOriginalDate);
  public splitTagStringIntoArray = splitTagStringIntoArray;
  public tagList: Tag[] = [];

  private metadataService = inject(MetadataService);

  constructor() {
    this.post$.pipe(takeUntilDestroyed()).subscribe((post) => {
      this.setPageTitle(post);
      this.metadataService.setMetaTagsFromFrontMatter(post);
    });
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
