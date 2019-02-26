import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { AccountPage } from '../pages/account/account';
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { AddMovementPage } from '../pages/add-movement/add-movement';
import { SettingsPage } from '../pages/settings/settings';
import { MovementValidatorProvider } from '../providers/movement-validator/movement-validator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountPage,
    SettingsPage,
    AddMovementPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountPage,
    SettingsPage,
    AddMovementPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NativePageTransitions,
    FingerprintAIO,
    NativeStorage,
    MovementValidatorProvider
  ]
})
export class AppModule { }
