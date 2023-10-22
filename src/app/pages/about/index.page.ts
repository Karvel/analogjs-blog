import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';

import { MarkdownComponent, injectContent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import { siteName } from '@constants/site-name';
import { MetadataService } from '@services/metadata.service';

export const pageTitle = {
  title: `About Me | ${siteName}`,
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
  standalone: true,
  imports: [AsyncPipe, NgIf, MarkdownComponent],
  template: `
    <h1 class="sr-only">About</h1>
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <img
            src="me.jpg"
            class="rounded max-h-[32rem] mx-auto"
            alt="Me in Norway"
          />
          <div *ngIf="about$ | async as about">
            <analog-markdown
              class="prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden"
              [content]="about.content"
            />
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent {
  private metadataService = inject(MetadataService);
  readonly about$ = injectContent<{ content: string }>({
    customFilename: 'about/about',
  });

  constructor() {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }
}
