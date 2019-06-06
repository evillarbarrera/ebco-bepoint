import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Routes, RouterModule, RouterLink } from '@angular/router';

const approutes: Routes =[
  {
    path: '',
   loadChildren:'./turns/turns.module#TurnsPageModule'
}
];

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent implements OnInit {

  constructor( public alertController: AlertController) { }

  ngOnInit() {}

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

  async MostrarTurns(){
  
  }
}
