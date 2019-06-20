import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {  HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
public items:any;
  constructor( 
    public alertController: AlertController,
    public http: HttpClient) {
   this.loadData();
   }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Acceso',
      message: 'Seleccione su acceso',
      buttons: [
        {
          text: 'Entrada',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Salida',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  
  loadData(){
    let data:Observable<any>;
    data = this.http.get('https://apirestcontroldepersonal20190617032202.azurewebsites.net/api/noticia');
    data.subscribe(result => {
      this.items = result;
    })
  }

}
