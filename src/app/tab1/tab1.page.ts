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
  cities: string[] = [];
  selectedCity: string = '';
  weatherData: any = null;

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.loadCities();
    if (this.cities.length > 0) {
      this.selectedCity = this.cities[0];
      await this.loadWeatherData();
    }
  }

  async ionViewWillEnter() {
    await this.loadCities();
    if (!this.selectedCity && this.cities.length > 0) {
      this.selectedCity = this.cities[0];
      await this.loadWeatherData();
    }
  }

  async loadCities() {
    this.cities = await this.storageService.getCities();
  }

  async loadWeatherData() {
    if (this.selectedCity) {
      this.weatherService.getWeather(this.selectedCity).subscribe((data) => {
        this.weatherData = {
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          wind: data.current.wind_kph,
          humidity: data.current.humidity,
          feelsLike: data.current.feelslike_c,
          pressure: data.current.pressure_mb,
        };
      });
    }
  }

  onCityChange() {
    this.loadWeatherData();
  }
}
