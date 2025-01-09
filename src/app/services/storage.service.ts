import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async addCity(city: string) {
    const cities = (await this.get('cities')) || [];
    if (!cities.includes(city)) {
      cities.push(city);
      await this.set('cities', cities);
    }
  }

  public async getCities(): Promise<string[]> {
    return (await this.get('cities')) || [];
  }

  public async cityExists(city: string): Promise<boolean> {
    const cities = (await this.get('cities')) || [];
    return cities.some((savedCity: string) => savedCity.toLowerCase() === city.toLowerCase());
  }

  private async set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  private async get(key: string) {
    return this._storage?.get(key);
  }
}
