import { NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';

import { SkeletonCardComponent } from '@components/skeleton-card/skeleton-card.component';
import { flickr } from '@constants/flickr';
import { ReplaceBrokenImageDirective } from '@directives/replace-broken-image.directive';
import { PhotosetListItem } from '@models/flickr';

@Component({
  selector: 'app-photo-album',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgStyle,
    ReplaceBrokenImageDirective,
    SkeletonCardComponent,
  ],
  template: `
    <div *ngIf="photo?.id" class="relative">
      <app-skeleton-card
        *ngIf="showSkeleton()"
        class="rounded-md absolute min-w-full h-full"
        height="100%"
        maxWidth="100%"
        width=""
      />
      <a
        [href]="flickr.albumUrl + '/' + photo.id"
        class="flex aspect-[1/0.65]"
        target="_blank"
        rel="noopener"
      >
        <img
          [src]="
            flickr.albumPhotoUrl +
            '/' +
            photo.server +
            '/' +
            photo.primary +
            '_' +
            photo.secret +
            '_c.jpg'
          "
          [ngStyle]="{ visibility: showSkeleton() ? 'hidden' : 'visible' }"
          (load)="onLoad()"
          alt=""
          appReplaceBrokenImage
          class="w-full h-full rounded-md object-cover"
        />
        <div
          class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-4"
        >
          <h2 class="text-white text-xl font-bold text-shadow-sm shadow-black">
            {{ photo.title._content }}
          </h2>
        </div>
      </a>
    </div>
  `,
})
export class PhotoAlbumComponent {
  @Input() public photo!: PhotosetListItem;

  public flickr = flickr;
  public showSkeleton: WritableSignal<boolean> = signal(true);

  public onLoad(): void {
    this.showSkeleton.set(false);
  }
}
