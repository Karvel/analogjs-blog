import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { flickr } from '@constants/flickr';
import {
  Person,
  PhotosetListItem,
  PhotosetListResponse,
  PhotosetPhoto,
  PhotosetPhotoListResponse,
  UserProfileResponse,
} from '@models/flickr';
import { shuffleArray } from '@utils/shuffle-array';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  private apiService = inject(ApiService);
  private baseUrl = 'https://www.flickr.com/services/rest';

  /**
   * Get 9 randomized photos from my photo set of favorite photos.
   */
  public getFavoritePhotos(): Observable<PhotosetPhoto[]> {
    const paramObj = {
      method: 'flickr.photosets.getPhotos',
      api_key: atob(flickr.api_key),
      user_id: flickr.user_id,
      photoset_id: '72157604124791010',
      extras: flickr.extras,
      format: 'json',
      nojsoncallback: '1',
    };
    const params = new HttpParams({ fromObject: paramObj });

    return this.apiService
      .get<PhotosetPhotoListResponse>(`${this.baseUrl}`, { params })
      .pipe(
        map((response) => shuffleArray(response.photoset.photo).slice(0, 9)),
      );
  }

  public getProfile(): Observable<Person> {
    const paramObj = {
      method: 'flickr.people.getInfo',
      api_key: atob(flickr.api_key),
      user_id: flickr.user_id,
      format: 'json',
      nojsoncallback: '1',
    };
    const params = new HttpParams({ fromObject: paramObj });

    return this.apiService
      .get<UserProfileResponse>(`${this.baseUrl}`, {
        params,
      })
      .pipe(map((response) => response.person));
  }

  /**
   * Get 3 most recent photo sets, excluding the first, which is a collection of favorites.
   */
  public getRecentPhotosets(): Observable<PhotosetListItem[]> {
    const paramObj = {
      method: 'flickr.photosets.getList',
      api_key: atob(flickr.api_key),
      user_id: flickr.user_id,
      extras: flickr.extras,
      format: 'json',
      nojsoncallback: '1',
    };
    const params = new HttpParams({ fromObject: paramObj });

    return this.apiService
      .get<PhotosetListResponse>(`${this.baseUrl}`, { params })
      .pipe(map((response) => response.photosets.photoset.slice(1, 4)));
  }
}
