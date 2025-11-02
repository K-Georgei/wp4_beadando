import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatChipsModule],
  templateUrl: './search-and-filter.html',
  styleUrl: './search-and-filter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchAndFilter {
  readonly servingTypes = ['Gyros tál', 'Gyros pita', 'Gyros wrap'];
  value = '';
  search(): void {
    console.log('Search for:', this.value);
  }

}
