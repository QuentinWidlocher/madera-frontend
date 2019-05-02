import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { CCTP } from 'src/app/classes/cctp';

@Injectable({
  providedIn: 'root'
})
export class CCTPApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.CCTP);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.CCTP_UNIQUE.replace(':id', '' + id));
  }

  add(cctp: CCTP): Observable<object> {
    cctp.id = undefined;
    cctp = Object.assign(CCTP.newEmpty(), cctp);

    return this.http.post(ApiConfig.CCTP, cctp);
  }

  edit(cctp: CCTP): Observable<object> {
    const cctpPlain = { ...cctp };
    return this.http.put(ApiConfig.CCTP_UNIQUE.replace(':id', '' + cctp.id), cctpPlain);
  }

  delete(cctp: CCTP): Observable<object> {
    return this.http.delete(ApiConfig.CCTP_UNIQUE.replace(':id', '' + cctp.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.CCTP_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.CCTP_EXISTS.replace(':id', '' + id));
  }

}
