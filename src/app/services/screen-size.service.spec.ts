import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

import { ScreenSizeService } from './screen-size.service';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScreenSizeService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    service = TestBed.inject(ScreenSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize screenWidth with window.innerWidth if platform is browser', () => {
    TestBed.resetTestingModule();
    service = TestBed.inject(ScreenSizeService);
    service.screenWidth.subscribe((width) => {
      expect(width).toBe(window.innerWidth);
    });
  });

  it('should initialize screenWidth with 0 if platform is not browser', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ScreenSizeService,
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });
    service = TestBed.inject(ScreenSizeService);
    service.screenWidth.subscribe((width) => {
      expect(width).toBe(0);
    });
  });

  it('should return an observable from screenWidth', () => {
    service.screenWidth.subscribe((width) => {
      expect(width).toBeDefined();
    });
  });
});
