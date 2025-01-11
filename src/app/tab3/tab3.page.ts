import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

// Dekorátor Component pro definici komponenty
@Component({
  selector: 'app-tab3',
  standalone: false,
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  displayMode: string = 'days'; // Výchozí režim zobrazení (dny)

  constructor(private storageService: StorageService) {}

  // Načtení zvoleného režimu při přechodu na stránku
  async ionViewWillEnter() {
    const storedMode = await this.storageService.getItem('displayMode'); // Získání uloženého režimu
    this.displayMode = storedMode || 'days'; // Nastavení režimu (výchozí je "dny")
  }

  // Aktualizace zvoleného režimu v úložišti
  async updateDisplayMode() {
    await this.storageService.setItem('displayMode', this.displayMode);
  }
}
