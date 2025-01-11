// Importuje potřebné moduly a dekorátory
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// Dekorátor Injectable, aby byla služba dostupná v celém projektu
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null; // Proměnná pro přístup k úložišti

  constructor(private storage: Storage) {
    this.init(); // Inicializace úložiště
  }

  // Inicializuje Ionic Storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Přidá město do seznamu, pokud tam již není
  public async addCity(city: string) {
    const cities = (await this.get('cities')) || [];
    if (!cities.includes(city)) {
      cities.push(city);
      await this.set('cities', cities);
    }
  }

  // Získá seznam uložených měst
  public async getCities(): Promise<string[]> {
    return (await this.get('cities')) || [];
  }

  // Ověří, zda již město existuje v seznamu
  public async cityExists(city: string): Promise<boolean> {
    const cities = (await this.get('cities')) || [];
    return cities.some((savedCity: string) => savedCity.toLowerCase() === city.toLowerCase());
  }

  // Nastaví hodnotu v úložišti
  private async set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  // Získá hodnotu z úložiště
  private async get(key: string) {
    return this._storage?.get(key);
  }

  // Odstraní město ze seznamu
  public async removeCity(city: string) {
    const cities = (await this.get('cities')) || [];
    const filteredCities = cities.filter((savedCity: string) => savedCity.toLowerCase() !== city.toLowerCase());
    await this.set('cities', filteredCities);
  }

  // Uloží libovolnou hodnotu do úložiště
  async setItem(key: string, value: any) {
    await this.storage.set(key, value);
  }

  // Získá libovolnou hodnotu z úložiště
  async getItem(key: string) {
    return await this.storage.get(key);
  }
}
