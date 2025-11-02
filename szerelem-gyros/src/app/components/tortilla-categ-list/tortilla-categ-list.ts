import { Component, signal } from '@angular/core';
import { Product } from '@models/product';
import { generateGyros } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';


@Component({
  selector: 'app-tortilla-categ-list',
  standalone: true,
  imports: [ItemCard],
  templateUrl: './tortilla-categ-list.html',
  styleUrl: './tortilla-categ-list.css',
})
export class TortillaCategList {
  categoryTortilla = signal<Product[]>([]);

  constructor(){
      this.categoryTortilla.set(generateGyros('Gyros tortillában', [
        'Classic',
        'Extra szósz',
        'Csípős'
      ], { basePrice: 1500, img: 'assets/images/gyros_tort.jpg' }));
    }

  onAdd(p?: Product) {
    console.log('Kosárba:', p);
    // ide jön a kosárlogika
  }

  onView(p?: Product) {
    console.log('Megtekint:', p);
    // navigáció vagy modal
  }
}
