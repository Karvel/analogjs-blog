import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ContentFile, injectContentFiles } from '@analogjs/content';
import { tap } from 'rxjs';

import { ArchiveComponent } from '@components/archive/archive.component';
import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { MetadataService } from '@services/metadata.service';
import { getYear } from '@utils/get-year';
import { getMonth } from '@utils/get-month';
import { getMonthName } from '@utils/get-month-name';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

@Component({
  selector: 'app-month-page',
  standalone: true,
  imports: [ArchiveComponent, BlogCardComponent, NgFor, NgIf, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start text-xl">
            Posts filtered by month and year: {{ monthName }} {{ year }}
          </h1>
          <ul *ngIf="filteredPosts?.length; else emptyResult">
            <li *ngFor="let post of filteredPosts">
              <app-blog-card [post]="post" />
            </li>
          </ul>
        </div>
        <ng-template #emptyResult
          ><div class="pt-5">
            There are no posts from {{ monthName }} {{ year }}.
          </div></ng-template
        >
        <ng-container *ngIf="posts?.length">
          <div class="mt-5">
            <app-archive [posts]="posts" />
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class MonthPageComponent {
  public filteredPosts!: ContentFile<BlogPost>[];
  public month!: string;
  public monthName!: string;
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  ).sort(sortByUpdatedOrOriginalDate);
  public year!: string;

  private destroyRef = inject(DestroyRef);
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
  private route = inject(ActivatedRoute);

  constructor() {
    this.setRouteListener();
  }

  private filterBlogPostsByMonth(
    posts: ContentFile<BlogPost>[],
    filterByYear: string,
    filterByMonth: string,
  ): ContentFile<BlogPost>[] {
    return posts.filter(
      (post) =>
        getYear(post.attributes.date) === filterByYear &&
        getMonth(post.attributes.date) === filterByMonth,
    );
  }

  private setMetadata(month: string, year: string): void {
    const description = `Blog posts filtered by ${month} ${year}.`;
    this.metaTagList.map((metaTag) => {
      metaTag.content = description;

      return metaTag;
    });

    this.metadataService.updateTags(this.metaTagList);
  }

  /**
   * Setting dynamic page title in component
   */
  private setPageTitle(month: string, year: string): void {
    const title = month
      ? `${month} ${year} | ${siteName}`
      : `Month | ${siteName}`;
    this.metadataService.setTitle(title);
    this.metadataService.setPageURLMetaTitle(title);
  }

  private setRouteListener(): void {
    this.route.paramMap
      .pipe(
        tap((params) => {
          this.month = params.get('month') ?? '';
          this.year = params.get('year') ?? '';
          this.monthName = getMonthName(parseInt(this.month));
          this.setPageTitle(this.monthName, this.year);
          this.setMetadata(this.monthName, this.year);
          this.filteredPosts = this.filterBlogPostsByMonth(
            this.posts,
            this.year,
            this.month,
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
