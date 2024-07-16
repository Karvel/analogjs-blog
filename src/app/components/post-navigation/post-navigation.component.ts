import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { getMonth } from '@utils/get-month';
import { getYear } from '@utils/get-year';

@Component({
  selector: 'app-post-navigation',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div class="flex justify-between text-sm mt-2 gap-2">
      <a
        *ngIf="prevPost"
        [routerLink]="[
          '/blog',
          getYear(prevPost.attributes.date),
          getMonth(prevPost.attributes.date),
          prevPost.slug
        ]"
        attr.alt="Click to go to the previous post: {{
          prevPost.attributes.title
        }}"
        class="hover:text-inherit dark:hover:text-white no-underline inline-flex bg-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 truncate"
      >
        <span>&laquo; &nbsp;</span
        ><span class="truncate">{{ prevPost.attributes.title }}</span>
      </a>
      <a
        *ngIf="nextPost"
        [routerLink]="[
          '/blog',
          getYear(nextPost.attributes.date),
          getMonth(nextPost.attributes.date),
          nextPost.slug
        ]"
        attr.alt="Click to go to the next post: {{ nextPost.attributes.title }}"
        class="hover:text-inherit dark:hover:text-white no-underline inline-flex ml-auto bg-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 truncate"
      >
        <span class="truncate">{{ nextPost.attributes.title }}</span
        ><span>&nbsp; &raquo;</span>
      </a>
    </div>
  `,
})
export class PostNavigationComponent {
  @Input() public nextPost!: ContentFile<BlogPost>;
  @Input() public post!: ContentFile<BlogPost | Record<string, never>>;
  @Input() public posts!: ContentFile<BlogPost>[];
  @Input() public prevPost!: ContentFile<BlogPost>;

  public getMonth: (dateString: string | undefined) => string = getMonth;
  public getYear: (dateString: string | undefined) => string = getYear;
}
