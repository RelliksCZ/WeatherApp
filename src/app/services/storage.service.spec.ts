// Importuje potřebné moduly a třídy pro testování
import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

// Popisuje testovací sadu pro StorageService
describe('StorageService', () => {
  let service: StorageService; // Proměnná pro instanci testovaného StorageService

  // Před každým testem nastavuje testovací prostředí a inicializuje službu
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  // Testuje, zda byla služba správně vytvořena
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
