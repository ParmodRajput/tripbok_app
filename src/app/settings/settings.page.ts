import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
const serverApiUrl = environment.serverApiUrl;
const serverUrl = environment.serverUrl;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  data:any;
  constructor(private AuthService: AuthService, private router: Router,private route: ActivatedRoute) {
    let param ={
      token:localStorage.getItem('token'),
      user_id:localStorage.getItem('id'),
     }
     this.AuthService.profile(param)
     .subscribe(res => {
        if(res['authenticated'] == true){      
         this.data =res['data'];
         console.log(this.data);
        }
       }, error => {
         localStorage.clear();
         this.router.navigate(['login']);
         console.log('kk');
        console.log(error);
      });
   }

  ngOnInit() {
  }

  profile(){
    let param ={
     token:localStorage.getItem('token'),
     user_id:localStorage.getItem('id'),
    }
    this.AuthService.profile(param)
    .subscribe(res => {
       if(res['authenticated'] == true){      
        this.data =res['data'];
       }
      }, error => {
        localStorage.clear();
        this.router.navigate(['login']);
        console.log('kk');
       console.log(error);
     });
}

  LogOut(){
       let prama ={
        token:localStorage.getItem('token'),
        user_id:localStorage.getItem('id'),
       }
       this.AuthService.LogOut(prama)
       .subscribe(res => {
         console.log(res['authenticated']);
          if(res['authenticated'] == false){      
            localStorage.clear();
            this.router.navigate(['login']);
          }
         }, error => {
           localStorage.clear();
           this.router.navigate(['login']);
           console.log('kk');
          console.log(error);
        });
  }
}
