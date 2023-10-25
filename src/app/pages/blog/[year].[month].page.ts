import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ContentFile, injectContentFiles } from '@analogjs/content';

import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { MetadataService } from '@services/metadata.service';
import { getMonthName } from '@utils/get-month-name';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

@Component({
  selector: 'app-month-page',
  standalone: true,
  imports: [BlogCardComponent, NgFor, NgIf, RouterLink],
  template: `
    <div
      class="md:max-w md:mx-auto md:flex md:flex-col md:items-center text-xl"
    >
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start">
            Month: {{ monthName }}
          </h1>
          <ul *ngIf="filteredPosts?.length; else emptyResult">
            <li *ngFor="let post of filteredPosts">
              <app-blog-card [post]="post" />
            </li>
          </ul>
        </div>
        <ng-template #emptyResult
          >There are no posts matching "{{ month }}".</ng-template
        >
      </div>
    </div>
  `,
})
export default class monthPageComponent implements OnInit {
  public month!: string;
  public monthName!: string;
  public year!: string;
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
  ).sort(sortByUpdatedOrOriginalDate);
  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.month = this.route.snapshot.paramMap.get('month') || '';
    this.year = this.route.snapshot.paramMap.get('year') || '';
    this.monthName = getMonthName(parseInt(this.month));
    this.setPageTitle(this.monthName);
    this.setMetadata(this.monthName);
    this.filteredPosts = this.filterBlogPostsByMonth(
      this.posts,
      this.year,
      this.month,
    );
  }

  private filterBlogPostsByMonth(
    posts: ContentFile<BlogPost>[],
    filterByYear: string,
    filterByMonth: string,
  ): ContentFile<BlogPost>[] {
    return posts.filter(
      (post) =>
        new Date(post.attributes.date || '').getFullYear()?.toString() ===
          filterByYear &&
        (new Date(post.attributes.date || '').getMonth() + 1)
          ?.toString()
          ?.padStart(2, '0') === filterByMonth,
    );
  }

  private setMetadata(month: string): void {
    const description = `Blog posts filtered by ${month}.`;
    this.metaTagList.map((metaTag) => {
      metaTag.content = description;

      return metaTag;
    });

    this.metadataService.updateTags(this.metaTagList);
  }

  /**
   * Setting dynamic page title in component
   */
  private setPageTitle(month: string): void {
    const title = month ? `${month} | ${siteName}` : `Month | ${siteName}`;
    this.metadataService.setTitle(title);
    this.metadataService.setPageURLMetaTitle(title);
  }
}
