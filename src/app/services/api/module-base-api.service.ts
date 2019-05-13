import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Module } from 'src/app/classes/module';
import { ModuleBase } from '../../classes/moduleBase';

@Injectable({
  providedIn: 'root'
})
export class ModuleBaseApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.MODULE_BASE);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.MODULE_BASE_UNIQUE.replace(':id', '' + id));
  }

  add(module: ModuleBase): Observable<object> {
    module.id = undefined;
    module = Object.assign(Module.newEmpty(), module);
    return this.http.post(ApiConfig.MODULE_BASE, module);
  }

  edit(module: ModuleBase): Observable<object> {
    const modulePlain = { ...module };
    return this.http.put(ApiConfig.MODULE_BASE_UNIQUE.replace(':id', '' + module.id), modulePlain);
  }

  delete(module: ModuleBase): Observable<object> {
    return this.http.delete(ApiConfig.MODULE_BASE_UNIQUE.replace(':id', '' + module.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.MODULE_BASE_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.MODULE_BASE_EXISTS.replace(':id', '' + id));
  }

}
