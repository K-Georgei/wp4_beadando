import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '@models/product';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input() item?: Product;
  @Input() fallbackImg: string = 'assets/images/placeholder.jpg';

  @Output() view = new EventEmitter<Product | undefined>();
  @Output() add = new EventEmitter<Product | undefined>();

  onView() { this.view.emit(this.item); }
  onAdd()  { this.add.emit(this.item); }
}
