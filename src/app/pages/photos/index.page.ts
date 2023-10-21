import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { RouteMeta } from '@analogjs/router';

import { MasonryGridComponent } from '@components/masonry-grid/masonry-grid.component';
import { siteName } from '@constants/site-name';
import { FlickrService } from '@services/api/flickr.service';
import { MetadataService } from '@services/metadata.service';

export const pageTitle = {
  title: `Photos | ${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

@Component({
  selector: 'app-photos-index',
  standalone: true,
  imports: [AsyncPipe, NgIf, MasonryGridComponent],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="xl:w-[48rem] p-4">
        <div class="flex-1">
          <h1>Photos:</h1>
          <div *ngIf="profile$ | async as profile">
            <div class="py-6">
              I host my photos on
              <a [href]="profile?.photosurl?._content">Flickr</a>.
            </div>
            <span class="whitespace-pre-line">
              {{ profile?.description?._content }}
            </span>
          </div>
          <div class="pt-6">
            Here is random sampling some of my favorite photos:
            <app-masonry-grid></app-masonry-grid>
          </div>
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
  }
}
