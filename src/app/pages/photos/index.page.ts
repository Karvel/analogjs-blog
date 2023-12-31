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
          <div *ngIf="profile$ | async as profile; else emptyResponse">
            <div class="py-5">
              I host my photos on
              <a
                [href]="profile?.photosurl?._content"
                target="_blank"
                rel="noopener"
                >Flickr</a
              >.
            </div>
            <div class="whitespace-pre-line">
              {{ profile?.description?._content }}
            </div>
            <div class="pt-6">
              Here is random sampling some of my favorite photos:
              <app-masonry-grid />
            </div>
          </div>
          <ng-template #emptyResponse>
            <div class="pt-5">
              No photos are available from Flickr. Try again later?
            </div>
          </ng-template>
        </div>
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
