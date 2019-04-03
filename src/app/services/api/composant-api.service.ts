import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Composant } from 'src/app/classes/composant';

@Injectable({
  providedIn: 'root'
})
export class ComposantApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.COMPOSANT);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.COMPOSANT.replace(':id', '' + id));
  }

  add(composant: Composant): Observable<object> {
    composant.id = undefined;
    const composantPlain = { ...composant };

    return this.http.post(ApiConfig.COMPOSANT, composantPlain);
  }

  edit(composant: Composant): Observable<object> {
    const composantPlain = { ...composant };
    return this.http.put(ApiConfig.COMPOSANT, composantPlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.COMPOSANT_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.COMPOSANT_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.COMPOSANT_EXISTS.replace(':id', '' + id));
  }

}