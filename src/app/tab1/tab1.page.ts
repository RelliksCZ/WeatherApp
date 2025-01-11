import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  standalone: false,
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  cities: string[] = [];
  selectedCity: string = '';
  weatherData: any = null;
  forecast: any[] = [];
  displayMode: string = 'days'; // Výchozí zobrazení
  currentDate: Date = new Date(); // Přidána vlastnost pro aktuální datum

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.loadCities();
    await this.loadDisplayMode();
    if (this.cities.length > 0) {
      this.selectedCity = this.cities[0];
      await this.loadWeatherData();
      this.getForecast(this.selectedCity);
    }
  }

  async ionViewWillEnter() {
    await this.loadCities();
    await this.loadDisplayMode();
    if (this.cities.length > 0) {
      if (!this.selectedCity || !this.cities.includes(this.selectedCity)) {
        this.selectedCity = this.cities[0];
      }
      await this.loadWeatherData();
      this.getForecast(this.selectedCity);
    }
  }

  async loadCities() {
    this.cities = await this.storageService.getCities();
  }

  async loadDisplayMode() {
    this.displayMode = (await this.storageService.getItem('displayMode')) || 'days';
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

  getForecast(city: string) {
    this.weatherService.getForecast(city).subscribe((data) => {
      this.forecast = data.forecast.forecastday;
    });
  }

  onCityChange() {
    this.loadWeatherData();
    this.getForecast(this.selectedCity);
  }
}
