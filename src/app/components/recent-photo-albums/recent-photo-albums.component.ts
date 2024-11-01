import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';

import { catchError, of, tap } from 'rxjs';

import { PhotoAlbumComponent } from '@components/photo-album/photo-album.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { FlickrService } from '@services/api/flickr.service';

@Component({
  selector: 'app-recent-photo-albums',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, PhotoAlbumComponent, SpinnerComponent],
  template: `
    <app-spinner *ngIf="loading()" />
    <div *ngIf="photos$ | async as photos; else emptyResponse">
      <h2 class="text-xl">Latest Photo Albums:</h2>
      <div class="flex gap-4 flex-wrap justify-center xl:justify-normal">
        <ng-container *ngFor="let photo of photos">
          <app-photo-album [photo]="photo" class="w-full max-w-full" />
        </ng-container>
      </div>
    </div>
    <ng-template #emptyResponse>
      <div *ngIf="!loading()">
        No photos are available from Flickr. Try again later?
      </div>
    </ng-template>
  `,
})
export class RecentPhotoAlbumsComponent {
  private flickrService = inject(FlickrService);

  public loading: WritableSignal<boolean> = signal(true);

  public photos$ = this.flickrService.getRecentPhotosets().pipe(
    tap(() => this.loading.set(false)),
    catchError(() => {
      this.loading.set(false);

      return of(null);
    }),
  );
}
