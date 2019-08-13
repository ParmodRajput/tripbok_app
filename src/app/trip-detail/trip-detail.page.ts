import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
})
export class TripDetailPage implements OnInit {
  public trips_detail: any;
  constructor(private AuthService: AuthService, private router: Router,private route: ActivatedRoute) { 
    console.log(this.route.snapshot.paramMap.get('tripid'))
   let data ={
      id:this.route.snapshot.paramMap.get('tripid'),
      user_id:localStorage.getItem('id'),
      token:localStorage.getItem('token'),
    }
    this.AuthService.TripsDetail(data)
    .subscribe(res => {
      console.log(res['data'].to);
      let rate = res['data'].driver_rating;
      let ratecom  ='';
      for(let i=0; i<5; i++){   
        if(i<=rate){
          ratecom +='<span class="checked" style="color:orange;">☆</span>';
        }else{
          ratecom +='<span class="">☆</span>';
        }
      }
      console.log(ratecom);
      res['data']['driver_rating'] = ratecom;
      this.trips_detail =res['data'];

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
