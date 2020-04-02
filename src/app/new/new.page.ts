import { Component, OnInit } from '@angular/core';
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
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  public items: any;
  loading: any;

  constructor(
    public alertController: AlertController,
    public http: HttpClient,
    public share: ShareService,
    private platform: Platform,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    public loadingController: LoadingController,
    private StorageService: StorageService) { }

  ngOnInit() {
    this.loadData();
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

}
