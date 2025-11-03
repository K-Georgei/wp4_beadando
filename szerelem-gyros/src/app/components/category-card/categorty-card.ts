import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '@models/product';

@Component({
  selector: 'app-category-card',
  standalone: true,
  templateUrl: './categorty-card.html',
  styleUrls: ['./categorty-card.css'],
  imports: [MatCardModule, MatButtonModule],
})
export class CategoryCard {
  @Input() item?: Product;
  @Input() fallbackImg: string = 'assets/images/placeholder.jpg';
  @Input() targetId?: string;

  @Output() navigate = new EventEmitter<string|undefined>();

  onNavigate() {
    console.log('[CategoryCard] onNavigate ->', this.targetId);
    this.navigate.emit(this.targetId);
  }
}