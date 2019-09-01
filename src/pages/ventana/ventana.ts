import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { VendedorPage } from '../vendedor/vendedor';
import { CatalogoPage } from '../catalogo/catalogo';

/**
 * Generated class for the VentanaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ventana',
  templateUrl: 'ventana.html',
})
export class VentanaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VentanaPage');
  }

  aceptar(dato){
    if(dato=="1233456")
    this.navCtrl.push(HomePage);
    
  }
  if(dato =! "1233456"){
    this.navCtrl.push(CatalogoPage);
  }

  otro(){
    this.navCtrl.push(CatalogoPage);

  }

}
