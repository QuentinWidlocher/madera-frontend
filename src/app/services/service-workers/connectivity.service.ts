import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  public isConnected = true;

  constructor() { }
}
