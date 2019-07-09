import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {  HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShareService } from "../share/share";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  date_access: string;
  
public items:any;
  constructor( 
    public alertController: AlertController,
    public http: HttpClient,
    public share: ShareService) {
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
            this.Add("Entrada");
          }
        }, {
          text: 'Salida',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Okay');
            this.Add("Salida");
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
      console.log(data);
    })
  }

  Add(dir){
    console.log(dir)
    this.share.Create(dir)
  }

}
