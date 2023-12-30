import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import {
  ContentFile,
  injectContent,
  injectContentFiles,
  MarkdownComponent,
} from '@analogjs/content';
import { map, switchMap, tap } from 'rxjs';

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
import { getYear } from '@utils/get-year';
import { getMonth } from '@utils/get-month';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';
import { splitTagStringIntoTagArray } from '@utils/split-tag-string-into-array';

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
            <ng-container *ngIf="isDraft">
              <div
                class="border-2 border-black dark:border-white border-dashed rounded-md p-4 mb-4"
              >
                This post is not yet published. Any new categories or tags will
                not be visible outside of this post.
              </div>
            </ng-container>
            <div [ngClass]="{ relative: post.attributes.cover_image }">
              <img
                *ngIf="post.attributes.cover_image"
                appReplaceBrokenImage
                [src]="post.attributes.cover_image"
                [alt]="post.attributes.cover_image_title"
                class="w-full max-w-full rounded-md"
                loading="lazy"
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
          <app-post-navigation
            [nextPost]="nextPost"
            [post]="post"
            [posts]="posts"
            [prevPost]="prevPost"
          />
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
  public isDraft!: boolean;
  public nextPost!: ContentFile<BlogPost>;
  public post$ = injectContent<BlogPost>({
    param: 'slug',
    subdirectory: 'posts',
  }).pipe(
    tap((post) => {
      this.isDraft = !post.attributes.published;
    }),
    map((post) => {
      const month = this.route.snapshot.paramMap.get('month') ?? '';
      const year = this.route.snapshot.paramMap.get('year') ?? '';

      return this.filterSlugByYearAndMonth(post, year, month);
    }),
  );
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  ).sort(sortByUpdatedOrOriginalDate);
  public prevPost!: ContentFile<BlogPost>;
  public splitTagStringIntoArray = splitTagStringIntoTagArray;
  public tagList: Tag[] = [];

  private destroyRef = inject(DestroyRef);
  private metadataService = inject(MetadataService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.setRouteListener();
  }

  /**
   * Filter posts by year and month in addition to slug to prevent
   * displaying the slug with the incorrect year or month
   */
  private filterSlugByYearAndMonth(
    post: ContentFile<BlogPost | Record<string, never>>,
    filterByYear: string,
    filterByMonth: string,
  ): ContentFile<BlogPost | Record<string, never>> | null {
    return getYear(post.attributes.date) === filterByYear &&
      getMonth(post.attributes.date) === filterByMonth
      ? post
      : null;
  }

  private setNavigation(
    post: ContentFile<BlogPost | Record<string, never>>,
    posts: ContentFile<BlogPost>[],
  ): void {
    const index = posts.findIndex((p) => p.slug === post.slug);
    const nextPublishedIndex = posts.findIndex(
      (post, i) => i < index && post.attributes.published,
    );
    const previousPublishedIndex = posts.findIndex(
      (post, i) => i > index && post.attributes.published,
    );
    const nextPost = posts[nextPublishedIndex];
    const previousPost = posts[previousPublishedIndex];

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

  private setRouteListener(): void {
    this.route.paramMap
      .pipe(
        switchMap(() => this.post$),
        tap((post: ContentFile<BlogPost | Record<string, never>> | null) => {
          if (post) {
            this.setPageTitle(post);
            this.metadataService.setMetaTagsFromFrontMatter(post);
            this.setNavigation(post, this.posts);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
