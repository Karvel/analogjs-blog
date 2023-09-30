import { DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';

import PillComponent from '@components/pill/pill.component';
import { BlogPost } from '@models/post';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [DatePipe, NgIf, PillComponent, RouterLink],
  template: `
    <div class="py-5 flex flex-col-reverse sm:flex-row">
      <div class="sm:pr-2 sm:max-w grow">
        <div class="flex items-center">
          <div
            *ngIf="post?.attributes?.last_updated"
            class="text-xs pt-1 sm:pt-0"
          >
            Updated {{ post.attributes.last_updated | date }}
          </div>
          <div
            *ngIf="post?.attributes?.date && post?.attributes?.last_updated"
            class="text-xs pl-2 pt-1 sm:pt-0"
          >
            | &nbsp;
          </div>
          <div *ngIf="post?.attributes?.date" class="text-xs pt-1 sm:pt-0">
            Posted {{ post.attributes.date | date }}
          </div>
        </div>
        <div class="text-lg font-bold">
          <a [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</a>
        </div>
        <div class="sm:max-w-prose text-sm">
          {{ post.attributes.description }}
        </div>
        <div *ngIf="post?.attributes?.category" class="pt-1">
          <app-pill
            [label]="post.attributes.category"
            [route]="'/category'"
            [slug]="post.attributes.category"
          />
        </div>
      </div>
      <div *ngIf="post?.attributes?.cover_image">
        <img
          [src]="post.attributes.cover_image"
          class="sm:max-w-xs rounded-md"
          [alt]="post.attributes.cover_image_title || 'Post Cover Image'"
        />
      </div>
    </div>
  `,
})
export class BlogCardComponent {
  @Input() post!: ContentFile<BlogPost>;
}
