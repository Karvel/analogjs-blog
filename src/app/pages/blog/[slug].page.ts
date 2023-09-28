import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { MarkdownComponent, injectContent } from '@analogjs/content';

import { BlogPost } from '@models/post';

@Component({
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, NgIf],
  template: `
    <div *ngIf="post$ | async as post">
      <h2>{{ post.attributes.title }}</h2>

      <analog-markdown [content]="post.content" />
    </div>
  `,
})
export default class BlogPostPageComponent {
  post$ = injectContent<BlogPost>();
}
