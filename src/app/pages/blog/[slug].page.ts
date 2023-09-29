import { AsyncPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import {
  ContentFile,
  MarkdownComponent,
  injectContent,
} from '@analogjs/content';

import ImageInfoPopoverContentComponent from '@components/popover/image-info-popover-content';
import PopoverComponent from '@components/popover/popover.component';
import { BlogPost } from '@models/post';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    ImageInfoPopoverContentComponent,
    MarkdownComponent,
    NgClass,
    NgIf,
    PopoverComponent,
  ],
  styleUrls: ['./[slug].page.scss'],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div *ngIf="post$ | async as post" class="md:max-w-3xl p-4">
        <div class="max-w mx-auto">
          <div [ngClass]="{ relative: post.attributes.cover_image }">
            <img
              *ngIf="post.attributes.cover_image"
              [src]="post.attributes.cover_image"
              [alt]="post.attributes.cover_image_title"
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
      </div>
    </div>
  `,
})
export default class BlogPostPageComponent {
  public nextPost!: ContentFile<BlogPost>;
  public post$ = injectContent<BlogPost>();
  public prevPost!: ContentFile<BlogPost>;

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
}
