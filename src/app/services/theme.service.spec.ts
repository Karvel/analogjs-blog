import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './theme.service';
import { Renderer2, RendererFactory2 } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;
  let documentMock: Document;
  let rendererMock: Partial<Renderer2>;

  beforeEach(() => {
    documentMock = {
      documentElement: {
        className: '',
      },
    } as unknown as Document;

    rendererMock = {
      addClass: vi.fn(),
      removeClass: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: DOCUMENT, useValue: documentMock },
        {
          provide: RendererFactory2,
          useValue: { createRenderer: () => rendererMock },
        },
      ],
    });

    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme from dark to light', () => {
    localStorage.clear();
    localStorage.setItem('theme', 'dark');
    service.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    localStorage.clear();
    localStorage.setItem('theme', 'light');
    service.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should sync light theme from localStorage', () => {
    localStorage.clear();
    localStorage.setItem('theme', 'light');
    service['syncThemeFromLocalStorage']();
    service.theme$.subscribe((theme) => {
      expect(theme).toBe('light');
    });
  });

  it('should sync dark theme from localStorage', () => {
    localStorage.clear();
    localStorage.setItem('theme', 'dark');
    service['syncThemeFromLocalStorage']();
    service.theme$.subscribe((theme) => {
      expect(theme).toBe('dark');
    });
  });

  it('should add dark class when theme is dark', () => {
    service['_theme$'].next('dark');
    service['setClassOnThemeChange']();
    expect(rendererMock.addClass).toHaveBeenCalledWith(
      documentMock.documentElement,
      'dark',
    );
  });

  it('should remove dark class when theme is light', () => {
    documentMock.documentElement.className = 'dark';
    service['_theme$'].next('light');
    service['setClassOnThemeChange']();
    expect(rendererMock.removeClass).toHaveBeenCalledWith(
      documentMock.documentElement,
      'dark',
    );
  });

  it('should complete destroyed$ subject on destroy', () => {
    const completeSpy = vi.spyOn(service['destroyed$'], 'complete');
    service.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
