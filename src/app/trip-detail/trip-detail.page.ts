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
  policies= [
    {id: 0, src: "http://localhost/tripbok/storage/app/public/media/help.png"},
    {id: 2, src: "http://localhost/tripbok/storage/app/public/media/help.png"},
    {id: 3, src: "http://localhost/tripbok/storage/app/public/media/help.png"},
    {id: 4, src: "http://localhost/tripbok/storage/app/public/media/help.png"},
    {id: 5, src: "http://localhost/tripbok/storage/app/public/media/help.png"}, 
  ];
  constructor(private AuthService: AuthService, private router: Router,private route: ActivatedRoute) {
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
      for(let i=1; i<=5; i++){   
        if(i<=rate){
          ratecom +='<span class="checked">☆</span>';
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

  toggleModule(module){
    if(module =='helps'){
      var element = document.getElementById('helps');
      element.classList.remove("hidden");
      element.classList.add("show");
      document.getElementById('receipt').classList.add("hidden");
    }else{
      var element = document.getElementById('receipt');
      element.classList.remove("hidden");
      element.classList.add("show");
      document.getElementById('helps').classList.add("hidden");
    }
    
  }

}
