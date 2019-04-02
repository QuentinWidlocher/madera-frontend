import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Produit } from 'src/app/classes/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.PRODUIT);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.PRODUIT.replace(':id', '' + id));
  }

  add(produit: Produit): Observable<object> {
    produit.id = undefined;
    const produitPlain = { ...produit };

    return this.http.post(ApiConfig.PRODUIT, produitPlain);
  }

  edit(produit: Produit): Observable<object> {
    const produitPlain = { ...produit };
    return this.http.put(ApiConfig.PRODUIT, produitPlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.PRODUIT_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.PRODUIT_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.PRODUIT_EXISTS.replace(':id', '' + id));
  }

}
