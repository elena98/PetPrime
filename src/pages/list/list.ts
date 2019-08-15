import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';
import { DetailPage } from '../detail/detail';
import { RegistroPage } from '../registro/registro';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  notes = [];

  @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public notesService : NotesService) {
    this.notesService.getNotes().subscribe(notas=> {
      this.notes=notas;
  });
   
  }

  public goToDetail(id){
    console.log("este es el id " ,id)
    this.navCtrl.push(RegistroPage, {id:id});
  }

  public createNote(){
    this.navCtrl.push(RegistroPage, {id:0});
  }


}
