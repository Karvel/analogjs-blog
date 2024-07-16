import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private isPlatformBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private ngZone = inject(NgZone);
  private screenWidth$ = new BehaviorSubject<number>(
    this.isPlatformBrowser ? window.innerWidth : 0,
  );

  constructor() {
    this.listenToResize();
  }

  public get screenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  private listenToResize(): void {
    if (this.isPlatformBrowser) {
      window.addEventListener('resize', () => {
        this.ngZone.run(() => {
          this.screenWidth$.next(window.innerWidth);
        });
      });
    }
  }
}
