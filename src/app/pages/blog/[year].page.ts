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
import { ArchiveComponent } from '@components/archive/archive.component';
import { getYear } from '@utils/get-year';

@Component({
  selector: 'app-year-page',
  standalone: true,
  imports: [ArchiveComponent, BlogCardComponent, NgFor, NgIf, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start text-xl">
            Posts filtered by year: {{ year }}
          </h1>
          <ul *ngIf="filteredPosts?.length; else emptyResult">
            <li *ngFor="let post of filteredPosts">
              <app-blog-card [post]="post" />
            </li>
          </ul>
        </div>
        <ng-template #emptyResult
          ><div class="pt-5">
            There are no posts from {{ year }}.
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
export default class YearPageComponent implements OnInit {
  public filteredPosts!: ContentFile<BlogPost>[];
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  ).sort(sortByUpdatedOrOriginalDate);
  public year!: string;

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

  public ngOnInit(): void {
    this.year = this.route.snapshot.paramMap.get('year') ?? '';
    this.setPageTitle(this.year);
    this.setMetadata(this.year);
    this.filteredPosts = this.filterBlogPostsByYear(this.posts, this.year);
  }

  private filterBlogPostsByYear(
    posts: ContentFile<BlogPost>[],
    filterBy: string,
  ): ContentFile<BlogPost>[] {
    return posts.filter((post) => getYear(post.attributes.date) === filterBy);
  }

  private setMetadata(year: string): void {
    const description = `Blog posts filtered by ${year}.`;
    this.metaTagList.map((metaTag) => {
      metaTag.content = description;

      return metaTag;
    });

    this.metadataService.updateTags(this.metaTagList);
  }

  /**
   * Setting dynamic page title in component
   */
  private setPageTitle(year: string): void {
    const title = year ? `${year} | ${siteName}` : `Year | ${siteName}`;
    this.metadataService.setTitle(title);
    this.metadataService.setPageURLMetaTitle(title);
  }
}
