import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AlertController, Platform } from "@ionic/angular";

import { Observable } from "rxjs";
import { ShareService } from "../share/share";

import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";
import { Uid } from "@ionic-native/uid/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController } from "@ionic/angular";
import { StorageService, Trabajador } from "../services/storage.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  dataFromService:any="";
  beaconData: any;
  result: any =  0;
  nombre: any ="";

 
  id:any;

  public myimage = 'assets/img/Control1.png'

  trabajadores: Trabajador[] = [];
  constructor(
    private change: ChangeDetectorRef,
    public alertController: AlertController,
    public http: HttpClient,
    public share: ShareService,
    private platform: Platform,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    public loadingController: LoadingController,
    private StorageService: StorageService,
    
  ) {
    this.LoadTrabajadores();
   }

  ngOnInit() {
    
  }

  CambioImagen(){
    if(this.myimage=="assets/img/Control1.png")
    {
       this.myimage= "assets/img/fiscalizaciontiempo.gif";
    }
    else
    {
      this.myimage= "assets/img/Control1.png";
    }
  }

  

  Buscarbeacons(){    

    console.log(this.result)

    this.CambioImagen();
     this.platform.ready().then(() =>{
   
      evothings.eddystone.startScan((data) => {
        var today = new Date();
      
        alert(this.result);

        if(this.result == 0)
        {
        this.beaconData=data;
        console.log(this.beaconData.address,this.id)

          this.share.Create(this.beaconData.address,this.id);
          var today_pos = new Date();
          this.result = today.getSeconds() - today_pos.getSeconds();
        }
        else
        {
          if(this.result >= 3 || this.result <= 4)
             {
              this.beaconData=data;
              console.log(this.beaconData.address,this.id)

              if (this.beaconData.address = 'DF:25:38:46:1D:C1' ){
                  this.nombre = 'PATIO DELANTERO';
              }
              
              if (this.beaconData.address = 'F8:45:9C:99:CD:B8' ){
                this.nombre = 'PATIO TRASERO';
              }
              
              if (this.beaconData.address = 'F0:0F:36:70:72:E0' ){
                this.nombre = 'LIVING';
              }
              


                this.share.Create(this.nombre,this.id);
                var today_pos = new Date();
                this.result = today.getSeconds() - today_pos.getSeconds();
             }
             else
             {
              this.result = today.getSeconds() - today_pos.getSeconds();
             }
        }
        
        setTimeout(()=>{
          this.change.detectChanges();
        }, 20000);
       }, error => console.error( alert("Error...")));





    
     })

   }

   CancelarBusqueda(){
    this.CambioImagen();
    evothings.eddystone.stopScan();
   }

   LoadTrabajadores() {
     console.log("LoadTrabajadores")
    this.StorageService.getTrabajadores().then(trabajadores => {
      this.trabajadores = trabajadores;
      this.id =  this.trabajadores[0].id;
     
    });
  }

 

}


