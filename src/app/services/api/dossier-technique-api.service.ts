import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { DossierTechnique } from 'src/app/classes/dossier-technique';

@Injectable({
  providedIn: 'root'
})
export class DossierTechniqueApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.DOSSIER_TECHNIQUE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.DOSSIER_TECHNIQUE.replace(':id', '' + id));
  }

  add(dossierTechnique: DossierTechnique): Observable<object> {
    dossierTechnique.id = undefined;
    const dossierTechniquePlain = { ...dossierTechnique };

    return this.http.post(ApiConfig.DOSSIER_TECHNIQUE, dossierTechniquePlain);
  }

  edit(dossierTechnique: DossierTechnique): Observable<object> {
    const dossierTechniquePlain = { ...dossierTechnique };
    return this.http.put(ApiConfig.DOSSIER_TECHNIQUE_UNIQUE.replace(':id', '' + dossierTechnique.id), dossierTechniquePlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.DOSSIER_TECHNIQUE_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.DOSSIER_TECHNIQUE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.DOSSIER_TECHNIQUE_EXISTS.replace(':id', '' + id));
  }

}
