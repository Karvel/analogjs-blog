import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ContentFile, injectContentFiles } from '@analogjs/content';

import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { MetadataService } from '@services/metadata.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

@Component({
  selector: 'app-category-name-page',
  standalone: true,
  imports: [BlogCardComponent, NgFor, NgIf, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start text-xl">
            Category: {{ categoryName }}
          </h1>
          <ul *ngIf="filteredPosts?.length; else emptyResult">
            <li *ngFor="let post of filteredPosts; let i = index">
              <app-blog-card [post]="post" [isLCP]="i === 0" />
            </li>
          </ul>
        </div>
        <ng-template #emptyResult
          ><div class="pt-5 flex grow">
            There are no posts matching "{{ categoryName }}".
          </div></ng-template
        >
        <div class="pt-5">
          <a [routerLink]="['/category']">All Categories</a>
        </div>
      </div>
    </div>
  `,
})
export default class CategoryNamePageComponent implements OnInit {
  public categoryName!: string;
  public filteredPosts!: ContentFile<BlogPost>[];

  private metadataService = inject(MetadataService);
  private metaTagList: MetaDefinition[] = [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'author',
      content: 'Elanna Grossman',
    },
    {
      property: 'og:description',
      content: '',
    },
    {
      property: 'twitter:description',
      content: '',
    },
  ];
  private posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  )
    .filter((post) => post.attributes.published)
    .sort(sortByUpdatedOrOriginalDate);
  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName') ?? '';
    this.setPageTitle(this.categoryName);
    this.setMetadata(this.categoryName);
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

  private setMetadata(categoryName: string): void {
    const description = `Blog posts filtered by ${categoryName}.`;
    this.metaTagList.map((metaTag) => {
      metaTag.content = description;

      return metaTag;
    });

    this.metadataService.updateTags(this.metaTagList);
  }

  /**
   * Setting dynamic page title in component
   */
  private setPageTitle(categoryName: string): void {
    const title = categoryName
      ? `${categoryName} Category | ${siteName}`
      : `Category | ${siteName}`;
    this.metadataService.setTitle(title);
    this.metadataService.setPageURLMetaTitle(title);
  }
}
