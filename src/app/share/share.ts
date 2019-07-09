import { Injectable } from "@angular/core";
import { Headers, RequestMethod, RequestOptions } from "@angular/http";
import {  HttpClient  } from '@angular/common/http';
// import "rxjs/add/operator/map";

@Injectable()
export class ShareService {
  url: string = "";
  constructor( public http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
    //.map(res => res.json());
  }
  Create(name) {
      console.log("create")

      let acceso = {
        "id": 1,
        "fecha": "2019-07-08T20:48:01.742938+00:00",
        "direccion": "Test Emmanuel ",
        "idBeacon": 4,
        "centro": "Prueba Emmanuel",
        "fecha_registro": "2019-07-08T20:48:01.742938+00:00",
        "idTrabajador": 7
      };

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );

  
    return this.http.post(
      "https://apirestcontroldepersonal20190617032202.azurewebsites.net/api/acceso",
      acceso,{observe: 'response'}).subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });
  }

}
