import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../product';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
  imports: [MatCardModule, MatButtonModule],
})
export class Card {
  @Input() item?: Product;
  @Input() fallbackImg: string = 'assets/images/placeholder.jpg'; // alapértelmezett kép PUBLIC MAPPA

  @Output() view = new EventEmitter<Product | undefined>();
  @Output() add = new EventEmitter<Product | undefined>();

  onView() { this.view.emit(this.item); }
  onAdd()  { this.add.emit(this.item); }
}