import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { injectContentFiles } from '@analogjs/content';

import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { BlogPost } from '@models/post';

@Component({
  standalone: true,
  imports: [AsyncPipe, BlogCardComponent, NgFor, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start">Blog Posts:</h1>
          <ul>
            <li *ngFor="let post of posts">
              <app-blog-card [post]="post" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent {
  posts = injectContentFiles<BlogPost>();
}
