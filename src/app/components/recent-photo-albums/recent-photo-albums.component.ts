import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { PhotoAlbumComponent } from '@components/photo-album/photo-album.component';
import { FlickrService } from '@services/api/flickr.service';

@Component({
  selector: 'app-recent-photo-albums',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, PhotoAlbumComponent],
  template: `
    <div *ngIf="photos$ | async as photos" class="flex gap-4 flex-wrap">
      <ng-container *ngFor="let photo of photos">
        <app-photo-album [photo]="photo"></app-photo-album>
      </ng-container>
    </div>
  `,
})
export class RecentPhotoAlbumsComponent {
  private flickrService = inject(FlickrService);

  public photos$ = this.flickrService.getRecentPhotosets();
}
