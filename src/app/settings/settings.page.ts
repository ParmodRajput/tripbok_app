import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular'; 
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
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
   contactlist =[];
   //contactar=[];
  constructor(public navCtrl: NavController, private AuthService: AuthService, private router: Router,private route: ActivatedRoute,private contacts: Contacts) {
    //this.contactlist['dsd'] ='dsfbfghgfhfghgffghfghffhffg';
    // let param ={
    //   token:localStorage.getItem('token'),
    //   user_id:localStorage.getItem('id'),
    //  }
    //  this.AuthService.profile(param)
    //  .subscribe(res => {
    //     if(res['authenticated'] == true){      
    //      this.data =res['data'];
    //      console.log(this.data);
    //     }
    //    }, error => {
    //      localStorage.clear();
    //      this.router.navigate(['login']);
    //      console.log('kk');
    //     console.log(error);
    //   });
   }

  ngOnInit() {
  }

  fetchDeviceContact(){

    var options = {
       filter : "",
       multiple:true,
       hasPhoneNumber:true	
   };

   this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'],options).then((res) => {
    console.log("res >>>",res);
      for (var i = 0; i < res.length; i++) {
           var contact = res[i];
           //var no =res[i].name.formatted;
           var no =contact.displayName;
           var phonenumber=contact.phoneNumbers;
           if(phonenumber != null) {
               for(var n=0;n<phonenumber.length;n++) {
                   var type=phonenumber[n].type;
                   if(type=='mobile') {
                       var phone=phonenumber[n].value;
                       var mobile;
                       if(phone.slice(0,1)=='+' || phone.slice(0,1)=='0'){
                           mobile=phone.replace(/[^a-zA-Z0-9+]/g, "");
                       }
                       else {
                           var mobile_no=phone.replace(/[^a-zA-Z0-9]/g, "");
                           mobile=mobile_no;
                          
                       }
                      //  var contactData={
                      //      "displayName":(no !=null ? no : mobile),
                      //      "phoneNumbers":mobile,
                      //  }
                       this.contactlist[mobile] =(no !=null ? no : mobile);
                      // this.contactlist.push(contactData);
                   }
               }
           }
       }
      //  function compare( a, b ) {
      //   if ( a.displayName < b.displayName ){
      //     return -1;
      //   }
      //   if ( a.displayName > b.displayName ){
      //     return 1;
      //   }
      //   return 0;
      // }     
      // this.contactlist = this.contactlist.sort( compare );
      // console.log("contactlist >>>",this.contactlist);
      console.log("this.contactar >>>",this.contactlist);

   }).catch((err) => {
       console.log('err',err);
   });

 }  

  profile(){
//       let contact: Contact = this.contacts.create();
// console.log(contact);
//       contact.name = new ContactName(null, 'Smith', 'John');
//       contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
//       contact.save().then(
//         () => console.log('Contact saved!', contact),
//         (error: any) => console.error('Error saving contact.', error)
//       );
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
