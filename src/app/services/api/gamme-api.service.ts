import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Gamme } from 'src/app/classes/gamme';

@Injectable({
  providedIn: 'root'
})
export class GammeApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.GAMME);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.GAMME.replace(':id', '' + id));
  }

  add(gamme: Gamme): Observable<object> {
    gamme.id = undefined;
    const gammePlain = { ...gamme };

    return this.http.post(ApiConfig.GAMME, gammePlain);
  }

  edit(gamme: Gamme): Observable<object> {
    const gammePlain = { ...gamme };
    return this.http.put(ApiConfig.GAMME, gammePlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.GAMME_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.GAMME_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.GAMME_EXISTS.replace(':id', '' + id));
  }

}