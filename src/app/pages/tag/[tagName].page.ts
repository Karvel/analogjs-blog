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
  selector: 'app-tag-name-page',
  standalone: true,
  imports: [BlogCardComponent, NgFor, NgIf, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start text-xl">
            Tag: {{ tagName }}
          </h1>
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
    this.tagName = this.route.snapshot.paramMap.get('tagName') || '';
    this.setPageTitle(this.tagName);
    this.setMetadata(this.tagName);
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

  private setMetadata(tagName: string): void {
    const description = `Blog posts filtered by ${tagName}.`;
    this.metaTagList.map((metaTag) => {
      metaTag.content = description;

      return metaTag;
    });
    this.metadataService.updateTags(this.metaTagList);
  }

  /**
   * Setting dynamic page title in component
   */
  private setPageTitle(tagName: string): void {
    const title = tagName
      ? `${tagName} Tag | ${siteName}`
      : `Tag | ${siteName}`;
    this.metadataService.setTitle(title);
    this.metadataService.setPageURLMetaTitle(title);
  }
}
