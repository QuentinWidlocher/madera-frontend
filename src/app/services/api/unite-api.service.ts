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
    unite = Object.assign(Unite.newEmpty(), unite);
    return this.http.post(ApiConfig.UNITE, unite.toJSON());
  }

  edit(unite: Unite): Observable<object> {
    const unitePlain = { ...unite };
    return this.http.put(ApiConfig.UNITE_UNIQUE.replace(':id', '' + unite.id), unitePlain);
  }

  delete(unite: Unite): Observable<object> {
    return this.http.delete(ApiConfig.UNITE_UNIQUE.replace(':id', '' + unite.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.UNITE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.UNITE_EXISTS.replace(':id', '' + id));
  }

}
