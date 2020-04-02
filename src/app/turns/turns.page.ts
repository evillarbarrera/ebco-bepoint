import { Component, OnInit } from "@angular/core";
import { AlertController, Platform } from "@ionic/angular";
import { ShareService } from "../share/share";

@Component({
  selector: "app-turns",
  templateUrl: "./turns.page.html",
  styleUrls: ["./turns.page.scss"]
})
export class TurnsPage implements OnInit {
  constructor(
    public alertController: AlertController,
    public share: ShareService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  async presentAlertConfirm() {
    evothings.eddystone.stopScan();
    const alert = await this.alertController.create({
      header: "Acceso",
      message: "Seleccione su acceso",
      buttons: [
        {
          text: "Entrada",
          cssClass: "primary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
           // this.Add("Entrada");
          }
        },
        {
          text: "Salida",
          cssClass: "danger",
          handler: () => {
            console.log("Confirm Okay");
            // this.Add("Salida");
          }
        }
      ]
    });

    await alert.present();
  }

  async UsuarioIncorrecto() {
    evothings.eddystone.stopScan();
    const alert = await this.alertController.create({
      header: "Informacion",
      subHeader: "Ubicacion",
      message: "No se encuentra en la ubicacion de acceso",
      buttons: ["OK"]
    });

    await alert.present();
  }

  // Add(dir) {
  //   this.share.Create(dir);
  // }

  Buscarbeacons() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan(
        data => {
          this.presentAlertConfirm();
        },
        error => console.error(this.UsuarioIncorrecto())
      );
    });
  }
}
