import { DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [DatePipe, NgIf, RouterLink],
  template: `
    <div class="py-5 flex flex-col-reverse sm:flex-row">
      <div class="sm:pr-2 sm:max-w grow">
        <div class="flex items-center">
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
      </div>
    </div>
  `,
})
export class BlogCardComponent {
  @Input() post!: ContentFile<BlogPost>;
}
