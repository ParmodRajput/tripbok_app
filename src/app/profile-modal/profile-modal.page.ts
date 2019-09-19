import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams,ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.page.html',
  styleUrls: ['./profile-modal.page.scss'],
})
export class ProfileModalPage implements OnInit {
  data:any;
  formparma:any;
  password:any;
  errors:any;
  constructor(private AuthService: AuthService, private router: Router,private route: ActivatedRoute,private modalController: ModalController,private navParams: NavParams,public toastController: ToastController) { }

  ngOnInit() {
    this.formparma= {
      name:this.navParams.data.parma,
      value:this.navParams.data.value,
      label:this.navParams.data.label,
      type:this.navParams.data.type
    }
    console.table(this.formparma);
  }
  async closeModal(message) {
    // const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(message);
  }

  public save(form) {
    let prma ={
      form:form.value,
      user_id:localStorage.getItem('id'),
      token:localStorage.getItem('token'),
    }
    this.AuthService.UpdateProfile(prma)
    .subscribe(res => {
      console.log(res['authenticated']);
      if(res['authenticated']){
        this.closeModal(res);
      }else{
        this.errors = res['message'];
      }
    }, error => {
        // localStorage.clear();
        // this.router.navigate(['login']);
        console.log('kk');
        console.log(error);
    });
  }

}
