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

  ngOnInit() {
  }
  
  register(form){
    //console.log(form.value);
    let email = form.value.email;
    let password = form.value.password;
    let c_password = form.value.c_password;  
    let phone = form.value.phone;  
    let name = form.value.name;  
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
         if(res.authenticated){
           localStorage.setItem('token','Bearer '+res.data.token);
           localStorage.setItem('id',res.data.id);
           localStorage.setItem('authenticated',res.authenticated);
           this.router.navigate(['home']);
         }
        }, error => {
          console.log('kk');
         console.log(error);
       });
    }

  }
}
