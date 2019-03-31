import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



import {  ViewChild } from '@angular/core';

import { NotesService } from '../../services/notes.service';

import { RegistroPage } from '../registro/registro';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  notes = [];

  @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public notesService : NotesService) {
    this.notesService.getNotes().subscribe(notas=> {
      this.notes=notas;
  });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
