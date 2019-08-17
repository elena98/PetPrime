import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { NotesService } from '../../services/notes.service';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the CatalogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})
export class CatalogoPage {
  notes = [];
  cart= [];

  @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public notesService : NotesService) {
    this.notesService.getNotes().subscribe(notas=> {
      this.notes=notas;
  });
   
  }

  public goToDetail(id){
    console.log("este es el id " ,id)

  }
  public vender (note){

    this.notesService.addproductos(note);





  }

  public createNote(){

  }


}