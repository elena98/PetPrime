import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotesService } from '../services/notes.service';
import { DetailPage } from '../pages/detail/detail';
import {AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFirestoreModule } from 'angularfire2/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyC_vyH1dFKh8wSXB1YDAh2NyJyk4IMiMXw",
    authDomain: "petprimer-fc253.firebaseapp.com",
    databaseURL: "https://petprimer-fc253.firebaseio.com",
   // projectId: "petprimer-fc253",
    storageBucket: "petprimer-fc253.appspot.com",
    messagingSenderId: "403954301244"

};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegistroPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegistroPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotesService

  ]
})
export class AppModule {}
