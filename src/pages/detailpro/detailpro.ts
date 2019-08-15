import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';
import  firebase  from 'firebase';

/**
 * Generated class for the DetailproPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailpro',
  templateUrl: 'detailpro.html',
})
export class DetailproPage {
  note={id:null,proveedor:null,email:null,numero:null};
 
  id=null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notesSservice: NotesService) {

    this.id = navParams.get('id');
    if (this.id != 0){
     // this.note=notesSservice.getNote(this.id);
   /*  notesSservice.getNote(this.id).subscribe(note => {
      this.note= note;
     });
*/
    firebase.database().ref('/proveedores/'+ this.id).once('value').then(snapshot => {
      var proveedor = (snapshot.val()&& snapshot.val().proveedor)|| 'no encontro ';
      var email = (snapshot.val()&& snapshot.val().email)|| 'no encontro ';
      var numero = (snapshot.val()&& snapshot.val().numero)|| 'no encontro ';
      var id = (snapshot.val()&& snapshot.val().id)|| 'no encontro ';
      console.log(id);
      this.note.proveedor=proveedor;
      console.log(proveedor);
      this.note.email=email;
      console.log(email);
      this.note.numero=numero;
      console.log(numero);
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
      this.notesSservice.createproveedor(this.note);
      alert('Proveedor guardado');
      
    }
    this.navCtrl.pop();

  }
  eliminar(id){
    this.notesSservice.deleteProveedor(this.note);
    alert('Informacion Eliminada');
    this.navCtrl.pop();
  }

  edit(id){
    
    var pul=1;
    if(pul==1){     
    this.notesSservice.deleteProveedor(this.note);
    pul=0;
       
    }
    if(pul==0){
      this.note.id = Date.now();
      this.notesSservice.createproveedor(this.note);
     
      alert('Informacion guardada');
      this.navCtrl.pop();

      }

  }

}
