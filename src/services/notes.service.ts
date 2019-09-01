import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@Injectable()
export class NotesService{

    private cart=[];
    private data=[];

    constructor(public afDB: AngularFireDatabase){

    }

    notes = [];
   

      public getNotes(){
          //console.log(this.afDB.list("productos/").valueChanges())
          return this.afDB.list("productos/").valueChanges();
        
          
         // return this.notes;
      }
 
      
      public getvent(){
        //console.log(this.afDB.list("productos/").valueChanges())
        return this.afDB.list("estadistica/ventas/").valueChanges();
      
        
       // return this.notes;
    }
      public getNote(id){
         // return this.notes.filter(function(e, i){ return e.id == id })[0] || {id:null,title:null,descripcion:null};
         return this.afDB.object("productos/").valueChanges();
         
         
      }

      public createNote(note){
          //this.notes.push(note);
          this.afDB.database.ref('productos/' +note.id).set(note);
      }
 
      public editNote(note){
         
       this.afDB.database.ref('productos/'+ note.id).set(note);
       console.log(note);
       
      
       }
       public deleteNote(note){
           console.log(note);

    // this.afDB.database.ref('cartilla/' +note.id).remove();
         this.afDB.list("productos/"+note.id ).remove();
         

           /*for(let i=0; i< this.notes.length; i++){
               if(this.notes[i].id == note.id){
                   this.notes.splice(i,1);
               }
           }*/
          // ref.child(key).remove();

       }

       signupUser(email: string, password: string,role: string): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
           
          firebase.database().ref('/usuarios').child(newUser.user.uid).set({
              
               email: email,
               role: role.toString(),
              
        });
      });
    }


    //se programan los registros de los proveedores

    
    public createproveedor(note){
        //this.notes.push(note);
        this.afDB.database.ref('proveedores/' +note.id).set(note);
    }

    public deleteProveedor(note){
        console.log(note);

        // this.afDB.database.ref('cartilla/' +note.id).remove();
      this.afDB.list("proveedores/"+note.id ).remove();


    }

    public getProveedor(){
        return this.afDB.list("proveedores/").valueChanges();
      
        
       // return this.notes;
    }

    public addproductos(notes){
        this.cart.push(notes);
    }


    public createventa(note){

        this.afDB.database.ref('ventas/venta' +note.id).set(note)

    }
    public getEstadistica(){
        return this.afDB.list("estadistica/").valueChanges();
    
    }

    public get(){
        return this.afDB.list("estadistica/").valueChanges();
    
    }

    getCart() {
        return this.cart;
      }
     
      addProduct(product) {
        this.cart.push(product);
      }

      
      public getProduct(){
        //console.log(this.afDB.list("productos/").valueChanges())
        return this.afDB.list("productos/").valueChanges();

        
       // return this.notes;
    }

    public compare(ID){
        var query = firebase.database().ref('estadistica/ventas/').orderByChild ('ID').
         equalTo (ID); query.once ('value', function (snapshot) {
            if (snapshot.exists()){
                const userData = snapshot.val();
            console.log("exists!", userData);
          }})
   

    }

    public createVenta(note){
        //this.notes.push(note);
        this.afDB.database.ref('estadistica/ventas/' +note.id).set(note);
    }

    
    cleanCart() {
         this.cart=[0];
      }




    


}