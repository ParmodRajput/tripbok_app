import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TwostepvarivicationPage } from './twostepvarivication.page';

const routes: Routes = [
  {
    path: '',
    component: TwostepvarivicationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TwostepvarivicationPage]
})
export class TwostepvarivicationPageModule {}
