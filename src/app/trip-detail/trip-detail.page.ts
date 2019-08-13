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
