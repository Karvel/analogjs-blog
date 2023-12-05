import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { withInMemoryScrolling } from '@angular/router';

import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { provideFileRouter } from '@analogjs/router';
import { provideSvgIcons } from '@ngneat/svg-icon';

import { svgIcons } from '../../svg/index';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideContent(withMarkdownRenderer()),
    provideSvgIcons(svgIcons),
  ],
};
