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
    return this.http.get(ApiConfig.COMPOSANT_UNIQUE.replace(':id', '' + id));
  }

  add(composant: Composant): Observable<object> {
    composant.id = undefined;
    composant = Object.assign(Composant.newEmpty(), composant);
    return this.http.post(ApiConfig.COMPOSANT, composant);
  }

  edit(composant: Composant): Observable<object> {
    const composantPlain = { ...composant };
    return this.http.put(ApiConfig.COMPOSANT_UNIQUE.replace(':id', '' + composant.id), composantPlain);
  }

  delete(composant: Composant): Observable<object> {
    return this.http.delete(ApiConfig.COMPOSANT_UNIQUE.replace(':id', '' + composant.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.COMPOSANT_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.COMPOSANT_EXISTS.replace(':id', '' + id));
  }

}
