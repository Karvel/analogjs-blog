import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';
import { debounceTime, tap } from 'rxjs';

import { BlogPost } from '@models/post';
import { getMonth } from '@utils/get-month';
import { getYear } from '@utils/get-year';

@Component({
  selector: 'app-post-navigation',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div class="flex justify-between text-sm mt-2 gap-2">
      <button
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
        type="button"
        class="inline-flex focus:outline-none bg-indigo-200 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 truncate"
      >
        <span>&laquo; &nbsp;</span
        ><span class="truncate">{{ prevPost.attributes.title }}</span>
      </button>
      <button
        *ngIf="nextPost"
        [routerLink]="[
          '/blog',
          getYear(nextPost.attributes.date),
          getMonth(nextPost.attributes.date),
          nextPost.slug
        ]"
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
  @Input() public post!: ContentFile<BlogPost | Record<string, never>>;
  @Input() public posts!: ContentFile<BlogPost>[];

  public getMonth: (dateString: string | undefined) => string = getMonth;
  public getYear: (dateString: string | undefined) => string = getYear;
  public nextPost!: ContentFile<BlogPost>;
  public prevPost!: ContentFile<BlogPost>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public ngOnInit(): void {
    this.setRouteListener();
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

  private setRouteListener(): void {
    // TODO: Remove need for debounce
    this.route.params
      .pipe(
        debounceTime(100),
        tap(() => {
          this.setNavigation(this.post, this.posts);
          void this.router.navigate([this.router.url], {
            relativeTo: this.route,
            skipLocationChange: false,
          });
        }),
      )
      .subscribe();
  }
}
