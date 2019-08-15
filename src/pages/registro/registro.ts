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
  note={id:null,producto:null,proveedor:null,cantidad:null,minimo:null};
 
  id=null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notesSservice: NotesService) {

    this.id = navParams.get('id');
    if (this.id != 0){
     // this.note=notesSservice.getNote(this.id);
   /*  notesSservice.getNote(this.id).subscribe(note => {
      this.note= note;
     });
*/
    firebase.database().ref('/productos/'+ this.id).once('value').then(snapshot => {
      var producto = (snapshot.val()&& snapshot.val().producto)|| 'no encontro ';
      var proveedor = (snapshot.val()&& snapshot.val().proveedor)|| 'no encontro ';
      var cantidad = (snapshot.val()&& snapshot.val().cantidad)|| 'no encontro ';
      var minimo = (snapshot.val()&& snapshot.val().minimo)|| 'no encontro ';
      var id = (snapshot.val()&& snapshot.val().id)|| 'no encontro ';
      console.log(id);
      this.note.producto=producto;
      console.log(producto);
      this.note.proveedor=proveedor;
      console.log(proveedor);
      this.note.cantidad=cantidad;
      console.log(cantidad);
      this.note.minimo=minimo;
      console.log(minimo);
      this.note.id=id;
      console.log("ethel punto is  "+id);
    
    

    });


    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  addNote(){
    if(this.id ==0){
      this.note.id = Date.now();
      this.notesSservice.createNote(this.note);
      alert('Informacion guardada');
      
    }
    this.navCtrl.pop();

  }
  eliminar(id){
    this.notesSservice.deleteNote(this.note);
    alert('Informacion Eliminada');
    this.navCtrl.pop();
  }

  edit(id){
    
    var pul=1;
    if(pul==1){     
    this.notesSservice.deleteNote(this.note);
    pul=0;
       
    }
    if(pul==0){
      this.note.id = Date.now();
      this.notesSservice.createNote(this.note);
     
      alert('Informacion guardada');
      this.navCtrl.pop();

      }

  }

}
