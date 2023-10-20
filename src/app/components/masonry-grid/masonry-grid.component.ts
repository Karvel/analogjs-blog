import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import ImageInfoPopoverContentComponent from '@components/popover/image-info-popover-content.component';
import PopoverComponent from '@components/popover/popover.component';
import { FlickrService } from '@services/api/flickr.service';

@Component({
  selector: 'app-masonry-grid',
  standalone: true,
  imports: [
    AsyncPipe,
    ImageInfoPopoverContentComponent,
    NgFor,
    NgIf,
    PopoverComponent,
  ],
  template: `
    <div *ngIf="photos$ | async as photos">
      <ng-container *ngFor="let photo of photos">
        <div class="relative">
          <img
            *ngIf="photo.url_m"
            [src]="photo.url_m"
            [alt]="photo.title"
            appReplaceBrokenImage
            class="max-w-full"
          />
          <div
            class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-4"
          >
            <div class="flex justify-end items-center">
              <div
                *ngIf="
                  photo.url_m &&
                  'post?.attributes?.cover_image_source ' &&
                  photo.title
                "
                class="flex"
              >
                <app-popover
                  [altText]="'Image information'"
                  [icon]="'svg/info.svg'"
                >
                  <app-image-info-popover-content
                    [cover_image_author]="'Elanna Grossman'"
                    [cover_image_source]="
                      flickrUrl + '/' + photo.ownername + '/' + photo.id
                    "
                    [cover_image_title]="photo.title"
                  />
                </app-popover>
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class MasonryGridComponent {
  private flickrService = inject(FlickrService);
  public flickrUrl = 'https://www.flickr.com/photos';
  public photos$ = this.flickrService.getFavoritePhotos();
}
