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

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.loadWeather();
  }

  async ionViewWillEnter() {
    // Tato metoda se volá při každém návratu na stránku
    await this.loadWeather();
  }

  async loadWeather() {
    const city = await this.storageService.get('city');
    if (city) {
      this.getWeather(city);
    } else {
      this.getWeather('Prague'); // Výchozí město
    }
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      this.weather = data;
    });
  }
}
