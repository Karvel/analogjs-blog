import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);
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
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        const pageUrl = this.router.url
          ? `${this.document.location.origin}${this.router.url}`
          : '';
        this.metadataService.removeTags();
        this.metadataService.setCanonicalUrl(pageUrl);
        this.metadataService.setPageURLMetaTags(pageUrl);
        this.metadataService.updateTag({
          property: 'og:site_name',
          content: `${siteName}`,
        });
        this.metadataService.updateTag({
          property: 'og:locale',
          content: 'en_US',
        });
        this.metadataService.updateTag({
          property: 'og:image',
          content: `${this.document.location.origin}/images/self/logo.png`,
        });
        this.metadataService.updateTag({
          property: 'twitter:image',
          content: `${this.document.location.origin}/images/self/logo.png`,
        });
      });
  }
}
