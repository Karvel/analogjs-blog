import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RouteMeta } from '@analogjs/router';

import { siteName } from '@constants/site-name';
import { redirectOldSlugGuard } from '@guards/redirect-old-slug.guard';

export const routeMeta: RouteMeta = {
  title: `Not Found | ${siteName}`,
  canActivate: [redirectOldSlugGuard],
};

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-3xl p-4 mx-auto flex flex-col self-center pt-10">
      <h1 class="flex justify-center text-xl">Page Not Found</h1>
      <a class="flex justify-center pt-4" routerLink="/">Go Home</a>
    </div>
  `,
})
export default class PageNotFoundComponent {}
