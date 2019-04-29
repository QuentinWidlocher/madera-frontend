import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Modele } from 'src/app/classes/modele';

@Injectable({
  providedIn: 'root'
})
export class ModeleApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.MODELE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.MODELE_UNIQUE.replace(':id', '' + id));
  }

  add(modele: Modele): Observable<object> {
    modele.id = undefined;
    modele = Object.assign(Modele.newEmpty(), modele);
    return this.http.post(ApiConfig.MODELE, modele.toJSON());
  }

  edit(modele: Modele): Observable<object> {
    const modelePlain = { ...modele };
    return this.http.put(ApiConfig.MODELE_UNIQUE.replace(':id', '' + modele.id), modelePlain);
  }

  delete(modele: Modele): Observable<object> {
    return this.http.delete(ApiConfig.MODELE_UNIQUE.replace(':id', '' + modele.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.MODELE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.MODELE_EXISTS.replace(':id', '' + id));
  }

}
