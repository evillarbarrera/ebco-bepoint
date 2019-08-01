import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

export interface Trabajador {
  id: number,
  nombre: string,
  rut: string,
  imei: string,
  tipo: string,
  contrasena: string,
  mail: string,
  estado: string
}

const ITEMS_KEY = "my-trabajador";
@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(private storage: Storage) {}

  AddTrabajadores(trabajador: Trabajador): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((trabajadores: Trabajador[]) => {
      if (trabajadores) {
        trabajadores.push(trabajador);
        return this.storage.set(ITEMS_KEY, [trabajador]);
      } else {
        return this.storage.set(ITEMS_KEY, [trabajador]);
      }
    });
  }

  getTrabajadores(): Promise<Trabajador[]> {
    return this.storage.get(ITEMS_KEY);
  }

  UpdateTrabajadores(trabajador: Trabajador): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((trabajadores: Trabajador[]) => {
      if (!trabajadores || trabajadores.length === 0) {
        return null;
      }

      let newTrabajadores: Trabajador[] = [];

      for (let i of trabajadores) {
        if (i.id === trabajador.id) {
          newTrabajadores.push(trabajador);
        } else {
          newTrabajadores.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newTrabajadores);
    });
  }

  DeleteTrabajadores(id: number): Promise<Trabajador> {
    return this.storage.get(ITEMS_KEY).then((trabajadores: Trabajador[]) => {
      if (!trabajadores || trabajadores.length === 0) {
        return null;
      }

      let toKeep: Trabajador[] = [];

      for (let i of trabajadores) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
