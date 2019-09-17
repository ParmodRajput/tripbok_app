import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twostepvarivication',
  templateUrl: './twostepvarivication.page.html',
  styleUrls: ['./twostepvarivication.page.scss'],
})
export class TwostepvarivicationPage implements OnInit {
  active = false;
  constructor() {}

  ngOnInit() {
  }
  
  toggleClass(activeed){
    this.active = !activeed;
    console.log(this);
  }

}
