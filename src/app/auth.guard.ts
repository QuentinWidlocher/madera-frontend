// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './services/user.service';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService,private router: Router) {}

  canActivate() {

    if(!this.user.isLoggedIn())
    {
       this.router.navigate(['login']);
       return false;
    }
    var current_time = new Date().getTime().valueOf() / 1000;

    if (current_time > jwt_decode(localStorage.getItem('auth_token')).exp) {
      this.user.logout();
      this.router.navigate(['login']);
      return false;

    }


    return true;
  }
}
