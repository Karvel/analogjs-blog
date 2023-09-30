import { DOCUMENT } from '@angular/common';
import { ContentFile } from '@analogjs/content';
import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { BlogPost } from '@models/post';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private document = inject(DOCUMENT);
  private meta = inject(Meta);

  public setCanonicalUrl(url: string): void {
    const relLinkType = 'canonical';
    const head = this.document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null =
      this.document.querySelector(`link[rel='${relLinkType}']`) || null;
    if (element === null) {
      element = this.document.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', relLinkType);
    element.setAttribute('href', url);
  }

  public setMetaTagsFromFrontMatter(
    frontMatter: ContentFile<BlogPost | Record<string, never>>,
  ): void {
    if (frontMatter.attributes.title) {
      this.meta.updateTag({
        name: 'title',
        content: frontMatter.attributes.title,
      });
      this.meta.updateTag({
        property: 'og:title',
        content: frontMatter.attributes.title,
      });
      this.meta.updateTag({
        property: 'twitter:title',
        content: frontMatter.attributes.title,
      });
    }
    if (frontMatter.attributes.description) {
      this.meta.updateTag({
        name: 'description',
        content: frontMatter.attributes.description,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: frontMatter.attributes.description,
      });
      this.meta.updateTag({
        property: 'twitter:description',
        content: frontMatter.attributes.description,
      });
    }
    if (frontMatter.attributes.author) {
      this.meta.updateTag({
        name: 'author',
        content: frontMatter.attributes.author,
      });
    }
    if (frontMatter.attributes.cover_image) {
      this.meta.updateTag({
        property: 'og:image',
        content: frontMatter.attributes.cover_image,
      });
      this.meta.updateTag({
        property: 'twitter:image',
        content: frontMatter.attributes.cover_image,
      });
    }
    if (frontMatter.attributes.date) {
      this.meta.updateTag({
        property: 'article:published_time',
        content: frontMatter.attributes.date,
      });
    }
    if (frontMatter.attributes.last_updated) {
      this.meta.updateTag({
        property: 'article:modified_time',
        content: frontMatter.attributes.last_updated,
      });
    }
    this.meta.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
  }
}
