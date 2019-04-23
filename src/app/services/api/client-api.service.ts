import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Client } from 'src/app/classes/client';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.CLIENT);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.CLIENT.replace(':id', '' + id));
  }

  add(client: Client): Observable<object> {
    client.id = undefined;
    client = Object.assign(Client.newEmpty(), client);
    return this.http.post(ApiConfig.CLIENT, client.toJSON());
  }

  edit(client: Client): Observable<object> {
    const clientPlain = { ...client };
    return this.http.put(ApiConfig.CLIENT_UNIQUE.replace(':id', '' + client.id), clientPlain);
  }

  delete(client: Client): Observable<object> {
    return this.http.delete(ApiConfig.CLIENT_UNIQUE.replace(':id', '' + client.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.CLIENT_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.CLIENT_EXISTS.replace(':id', '' + id));
  }

}
