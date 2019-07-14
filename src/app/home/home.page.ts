import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
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
  beacons: any = 0;
  beaconData: any;
  
public items:any;
  constructor( 
    public alertController: AlertController,
    public http: HttpClient,
    public share: ShareService,
    private platform: Platform) {
   this.loadData();
   }

  async presentAlertConfirm() {
    evothings.eddystone.stopScan();
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

  async UsuarioIncorrecto() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      subHeader: 'Ubicacion',
      message: 'No se encuentra en la ubicacion de acceso',
      buttons: ['OK']
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
    this.share.Create(dir)
  }

  Buscarbeacons(){
      this.platform.ready().then(() =>{
         evothings.eddystone.startScan((data) => {
          this.beaconData=data;
          this.beacons =  this.beaconData.address;
             this.presentAlertConfirm()
         }, error => console.error( 
           this.UsuarioIncorrecto()
         ));
       })    
   }

}
