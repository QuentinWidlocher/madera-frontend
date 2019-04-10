import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from './api/api-config';
import { timer } from 'rxjs';
import { rootRenderNodes } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  private _isConnected: boolean;

  constructor(private http: HttpClient) {

    // Met à jour l'état de la connexion toutes les cinq secondes
    timer(0, 5000).subscribe(() => {
      this.updateConnection();
    });
  }

  // Renvoie la valeur actuelle de _isConnected si elle existe, sinon, la vérifie
  public get isConnected(): Promise<boolean> {
    return new Promise(rtrn => {

      if (this._isConnected !== undefined) {

        // On a déjà une valeur connecté/pas connecté alors on la retourne
        rtrn(this._isConnected);

      } else {

        // On n'a pas de valeur, alors on va la chercher
        this.http.get(ApiConfig.XMYSQL_VERSION).subscribe(
          res => {
            rtrn(true);
          }, err => {
            rtrn(false);
          });
      }

    });

  }

  // Essaye de faire une simple requête sur l'API et met à jour la propriété _isConnected
  private updateConnection() {
    this.http.get(ApiConfig.XMYSQL_VERSION).subscribe(
      res => {
        this._isConnected = true;
      }, err => {
        this._isConnected = false;
    }, () => { console.log(this._isConnected ? 'ONLINE' : 'OFFLINE'); });
  }

}
