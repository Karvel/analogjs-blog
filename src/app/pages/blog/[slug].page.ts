import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { MarkdownComponent, injectContent } from '@analogjs/content';

import { BlogPost } from '@models/post';

@Component({
  standalone: true,
  imports: [AsyncPipe, DatePipe, MarkdownComponent, NgIf],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div *ngIf="post$ | async as post" class="md:max-w-3xl p-4">
        <div class="max-w mx-auto">
          <div class="relative">
            <img
              [src]="post.attributes.cover_image"
              [alt]="post?.attributes?.cover_image_title"
              class="w-full max-w-full rounded-md"
            />
            <div
              class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-4"
            >
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
  post$ = injectContent<BlogPost>();
}
