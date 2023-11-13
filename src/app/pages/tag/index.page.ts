import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ContentFile, injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import PillComponent from '@components/pill/pill.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { MetadataService } from '@services/metadata.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';
import { splitTagStringIntoArray } from '@utils/split-tag-string-into-array';

export const pageTitle = {
  title: `Tags | ${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

export const metaTagList: MetaDefinition[] = [
  {
    name: 'description',
    content: 'A collection of all of the site tags.',
  },
  {
    name: 'author',
    content: 'Elanna Grossman',
  },
  {
    property: 'og:description',
    content: 'A collection of all of the site tags.',
  },
  {
    property: 'twitter:description',
    content: 'A collection of all of the site tags.',
  },
];

@Component({
  selector: 'app-tag-index',
  standalone: true,
  imports: [NgFor, PillComponent, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start text-xl">Tags:</h1>
          <ul class="pt-5 flex flex-wrap justify-evenly">
            <li *ngFor="let tag of tags" class="flex m-1">
              <app-pill [label]="tag" [route]="'/tag'" [slug]="tag" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent implements OnInit {
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  ).sort(sortByUpdatedOrOriginalDate);
  public tags = this.extractUniqueTags(this.posts);

  private metadataService = inject(MetadataService);

  public ngOnInit(): void {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }

  private extractUniqueTags(blogPosts: ContentFile<BlogPost>[]): string[] {
    const uniqueTags = new Set<string>();

    for (const post of blogPosts) {
      if (post.attributes.tags?.length) {
        const tags = splitTagStringIntoArray(post.attributes.tags);
        tags.forEach((tag) => uniqueTags.add(tag?.name.toLowerCase()));
      }
    }

    const uniqueCategoriesArray = Array.from(uniqueTags).sort();

    return uniqueCategoriesArray;
  }
}
