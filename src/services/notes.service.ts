import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NotesService{

    constructor(public afDB: AngularFireDatabase){}

    notes = [
        {id:1, title:'Nota 1', descripcion:'Desc'},
        {id:2, title:'Nota 2', descripcion:'Desc'},
        {id:3, title:'Nota 3', descripcion:'Desc'}
      ];
      public getNotes(){
          return this.afDB.list("cartilla/").valueChanges();
         // return this.notes;
      }
      public getNote(id){
          return this.notes.filter(function(e, i){ return e.id == id })[0] || {id:null,title:null,descripcion:null};
      }

      public createNote(note){
          //this.notes.push(note);
          this.afDB.database.ref('cartilla/' +note.id).set(note);
      }
}