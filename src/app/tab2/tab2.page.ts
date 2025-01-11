import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { WeatherService } from '../services/weather.service';

// Dekorátor Component pro definici komponenty
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  city: string = ''; // Uloží text aktuálně zadaného města
  cities: string[] = []; // Seznam uložených měst
  suggestedCities: string[] = []; // Seznam doporučených měst

  constructor(
    private storageService: StorageService, // Služba pro práci s úložištěm
    private weatherService: WeatherService // Služba pro práci s API počasí
  ) {}

  // Inicializace stránky při načtení
  async ngOnInit() {
    await this.loadCities();
  }

  // Načtení dat při každém přechodu na stránku
  async ionViewWillEnter() {
    await this.loadCities();
  }

  // Vyhledání měst na základě zadaného textu
  async searchCities(event: any) {
    const query = event.target.value.trim(); // Získání zadaného textu
    if (query.length > 1) {
      try {
        // Volání služby pro vyhledání měst
        this.suggestedCities = await this.weatherService.searchCities(query);
      } catch {
        // Pokud vyhledání selže, seznam je prázdný
        this.suggestedCities = [];
      }
    } else {
      // Pokud je zadání příliš krátké, seznam je prázdný
      this.suggestedCities = [];
    }
  }

  // Přidání města do seznamu uložených měst
  async selectSuggestedCity(city: string) {
    const isDuplicate = await this.storageService.cityExists(city); // Kontrola duplicity

    if (isDuplicate) {
      alert('This city already exists in the list!'); // Pokud město existuje, zobrazí upozornění
      return;
    }

    await this.storageService.addCity(city); // Přidání města do úložiště
    this.city = ''; // Vyčištění vstupu
    this.suggestedCities = []; // Vyčištění seznamu doporučených měst
    await this.loadCities(); // Načtení aktualizovaného seznamu měst
    alert(`City "${city}" is saved!`); // Zobrazení potvrzení
  }

  // Odstranění města ze seznamu
  async removeCity(city: string) {
    await this.storageService.removeCity(city); // Odstranění města pomocí služby
    await this.loadCities(); // Aktualizace seznamu po odstranění
    alert(`City "${city}" was removed!`); // Zobrazení potvrzení
  }

  // Načtení uložených měst
  async loadCities() {
    this.cities = await this.storageService.getCities();
  }
}
