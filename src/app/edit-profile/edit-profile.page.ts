import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ProfileModalPage } from '../profile-modal/profile-modal.page'
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ModalController,ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { environment } from '../../environments/environment';
const serverApiUrl = environment.serverApiUrl;

import { finalize } from 'rxjs/operators';
const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  dataReturned:any;
  data:any;
  images = [];
  constructor(public modalController: ModalController,public toastController: ToastController,private AuthService: AuthService, private router: Router,private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
    private actionSheetController: ActionSheetController,private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private filePath: FilePath) { 
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
    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
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
        if(dataReturned.data){
          this.data = dataReturned.data.data;
          this.presentToast(dataReturned.data.message);
        }
      }
    });
    return await modal.present();
  }
  //avatar
    loadStoredImages() {
      this.storage.get(STORAGE_KEY).then(images => {
        if (images) {
          let arr = JSON.parse(images);
          this.images = [];
          for (let img of arr) {
            let filePath = this.file.dataDirectory + img;
            let resPath = this.pathForImage(filePath);
            this.images.push({ name: img, path: resPath, filePath: filePath });
          }
        }
      });
  }
  
  pathForImage(img) {
      if (img === null) {
          return '';
      } else {
          let converted = this.webview.convertFileSrc(img);
          return converted;
      }
  }
  
  async presentToast2(text) {
      const toast = await this.toastController.create({
          message: text,
          position: 'bottom',
          duration: 3000
      });
      toast.present();
  }
  
  async selectImage() {
      const actionSheet = await this.actionSheetController.create({
          header: "Select Image source",
          buttons: [{
                  text: 'Load from Library',
                  handler: () => {
                      this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                  }
              },
              {
                  text: 'Use Camera',
                  handler: () => {
                      this.takePicture(this.camera.PictureSourceType.CAMERA);
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel'
              }
          ]
      });
      await actionSheet.present();
  }
  
  takePicture(sourceType: PictureSourceType) {
        var options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
    
        this.camera.getPicture(options).then(imagePath => {
            if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        });
  }

  createFileName() {
      var d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";
      return newFileName;
  }
  
  copyFileToLocalDir(namePath, currentName, newFileName) {
      this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
          this.updateStoredImages(newFileName);
      }, error => {
          this.presentToast2('Error while storing file.');
      });
  }
  
  updateStoredImages(name) {
      this.storage.get(STORAGE_KEY).then(images => {
          let arr = JSON.parse(images);
          if (!arr) {
              let newImages = [name];
              this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
          } else {
              arr.push(name);
              this.storage.set(STORAGE_KEY, JSON.stringify(arr));
          }
  
          let filePath = this.file.dataDirectory + name;
          let resPath = this.pathForImage(filePath);
  
          let newEntry = {
              name: name,
              path: resPath,
              filePath: filePath
          };
  
          this.images = [newEntry, ...this.images];
          this.ref.detectChanges(); // trigger change detection cycle
      });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        let filtered = arr.filter(name => name != imgEntry.name);
        this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

        var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

        this.file.removeFile(correctPath, imgEntry.name).then(res => {
            this.presentToast2('File removed.');
        });
    });
  }

  // Inspired by https://golb.hplar.ch/2017/02/Uploading-pictures-from-Ionic-2-to-Spring-Boot.html
  
  startUpload(imgEntry) {
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
          ( < FileEntry > entry).file(file => this.readFile(file))
      })
      .catch(err => {
          this.presentToast2('Error while reading file.');
      });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
      type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
      const loading = await this.loadingController.create({
        //content: 'Uploading image...',
      });
      await loading.present();
      console.log(formData);
      let headers = new HttpHeaders({
          'Accept':'application/json',
          //'Content-Type': 'application/json',
          'Authorization':localStorage.getItem('token')
      });
      const requestOptions = { headers: headers }; 
      this.http.post(serverApiUrl+"/user/upload", formData,requestOptions)
          .pipe(finalize(() => {
              loading.dismiss();
          }))
      .subscribe(res => {
            if (res['success']) {
                this.presentToast2('File upload complete.')
            } else {
                this.presentToast2('File upload failed.')
            }
      });
  }
  //end avatar
  

}
