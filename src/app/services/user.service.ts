import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiConfig } from './api/api-config';
import { Utilisateur } from 'src/app/classes/utilisateur';
import { Credentials } from 'src/app/classes/credentials';
import { Token } from 'src/app/classes/token';
import { UtilisateurApiService } from './api/utilisateur-api.service';
import * as jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  errors: string

  private loggedIn = false;
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();



  constructor(private http: HttpClient, private api: UtilisateurApiService, private router: Router) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this._authNavStatusSource.next(this.loggedIn);
  }

  login(credentials: Credentials): Observable<void> {

    return this.http.post<string>(ApiConfig.UTILISATEUR_LOGIN, credentials)
      .pipe(
        map(
        (res) => {
          var token = JSON.parse(res);
          let auth_token = JSON.stringify(token.auth_token);
          localStorage.setItem('auth_token', auth_token);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
        }),
      catchError(() => { return throwError("Nom d'utilisateur ou mot de passe erroné"); }));
  }

  getAuthorizationToken() {
    let authToken = localStorage.getItem('auth_token');
    return authToken;
  }

  getUserName() {
    return jwt_decode(this.getAuthorizationToken()).sub;
  }

  getUserId() {
    return jwt_decode(localStorage.getItem('auth_token')).userId
  }

  getRole(): string {

    var token = this.getAuthorizationToken();

    if (jwt_decode(token).Rol == "Admin") {
      return "Admin";
    }
    else if (jwt_decode(token).Rol == "User") {
      return "User";
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    this.loggedIn = !!localStorage.getItem('auth_token');
    return this.loggedIn;
  }

}
