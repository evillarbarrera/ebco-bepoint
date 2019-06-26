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
    alert("Buscando...")
    this.platform.ready().then(() =>{
      alert("Buscando2...")
      evothings.eddystone.startScan((data) => {
       this.beaconData=data;
       alert("Buscando3...," + this.beaconData.address)
       setTimeout(()=>{
         this.change.detectChanges();
       }, 1000);
      }, error => console.error( alert("Error...")));
    })
  }




}
