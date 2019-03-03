import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService, private storage: NativeStorage) {
  }

  async changeLanguage(lenguage: string) {
    await this.storage.setItem('lenguage', lenguage);
    this.translate.use(lenguage);
  }

}
