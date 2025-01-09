import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  city: string = '';
  cities: string[] = [];
  suggestedCities: string[] = [];

  constructor(
    private storageService: StorageService,
    private weatherService: WeatherService
  ) {}

  async ngOnInit() {
    await this.loadCities();
  }

  async ionViewWillEnter() {
    await this.loadCities();
  }

  async saveCity() {
    if (this.city) {
      const exists = await this.weatherService.checkCityExists(this.city);
      const isDuplicate = await this.storageService.cityExists(this.city);

      if (!exists) {
        alert('Zadané město neexistuje!');
        return;
      }

      if (isDuplicate) {
        alert('Město již existuje v seznamu!');
        return;
      }

      await this.storageService.addCity(this.city);
      this.city = '';
      this.suggestedCities = [];
      await this.loadCities();
      alert('Město bylo uloženo!');
    }
  }

  async removeCity(city: string) {
    await this.storageService.removeCity(city); // Odstranění města pomocí služby
    await this.loadCities(); // Aktualizace seznamu po odstranění
    alert(`Město "${city}" bylo odstraněno!`);
  }

  async searchCities(event: any) {
    const query = event.target.value.trim();
    if (query.length > 1) {
      try {
        this.suggestedCities = await this.weatherService.searchCities(query);
      } catch {
        this.suggestedCities = [];
      }
    } else {
      this.suggestedCities = [];
    }
  }

  async loadCities() {
    this.cities = await this.storageService.getCities();
  }
}
