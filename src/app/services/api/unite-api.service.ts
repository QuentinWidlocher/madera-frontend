import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Unite } from 'src/app/classes/unite';

@Injectable({
  providedIn: 'root'
})
export class UniteApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.UNITE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.UNITE.replace(':id', '' + id));
  }

  add(unite: Unite): Observable<object> {
    unite.id = undefined;
    const unitePlain = { ...unite };

    return this.http.post(ApiConfig.UNITE, unitePlain);
  }

  edit(unite: Unite): Observable<object> {
    const unitePlain = { ...unite };
    return this.http.put(ApiConfig.UNITE, unitePlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.UNITE_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.UNITE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.UNITE_EXISTS.replace(':id', '' + id));
  }

}