import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public isLogin: boolean = false;

  constructor(private rout: Router, private apiLogin: LoginService) {
    this.isLogin = this.apiLogin.getIsLogin();
  }
  canActivate(): boolean {
    if (this.isLogin) {
      return true;
    } else {
      this.rout.navigate(['']);
      return true;
    }
  }

}
