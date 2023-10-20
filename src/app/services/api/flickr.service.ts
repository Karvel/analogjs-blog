import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map } from 'rxjs';

import { flickr } from '@constants/flickr';
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
  public getRecentPhotosets() {
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
      .get(`${this.baseUrl}`, { params })
      .pipe(map((response: any) => response.photosets.photoset.slice(1, 4)));
  }
}
