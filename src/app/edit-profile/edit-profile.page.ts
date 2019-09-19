import { Component, OnInit } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ProfileModalPage } from '../profile-modal/profile-modal.page'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  dataReturned:any;
  data:any;
  constructor(public modalController: ModalController,public toastController: ToastController,private AuthService: AuthService, private router: Router) { 
   let userdata ={
      user_id:localStorage.getItem('id'),
      token:localStorage.getItem('token'),
    }
    this.AuthService.profile(userdata)
    .subscribe(res => {
      console.log(res);
      this.data = res['data']
      }, error => {
        localStorage.clear();
        this.router.navigate(['login']);
        console.log('kk');
        console.log(error);
      });
  }

  ngOnInit() {
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async openModal(label,parma,value,type) {
    const modal = await this.modalController.create({
      component: ProfileModalPage,
      componentProps: {
        "label": label,
        "parma":parma,
        "value": value,
        "type" :type
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
       // this.dataReturned = dataReturned.data;
       //console.log(dataReturned.data);
       this.data = dataReturned.data.data;
       this.presentToast(dataReturned.data.message);
      }
    });
 
    return await modal.present();
  }

}
