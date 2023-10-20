import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RouteMeta } from '@analogjs/router';

import { siteName } from '@constants/site-name';

export const routeMeta: RouteMeta = {
  title: `Not Found | ${siteName}`,
};

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-3xl p-4 mx-auto flex flex-col self-center pt-10">
      <h1 class="flex justify-center">Page Not Found</h1>
      <a class="flex justify-center pt-4" routerLink="/">Go Home</a>
    </div>
  `,
})
export default class PageNotFoundComponent {}
