import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { FamilleGamme } from 'src/app/classes/famille-gamme';

@Injectable({
  providedIn: 'root'
})
export class FamilleGammeApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.FAMILLE_GAMME);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.FAMILLE_GAMME_UNIQUE.replace(':id', '' + id));
  }

  add(familleGamme: FamilleGamme): Observable<object> {
    familleGamme.id = undefined;
    familleGamme = Object.assign(FamilleGamme.newEmpty(), familleGamme);
    return this.http.post(ApiConfig.FAMILLE_GAMME, familleGamme.toJSON());
  }

  edit(familleGamme: FamilleGamme): Observable<object> {
    const familleGammePlain = { ...familleGamme };
    return this.http.put(ApiConfig.FAMILLE_GAMME_UNIQUE.replace(':id', '' + familleGamme.id), familleGammePlain);
  }

  delete(familleGamme: FamilleGamme): Observable<object> {
    return this.http.delete(ApiConfig.FAMILLE_GAMME_UNIQUE.replace(':id', '' + familleGamme.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.FAMILLE_GAMME_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.FAMILLE_GAMME_EXISTS.replace(':id', '' + id));
  }

}
