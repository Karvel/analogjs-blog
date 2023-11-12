import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { BehaviorSubject, tap } from 'rxjs';

import { PhotoAlbumComponent } from '@components/photo-album/photo-album.component';
import { FlickrService } from '@services/api/flickr.service';

@Component({
  selector: 'app-recent-photo-albums',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, PhotoAlbumComponent],
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="photos$ | async as photos">
      <h2 class="text-xl">Latest Photo Albums:</h2>
      <div class="flex gap-4 flex-wrap justify-center xl:justify-normal">
        <ng-container *ngFor="let photo of photos">
          <app-photo-album
            [photo]="photo"
            class="w-full max-w-full"
          ></app-photo-album>
        </ng-container>
      </div>
    </div>
  `,
})
export class RecentPhotoAlbumsComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private flickrService = inject(FlickrService);

  public loading$ = new BehaviorSubject<boolean>(true);

  public photos$ = this.flickrService.getRecentPhotosets().pipe(
    tap(() => {
      this.loading$.next(false);
      this.changeDetectorRef.detectChanges();
    }),
  );
}
