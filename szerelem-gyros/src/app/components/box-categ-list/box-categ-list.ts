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
  
   constructor(){
      this.categoryBox.set(generateGyros('Gyros tál', [
        'Klasszikus',
        'Amerikai',
        'Ázsiai',
        'Görög',
        'Mexikói'
      ], { basePrice: 1500, img: 'assets/images/box-images/category.png' }));
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
