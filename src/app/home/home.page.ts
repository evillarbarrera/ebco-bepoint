import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  constructor( public alertController: AlertController) { }

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
}
