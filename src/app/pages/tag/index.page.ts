import { Component } from '@angular/core';

import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import { BlogPost } from '@models/post';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

export const routeMeta: RouteMeta = {
  title: `Tags | Hapax Legomenon`,
};

@Component({
  standalone: true,
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start">Tags:</h1>
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent {
  public posts = injectContentFiles<BlogPost>().sort(
    sortByUpdatedOrOriginalDate,
  );
}
