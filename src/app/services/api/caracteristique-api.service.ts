import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Caracteristique } from 'src/app/classes/caracteristique';

@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.CARACTERISTIQUE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.CARACTERISTIQUE.replace(':id', '' + id));
  }

  add(caracteristique: Caracteristique): Observable<object> {
    caracteristique = Object.assign(Caracteristique.newEmpty(), caracteristique);

    caracteristique.id = undefined;
    const caracteristiquePlain = caracteristique.toJSON();

    return this.http.post(ApiConfig.CARACTERISTIQUE, caracteristiquePlain);
  }

  edit(caracteristique: Caracteristique): Observable<object> {
    const caracteristiquePlain = { ...caracteristique };
    return this.http.put(ApiConfig.CARACTERISTIQUE, caracteristiquePlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.CARACTERISTIQUE_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.CARACTERISTIQUE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.CARACTERISTIQUE_EXISTS.replace(':id', '' + id));
  }

}
