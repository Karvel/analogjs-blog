import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FlickrService } from '@services/api/flickr.service';

@Component({
  selector: 'app-masonry-grid',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <div *ngIf="photos$ | async as photos" class="-masonry-container">
      <ul class="image-gallery">
        <li *ngFor="let photo of photos">
          <img
            *ngIf="photo.url_m"
            [src]="photo.url_m"
            [alt]="photo.title"
            loading="lazy"
          />
        </li>
        <li></li>
      </ul>
    </div>
  `,
  styleUrls: ['./masonry-grid.component.css'],
})
export class MasonryGridComponent {
  private flickrService = inject(FlickrService);
  public flickrUrl = 'https://www.flickr.com/photos';
  public photos$ = this.flickrService.getFavoritePhotos();
}
