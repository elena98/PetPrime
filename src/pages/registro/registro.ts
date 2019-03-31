import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';
import  firebase  from 'firebase';

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
  note={id:null,title:null,fecha:null,Doctor:null,vet:null, proxima:null};
 
  id=null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notesSservice: NotesService) {

    this.id = navParams.get('id');
    if (this.id != 0){
     // this.note=notesSservice.getNote(this.id);
   /*  notesSservice.getNote(this.id).subscribe(note => {
      this.note= note;
     });
*/
    firebase.database().ref('/cartilla/'+ this.id).once('value').then(snapshot => {
      var title = (snapshot.val()&& snapshot.val().title)|| 'no encontro ';
      var fecha = (snapshot.val()&& snapshot.val().fecha)|| 'no encontro ';

      var Doctor = (snapshot.val()&& snapshot.val().Doctor)|| 'no encontro ';
      var vet = (snapshot.val()&& snapshot.val().vet)|| 'no encontro ';
      var proxima = (snapshot.val()&& snapshot.val().proxima)|| 'no encontro ';

      var id = (snapshot.val()&& snapshot.val().id)|| 'no encontro ';
      console.log(title);
      this.note.title=title;
      console.log(title);
      this.note.fecha=fecha;
      console.log(fecha);
      this.note.Doctor=Doctor;
      console.log(Doctor);
      this.note.vet=vet;
      console.log(vet);
      this.note.proxima=proxima;
      console.log(proxima);
      this.note.id=id;
      console.log("el puto is  "+id);
    
    

    });


    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  addNote(){
    if(this.id !=0){
      this.notesSservice.editNote(this.note.title);
      alert('Informacion Actualizada');

    }else{
      this.note.id = Date.now();
      this.notesSservice.createNote(this.note);
      alert('Informacion guardada');
      
    }
    this.navCtrl.pop();

  }
  eliminar(id){
    this.notesSservice.deleteNote(this.note);
  }

}
