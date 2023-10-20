import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { flickr } from '@constants/flickr';
import { PhotoSetListItem, PhotoSetsListResponse } from '@models/flickr';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  private apiService = inject(ApiService);
  private baseUrl = 'https://www.flickr.com/services/rest';

  /**
   * Get 3 most recent photo sets, excluding the first, which is a collection of favorites.
   */
  public getRecentPhotosets(): Observable<PhotoSetListItem[]> {
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
      .get<PhotoSetsListResponse>(`${this.baseUrl}`, { params })
      .pipe(map((response) => response.photosets.photoset.slice(1, 4)));
  }
}
