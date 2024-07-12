import { DatePipe, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';

import PillComponent from '@components/pill/pill.component';
import { SkeletonCardComponent } from '@components/skeleton-card/skeleton-card.component';
import { ReplaceBrokenImageDirective } from '@directives/replace-broken-image.directive';
import { BlogPost } from '@models/post';
import { getYear } from '@utils/get-year';
import { getMonth } from '@utils/get-month';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
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
        <div class="sm:max-w-prose text-sm">
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
          width="320px"
        />
        <a
          [routerLink]="['/blog', year, month, post.slug]"
          [ngStyle]="{ visibility: showSkeleton() ? 'hidden' : 'visible' }"
        >
          <img
            [src]="post.attributes.cover_image"
            [alt]="post.attributes.cover_image_title ?? 'Post Cover Image'"
            (load)="onLoad()"
            appReplaceBrokenImage
            class="sm:max-w-xs rounded-md sm:w-full sm:h-full sm:object-cover sm:object-center"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  `,
})
export class BlogCardComponent implements OnInit {
  @Input() post!: ContentFile<BlogPost>;

  public month: string = '';
  public showSkeleton: WritableSignal<boolean> = signal(true);
  public year: string = '';

  public ngOnInit(): void {
    this.year = getYear(this.post.attributes.date);
    this.month = getMonth(this.post.attributes.date);
  }

  public onLoad(): void {
    this.showSkeleton.set(false);
  }
}
