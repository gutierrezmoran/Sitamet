import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';
import { LanguagePage } from '../language/language';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  fingerprint: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private toastCtrl: ToastController, private alertCtrl: AlertController, private translate: TranslateService) {
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

  async clearApplicationData() {
    await this.storage.clear();

    const toast = this.toastCtrl.create({
      message: this.translate.instant("DELETE_STORAGE_MESSAGE_SUCCESS"),
      duration: 3000
    });
    toast.present();
  }

  async showAlert() {
    const confirm = this.alertCtrl.create({
      title: this.translate.instant("DELETE_STORAGE"),
      message: this.translate.instant("DELETE_STORAGE_MESSAGE"),
      buttons: [
        {
          text: this.translate.instant("NO")
        },
        {
          text: this.translate.instant("YES"),
          handler: () => {
            this.clearApplicationData();
          }
        }
      ]
    });
    confirm.present();
  }

  openLanguagePage() {
    this.navCtrl.push(LanguagePage);
  }

}
