import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { GammeComposant } from 'src/app/classes/gamme-composant';

@Injectable({
  providedIn: 'root'
})
export class GammeComposantApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.GAMME_COMPOSANT);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.GAMME_COMPOSANT.replace(':id', '' + id));
  }

  add(gammeComposant: GammeComposant): Observable<object> {
    gammeComposant.id = undefined;
    gammeComposant = Object.assign(GammeComposant.newEmpty(), gammeComposant);
    return this.http.post(ApiConfig.GAMME_COMPOSANT, gammeComposant.toJSON());
  }

  edit(gammeComposant: GammeComposant): Observable<object> {
    const gammeComposantPlain = { ...gammeComposant };
    return this.http.put(ApiConfig.GAMME_COMPOSANT_UNIQUE.replace(':id', '' + gammeComposant.id), gammeComposantPlain);
  }

  delete(gammeComposant: GammeComposant): Observable<object> {
    return this.http.delete(ApiConfig.GAMME_COMPOSANT_UNIQUE.replace(':id', '' + gammeComposant.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.GAMME_COMPOSANT_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.GAMME_COMPOSANT_EXISTS.replace(':id', '' + id));
  }

}
