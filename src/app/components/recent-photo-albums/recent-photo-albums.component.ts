import { AsyncPipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';

import { catchError, of, tap } from 'rxjs';

import PhotoAlbumComponent from '@components/photo-album/photo-album.component';
import SpinnerComponent from '@components/spinner/spinner.component';
import { FlickrService } from '@services/api/flickr.service';

@Component({
  selector: 'app-recent-photo-albums',
  imports: [AsyncPipe, PhotoAlbumComponent, SpinnerComponent],
  template: `
    @if (loading()) {
      <app-spinner />
    }
    @if (photos$ | async; as photos) {
      <div>
        <h2 class="text-xl">Latest Photo Albums:</h2>
        <div class="flex gap-4 flex-wrap justify-center xl:justify-normal">
          @for (photo of photos; track photo.id) {
            <app-photo-album [photo]="photo" class="w-full max-w-full" />
          }
        </div>
      </div>
    } @else {
      @if (!loading()) {
        <div>No photos are available from Flickr. Try again later?</div>
      }
    }
  `,
})
export default class RecentPhotoAlbumsComponent {
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
