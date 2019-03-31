import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NotesService{

    constructor(public afDB: AngularFireDatabase){

    }

    notes = [];
      public getNotes(){
          return this.afDB.list("cartilla/").valueChanges();
        
          
         // return this.notes;
      }
      public getNote(id){
         // return this.notes.filter(function(e, i){ return e.id == id })[0] || {id:null,title:null,descripcion:null};
         return this.afDB.object("cartilla/").valueChanges();
         
         
      }

      public createNote(note){
          //this.notes.push(note);
          this.afDB.database.ref('cartilla/' +note.id).set(note);
      }
      
      public editNote(note){
     /*  for(let i ; i< this.notes,length; i++){
           if(this.notes[i]== note){
               this.notes[i] = note;
            }
         }*/
       this.afDB.database.ref('cartilla/'+ note.id).set(note);
       
      
       }
       public deleteNote(note){
           console.log(note);

    // this.afDB.database.ref('cartilla/' +note.id).remove();
         this.afDB.list("cartilla/"+note.id ).remove();
         

           /*for(let i=0; i< this.notes.length; i++){
               if(this.notes[i].id == note.id){
                   this.notes.splice(i,1);
               }
           }*/
          // ref.child(key).remove();

       }
}