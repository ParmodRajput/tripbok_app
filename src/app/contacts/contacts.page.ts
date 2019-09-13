import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular'; 
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contactlist =[];
  data:any;
  selectedcontacts = [];
  select =[];
  items =[];
  isItemAvailable = false;

  constructor(public navCtrl: NavController, private AuthService: AuthService, private router: Router,private route: ActivatedRoute,private contacts: Contacts) {
    this.fetchDeviceContact('');
    this.items =this.contactlist;
  }

  ngOnInit() {
  }
  buttonColor: string = ''; 
  selectContacts(event){ 
    var eventvalue = event.target.title;
    if(event.target.classList.toggle('select')){
      event.target.querySelector('.checkbox').classList.remove('checkhide');
      event.target.querySelector('.checkbox').classList.add('checkmark');
      this.selectedcontacts.push(eventvalue);
    }else{
      event.target.querySelector('.checkbox').classList.remove('checkmark');
      event.target.querySelector('.checkbox').classList.add('checkhide');
      this.selectedcontacts = this.selectedcontacts.filter(function(ele){
        return ele != eventvalue;
      });   
    }
    console.log(this.selectedcontacts);
     // event.target.classList.toggle('checkmark');
    //event.target.title
    //event.target.classList.contains('parmod')
    //event.target.title
   // let shadesEl = document.querySelector('.cool');
    // console.log(shadesEl.classList);
    //console.log(shadesEl.classList[1]);
    //console.log(shadesEl.classList.contains('look'));
   //console.log(shadesEl.classList.item(3));
   //shadesEl.classList.remove('a');
   //shadesEl.classList.toggle('a');
  }

  fetchDeviceContact(text){
    var options = {
      filter : text,
      multiple:true,
      hasPhoneNumber:true	
    };
   this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], options).then((res) => {
      for (var i = 0; i < res.length; i++) {
           var contact = res[i];
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
                       this.contactlist[mobile] =(no !=null ? no : mobile);
                   }
               }
           }
       }
      console.log("this.contactar >>>",this.contactlist);
   }).catch((err) => {
       console.log('err',err);
   });
  } 
  
  initializeItems(){ 
    this.items = this.contactlist; 
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
