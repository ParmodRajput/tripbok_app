import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.page.html',
  styleUrls: ['./driver-detail.page.scss'],
})
export class DriverDetailPage implements OnInit {
  public driver_detail: any;
  // policies= [
  //   {id: 0, src: "http://localhost/tripbok/storage/app/public/media/help.png"},
  //   {id: 2, src: "http://localhost/tripbok/storage/app/public/media/help.png"},
  //   {id: 3, src: "http://localhost/tripbok/storage/app/public/media/help.png"},
  //   {id: 4, src: "http://localhost/tripbok/storage/app/public/media/help.png"},
  //   {id: 5, src: "http://localhost/tripbok/storage/app/public/media/help.png"}, 
  // ];
  constructor(private AuthService: AuthService, private router: Router,private route: ActivatedRoute) {
    let data ={
      id:this.route.snapshot.paramMap.get('driverid'),
      user_id:localStorage.getItem('id'),
      token:localStorage.getItem('token'),
    }
    this.AuthService.DriverDetail(data)
    .subscribe(res => {
      //console.log(res['data'].to);
     // let rate = res['data'].driver_rating;
      //let ratecom  ='';
      // for(let i=1; i<=5; i++){   
      //   if(i<=rate){
      //     ratecom +='<span class="checked">☆</span>';
      //   }else{
      //     ratecom +='<span class="">☆</span>';
      //   }
      // }
      // console.log(ratecom);
      // res['data']['driver_rating'] = ratecom;
      this.driver_detail =res['data'];
    }, error => {
       // localStorage.clear();
        //this.router.navigate(['login']);
        console.log('kk');
        console.log(error);
    });
  }

  ngOnInit() {
  }

}
