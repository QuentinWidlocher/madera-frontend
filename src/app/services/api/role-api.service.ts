import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Role } from 'src/app/classes/role';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.ROLE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.ROLE.replace(':id', '' + id));
  }

  add(role: Role): Observable<object> {
    role.id = undefined;
    const rolePlain = { ...role };

    return this.http.post(ApiConfig.ROLE, rolePlain);
  }

  edit(role: Role): Observable<object> {
    const rolePlain = { ...role };
    return this.http.put(ApiConfig.ROLE_UNIQUE.replace(':id', '' + role.id), rolePlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.ROLE_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.ROLE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.ROLE_EXISTS.replace(':id', '' + id));
  }
  
}
