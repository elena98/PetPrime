import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import  firebase  from 'firebase';



@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  selectedItems = [];
 
  total = 0;

  note={id:null,producto:null,cantidad:null};
 
  letterObj = {
    to: 'Victoria de Durango',
    from: 'MYPYME',
    text: this.total
  }
  id=null;

  tota1=0;
 
  pdfObj = null;
  content=[];
  notes=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,  public notesService : NotesService, private plt: Platform, private file: File, private fileOpener: FileOpener) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  ngOnInit() {
    let items = this.notesService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])
    this.total = this.selectedItems.reduce((a, b) => a  +(b.count * b.precio), 0);
    this.tota1=this.total;
    console.log(this.selectedItems);
  }

  quitar(id){
    console.log(id);
    let items = this.notesService.getCart();
    items.splice(id, 1);
    this.ngOnInit();
  }

  vender(){
    let items= this.notesService.getCart();
    var l=0;
    for (let obj of this.selectedItems) {
      console.log(obj.id)
      this.createPdf
      this.downloadPdf
     this.notesService.compare(obj.id);
      this.notesService.createVenta(obj);
       l=l+1;

    }
  for (let obj of this.selectedItems) {
      let items = this.notesService.getCart();
      items.splice(obj.id, 1);
      this.ngOnInit();
      this.total=0;
    }
 
    this.notesService.cleanCart();

   //this.notesService.compare(items.id);
   /////

  }

  eliminar(){
    let items = this.notesService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count--;
      } else {
        selected[obj.id] = {...obj, count: -1};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])
    this.total = this.selectedItems.reduce((a, b) => a  +(b.count * b.precio), 0);
    this.tota1=this.total;
    console.log(this.selectedItems);

  }
  ///
  
  createPdf() {
    for(let i in this.selectedItems){

      this.content.push(" ");


      this.content.push("Producto:");

      this.content.push({text: this.selectedItems[i].producto});

      this.content.push("Articulos vendidso:");

      this.content.push({text: this.selectedItems[i].count});
      this.content.push("fecha:");

      this.content.push({text: this.selectedItems[i].precio});
      this.content.push("____________________________________________");

    }
    var docDefinition = {

      content: [

        { text: 'Gracias por comprar en MYPYME', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'Empresa', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: '', style: 'subheader' },
        this.letterObj.to,

        { text: 'Reporte de productos', style: 'subheader' },
        this.content,

 
        { text: '________________________________________________________________', style: 'subheader' },
        { text: 'total', style: 'subheader' },
        this.tota1,
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

}
