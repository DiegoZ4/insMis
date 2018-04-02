//import { HttpClient } from '@angular/common/http';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the ServicesLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesLoginProvider {

  apiUrl = 'http://insmis.com.ar.elserver.com/alumnos.php';
  apiUrlPass = 'http://insmis.com.ar.elserver.com/saveNewPass.php';
  apiUrlPagos = 'http://insmis.com.ar.elserver.com/getPagos.php';
  apiUrlNotas = 'http://insmis.com.ar.elserver.com/getNotas.php';

  constructor(public http: HttpClient) {
    console.log('Hello ServicesLoginProvider Provider');
  }


  login() {
    console.log("aca")
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        //console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  changePass(data){
    console.log(data)
    let body = JSON.stringify(data);
    console.log(body);

    let headers = new HttpHeaders({
       'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrlPass, data, { headers })
      .map(res => {
          return res;
        }, (err) => {
          console.log(err);
        });


  }

  getPagos(dni){
    console.log(dni)


    return this.http.get(this.apiUrlPagos+'?dni='+dni)
      .map(res => {
          return res;
        }, (err) => {
          console.log(err);
        });
  }

  getNotas(dni){
    console.log(dni)


    return this.http.get(this.apiUrlNotas+'?dni='+dni)
      .map(res => {
          return res;
        }, (err) => {
          console.log(err);
        });
  }

}
