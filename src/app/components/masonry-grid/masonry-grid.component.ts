import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { BehaviorSubject, tap } from 'rxjs';

import ImageInfoPopoverContentComponent from '@components/popover/image-info-popover-content.component';
import PopoverComponent from '@components/popover/popover.component';
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
    PopoverComponent,
  ],
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="photos$ | async as photos">
      <ul class="image-gallery list-none">
        <li *ngFor="let photo of photos">
          <img *ngIf="photo.url_m" [src]="photo.url_m" [alt]="photo.title" />
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
  styleUrls: ['./masonry-grid.component.css'],
})
export class MasonryGridComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private flickrService = inject(FlickrService);

  public flickr = flickr;
  public loading$ = new BehaviorSubject<boolean>(true);
  public photos$ = this.flickrService.getFavoritePhotos().pipe(
    tap(() => {
      this.loading$.next(false);
      this.changeDetectorRef.detectChanges();
    }),
  );
}
