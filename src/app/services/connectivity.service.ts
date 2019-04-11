import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from './api/api-config';
import { timer, Subject } from 'rxjs';
import { rootRenderNodes } from '@angular/core/src/view';
import { DeferredQueriesService } from './deferred-queries.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  private _isConnected: boolean;
  private _event = new Subject();
  public event = this._event.asObservable();

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
        // On regarde si la valeur a changé
        const changed = this._isConnected === false;

        // On met à jour l'état maintenant, si jamais on doit s'en servir lors du trigger de l'event
        this._isConnected = true;

        // Si on viens de se reconnecter
        if (changed) {
          // On exécute toutes les requêtes différées
          this.deferredQueries.executeAll();
          // On trigger la valeur true dans l'event
          this._event.next(true);
          // On indique à l'utilisateur qu'il est connecté
          this.snackBar.open('Vous êtes maintenant EN LIGNE !', undefined, {duration: 2000});
        }
      }, err => {
        // On regarde si la valeur a changé
        const changed = this._isConnected === true;

        // On met à jour l'état maintenant, si jamais on doit s'en servir lors du trigger de l'event
        this._isConnected = false;

        // Si on viens de se déconnecter
        if (changed) {
          // On trigger la valeur false de l'event
          this._event.next(false);
          // On indique à l'utilisateur qu'il n'est plus connecté
          this.snackBar.open('Oh oh... Vous n\'êtes plus connecté...', undefined, { duration: 2000 });
        }
    });
  }

}
