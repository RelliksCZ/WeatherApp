import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  city: string = '';

  constructor(private storageService: StorageService) {}

  saveCity() {
    if (this.city) {
      this.storageService.set('city', this.city);
      alert('Město bylo uloženo!');
    }
  }
}
