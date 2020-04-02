import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Injectable()

export class ShareService {
  constructor( public http: HttpClient) {}

  Create(dir,id) 
  {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      


      var monitoreo = {
         id_trabajador:id,
         fecha:dateTime,
         beacon:dir
      };
      
     var headers = new Headers();
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
     this.http.post("https://ebcoapi.azurewebsites.net/api/Monitoreo", monitoreo,{observe: 'response'})
     .subscribe(data => {
        console.log(data);
      }, error => {
       console.log(error);
     });
  }

  Login(rut,pass)
  {
    
  }

  
}