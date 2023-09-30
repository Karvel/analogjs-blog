import { DOCUMENT } from '@angular/common';
import { ContentFile } from '@analogjs/content';
import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

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
    this.setPageURLMetaTags(url);
  }

  public setMetaTagsFromFrontMatter(
    frontMatter: ContentFile<BlogPost | Record<string, never>>,
  ): void {
    if (frontMatter.attributes.title) {
      this.updateTag({
        name: 'title',
        content: frontMatter.attributes.title,
      });
      this.updateTag({
        property: 'og:title',
        content: frontMatter.attributes.title,
      });
      this.updateTag({
        property: 'twitter:title',
        content: frontMatter.attributes.title,
      });
    }
    if (frontMatter.attributes.description) {
      this.updateTag({
        name: 'description',
        content: frontMatter.attributes.description,
      });
      this.updateTag({
        property: 'og:description',
        content: frontMatter.attributes.description,
      });
      this.updateTag({
        property: 'twitter:description',
        content: frontMatter.attributes.description,
      });
    }
    if (frontMatter.attributes.author) {
      this.updateTag({
        name: 'author',
        content: frontMatter.attributes.author,
      });
    }
    if (frontMatter.attributes.cover_image) {
      this.updateTag({
        property: 'og:image',
        content: frontMatter.attributes.cover_image,
      });
      this.updateTag({
        property: 'twitter:image',
        content: frontMatter.attributes.cover_image,
      });
    }
    if (frontMatter.attributes.date) {
      this.updateTag({
        property: 'article:published_time',
        content: frontMatter.attributes.date,
      });
    }
    if (frontMatter.attributes.last_updated) {
      this.updateTag({
        property: 'article:modified_time',
        content: frontMatter.attributes.last_updated,
      });
    }
    this.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
  }

  private mapMetaTagToQuerySelector(tag: MetaDefinition): string {
    if (tag.name) {
      return `name="${tag.name}"`;
    } else if (tag.property) {
      return `property="${tag.property}"`;
    }
    return '';
  }

  private setPageURLMetaTags(pageUrl?: string): void {
    if (pageUrl) {
      this.updateTag({ property: 'og:url', content: pageUrl });
      this.updateTag({ property: 'twitter:url', content: pageUrl });
    }
  }

  private updateTag(tag: MetaDefinition): void {
    this.meta.removeTag(this.mapMetaTagToQuerySelector(tag));
    if (tag) {
      this.meta.updateTag(tag);
    }
  }
}
