import { describe, it, expect, vi } from 'vitest';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { redirectOldSlugGuard } from './redirect-old-slug.guard';
import * as contentModule from '@analogjs/content';
import * as getYearModule from '@utils/get-year';
import * as getMonthModule from '@utils/get-month';
import * as splitValuesOnSlashModule from '@utils/split-values-on-slash';
import { TestBed } from '@angular/core/testing';

// Mock implementations
vi.mock('@analogjs/content', () => ({ injectContentFiles: vi.fn() }));
vi.mock('@utils/get-year', () => ({ getYear: vi.fn() }));
vi.mock('@utils/get-month', () => ({ getMonth: vi.fn() }));
vi.mock('@utils/split-values-on-slash', () => ({
  splitValuesOnSlash: vi.fn(),
}));

describe('redirectOldSlugGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: { createUrlTree: vi.fn((path) => ({ mockUrlTree: path })) },
        },
      ],
    });
    router = TestBed.inject(Router);
  });

  it('should redirect an old URL to the correct path if a matching post is found', () => {
    const mockActivatedRouteSnapshot = {};
    const mockState: Partial<RouterStateSnapshot> = {
      url: '/2023/04/sample-post',
    };

    vi.mocked(splitValuesOnSlashModule.splitValuesOnSlash).mockReturnValue([
      '2023',
      '04',
      'sample-post',
    ]);
    vi.mocked(contentModule.injectContentFiles).mockReturnValue([
      {
        filename: '',
        slug: 'sample-post',
        attributes: { date: new Date(2023, 3, 1) },
      },
    ]);
    vi.mocked(getYearModule.getYear).mockReturnValue('2023');
    vi.mocked(getMonthModule.getMonth).mockReturnValue('04');

    const result = TestBed.runInInjectionContext(() =>
      redirectOldSlugGuard(
        mockActivatedRouteSnapshot as ActivatedRouteSnapshot,
        mockState as RouterStateSnapshot,
      ),
    );

    expect(result).toEqual({ mockUrlTree: ['/blog/2023/04/sample-post'] });
    expect(router.createUrlTree).toHaveBeenCalledWith([
      '/blog/2023/04/sample-post',
    ]);
  });

  it('should return true if there are no posts', () => {
    const mockActivatedRouteSnapshot = {};
    const mockState: Partial<RouterStateSnapshot> = {
      url: '/2023/04/nonexistent-post',
    };

    vi.mocked(splitValuesOnSlashModule.splitValuesOnSlash).mockReturnValue([
      '2023',
      '04',
      'nonexistent-post',
    ]);
    vi.mocked(contentModule.injectContentFiles).mockReturnValue([]);

    const result = TestBed.runInInjectionContext(() =>
      redirectOldSlugGuard(
        mockActivatedRouteSnapshot as ActivatedRouteSnapshot,
        mockState as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(true);
  });

  it('should return true if there is no url', () => {
    const mockActivatedRouteSnapshot = {};
    const mockState: Partial<RouterStateSnapshot> = {};

    const result = TestBed.runInInjectionContext(() =>
      redirectOldSlugGuard(
        mockActivatedRouteSnapshot as ActivatedRouteSnapshot,
        mockState as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(true);
  });

  it('should return true if no matching post is found', () => {
    const mockActivatedRouteSnapshot = {};
    const mockState: Partial<RouterStateSnapshot> = {
      url: '/2023/04/nonexistent-post',
    };

    vi.mocked(splitValuesOnSlashModule.splitValuesOnSlash).mockReturnValue([
      '2023',
      '04',
      'nonexistent-post',
    ]);
    vi.mocked(contentModule.injectContentFiles).mockReturnValue([
      {
        filename: '',
        slug: 'sample-post',
        attributes: { date: new Date(2024, 2, 1) },
      },
    ]);
    vi.mocked(getYearModule.getYear).mockReturnValue('2024');
    vi.mocked(getMonthModule.getMonth).mockReturnValue('03');

    const result = TestBed.runInInjectionContext(() =>
      redirectOldSlugGuard(
        mockActivatedRouteSnapshot as ActivatedRouteSnapshot,
        mockState as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(true);
  });
});
