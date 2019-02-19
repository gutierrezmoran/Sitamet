import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  fingerprint: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage) {
    this.loadConfiguration();
  }

  async loadConfiguration() {
    await this.storage.getItem("fingerprintConfiguration").then((data: boolean) => {
      this.fingerprint = data;
    });
  }

  async changeConfiguration() {
    await this.storage.setItem("fingerprintConfiguration", this.fingerprint);
  }

}
