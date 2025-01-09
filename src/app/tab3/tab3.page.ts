import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  forecast: any;
  cities: string[] = [];
  selectedCity: string = '';

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    // Načtení seznamu měst při prvním načtení stránky
    await this.loadCities();
    if (this.cities.length > 0) {
      this.selectedCity = this.cities[0];
      this.getForecast(this.selectedCity);
    }
  }

  async ionViewWillEnter() {
    // Načtení seznamu měst při každém přechodu na stránku
    await this.loadCities();
    if (this.cities.length === 0) {
      this.forecast = null; // Vymažeme předpověď, pokud nejsou žádná města
    } else if (!this.selectedCity || !this.cities.includes(this.selectedCity)) {
      this.selectedCity = this.cities[0];
      this.getForecast(this.selectedCity);
    }
  }

  async loadCities() {
    this.cities = await this.storageService.getCities();
  }

  getForecast(city: string) {
    this.weatherService.getForecast(city).subscribe((data) => {
      this.forecast = data.forecast.forecastday;
    });
  }
}
