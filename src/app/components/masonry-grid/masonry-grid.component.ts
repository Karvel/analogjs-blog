import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { flickr } from '@constants/flickr';
import { FlickrService } from '@services/api/flickr.service';

@Component({
  selector: 'app-masonry-grid',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <div *ngIf="photos$ | async as photos" class="-masonry-container">
      <ul class="image-gallery">
        <li *ngFor="let photo of photos">
          <a
            [href]="flickr.photoUrl + '/' + photo.id"
            target="_blank"
            rel="noopener"
          >
            <img
              *ngIf="photo.url_m"
              [src]="photo.url_m"
              [alt]="photo.title"
              loading="lazy"
            />
          </a>
        </li>
        <li></li>
      </ul>
    </div>
  `,
  styleUrls: ['./masonry-grid.component.css'],
})
export class MasonryGridComponent {
  private flickrService = inject(FlickrService);
  public flickr = flickr;
  public photos$ = this.flickrService.getFavoritePhotos();
}
