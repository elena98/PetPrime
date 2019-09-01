import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VentanaPage } from './ventana';

@NgModule({
  declarations: [
    VentanaPage,
  ],
  imports: [
    IonicPageModule.forChild(VentanaPage),
  ],
})
export class VentanaPageModule {}
