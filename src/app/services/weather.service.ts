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

  getForecast(city: string): Observable<any> {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=5`;
    return this.http.get(url);
  }

  searchCities(query: string): Promise<string[]> {
    const url = `https://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${query}`;
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(url).subscribe(
        (results) => {
          const cityNames = results.map((result) => result.name); // Vrátíme pouze názvy měst
          resolve(cityNames);
        },
        (error) => reject(error)
      );
    });
  }
  

  checkCityExists(city: string): Promise<boolean> {
    const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`;
    return new Promise((resolve) => {
      this.http.get(url).subscribe(
        () => resolve(true), // Pokud API vrátí data, město existuje
        () => resolve(false) // Pokud API vrátí chybu, město neexistuje
      );
    });
  }
  
  
}

