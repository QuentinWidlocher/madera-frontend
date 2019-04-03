import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { CCTP } from 'src/app/classes/CCTP';

@Injectable({
  providedIn: 'root'
})
export class CctpApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.CCTP);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.CCTP.replace(':id', '' + id));
  }

  add(cctp: CCTP): Observable<object> {
    cctp.id = undefined;
    const cctpPlain = { ...cctp };

    return this.http.post(ApiConfig.CCTP, cctpPlain);
  }

  edit(cctp: CCTP): Observable<object> {
    const cctpPlain = { ...cctp };
    return this.http.put(ApiConfig.CCTP, cctpPlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.CCTP_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.CCTP_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.CCTP_EXISTS.replace(':id', '' + id));
  }

}
