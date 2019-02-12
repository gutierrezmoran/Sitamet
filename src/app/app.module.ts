import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { UserPage } from '../pages/user/user';
import { AccountPage } from '../pages/account/account';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserPage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserPage,
    AccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    FingerprintAIO
  ]
})
export class AppModule {}
