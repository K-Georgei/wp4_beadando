import { Component, signal, inject, OnInit, Input } from '@angular/core';
import { Product, Menu, ProductVariant } from '@models/product'; // Import ProductVariant
import { CartService } from '@core/cart-service';
import { generateGyros } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';
import { LoaderService } from '@app/core/loader';
import { CommonModule } from '@angular/common';
import { ProductFilterPipe } from '@app/pipes/product-filter-pipe';


@Component({
  selector: 'app-pita-categ-list',
  standalone: true,
  imports: [ItemCard, CommonModule, ProductFilterPipe],
  templateUrl: './pita-categ-list.html',
  styleUrls: ['./pita-categ-list.css'],
})
export class PitaCategListComponent implements OnInit {
  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private loaderService = inject(LoaderService);

  // Inputs for search term and filters
  @Input() searchTerm: string = '';
  @Input() filters: string[] = [];

  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(menu => {
      // Define product "recipes" using the ProductVariant interface
      const gyrosPitaVariants: ProductVariant[] = [
        { name: 'Klasszikus',
          ingredients: ['Csirke', 'Pita', 'Hasábburgonya', 'Paradicsom', 'Uborka', 'Lilahagyma', 'Tzatziki'],
          img:'assets/images/pita-images/category.png',
          tags: ['Klasszikus']
        },
        { name: 'Görög',
          ingredients: ['Bárány', 'Pita', 'Hasábburgonya', 'Oliva', 'Paradicsom', 'Uborka', 'Tzatziki'],
          img:'assets/images/pita-images/greek.png',
          tags: ['Görög']
        },
        { name: 'Amerikai',
          ingredients: ['Marha', 'Pita', 'Hasábburgonya', 'Sajt', 'Sajtos', 'Bacon'],
          img:'assets/images/pita-images/american.png',
          tags: ['Amerikai']
        },
      ];

      // Generate the final products and set the signal's value
      this.products.set(
        generateGyros('Gyros pita', gyrosPitaVariants, menu)
      );
    });
  }

  onAdd(item: Product) {
    this.cartService.addToCart(item);
  }
}
