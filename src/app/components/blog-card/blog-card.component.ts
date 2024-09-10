import { DatePipe, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
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
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';
import { debounceTime, Observable } from 'rxjs';

import { PillComponent } from '@components/pill/pill.component';
import { SkeletonCardComponent } from '@components/skeleton-card/skeleton-card.component';
import { smallBreakpointSize } from '@constants/breakpoint-size';
import { ReplaceBrokenImageDirective } from '@directives/replace-broken-image.directive';
import { BlogPost } from '@models/post';
import { ScreenSizeService } from '@services/screen-size.service';
import { getYear } from '@utils/get-year';
import { getMonth } from '@utils/get-month';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgOptimizedImage,
    NgStyle,
    PillComponent,
    ReplaceBrokenImageDirective,
    RouterLink,
    SkeletonCardComponent,
  ],
  template: `
    <div class="py-5 flex flex-col-reverse sm:flex-row">
      <div class="sm:pr-2 sm:max-w grow">
        <div class="flex items-center">
          <div
            *ngIf="post?.attributes?.last_updated"
            class="text-xs pt-1 sm:pt-0"
          >
            Updated {{ post.attributes.last_updated | date }}
          </div>
          <div
            *ngIf="post?.attributes?.date && post?.attributes?.last_updated"
            class="text-xs pl-2 pt-1 sm:pt-0"
          >
            | &nbsp;
          </div>
          <div *ngIf="post?.attributes?.date" class="text-xs pt-1 sm:pt-0">
            Posted {{ post.attributes.date | date }}
          </div>
        </div>
        <div class="text-lg font-bold">
          <a [routerLink]="['/blog', year, month, post.slug]">{{
            post.attributes.title
          }}</a>
        </div>
        <div class="sm:max-w-prose text-sm" data-testid="description">
          {{ post.attributes.description }}
        </div>
        <div *ngIf="post?.attributes?.category" class="pt-1">
          <app-pill
            [label]="post.attributes.category"
            [route]="'/category'"
            [slug]="post.attributes.category"
          />
        </div>
      </div>
      <div
        *ngIf="post?.attributes?.cover_image"
        class="relative sm:w-80 sm:min-w-[20rem] sm:h-52"
      >
        <app-skeleton-card
          *ngIf="showSkeleton()"
          class="rounded-md absolute min-w-full h-full"
          height="100%"
          maxWidth="100%"
          [width]="isSmallScreen ? '' : '320px'"
        />
        <a [routerLink]="['/blog', year, month, post.slug]">
          <ng-container *ngIf="isLCP; else nonPriority">
            <span class="flex aspect-[1/0.65]">
              <img
                [src]="post.attributes.cover_image || ''"
                [alt]="post.attributes.cover_image_title ?? 'Post Cover Image'"
                [ngStyle]="{
                  visibility: showSkeleton() ? 'hidden' : 'visible'
                }"
                (load)="onLoad()"
                appReplaceBrokenImage
                class="sm:max-w-xs rounded-md w-full h-full object-cover object-center"
                priority
              />
            </span>
          </ng-container>
          <ng-template #nonPriority>
            <span class="flex aspect-[1/0.65]">
              <img
                [src]="post.attributes.cover_image || ''"
                [alt]="post.attributes.cover_image_title ?? 'Post Cover Image'"
                [ngStyle]="{
                  visibility: showSkeleton() ? 'hidden' : 'visible'
                }"
                (load)="onLoad()"
                appReplaceBrokenImage
                class="sm:max-w-xs rounded-md w-full h-full object-cover object-center"
              />
            </span>
          </ng-template>
        </a>
      </div>
    </div>
  `,
})
export class BlogCardComponent implements OnInit {
  @Input() post!: ContentFile<BlogPost>;
  @Input() isLCP: boolean = false;

  public isSmallScreen: boolean = false;
  public month: string = '';
  public screenWidth$!: Observable<number>;
  public showSkeleton: WritableSignal<boolean> = signal(true);
  public year: string = '';

  private destroyRef = inject(DestroyRef);
  private screenSizeService = inject(ScreenSizeService);

  public ngOnInit(): void {
    this.year = getYear(this.post.attributes.date);
    this.month = getMonth(this.post.attributes.date);
    this.screenWidth$ = this.screenSizeService.screenWidth;
    this.screenWidth$
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((width) => {
        this.isSmallScreen = width < smallBreakpointSize;
      });
  }

  public onLoad(): void {
    this.showSkeleton.set(false);
  }
}
