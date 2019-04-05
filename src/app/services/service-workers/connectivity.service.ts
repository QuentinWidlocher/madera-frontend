import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../api/api-config';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  public isConnected = false;

  constructor(private http: HttpClient) {
    timer(0, 5000).subscribe(() => {
      this.updateConnection();
    });
  }

  updateConnection() {
    this.http.get(ApiConfig.XMYSQL_VERSION).subscribe(
      res => {
        this.isConnected = true;
      }, err => {
        this.isConnected = false;
    });
  }
}
