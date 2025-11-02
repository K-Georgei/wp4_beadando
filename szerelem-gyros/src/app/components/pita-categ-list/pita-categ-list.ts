import { Component, signal } from '@angular/core';
import { Product } from '@models/product';
import { generateGyros } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';


@Component({
  selector: 'app-pita-categ-list',
  standalone: true,
  imports: [ItemCard],
  templateUrl: './pita-categ-list.html',
  styleUrl: './pita-categ-list.css',
})
export class PitaCategList {
  categoryPita = signal<Product[]>([]);

  constructor(){
      this.categoryPita.set(generateGyros('Gyros pitában', [
        'Classic',
        'Extra szósz',
        'Csípős'
      ], { basePrice: 1500, img: 'assets/images/gyros_pita.jpg' }));
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
