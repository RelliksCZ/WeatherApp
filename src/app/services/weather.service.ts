import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.weatherapi.com/v1/current.json'; // Základní URL WeatherAPI
  private apiKey = '24e5e4adbd8a46f78b8183706250901'; // Nahraďte svým API klíčem

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}&aqi=no`; // AQI vypnuto
    return this.http.get(url);
  }
}
