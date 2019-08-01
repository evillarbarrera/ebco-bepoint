import { Component, OnInit } from "@angular/core";
import { Uid } from "@ionic-native/uid/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { StorageService, Trabajador } from "../services/storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  // imei: any;
  rut: any;
  trabajador: string;
  device_id_trabajador: any;
  device_id: any;

  //Storage

  trabajadores: Trabajador[] = [];
  newTrabajador: Trabajador = <Trabajador>{};

  constructor(
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    public http: HttpClient,
    public alertController: AlertController,
    private router: Router,
    private storageService: StorageService
  ) {
    this.getImei();
  }

  ngOnInit() {}

  GetLogin() {
    if (this.rut == null) {
      this.RutVacio();
    } else {
      let data: Observable<any>;
      data = this.http.get(
        "https://apirestcontroldepersonal20190617032202.azurewebsites.net/api/Trabajador?Imei=" +
          this.device_id
      );
      data.subscribe(result => {
        if (result != null) {
          this.device_id_trabajador = result.rut;
          let rut_input = this.rut.replace(".", "");
          let rut_cloud = this.device_id_trabajador.replace(".", "");
          if (rut_input.replace("-", "") == rut_cloud.replace("-", "")) {
            this.addTrabajador();
            this.router.navigate(["/home"]);
          } else {
            this.UsuarioIncorrecto();
          }
        } else {
          this.EquipoNoRegistrado();
        }
      });
    }
  }

  async UsuarioIncorrecto() {
    const alert = await this.alertController.create({
      header: "",
      subHeader: "Login",
      message: "El rut ingresado no se encuentra asociado a este equipo",
      buttons: ["OK"]
    });
    await alert.present();
  }

  async RutVacio() {
    const alert = await this.alertController.create({
      header: "Alerta",
      subHeader: "",
      message: "Debe ingresar el rut",
      buttons: ["OK"]
    });
    await alert.present();
  }

  async UsuarioRegistrado() {
    const alert = await this.alertController.create({
      header: "",
      subHeader: "Login",
      message: "Equipo Registrado",
      buttons: ["OK"]
    });
    await alert.present();
  }

  async EquipoNoRegistrado() {
    const alert = await this.alertController.create({
      header: "",
      subHeader: "Login",
      message: "Equipo no Registrado",
      buttons: ["OK"]
    });
    await alert.present();
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
        throw new Error("Permissions required");
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
    this.device_id = this.uid.IMEI;
    return this.uid.IMEI;
  }

  addTrabajador() {
    this.newTrabajador.id = 1;
    this.newTrabajador.nombre = "Emmanuel Villar";
    this.newTrabajador.rut = "170302184";
    this.newTrabajador.imei = "1";
    this.newTrabajador.tipo = "1";
    this.newTrabajador.contrasena = "1";
    this.newTrabajador.mail = "1";
    this.newTrabajador.estado = "1";

    this.storageService.AddTrabajadores(this.newTrabajador).then(trabajador => {
      this.newTrabajador = <Trabajador>{};
    });
  }

  LoadTrabajadores() {
    this.storageService.getTrabajadores().then(trabajadores => {
      this.trabajadores = trabajadores;
    });
  }

  UpdateTrabajadores(trabajador: Trabajador) {
    trabajador.id = 1;
    trabajador.nombre = "";
    trabajador.rut = "";
    trabajador.imei = "";
    trabajador.tipo = "";
    trabajador.contrasena = "";
    trabajador.mail = "";
    trabajador.estado = "";

    this.storageService.UpdateTrabajadores(trabajador).then(trabajador => {});
  }

  DeleteTrabajadores(trabajador: Trabajador) {
    this.storageService
      .DeleteTrabajadores(trabajador.id)
      .then(trabajador => {});
  }
}
