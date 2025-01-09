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
    await this.loadCities();
  }

  async saveCity() {
    if (this.city) {
      const exists = await this.weatherService.checkCityExists(this.city);
      if (exists) {
        await this.storageService.addCity(this.city);
        this.city = '';
        await this.loadCities();
        alert('Město bylo uloženo!');
      } else {
        alert('Zadané město neexistuje!');
      }
    }
  }

  async loadCities() {
    this.cities = await this.storageService.getCities();
  }
}
