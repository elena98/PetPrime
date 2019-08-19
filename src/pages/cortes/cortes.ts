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
    to: '',
    from: '',
    text: '',
    notes:[]
  }
  id=null;


 
  pdfObj = null;
 
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener,  public notesService : NotesService) { 
    

  firebase.database().ref('/estadistica/'+ this.id).once('value').then(snapshot => {
    var producto = (snapshot.val()&& snapshot.val().producto)|| 'no encontro ';
    var cantidad = (snapshot.val()&& snapshot.val().cantidad)|| 'no encontro ';
    var id = (snapshot.val()&& snapshot.val().id)|| 'no encontro ';
    console.log(id);
    this.note.producto=producto;
    console.log(producto);
    this.note.cantidad=cantidad;
    this.note.id=id;


    console.log("ethel punto is  "+id);
  
  

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
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'To', style: 'subheader' },
        this.letterObj.to,

        { text: 'Producto', style: 'subheader' },
        this.note.producto,

        { text: 'Cantidad', style: 'subheader' },
        this.note.cantidad,

        { text: 'ID', style: 'subheader' },
        this.note.id,
 
 
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
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
