import { Component, signal } from '@angular/core';
import { Product } from '@models/product';
import { generateGyros } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';

@Component({
  selector: 'app-box-categ-list',
  standalone: true,
  imports: [ItemCard],
  templateUrl: './box-categ-list.html',
  styleUrl: './box-categ-list.css',
})
export class BoxCategList {
  categoryBox = signal<Product[]>([]);
  
  categoryTortilla = signal<Product[]>([]);

   constructor(){
      this.categoryBox.set(generateGyros('Gyros tálak', [
        'Classic',
        'Extra szósz',
        'Csípős'
      ], { basePrice: 1500, img: 'assets/images/gyros_tal.jpg' }));
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
