import { Directive, ElementRef, HostListener, inject } from '@angular/core';

import { fallbackImagePath } from '@constants/fallback-image-path';
import { siteName } from '@constants/site-name';

@Directive({
  selector: 'img[appReplaceBrokenImage]',
  standalone: true,
})
export class ReplaceBrokenImageDirective {
  private el: ElementRef<HTMLImageElement> = inject(ElementRef);

  @HostListener('error')
  public onError(): void {
    this.el.nativeElement.src = `${fallbackImagePath}`;
    this.el.nativeElement.alt = `${siteName}`;
  }
}
