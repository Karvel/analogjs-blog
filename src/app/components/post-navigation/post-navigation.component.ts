import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';

@Component({
  selector: 'app-post-navigation',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
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
        attr.alt="Click to go to the next post: {{ nextPost.attributes.title }}"
        type="button"
        class="inline-flex ml-auto focus:outline-none bg-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 truncate"
      >
        <span class="truncate">{{ nextPost.attributes.title }}</span
        ><span>&nbsp; &raquo;</span>
      </button>
    </div>
  `,
})
export class PostNavigationComponent implements OnInit {
  @Input() public post!: ContentFile<BlogPost>;
  @Input() public posts!: ContentFile<BlogPost>[];

  public nextPost!: ContentFile<BlogPost>;
  public prevPost!: ContentFile<BlogPost>;

  public ngOnInit(): void {
    this.setNavigation(this.post, this.posts);
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
}
