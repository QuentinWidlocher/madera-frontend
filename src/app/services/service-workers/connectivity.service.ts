import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../api/api-config';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  private _isConnected: boolean;

  constructor(private http: HttpClient) {
    timer(0, 5000).subscribe(() => {
      this.updateConnection();
    });
  }

  public get isConnected(): Promise<boolean> {
    return new Promise(rslv => { rslv(this._isConnected); });
  }

  private updateConnection() {
    this.http.get(ApiConfig.XMYSQL_VERSION).subscribe(
      res => {
        this._isConnected = true;
      }, err => {
        this._isConnected = false;
    }, () => { console.log(this._isConnected ? 'ONLINE' : 'OFFLINE'); });
  }

}
