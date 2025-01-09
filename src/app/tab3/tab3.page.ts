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
    await this.loadCities();
    if (this.cities.length > 0) {
      this.selectedCity = this.cities[0]; // Výchozí město
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
