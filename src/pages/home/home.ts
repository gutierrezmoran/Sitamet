import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { AccountPage } from '../account/account';
import { NativeStorage } from '@ionic-native/native-storage';
import { DateTimeFormatter } from '../../core/model/DateTimeFormatter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private fingerprintOptions: FingerprintOptions;
  currentDateTime: String;

  constructor(private fingerprint: FingerprintAIO, private platform: Platform, private navCtrl: NavController, private nativePageTransitions: NativePageTransitions, private storage: NativeStorage) {
    this.fingerprintOptions = {
      clientId: 'fingerprint-demo',
      clientSecret: 'password',
      disableBackup: true
    }
    this.setFingerprintConfiguration();
    this.setCurrentDateTime();
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
      iosdelay: 200,
      androiddelay: 200,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };

    this.nativePageTransitions.fade(options);
    this.navCtrl.push(page, data);
  }

  login() {
    this.openPage(AccountPage);
  }

  async setFingerprintConfiguration() {
    await this.storage.getItem("fingerprintConfiguration").then((data: boolean) => {
      if (!data) {
        this.login();
      }
    }).catch(() => {
      this.storage.setItem("fingerprintConfiguration", false);
      this.login();
    })
  }

  async setCurrentDateTime() {
    await this.storage.getItem("lastAccess").then((datetime: string) => {
      this.currentDateTime = datetime;
    }).catch(() => {
      this.storage.setItem("lastAccess", DateTimeFormatter.shortDateTime());
      this.currentDateTime = DateTimeFormatter.shortDateTime()
    });
  }

}
