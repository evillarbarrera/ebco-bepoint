import { Component } from "@angular/core";
import { AlertController, Platform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ShareService } from "../share/share";

import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";
import { Uid } from "@ionic-native/uid/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController } from "@ionic/angular";
import { StorageService, Trabajador } from "../services/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {

  date_access: string;
  beaconData: any;
  device_id: any;
  loading: any;
  public items: any;

  //Storage
  trabajadores: Trabajador[] = [];

  constructor(
    public alertController: AlertController,
    public http: HttpClient,
    public share: ShareService,
    private platform: Platform,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    public loadingController: LoadingController,
    private StorageService: StorageService
  ) {
    //this.getID_UID("IMEI");
    this.LoadTrabajadores();
    this.getImei();
    this.loadData();
    
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
    this.presentLoading("Espere...");

    data = this.http.get(
      "https://apirestcontroldepersonal20190617032202.azurewebsites.net/api/noticia"
    );
    data.subscribe(result => {
      this.items = result;
      this.loading.dismiss();
    });
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message
    });
    return this.loading.present();
  }

  Add(dir) {
    this.share.Create(dir);
  }

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

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
   
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
   
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
    this.device_id = this.uid.IMEI;
     return this.uid.IMEI
   }

   LoadTrabajadores() {
    this.StorageService.getTrabajadores().then(trabajadores => {
      this.trabajadores = trabajadores;
    });
  }

 
}
