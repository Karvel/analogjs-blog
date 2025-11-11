import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';

import { MarkdownComponent, injectContent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import SkeletonCardComponent from '@components/skeleton-card/skeleton-card.component';
import { siteName } from '@constants/site-name';
import { MetadataService } from '@services/metadata.service';
import { version } from '../../../../package.json';

export const pageTitle = {
  title: `About | ${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

export const metaTagList: MetaDefinition[] = [
  {
    name: 'description',
    content: 'About me.',
  },
  {
    name: 'author',
    content: 'Elanna Grossman',
  },
  {
    property: 'og:description',
    content: 'About me.',
  },
  {
    property: 'twitter:description',
    content: 'About me.',
  },
];

@Component({
  selector: 'app-about-index',
  imports: [AsyncPipe, NgStyle, MarkdownComponent, SkeletonCardComponent],
  template: `
    <h1 class="sr-only">About</h1>
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <div
            class="relative mx-auto [@media(min-width:430px)]:max-h-[32rem] [@media(min-width:430px)]:w-96"
            >
            @if (showSkeleton()) {
              <app-skeleton-card
                class="rounded-md absolute min-w-full h-full"
                height="100%"
                maxWidth="100%"
                width="100%"
                />
            }
            <img
              [ngStyle]="{
                visibility: showSkeleton() ? 'hidden' : 'visible',
              }"
              (load)="onLoad()"
              src="images/self/me.jpg"
              class="rounded-md"
              alt="Me in Norway"
              priority
              />
          </div>
          @if (about$ | async; as about) {
            <div>
              <analog-markdown
                class="prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden"
                [content]="about.content"
                />
            </div>
          }
          @if (version) {
            <div>
              Site Version:
              <a
                href="https://github.com/Karvel/analogjs-blog/releases"
                target="_blank"
                rel="noopener"
                >v{{ version }}</a
                >
              </div>
            }
          </div>
        </div>
      </div>
    `,
})
export default class IndexPageComponent {
  public showSkeleton: WritableSignal<boolean> = signal(true);
  public version = version;

  private metadataService = inject(MetadataService);

  readonly about$ = injectContent<{ content: string }>({
    customFilename: 'about/about',
  });

  constructor() {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }

  public onLoad(): void {
    this.showSkeleton.set(false);
  }
}
