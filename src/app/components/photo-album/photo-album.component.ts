import { NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable, debounceTime } from 'rxjs';

import { SkeletonCardComponent } from '@components/skeleton-card/skeleton-card.component';
import { flickr } from '@constants/flickr';
import { ReplaceBrokenImageDirective } from '@directives/replace-broken-image.directive';
import { PhotosetListItem } from '@models/flickr';
import { ScreenSizeService } from '@services/screen-size.service';

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
    <div *ngIf="photo.id" class="relative">
      <app-skeleton-card
        *ngIf="showSkeleton()"
        class="rounded-md absolute min-w-full h-full"
        height="100%"
        maxWidth="100%"
        [width]="isSmallScreen ? '' : '736px'"
      />
      <a
        [href]="flickr.albumUrl + '/' + photo.id"
        target="_blank"
        rel="noopener"
      >
        <img
          [ngSrc]="
            flickr.albumPhotoUrl +
            '/' +
            photo.server +
            '/' +
            photo.primary +
            '_' +
            photo.secret +
            '_w.jpg'
          "
          [ngStyle]="{ visibility: showSkeleton() ? 'hidden' : 'visible' }"
          (load)="onLoad()"
          alt=""
          appReplaceBrokenImage
          class="w-full rounded-md"
          height="491"
          width="736"
        />
        <div
          class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-4"
        >
          <h2 class="text-white text-xl font-bold text-shadow-sm shadow-black">
            {{ photo.title._content }}
          </h2>
          <div
            *ngIf="photo.username"
            class="text-white text-xs text-shadow-sm shadow-black"
          >
            By: {{ photo.username }}
          </div>
        </div>
      </a>
    </div>
  `,
})
export class PhotoAlbumComponent implements OnInit {
  @Input() public photo!: PhotosetListItem;

  public flickr = flickr;
  public isSmallScreen: boolean = false;
  public screenWidth$!: Observable<number>;
  public showSkeleton: WritableSignal<boolean> = signal(true);

  private destroyRef = inject(DestroyRef);
  private screenSizeService = inject(ScreenSizeService);

  public ngOnInit(): void {
    const smallScreenSize = 768;
    this.screenWidth$ = this.screenSizeService.screenWidth;
    this.screenWidth$
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((width) => {
        this.isSmallScreen = width < smallScreenSize;
      });
  }

  public onLoad(): void {
    this.showSkeleton.set(false);
  }
}
