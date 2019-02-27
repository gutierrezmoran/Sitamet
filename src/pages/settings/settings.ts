import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  fingerprint: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private toastCtrl: ToastController, private alertCtrl: AlertController) {
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
      message: 'Application data cleaned successfully',
      duration: 3000
    });
    toast.present();
  }

  async showAlert() {
    const confirm = this.alertCtrl.create({
      title: "Clear application data",
      message: "You are sure you want to clean the application data?, the data and the settings will be deleted.",
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            this.clearApplicationData();
          }
        }
      ]
    });
    confirm.present();
  }

}
