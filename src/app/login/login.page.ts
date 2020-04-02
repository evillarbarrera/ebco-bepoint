import { Component, OnInit } from "@angular/core";
import { Uid } from "@ionic-native/uid/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { StorageService, Trabajador } from "../services/storage.service";
import { LoadingController } from '@ionic/angular';


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  // imei: any;
  rut: any;
  pass: any;
  trabajador: string;
  device_id_trabajador: any;
  device_id: any;
  loading: any;
  
  //Storage

  trabajadores: Trabajador[] = [];
  newTrabajador: Trabajador = <Trabajador>{};

  constructor(
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    public http: HttpClient,
    public alertController: AlertController,
    private router: Router,
    private storageService: StorageService,
    public loadingController: LoadingController,
  ) {
    //this.getImei();
    this.rut = "";
    this.pass = "";
  }

  ngOnInit() {}

  // GetLogin() {
  //   if (this.rut == null) {
  //     this.RutVacio();
  //   } else {
  //     let data: Observable<any>;
  //     data = this.http.get(
  //       "https://apirestcontroldepersonal20190617032202.azurewebsites.net/api/Trabajador?Imei=" +
  //         this.device_id
  //     );
  //     data.subscribe(result => {
  //       if (result != null) {
  //         this.device_id_trabajador = result.rut;
  //         let rut_input = this.rut.replace(".", "");
  //         let rut_cloud = this.device_id_trabajador.replace(".", "");
  //         if (rut_input.replace("-", "") == rut_cloud.replace("-", "")) {
  //           this.addTrabajador();
  //           this.router.navigate(["/home"]);
  //         } else {
  //           this.UsuarioIncorrecto();
  //         }
  //       } else {
  //         this.EquipoNoRegistrado();
  //       }
  //     });
  //   }
  // }

  async UsuarioIncorrecto() {
    const alert = await this.alertController.create({
      header: "",
      subHeader: "Login",
      message: "EL RUT O USUARIO SON INCORRECTOS",
      buttons: ["OK"],
      mode: "ios"
    });
    await alert.present();
  }

  async RutVacio() {
    const alert = await this.alertController.create({
      header: "Alerta",
      subHeader: "",
      message: "DEBE INGRESAR SU RUT Y CONTRASEÑA",
      buttons: ["OK"],
      mode: "ios"
    });
    await alert.present();
  }

  // async UsuarioRegistrado() {
  //   const alert = await this.alertController.create({
  //     header: "",
  //     subHeader: "Login",
  //     message: "Equipo Registrado",
  //     buttons: ["OK"]
  //   });
  //   await alert.present();
  // }

  // async EquipoNoRegistrado() {
  //   const alert = await this.alertController.create({
  //     header: "",
  //     subHeader: "Login",
  //     message: "Equipo no Registrado",
  //     buttons: ["OK"]
  //   });
  //   await alert.present();
  // }

  // async getImei() {
  //   const { hasPermission } = await this.androidPermissions.checkPermission(
  //     this.androidPermissions.PERMISSION.READ_PHONE_STATE
  //   );

  //   if (!hasPermission) {
  //     const result = await this.androidPermissions.requestPermission(
  //       this.androidPermissions.PERMISSION.READ_PHONE_STATE
  //     );

  //     if (!result.hasPermission) {
  //       throw new Error("Permissions required");
  //     }

  //     // ok, a user gave us permission, we can get him identifiers after restart app
  //     return;
  //   }
  //   this.device_id = this.uid.IMEI;
  //   return this.uid.IMEI;
  // }

  addTrabajador(id,rut,nombre) {
    this.newTrabajador.id = id;
    this.newTrabajador.nombre = nombre;
    this.newTrabajador.rut = rut;
    this.newTrabajador.imei = "";
    this.newTrabajador.tipo = "";
    this.newTrabajador.contrasena = "";
    this.newTrabajador.mail = "";
    this.newTrabajador.estado = "";

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

  GetLogin()
  {
    this.presentLoading("Registrando...")
    console.log(this.rut)
    console.log(this.pass)
    var login = {
      User:this.rut,
      Pass:this.pass
   };

    var headers = new Headers();
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
     this.http.post("https://ebcoapi.azurewebsites.net/api/login", login,{observe: 'response'})
     .subscribe(data => {
        console.log(data);
        this.GetTrabajador();
        this.router.navigate(["/home"]);
        
        this.loading.dismiss();
    
      }, error => {
       console.log(error);
       if(this.rut == null)
       {
        this.loading.dismiss();
        this.RutVacio();
       }
       else
       {
        if(this.pass == null)
        {
          this.loading.dismiss();
         this.RutVacio();
        }
        else
        {
          this.loading.dismiss();
          this.UsuarioIncorrecto();
        }
       }
      
     });
  }

  GetTrabajador(){
    console.log("Get Trabajador")
    let data: Observable<any>;
        data = this.http.get(
          "https://ebcoapi.azurewebsites.net/api/Trabajador?user=" +
            this.rut
        );
        data.subscribe(result => {
          console.log(result.id,result.rut,result.nombre)
         this.storageService.nombre_trabajador = result.nombre;
         this.addTrabajador(result.id,this.rut,result.nombre);

          //Guardar Datos de Trabajador

        });

  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message
    });
    return this.loading.present();
  }

 
  
}
