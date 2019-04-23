import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api/api-config';
import { Utilisateur } from 'src/app/classes/utilisateur';
import { Credentials } from 'src/app/classes/credentials';
import { Token } from 'src/app/classes/token';
import { UtilisateurApiService } from './api/utilisateur-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  errors : string
  constructor(private http: HttpClient, private api: UtilisateurApiService,) {
  }

  add(credentials: Credentials){

    return this.http.post<Token>(ApiConfig.UTILISATEUR_LOGIN, credentials).subscribe(
      (token: Token) => {
        let auth_token = token.auth_token
        localStorage.setItem('auth_token', auth_token);
      },
      errors => this.errors = 'Mauvais nom d\'utilisateur ou mot de passe');
  }

}
