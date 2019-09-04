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
  validation_error ={
    email:'',
    password:''
  }

  ngOnInit() {
  }
  
  checkFocus(type){
    if(type == 'email'){
      this.validation_error.email = '';
    }
    if(type == 'password'){
      this.validation_error.password = '';
    }
     
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
          if(error.error.validator_error){
            let valdation = error.error.validator_error;
            if(valdation.email){
              this.validation_error.email='';
              for(let error of valdation.email) {
                this.validation_error.email += "<p>"+error+"</p><br>";
                }
                console.log(this.validation_error.email);
            }
            if(valdation.password){
              this.validation_error.password ='';
              for(let error of valdation.password) {
                this.validation_error.password += "<p>"+error+"</p><br>";
                }
            }
          }
          localStorage.clear();
          //this.router.navigate(['login']);
          console.log('kk');
         console.log(error);
       });
    }

  }
}
