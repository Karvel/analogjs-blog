import { AsyncPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';

import { tap } from 'rxjs';

import ImageInfoPopoverContentComponent from '@components/popover/image-info-popover-content.component';
import PopoverComponent from '@components/popover/popover.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { flickr } from '@constants/flickr';
import { FlickrService } from '@services/api/flickr.service';

@Component({
  selector: 'app-masonry-grid',
  standalone: true,
  imports: [
    AsyncPipe,
    ImageInfoPopoverContentComponent,
    NgFor,
    NgIf,
    NgOptimizedImage,
    PopoverComponent,
    SpinnerComponent,
  ],
  template: `
    <app-spinner *ngIf="loading()" />
    <div *ngIf="photos$ | async as photos">
      <ul class="image-gallery list-none">
        <li *ngFor="let photo of photos">
          <img
            *ngIf="photo.url_m"
            [ngSrc]="photo.url_m"
            [alt]="photo.title"
            height="500"
            width="500"
          />
          <div class="relative">
            <div
              class="absolute -top-6 left-0 -right-2 bottom-0 flex flex-col justify-end p-4"
            >
              <div class="flex justify-end items-center">
                <div *ngIf="photo.url_m && photo.title" class="flex">
                  <app-popover
                    [altText]="'Image information'"
                    [icon]="'svg/info.svg'"
                  >
                    <app-image-info-popover-content
                      [cover_image_author]="'Elanna Grossman'"
                      [cover_image_source]="
                        flickr.photoUrl + '/' + photo.ownername + '/' + photo.id
                      "
                      [cover_image_title]="photo.title"
                    />
                  </app-popover>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./masonry-grid.component.scss'],
})
export class MasonryGridComponent {
  private flickrService = inject(FlickrService);

  public flickr = flickr;
  public loading: WritableSignal<boolean> = signal(true);
  public photos$ = this.flickrService
    .getFavoritePhotos()
    .pipe(tap(() => this.loading.set(false)));
}
