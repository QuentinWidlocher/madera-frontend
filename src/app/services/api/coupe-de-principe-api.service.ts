import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { CoupeDePrincipe } from 'src/app/classes/coupe-de-principe';

@Injectable({
  providedIn: 'root'
})
export class CoupeDePrincipeApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.COUPE_DE_PRINCIPE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.COUPE_DE_PRINCIPE.replace(':id', '' + id));
  }

  add(coupeDePrincipe: CoupeDePrincipe): Observable<object> {
    coupeDePrincipe.id = undefined;
    coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), coupeDePrincipe);
    return this.http.post(ApiConfig.COUPE_DE_PRINCIPE, coupeDePrincipe.toJSON());
  }

  edit(coupeDePrincipe: CoupeDePrincipe): Observable<object> {
    const coupeDePrincipePlain = { ...coupeDePrincipe };
    return this.http.put(ApiConfig.COUPE_DE_PRINCIPE_UNIQUE.replace(':id', '' + coupeDePrincipe.id), coupeDePrincipePlain);
  }

  delete(coupeDePrincipe: CoupeDePrincipe): Observable<object> {
    return this.http.delete(ApiConfig.COUPE_DE_PRINCIPE_UNIQUE.replace(':id', '' + coupeDePrincipe.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.COUPE_DE_PRINCIPE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.COUPE_DE_PRINCIPE_EXISTS.replace(':id', '' + id));
  }
  
}
