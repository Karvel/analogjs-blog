import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';

import { RouteMeta } from '@analogjs/router';

import { siteName } from '@constants/site-name';
import { MetadataService } from '@services/metadata.service';
import { talks } from '@constants/talks';

export const pageTitle = {
  title: `Talks | ${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

export const metaTagList: MetaDefinition[] = [
  {
    name: 'description',
    content: 'A list of the talks I had given.',
  },
  {
    name: 'author',
    content: 'Elanna Grossman',
  },
  {
    property: 'og:description',
    content: 'A list of the talks I had given.',
  },
  {
    property: 'twitter:description',
    content: 'A list of the talks I had given.',
  },
];

@Component({
  selector: 'app-category-index',
  standalone: true,
  imports: [JsonPipe, NgFor, NgIf],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start text-xl">Talks:</h1>
          <ng-container *ngIf="talks">
            <div *ngFor="let talk of talks">
              <div class="py-5 flex flex-col-reverse sm:flex-row">
                <div class="sm:pr-2 sm:max-w grow">
                  <div class="flex items-center">
                    <div *ngIf="talk?.date" class="text-xs pt-1 sm:pt-0">
                      {{ talk.date }}
                    </div>
                  </div>
                  <div class="text-lg font-bold">
                    {{ talk.title }}
                  </div>
                  <div class="sm:max-w-prose text-sm">
                    {{ talk.description }}
                  </div>
                  <ul *ngIf="talk.urlList" class="list-disc ml-4">
                    <li *ngFor="let url of talk.urlList">
                      <a [href]="url.path" target="_blank">{{ url.label }}</a>
                    </li>
                  </ul>
                </div>
                <div *ngIf="talk?.imageLink">
                  <img
                    [src]="talk.imageLink"
                    [alt]="talk.title || 'Talk Cover Image'"
                    appReplaceBrokenImage
                    class="sm:max-w-xs rounded-md"
                  />
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent implements OnInit {
  private metadataService = inject(MetadataService);

  public talks = talks;

  public ngOnInit(): void {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
    this.metadataService.updateTags(metaTagList);
  }
}
