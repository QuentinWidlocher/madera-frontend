import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Projet } from 'src/app/classes/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.PROJET);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.PROJET_UNIQUE.replace(':id', '' + id));
  }

  add(projet: Projet): Observable<object> {
    projet.id = undefined;
    projet = Object.assign(Projet.newEmpty(), projet);
    return this.http.post(ApiConfig.PROJET, projet);
  }

  edit(projet: Projet): Observable<object> {
    projet = Object.assign(Projet.newEmpty(), projet)
    return this.http.put(ApiConfig.PROJET_UNIQUE.replace(':id', '' + projet.id), projet);
  }

  delete(projet: Projet): Observable<object> {
    return this.http.delete(ApiConfig.PROJET_UNIQUE.replace(':id', '' + projet.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.PROJET_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.PROJET_EXISTS.replace(':id', '' + id));
  }

}
