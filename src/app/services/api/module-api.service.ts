import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Module } from 'src/app/classes/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.MODULE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.MODULE_UNIQUE.replace(':id', '' + id));
  }

  add(module: Module): Observable<object> {
    module = Object.assign(Module.newEmpty(), module);
    return this.http.post(ApiConfig.MODULE, module);
  }

  edit(module: Module): Observable<object> {
    const modulePlain = { ...module };
    return this.http.put(ApiConfig.MODULE_UNIQUE.replace(':id', '' + module.id), modulePlain);
  }

  delete(module: Module): Observable<object> {
    return this.http.delete(ApiConfig.MODULE_UNIQUE.replace(':id', '' + module.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.MODULE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.MODULE_EXISTS.replace(':id', '' + id));
  }

}
