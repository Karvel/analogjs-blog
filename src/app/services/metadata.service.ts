import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private document = inject(DOCUMENT);

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
}
