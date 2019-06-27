import { Component, ChangeDetectorRef } from "@angular/core";
import { Platform } from '@ionic/angular';


@Component({
  selector: "app-beacon",
  templateUrl: "./beacon.page.html",
  styleUrls: ["./beacon.page.scss"]
})
export class BeaconPage  {
  beaconData: any;
  
  address: string;
  temperature: string;
  rssi: string;
  txPower: string;
  nombre: string;
  voltage: string;
  url: string;

  constructor(private change: ChangeDetectorRef, private platform: Platform) {}

  Buscarbeacons(){
   // alert("Buscando...")
    this.platform.ready().then(() =>{
     // alert("Buscando2...")
      evothings.eddystone.startScan((data) => {
       this.beaconData=data;
      // alert("Buscando3...," + this.beaconData.address)
      this.address =  this.beaconData.address;
      this.temperature = this.beaconData.temperature;
      this.rssi = this.beaconData.rssi;
      this.txPower = this.beaconData.txPower;
      this.nombre = this.beaconData.name;
      this.voltage = this.beaconData.voltage;
      this.url = this.beaconData.url;
       setTimeout(()=>{
         this.change.detectChanges();
       }, 1000);
      }, error => console.error( alert("Error...")));
    })
  }




}
