import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { AboutSitametPage } from '../pages/about-sitamet/about-sitamet';

import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: string }>;

  showSplash: boolean = true;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translateService: TranslateService, private storage:NativeStorage) {
    this.initializeApp();

    this.pages = [
      { title: "SETTINGS", component: SettingsPage, icon: 'settings' },
      { title: "ABOUT_SITAMET", component: AboutSitametPage, icon: 'information-circle' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.storage.getItem('lenguage').then((lenguage: string) => {
        this.changeLenguage(lenguage);
      }).catch(() => {
        this.changeLenguage('en');
      })

      this.statusBar.backgroundColorByHexString('#EEEEEE');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  changeLenguage(lenguage: string) {
    this.translateService.setDefaultLang(lenguage);
    this.translateService.use(lenguage);
  }

}

