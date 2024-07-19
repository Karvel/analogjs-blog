import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { FlickrService } from './flickr.service';

describe('FlickrService', () => {
  let service: FlickrService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockApiService: any;

  beforeEach(() => {
    // Mocking ApiService
    mockApiService = {
      get: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [FlickrService, provideHttpClient()],
    });

    // Initializing the FlickrService with mockApiService
    service = TestBed.inject(FlickrService);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (service as any).apiService = mockApiService; // We typecast to any to bypass TypeScript's type checks temporarily.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and process favorite photos correctly', () => {
    const mockResponse = {
      photoset: {
        photo: Array(15)
          .fill({})
          .map((_, index) => ({
            id: `id${index}`,
          })),
      },
    };

    mockApiService.get.mockReturnValue(of(mockResponse));

    service.getFavoritePhotos().subscribe((photos) => {
      expect(photos.length).toBe(9);
    });
  });

  it('should fetch and return profile data correctly', () => {
    const mockResponse = {
      person: {
        id: 'some-id',
      },
    };

    mockApiService.get.mockReturnValue(of(mockResponse));

    service.getProfile().subscribe((profile) => {
      expect(profile).toEqual(mockResponse.person);
    });
  });

  it('should fetch and process recent photo sets correctly', () => {
    const mockResponse = {
      photosets: {
        photoset: Array(5)
          .fill({})
          .map((_, index) => ({
            id: `set${index}`,
          })),
      },
    };

    mockApiService.get.mockReturnValue(of(mockResponse));

    service.getRecentPhotosets().subscribe((photosets) => {
      expect(photosets.length).toBe(3);
      expect(photosets[0].id).toBe('set1'); // Should exclude the first photoset
    });
  });
});
