// Importuje potřebné moduly
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Dekorátor Injectable, aby byla služba dostupná v celém projektu
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.weatherapi.com/v1/current.json'; // URL pro aktuální počasí
  private apiKey = '24e5e4adbd8a46f78b8183706250901'; // API klíč (nahraďte svým)

  constructor(private http: HttpClient) {}

  // Získá aktuální počasí pro dané město
  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}&aqi=no`; // Sestavení URL
    return this.http.get(url);
  }

  // Získá předpověď počasí pro následujících 5 dní
  getForecast(city: string): Observable<any> {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=5`;
    return this.http.get(url);
  }

  // Vyhledá města podle dotazu
  searchCities(query: string): Promise<string[]> {
    const url = `https://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${query}`;
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(url).subscribe(
        (results) => {
          const cityNames = results.map((result) => result.name); // Extrakce názvů měst
          resolve(cityNames);
        },
        (error) => reject(error)
      );
    });
  }

  // Ověří, zda město existuje pomocí API
  checkCityExists(city: string): Promise<boolean> {
    const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`;
    return new Promise((resolve) => {
      this.http.get(url).subscribe(
        () => resolve(true), // API vrací data => město existuje
        () => resolve(false) // API vrací chybu => město neexistuje
      );
    });
  }
}
