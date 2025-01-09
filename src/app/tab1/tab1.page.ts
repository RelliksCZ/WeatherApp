import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  weather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather('Prague'); // Výchozí město
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      this.weather = data;
    });
  }
}
