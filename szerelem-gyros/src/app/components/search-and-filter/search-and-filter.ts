import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatDivider,
  ],
  templateUrl: './search-and-filter.html',
  styleUrls: ['./search-and-filter.css'],
})
export class SearchAndFilter {
  @Output() filterChange = new EventEmitter<{
    searchTerm: string;
    filters: string[];
  }>();

  searchTerm: string = '';
  availableFilters: string[] = [
    'Tál',
    'Pita',
    'Wrap',
    'Üdítő',
    'Görög',
    'Amerikai',
    'Mexikói',
    'Ázsiai',
    'Klasszikus',
  ];
  selectedFilters = new Set<string>();

  onSearchTermChange(): void {
    this.emitChanges();
  }

  onFilterSelectionChange(filter: string): void {
    if (this.selectedFilters.has(filter)) {
      this.selectedFilters.delete(filter);
    } else {
      this.selectedFilters.add(filter);
    }
    this.emitChanges();
  }

  private emitChanges(): void {
    this.filterChange.emit({
      searchTerm: this.searchTerm,
      filters: Array.from(this.selectedFilters),
    });
    console.log('Filters updated:', {
      searchTerm: this.searchTerm,
      filters: Array.from(this.selectedFilters),
    });
  }
}
