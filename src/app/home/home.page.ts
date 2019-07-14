import { Component } from "@angular/core";
import { AlertController, Platform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ShareService } from "../share/share";

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  date_access: string;
  beaconData: any;
  device_id: any;

  public items: any;
  constructor(
    public alertController: AlertController,
    public http: HttpClient,
    public share: ShareService,
    private platform: Platform,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid  ) {
    
      this.loadData();
      this.getID_UID("IMEI");
   
  }

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
            this.Add("Entrada");
          }
        },
        {
          text: "Salida",
          cssClass: "danger",
          handler: () => {
            console.log("Confirm Okay");
            this.Add("Salida");
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

  loadData() {
    let data: Observable<any>;
    data = this.http.get(
      "https://apirestcontroldepersonal20190617032202.azurewebsites.net/api/noticia"
    );
    data.subscribe(result => {
      this.items = result;
    });
  }

  Add(dir) {
    this.share.Create(dir);
  }

  Buscarbeacons() {
    evothings.eddystone.stopScan();
    this.platform.ready().then(() => {
      evothings.eddystone.startScan(
        data => {
          this.presentAlertConfirm();
        },
        error => console.error(this.UsuarioIncorrecto())
      );
    });
  }

  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid);
        //this.device_id = uuid.IMEI;
      })
      .catch((error: any) => {
        console.log(error);
        this.device_id = "Error! ${error}";
      });
  }

  getID_UID(type){
    if(type == "IMEI"){
      this.device_id = this.uid.IMEI;
     // return this.uid.IMEI;
    }else if(type == "ICCID"){
      return this.uid.ICCID;
    }else if(type == "IMSI"){
      return this.uid.IMSI;
    }else if(type == "MAC"){
      return this.uid.MAC;
    }else if(type == "UUID"){
      return this.uid.UUID;
    }
  }
}
