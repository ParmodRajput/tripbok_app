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

  // canActivate(route: ActivatedRouteSnapshot): boolean {
  //     console.log(route);
  //     let authInfo = {
  //       authenticated: localStorage.getItem("authenticated")
  //     };
  //     if (!authInfo.authenticated) {
  //       this.router.navigate(['']);
  //       return false;
  //     }
  //     return true;
  // }

  restricted_Url_If_Logined = [
    '',
    'register',
    // 'forget-password',
    // 'verify-forget-password',
    // 'update-new-password'
    ];
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url.split("/")[1];
    console.log('Url:' + url, this.restricted_Url_If_Logined.includes(url));
    if (localStorage.getItem('authenticated')) {
    if (this.restricted_Url_If_Logined.includes(url) ) {
      this.router.navigate(['home']);
    return false;
    }else{
    return true;
    } 
    }else{
    if (this.restricted_Url_If_Logined.includes(url)) {
    return true;
    }else{
    this.router.navigate(['']);
    return false;
    }
    }

  }


}
