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

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.loadForecast();
  }

  async loadForecast() {
    const city = await this.storageService.get('city');
    if (city) {
      this.getForecast(city);
    } else {
      this.getForecast('Prague'); // Výchozí město
    }
  }

  getForecast(city: string) {
    this.weatherService.getForecast(city).subscribe((data) => {
      this.forecast = data.forecast.forecastday; // Ukládáme pouze pole s předpověďmi
    });
  }
}
