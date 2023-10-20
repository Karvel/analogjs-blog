import { Component, inject } from '@angular/core';

import { RouteMeta } from '@analogjs/router';

import { siteName } from '@constants/site-name';
import { MetadataService } from '@services/metadata.service';

export const pageTitle = {
  title: `Photos | ${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

@Component({
  selector: 'app-photos-index',
  standalone: true,
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="xl:w-[80rem] p-4">
        <div class="flex-1">Photos</div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent {
  private metadataService = inject(MetadataService);

  constructor() {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
  }
}
