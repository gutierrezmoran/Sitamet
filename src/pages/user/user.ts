import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl.remove(0);
  }

  openAccount() {
    this.navCtrl.push(AccountPage);
  }

}
