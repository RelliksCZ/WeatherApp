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

  constructor(
    private storageService: StorageService,
    private weatherService: WeatherService
  ) {}

  async ngOnInit() {
    // Načtení měst při prvním načtení stránky
    await this.loadCities();
  }

  async ionViewWillEnter() {
    // Načtení měst pokaždé, když uživatel přejde na stránku
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
      await this.loadCities(); // Aktualizace seznamu po uložení města
      alert('Město bylo uloženo!');
    }
  }

  async loadCities() {
    this.cities = await this.storageService.getCities(); // Načtení uložených měst
  }
}
