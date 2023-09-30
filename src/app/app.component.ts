import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';

import { filter, map, mergeMap } from 'rxjs';

import FooterComponent from '@components/footer/footer.component';
import HeaderComponent from '@components/header/header.component';
import { MetadataService } from '@services/metadata.service';
import { siteName } from '@constants/site-name';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  template: `
    <div class="flex flex-col h-screen">
      <app-header />
      <main class="grow">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent implements OnInit {
  private document = inject(DOCUMENT);
  private metadataService = inject(MetadataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public ngOnInit(): void {
    this.setMetaOnRouteLoad();
  }

  /**
   * Set the canonical URL on route load.
   */
  private setMetaOnRouteLoad(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      )
      .subscribe(() => {
        const pageUrl = this.router.url
          ? `${this.document.location.origin}${this.router.url}`
          : '';
        this.metadataService.setCanonicalUrl(pageUrl);
        this.metadataService.updateTag({
          property: 'og:site_name',
          content: `${siteName}`,
        });
        this.metadataService.updateTag({
          property: 'og:locale',
          content: 'en_US',
        });
      });
  }
}
