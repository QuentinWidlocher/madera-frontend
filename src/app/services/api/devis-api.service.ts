import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Devis } from 'src/app/classes/devis';

@Injectable({
  providedIn: 'root'
})
export class DevisApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.DEVIS);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.DEVIS.replace(':id', '' + id));
  }

  add(devis: Devis): Observable<object> {
    devis.id = undefined;
    const devisPlain = { ...devis };

    return this.http.post(ApiConfig.DEVIS, devisPlain);
  }

  edit(devis: Devis): Observable<object> {
    const devisPlain = { ...devis };
    return this.http.put(ApiConfig.DEVIS_UNIQUE.replace(':id', '' + devis.id), devisPlain);
  }

  delete(devis: Devis): Observable<object> {
    return this.http.delete(ApiConfig.DEVIS_UNIQUE.replace(':id', '' + devis.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.DEVIS_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.DEVIS_EXISTS.replace(':id', '' + id));
  }

}
