import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';

import { RouteMeta } from '@analogjs/router';

import { MasonryGridComponent } from '@components/masonry-grid/masonry-grid.component';
import { siteName } from '@constants/site-name';
import { FlickrService } from '@services/api/flickr.service';
import { MetadataService } from '@services/metadata.service';

export const pageTitle = {
  title: `Photos | ${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

export const metaTagList: MetaDefinition[] = [
  {
    name: 'description',
    content:
      'Information about my photography and a collection of my favorite photos.',
  },
  {
    name: 'author',
    content: 'Elanna Grossman',
  },
  {
    property: 'og:description',
    content:
      'Information about my photography and a collection of my favorite photos.',
  },
  {
    property: 'twitter:description',
    content:
      'Information about my photography and a collection of my favorite photos.',
  },
];

@Component({
  selector: 'app-photos-index',
  standalone: true,
  imports: [AsyncPipe, NgIf, MasonryGridComponent],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="text-xl">Photos:</h1>
          <div class="pt-5">
            I host my photos on
            <a
              href="https://www.flickr.com/photos/jadeilyn/"
              target="_blank"
              rel="noopener"
              >Flickr</a
            >.
          </div>
          <div *ngIf="profile$ | async as profile">
            <div
              *ngIf="profile?.description?._content"
              class="whitespace-pre-line pt-5"
            >
              {{ profile?.description?._content }}
            </div>
          </div>
        </div>
        <app-masonry-grid />
      </div>
    </div>
  `,
})
export default class IndexPageComponent {
  private flickrService = inject(FlickrService);
  private metadataService = inject(MetadataService);

  public profile$ = this.flickrService.getProfile();

  constructor() {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }
}
