import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { injectContentFiles } from '@analogjs/content';

import { BlogPost } from '@models/post';

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe],
  template: `
    <h2>Posts</h2>

    <ul>
      <li *ngFor="let post of posts">
        <a [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</a>
      </li>
    </ul>
  `,
})
export default class IndexPageComponent {
  posts = injectContentFiles<BlogPost>();
}
