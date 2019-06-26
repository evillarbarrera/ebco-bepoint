import { Component, ChangeDetectorRef } from "@angular/core";
import { Platform } from '@ionic/angular';

@Component({
  selector: "app-beacon",
  templateUrl: "./beacon.page.html",
  styleUrls: ["./beacon.page.scss"]
})
export class BeaconPage  {
  beaconData: any;
  constructor(private change: ChangeDetectorRef, private platform: Platform) {}


  Buscarbeacons(){
    this.platform.ready().then(() =>{
      evothings.eddystone.startScan((data) => {
       this.beaconData=data;
     
       setTimeout(()=>{
         this.change.detectChanges();
       }, 3000);
      }, error => console.error(error));
    })
  }

}
