import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from "firebase";
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotesService } from '../../services/notes.service';



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

  public datos;
 // rol='empleado';
 user={
  email:"",
  password:"",
  rol:'empleado'
 };


  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController,public notesSservice: NotesService) {

  
  
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
      //this.notesSservice.createuser(this.user);

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
 
 guardarDato(user) {
      var usuario={
        rol:user.rol,
        email:user.email,
        password:user.password
      }
      this.registro(usuario);
      firebase.database().ref('/usuarios' ).push(usuario).then(data=>{
        let alert = this.alert.create({
          title: 'Correcto',
          subTitle: 'Ha Registrado correctamente ',
          buttons: ['Aceptar']
        });
    

        alert.present();
    
      })

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
