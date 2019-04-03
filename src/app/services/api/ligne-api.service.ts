import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Ligne } from 'src/app/classes/ligne';

@Injectable({
  providedIn: 'root'
})
export class LigneApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.LIGNE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.LIGNE.replace(':id', '' + id));
  }

  add(ligne: Ligne): Observable<object> {
    ligne.id = undefined;
    const lignePlain = { ...ligne };

    return this.http.post(ApiConfig.LIGNE, lignePlain);
  }

  edit(ligne: Ligne): Observable<object> {
    const lignePlain = { ...ligne };
    return this.http.put(ApiConfig.LIGNE, lignePlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.LIGNE_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.LIGNE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.LIGNE_EXISTS.replace(':id', '' + id));
  }

}