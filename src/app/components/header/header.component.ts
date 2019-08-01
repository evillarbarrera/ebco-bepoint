import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'SOS',
      subHeader: '',
      message: 'Carabineros: 133',
      buttons: ['OK']
    });

    await alert.present();
  }

}
