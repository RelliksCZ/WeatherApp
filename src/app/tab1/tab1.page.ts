import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { StorageService } from '../services/storage.service';

// Dekorátor Component pro definici komponenty
@Component({
  selector: 'app-tab1',
  standalone: false,
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  cities: string[] = []; // Seznam uložených měst
  selectedCity: string = ''; // Vybrané město
  weatherData: any = null; // Data pro aktuální počasí
  forecast: any[] = []; // Data pro budoucí počasí
  displayMode: string = 'days'; // Zobrazení dnů nebo dat
  currentDate: Date = new Date(); // Aktuální datum

  constructor(
    private weatherService: WeatherService, // Služba pro počasí
    private storageService: StorageService // Služba pro úložiště
  ) {}

  async ngOnInit() {
    // Inicializace dat při načtení komponenty
    await this.loadCities();
    await this.loadDisplayMode();
    if (this.cities.length > 0) {
      this.selectedCity = this.cities[0]; // Výběr prvního města
      await this.loadWeatherData(); // Načtení aktuálního počasí
      this.getForecast(this.selectedCity); // Načtení předpovědi
    }
  }

  async ionViewWillEnter() {
    // Načtení dat při každém přechodu na stránku
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

  // Načte seznam uložených měst
  async loadCities() {
    this.cities = await this.storageService.getCities();
  }

  // Načte preferované zobrazení (dny nebo data)
  async loadDisplayMode() {
    this.displayMode = (await this.storageService.getItem('displayMode')) || 'days';
  }

  // Načte aktuální počasí pro vybrané město
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

  // Načte předpověď počasí
  getForecast(city: string) {
    this.weatherService.getForecast(city).subscribe((data) => {
      this.forecast = data.forecast.forecastday.splice(1); // Odebere první položku (aktuální den)
    });
  }

  // Změna počasí při výběru města
  onCityChange() {
    this.loadWeatherData();
    this.getForecast(this.selectedCity);
  }
}
