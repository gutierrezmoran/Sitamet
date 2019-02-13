import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private fingerprintOptions: FingerprintOptions;

  constructor(private fingerprint: FingerprintAIO, private platform: Platform, private navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {
    this.fingerprintOptions = {
      clientId: 'fingerprint-demo',
      clientSecret: 'password',
      disableBackup: true
    }
  }

  async readFingerprint() {
    try {
      await this.platform.ready().then(() => {
        this.fingerprint.isAvailable().then(() => {
          this.fingerprint.show(this.fingerprintOptions).then(() => {
            this.openPage(AccountPage);
          })
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  openPage(page: Page, data?: any) {
    let options: NativeTransitionOptions = {
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };

    this.nativePageTransitions.fade(options);
    this.navCtrl.push(page, data);
  }

}
