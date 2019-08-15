import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from "firebase";
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { DetailPage } from '../pages/detail/detail';
import { CortesPage } from '../pages/cortes/cortes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Ventas', component:CortesPage},
      { title: 'Productos', component: ListPage },
      { title: 'Proveedores', component:DetailPage},
      { title: 'Estadisticas', component:CortesPage}
      

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    var config = {
      apiKey: "AIzaSyC_vyH1dFKh8wSXB1YDAh2NyJyk4IMiMXw",
      authDomain: "petprimer-fc253.firebaseapp.com",
      databaseURL: "https://petprimer-fc253.firebaseio.com",
      projectId: "petprimer-fc253",
      storageBucket: "petprimer-fc253.appspot.com",
      messagingSenderId: "403954301244"
    };
    firebase.initializeApp(config);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
