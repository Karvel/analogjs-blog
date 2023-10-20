import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ReplaceBrokenImageDirective } from '@directives/replace-broken-image.directive';

@Component({
  selector: 'app-photo-album',
  standalone: true,
  imports: [NgIf, ReplaceBrokenImageDirective],
  template: `
    <div *ngIf="photo.id" class="relative">
      <a
        [href]="flickrAlbumUrl + '/' + photo.id"
        target="_blank"
        rel="noopener"
      >
        <img
          [src]="
            flickrAlbumPhotoUrl +
            '/' +
            photo.server +
            '/' +
            photo.primary +
            '_' +
            photo.secret +
            '_w.jpg'
          "
          [alt]="photo.title._content"
          appReplaceBrokenImage
          class="rounded-md"
        />
        <div
          class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-4"
        >
          <h1 class="text-white text-xl font-bold text-shadow shadow-black">
            {{ photo.title._content }}
          </h1>
          <div
            *ngIf="photo.username"
            class="text-white text-xs text-shadow shadow-black"
          >
            By: {{ photo.username }}
          </div>
        </div>
      </a>
    </div>
  `,
})
export class PhotoAlbumComponent {
  @Input() public photo: any;

  public flickrAlbumPhotoUrl = 'https://live.staticflickr.com';
  public flickrAlbumUrl = 'https://www.flickr.com/photos/jadeilyn/albums';
}
