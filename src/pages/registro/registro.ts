import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  note={id:null,title:null,descripcion:null};
  id=null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notesSservice: NotesService) {
    this.id = navParams.get('id');
    if (this.id != 0){
      this.note=notesSservice.getNote(this.id);
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  addNote(){
    this.note.id = Date.now();
    this.notesSservice.createNote(this.note);
    alert('Informacion guardada');
    this.navCtrl.pop();
  }

}
