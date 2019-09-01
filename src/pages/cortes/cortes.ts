import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import  firebase  from 'firebase';

/**
 * Generated class for the CortesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cortes',
  templateUrl: 'cortes.html',
})
export class CortesPage {

  note={id:null,producto:null,cantidad:null};
 
  letterObj = {
    to: 'Este documento es elreporte de las ventas que se tubieron de los productos..',
    from: 'MYPYME',
    text: '',
  }
  id=null;


 
  pdfObj = null;
  content=[];
  notes=[];
 
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener,  public notesService : NotesService) {
    this.notesService.getvent().subscribe(notas=> {
      this.notes=notas;
  });

   
  }

  public obtener(){

    this.notesService.getEstadistica()
  }


  public goToDetail(id){
    console.log("este es el id " ,id)
   // this.obetenr(usuario);
// this.navCtrl.push(RegistroPage, {id:id});
  }

  
  createPdf() {
    for(let i in this.notes){

      this.content.push(" ");


      this.content.push("Producto:");


      this.content.push({text: this.notes[i].producto});

      this.content.push("Articulos vendidso:");

      this.content.push({text: this.notes[i].count});
      this.content.push("fecha:");

      this.content.push({text: this.notes[i].fecha});
      this.content.push("____________________________________________");

    }
    var docDefinition = {


      content: [
        { text: 'Reporte de ventas', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'MYPYME', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'Gerente', style: 'subheader' },
        this.letterObj.to,

        { text: 'Reporte de productos', style: 'subheader' },
        this.content,

 
 
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
