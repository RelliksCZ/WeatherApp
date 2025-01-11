import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  standalone: false,
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  displayMode: string = 'days'; // Výchozí zobrazení (Dny)

  constructor(private storageService: StorageService) {}

  async ionViewWillEnter() {
    // Načtení zvoleného režimu z úložiště
    const storedMode = await this.storageService.getItem('displayMode');
    this.displayMode = storedMode || 'days';
  }

  async updateDisplayMode() {
    // Uložení zvoleného režimu do úložiště
    await this.storageService.setItem('displayMode', this.displayMode);
  }
}
