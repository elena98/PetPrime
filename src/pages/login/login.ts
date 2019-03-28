import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from "firebase";
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 user={
  email:"",
  password:""
 };


  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController) {
  }

  login(user){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(data=>{
      if(user == null){
        let alert = this.alert.create({
          title: 'Error',
          subTitle: 'Error al iniciar sesion ',
          buttons: ['Aceptar']
        });
        alert.present();
        

      }
      else{
        this.navCtrl.push(HomePage);

      }

    });
  }

 registro(user){
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(data=> {
    let alert = this.alert.create({
      title: 'Correcto',
      subTitle: 'Ha Registrado correctamente ',
      buttons: ['Aceptar']
    });
    alert.present();


  });
 }

 rest(email){
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    console.log("Correcto");
    
  }).catch(function(error) {
    console.log("Incorrecto");
  });
 }

  home()
  {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
