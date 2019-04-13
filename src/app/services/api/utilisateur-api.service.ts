import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Utilisateur } from 'src/app/classes/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.UTILISATEUR);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.UTILISATEUR.replace(':id', '' + id));
  }

  add(utilisateur: Utilisateur): Observable<object> {
    utilisateur.id = undefined;
    const utilisateurPlain = { ...utilisateur };

    return this.http.post(ApiConfig.UTILISATEUR, utilisateurPlain);
  }

  edit(utilisateur: Utilisateur): Observable<object> {
    const utilisateurPlain = { ...utilisateur };
    return this.http.put(ApiConfig.UTILISATEUR_UNIQUE.replace(':id', '' + utilisateur.id), utilisateurPlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.UTILISATEUR_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.UTILISATEUR_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.UTILISATEUR_EXISTS.replace(':id', '' + id));
  }

}
