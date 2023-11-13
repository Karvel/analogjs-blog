import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);

  public get<T>(
    endpoint: string,
    options?: { headers?: HttpHeaders; params?: HttpParams },
  ): Observable<T> {
    return this.httpClient.get<T>(endpoint, options).pipe(shareReplay());
  }
}
