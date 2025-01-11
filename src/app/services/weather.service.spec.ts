// Importuje potřebné moduly a testovací prostředí
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';

// Definuje testovací sadu pro WeatherService
describe('WeatherService', () => {
  let service: WeatherService; // Proměnná pro testovanou službu

  // Inicializuje testovací prostředí před každým testem
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  // Testuje, zda byla služba správně vytvořena
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
