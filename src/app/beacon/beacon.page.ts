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
  comp_rssi: any;
 

  constructor(private change: ChangeDetectorRef, private platform: Platform) {}

  Buscarbeacons(){
  this.comp_rssi = 0;
    this.platform.ready().then(() =>{
      evothings.eddystone.startScan((data) => {
        this.beaconData=data;
        // alert(this.beaconData.rssi)
        
        // alert(this.comp_rssi)
        if(this.comp_rssi == 0)
        {
          this.address =  this.beaconData.address;
          this.temperature = this.beaconData.temperature;
          this.rssi =  (this.beaconData.rssi * -1).toString();
          this.comp_rssi = this.beaconData.rssi;
          this.txPower = this.beaconData.txPower;
          this.nombre = this.beaconData.name;
          this.voltage = this.beaconData.timeStamp;
          this.url = this.beaconData.url;
        }
        else
        {
          if((this.beaconData.rssi * -1) < (this.comp_rssi * -1))
          {
          this.address =  this.beaconData.address;
          this.temperature = this.beaconData.temperature;
          this.rssi =  (this.beaconData.rssi * -1).toString();
          this.comp_rssi = this.beaconData.rssi;
          this.txPower = this.beaconData.txPower;
          this.nombre = this.beaconData.name;
          this.voltage = this.beaconData.voltage;
          this.url = this.beaconData.url;
          }
        }
       setTimeout(()=>{
         this.change.detectChanges();
       }, 1000)
      ;
      }, error => console.error( alert("Error...")));
    })
  }

}
