import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { FamilleComposant } from 'src/app/classes/famille-composant';

@Injectable({
  providedIn: 'root'
})
export class FamilleComposantApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.FAMILLE_COMPOSANT);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.FAMILLE_COMPOSANT_UNIQUE.replace(':id', '' + id));
  }

  add(familleComposant: FamilleComposant): Observable<object> {
    familleComposant.id = undefined;
    familleComposant = Object.assign(FamilleComposant.newEmpty(), familleComposant);
    return this.http.post(ApiConfig.FAMILLE_COMPOSANT, familleComposant);
  }

  edit(familleComposant: FamilleComposant): Observable<object> {
    const familleComposantPlain = { ...familleComposant };
    return this.http.put(ApiConfig.FAMILLE_COMPOSANT_UNIQUE.replace(':id', '' + familleComposant.id), familleComposantPlain);
  }

  delete(familleComposant: FamilleComposant): Observable<object> {
    return this.http.delete(ApiConfig.FAMILLE_COMPOSANT_UNIQUE.replace(':id', '' + familleComposant.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.FAMILLE_COMPOSANT_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.FAMILLE_COMPOSANT_EXISTS.replace(':id', '' + id));
  }

}
