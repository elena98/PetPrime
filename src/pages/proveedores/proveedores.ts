import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';
import { DetailproPage } from '../detailpro/detailpro';
/**
 * Generated class for the ProveedoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-proveedores',
  templateUrl: 'proveedores.html',
})
export class ProveedoresPage {
  notes = [];


  @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public notesService : NotesService) {
    this.notesService.getProveedor().subscribe(notas=> {
      this.notes=notas;
  });
   
  }

  public goToDetail(id){
    console.log("este es el id " ,id)
    this.navCtrl.push(DetailproPage, {id:id});
  }

  public createNote(){
    this.navCtrl.push(DetailproPage, {id:0});
  }
}
