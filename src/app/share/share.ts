import { Injectable } from "@angular/core";
import { Headers, RequestMethod, RequestOptions } from "@angular/http";
import {  HttpClient  } from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
// import "rxjs/add/operator/map";

@Injectable()
export class ShareService {
  url: string = "";
  constructor( public http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
    //.map(res => res.json());
  }

  Create(dir) {
      console.log("create")
     
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      
      let direccion: string = dir;
      let centro: string = "Puente Alto";
      
      let acceso = {
        "id": 1,
        "fecha": dateTime,
        "direccion": direccion,
        "idBeacon": 4,
        "centro": centro,
        "fecha_registro": dateTime,
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
