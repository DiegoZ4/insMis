import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ServicesLoginProvider } from '../../providers/services-login/services-login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  pet: string = "pagos";
  dni:string;
  nombre:string;
  datosPagos = []
  datosNotas = []

  constructor(
    public navCtrl: NavController,
    private _login:ServicesLoginProvider
  ) {
    let dataStorage =  JSON.parse(localStorage.getItem('userData'))
    this.dni = dataStorage.dni;
    this.nombre = dataStorage.nombre;
    console.log(this.dni);

    this._login.getPagos(this.dni)
        .subscribe((resp:any)=>{
          console.log(resp);
          this.datosPagos = resp;
          console.log(this.datosPagos)
        })

    this._login.getNotas(this.dni)
        .subscribe((resp:any)=>{
          console.log(resp);
          this.datosNotas = resp;
          console.log(this.datosNotas)
        })
  }

}
