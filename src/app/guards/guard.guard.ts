import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router ,UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate  {
  
  constructor(private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

      console.log(route);

      let authInfo = {
          authenticated: localStorage.getItem("authenticated")
      };

      if (!authInfo.authenticated) {
          this.router.navigate(['']);
          return false;
      }

      return true;

  }

}
