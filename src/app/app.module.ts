import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { AccountPage } from '../pages/account/account';
import { NativeStorage } from '@ionic-native/native-storage';
import { AddMovementPage } from '../pages/add-movement/add-movement';
import { SettingsPage } from '../pages/settings/settings';
import { MovementValidatorProvider } from '../providers/movement-validator/movement-validator';
import { MovementPage } from '../pages/movement/movement';
import { AboutSitametPage } from '../pages/about-sitamet/about-sitamet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LanguagePage } from '../pages/language/language';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "../assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountPage,
    SettingsPage,
    AddMovementPage,
    MovementPage,
    AboutSitametPage,
    LanguagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountPage,
    SettingsPage,
    AddMovementPage,
    MovementPage,
    AboutSitametPage,
    LanguagePage
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
