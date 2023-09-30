import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ContentFile, injectContentFiles } from '@analogjs/content';

import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { BlogPost } from '@models/post';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

@Component({
  standalone: true,
  imports: [BlogCardComponent, NgFor, NgIf, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start">
            Category: {{ categoryName }}
          </h1>
          <ul *ngIf="filteredPosts?.length">
            <li *ngFor="let post of filteredPosts">
              <app-blog-card [post]="post" />
            </li>
          </ul>
        </div>
        <div><a [routerLink]="['/category']">All Categories</a></div>
      </div>
    </div>
  `,
})
export default class CategoryNamePageComponent implements OnInit {
  public categoryName!: string;
  public filteredPosts!: ContentFile<BlogPost>[];

  private posts = injectContentFiles<BlogPost>().sort(
    sortByUpdatedOrOriginalDate,
  );
  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName') || '';
    this.filteredPosts = this.filterBlogPostsByCategory(
      this.posts,
      this.categoryName,
    );
  }

  private filterBlogPostsByCategory(
    posts: ContentFile<BlogPost>[],
    categoryToFilter: string,
  ): ContentFile<BlogPost>[] {
    return posts.filter(
      (post) => post.attributes.category === categoryToFilter,
    );
  }
}
