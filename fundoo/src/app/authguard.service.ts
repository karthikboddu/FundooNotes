import { Injectable } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private authServ: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authServ.isLoggednIn()) {
      debugger;
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
