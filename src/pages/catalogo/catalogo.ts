import { Component,ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { NotesService } from '../../services/notes.service';
import { CartPage } from '../cart/cart';
import { DescripcionvPage } from '../descripcionv/descripcionv';


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
export class CatalogoPage implements OnInit{
  notes = [];
  cart = [];
  items = [];

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  currentDate;
  formattedDate;
 
  note={id:null,producto:null,proveedor:null,cantidad:1,precio:null,foto:null, fecha:null};
 
  id=null;
 
  


  @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public notesService : NotesService) {

    this.notesService.getNotes().subscribe(notas=> {
      this.notes=notas;
      console.log(notas);
      
    this.currentDate= new Date();
    this.getFormattedDate()
    this.id = navParams.get('id');



  });
   
  }


  ngOnInit() {
    this.notesService.getNotes().subscribe(notas=> {
      this.notes=notas;
    });
  
    this.cart = this.notesService.getCart();
  }

  getFormattedDate(){
    var dateObj= new Date()
    var year = dateObj.getFullYear().toString()
    var month= dateObj.getMonth().toString()
    var date = dateObj.getDate().toString()
    this.formattedDate= year+'-'+month+'-'+date;
  }

  public goToDetail(id){

  //  this.note.id = Date.now();
    console.log("este es el id " ,id)
      
    
    this.navCtrl.push(DescripcionvPage, {id:id});
  }

  public vender (note){

    this.note.id = Date.now();
    this.note.fecha= this.formattedDate;

    this.notesService.createventa(this.note);
   


  }

  public createp(){
    this.navCtrl.push(CartPage);

  }

  public openCart(){
    this.navCtrl.push(CartPage);


  }
  public addtocart(note){
    this.notesService.addProduct(note);
    
  }



}