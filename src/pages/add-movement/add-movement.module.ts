import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMovementPage } from './add-movement';

@NgModule({
  declarations: [
    AddMovementPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMovementPage),
  ],
})
export class AddMovementPageModule {}
