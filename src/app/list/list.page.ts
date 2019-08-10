import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private AuthService: AuthService, private router: Router) {
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }
  data: any;
  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  TripsList(type ='upcoming'){
    this.data ={
      type:type,
      user_id:localStorage.getItem('id'),
      token:localStorage.getItem('token'),
      Authorization:localStorage.getItem('token')

    }
    this.AuthService.TripsList(this.data)
    .subscribe(res => {
      // console.log(res.authenticated);
        // if(res['authenticated']){
        //   localStorage.setItem('token','Bearer '+res['data'].token);
        //   localStorage.setItem('id',res['data'].id);
        //   localStorage.setItem('authenticated',res['authenticated']);
        //   this.router.navigate(['home']);
        // }
      }, error => {
        console.log('kk');
        console.log(error);
      });
  }
}
