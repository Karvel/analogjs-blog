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
          <h1 class="md:flex md:flex-col md:self-start">Tag: {{ tagName }}</h1>
          <ul *ngIf="filteredPosts?.length; else emptyResult">
            <li *ngFor="let post of filteredPosts">
              <app-blog-card [post]="post" />
            </li>
          </ul>
        </div>
        <ng-template #emptyResult>
          <div class="flex grow">
            There are no posts matching "{{ tagName }}".
          </div>
        </ng-template>
        <div><a [routerLink]="['/tag']">All Tags</a></div>
      </div>
    </div>
  `,
})
export default class TagNamePageComponent implements OnInit {
  public tagName!: string;
  public filteredPosts!: ContentFile<BlogPost>[];

  private posts = injectContentFiles<BlogPost>().sort(
    sortByUpdatedOrOriginalDate,
  );
  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.tagName = this.route.snapshot.paramMap.get('tagName') || '';
    this.filteredPosts = this.filterBlogPostsByTag(this.posts, this.tagName);
  }

  private filterBlogPostsByTag(
    blogPosts: ContentFile<BlogPost>[],
    tagToFilter: string,
  ): ContentFile<BlogPost>[] {
    return blogPosts.filter((post) => {
      if (post.attributes.tags) {
        const postTags = post.attributes.tags
          .split(',')
          .map((tag) => tag.trim());
        return postTags.includes(tagToFilter);
      }
      return false; // No tags in this post
    });
  }
}
