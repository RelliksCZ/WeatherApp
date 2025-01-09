import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  weather: any;
  cities: string[] = [];
  selectedCity: string = '';

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    // Inicializace a načtení dat při spuštění
    await this.loadCities();
    if (this.cities.length > 0) {
      this.selectedCity = this.cities[0]; // Nastaví první město jako výchozí
      this.getWeather(this.selectedCity);
    }
  }

  async ionViewWillEnter() {
    // Načtení měst pokaždé, když uživatel přejde na kartu
    await this.loadCities();
  }

  async loadCities() {
    this.cities = await this.storageService.getCities();
    if (this.cities.length > 0 && !this.selectedCity) {
      this.selectedCity = this.cities[0]; // Nastavíme první město, pokud není vybrané
    }
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      this.weather = data;
    });
  }
}
