import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) {}
  data: any;
  validation_error ={
    name:'',
    email:'',
    password:'',
    phone:'',
    c_password:''
  }
  ngOnInit() {
  }
  
  checkFocus(type){
    if(type == 'name'){
      this.validation_error.name = '';
    }
    if(type == 'email'){
      this.validation_error.email = '';
    }
    if(type == 'password'){
      this.validation_error.password = '';
    }
    if(type == 'phone'){
      this.validation_error.phone = '';
    }
    if(type == 'c_password'){
      this.validation_error.c_password = '';
    }
     
  }

  register(form){
    //console.log(form.value);
    let email = form.value.email;
    let password = form.value.password;
    let c_password = form.value.c_password;  
    let phone = form.value.phone;  
    let name = form.value.name;  
    if(password !== c_password){
      this.validation_error.c_password ='The confirm password field is required.';
    }
    if((email !== null && email !=='') && (password !== null && password !=='') && (password =c_password) &&(name !== null && name !=='') &&(phone !== null && phone !=='')){
      this.data ={
        email:email,
        password:password,
        c_password:c_password,
        phone:phone,
        name:name
      }
      this.AuthService.register(this.data)
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
            if(valdation.name){
              this.validation_error.name='';
              for(let error of valdation.name) {
                this.validation_error.name += "<p>"+error+"</p><br>";
                }
                console.log(this.validation_error.email);
            }
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
            if(valdation.phone){
              this.validation_error.phone ='';
              for(let error of valdation.phone) {
                this.validation_error.phone += "<p>"+error+"</p><br>";
                }
            }
            if(valdation.c_password){
              this.validation_error.c_password ='';
              for(let error of valdation.c_password) {
                this.validation_error.c_password += "<p>"+error+"</p><br>";
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
