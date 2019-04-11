import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from './api/api-config';
import { timer } from 'rxjs';
import { rootRenderNodes } from '@angular/core/src/view';
import { DeferredQueriesService } from './deferred-queries.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  private _isConnected: boolean;

  constructor(private http: HttpClient, private deferredQueries: DeferredQueriesService, private snackBar: MatSnackBar) {

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
        this.http.get(ApiConfig.PING).subscribe(
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
    this.http.get(ApiConfig.PING).subscribe(
      res => {
        if (this._isConnected === false) {
          this.deferredQueries.executeAll();
          this.snackBar.open('Vous êtes maintenant EN LIGNE !', undefined, {duration: 2000});
        }
        this._isConnected = true;
      }, err => {
        if (this._isConnected === true) {
          this.deferredQueries.executeAll();
          this.snackBar.open('Oh oh... Vous n\'êtes plus connecté...', undefined, { duration: 2000 });
        }
        this._isConnected = false;
    }, () => { console.log(this._isConnected ? 'ONLINE' : 'OFFLINE'); });
  }

}
