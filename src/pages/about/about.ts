import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormGroup, FormControl, Validators } from '@angular/forms';

import { ContactPage } from '../contact/contact';

import { ServicesLoginProvider } from '../../providers/services-login/services-login';

import 'rxjs';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  loginPass:FormGroup;
  data = {};

  constructor(public navCtrl: NavController,
              public _login:ServicesLoginProvider) {

    this.loginPass = new FormGroup ({
        pass1: new FormControl('', Validators.required),
        pass2: new FormControl(),
    });

    this.loginPass.controls["pass2"].setValidators([
      Validators.required,
      this.noIgual.bind(this.loginPass)
    ]);
  }

  noIgual( control: FormControl ) : { [s:string]:boolean } {

    let forma:any = this;
    console.log(forma);

    if(control.value !== forma.controls['pass1'].value){
      return {
        noiguales:true
      }
    }
    return null;
  }

  changePass(){
    let dataStorage =  JSON.parse(localStorage.getItem('userData'))
    let dni = dataStorage.dni;


    this.data = {
      dni: dni,
      pass: this.loginPass.value.pass1
    }

    this._login.changePass(this.data)
        .subscribe((resp:any)=>{
          console.log(resp.status);
          if(resp.status == "ok"){
            this.navCtrl.push(ContactPage)
          }

        })
  }

}
