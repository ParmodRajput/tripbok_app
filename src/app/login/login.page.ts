import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) {}
  data: any;

  ngOnInit() {
  }
  
  login(form){
    //console.log(form.value);
    let email = form.value.email;
    let password = form.value.password; 
    if((email !== null && email !=='') && (password !== null && password !=='')){
      this.data ={
        email:email,
        password:password
      }
      this.AuthService.login(this.data)
      .subscribe(res => {
        // console.log(res.authenticated);
         if(res['authenticated']){
           localStorage.setItem('token','Bearer '+res['data'].token);
           localStorage.setItem('id',res['data'].id);
           localStorage.setItem('authenticated',res['authenticated']);
           this.router.navigate(['home']);
         }
        }, error => {
          localStorage.clear();
          this.router.navigate(['login']);
          console.log('kk');
         console.log(error);
       });
    }

  }
}
