import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  OnDestroy,
  inject,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private destroyed$ = new Subject<void>();
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private _theme$ = new ReplaySubject<'light' | 'dark'>(1);

  public theme$ = this._theme$.asObservable();

  constructor() {
    this.syncThemeFromLocalStorage();
    this.setClassOnThemeChange();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public toggleTheme(): void {
    const newTheme =
      localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    this._theme$.next(newTheme);
  }

  private syncThemeFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._theme$.next(
        localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
      );
    }
  }

  private setClassOnThemeChange(): void {
    this.theme$.pipe(takeUntil(this.destroyed$)).subscribe((theme) => {
      if (theme === 'dark') {
        this.renderer.addClass(this.document.documentElement, 'dark');
      } else {
        if (this.document.documentElement.className.includes('dark')) {
          this.renderer.removeClass(this.document.documentElement, 'dark');
        }
      }
    });
  }
}
