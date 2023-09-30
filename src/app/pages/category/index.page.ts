import { Component } from '@angular/core';

import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: `Categories | Hapax Legomenon`,
};

@Component({
  standalone: true,
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start">Categories:</h1>
        </div>
      </div>
    </div>
  `,
})
export default class IndexPageComponent {}
