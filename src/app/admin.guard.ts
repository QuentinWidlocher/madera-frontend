// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './services/user.service';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AdminGuard implements  CanActivate {
  constructor(private user: UserService, private router: Router) { }

  canActivate() {
    if (jwt_decode(localStorage.getItem('auth_token')).Rol != "Admin") {
      return false;
    }
    return true;
  }

  
}
