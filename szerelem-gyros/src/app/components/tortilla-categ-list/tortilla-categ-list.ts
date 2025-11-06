import { Component, signal, inject, OnInit, Input } from '@angular/core';
import { Product, Menu, ProductVariant } from '@models/product'; // Import ProductVariant
import { CartService } from '@core/cart-service';
import { generateGyros } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';
import { LoaderService } from '@app/core/loader';
import { CommonModule } from '@angular/common';
import { ProductFilterPipe } from '@app/pipes/product-filter-pipe';

@Component({
  selector: 'app-tortilla-categ-list',
  standalone: true,
  imports: [ItemCard, CommonModule, ProductFilterPipe],
  templateUrl: './tortilla-categ-list.html',
  styleUrls: ['./tortilla-categ-list.css'],
})
export class TortillaCategListComponent implements OnInit {
  // This signal will hold the dynamically generated products.
  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private loaderService = inject(LoaderService);

  // Inputs for search term and filters
  @Input() searchTerm: string = '';
  @Input() filters: string[] = [];

  // The old hardcoded 'products' array has been removed.

  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(menu => {
      // Define product "recipes" using the ProductVariant interface
      const gyrosTortillaVariants: ProductVariant[] = [
      {
        name: 'Klasszikus',
        ingredients: ['Csirke', 'Tortilla', 'Hasábburgonya', 'Paradicsom', 'Uborka', 'Lilahagyma', 'Tzatziki'],
        img:'assets/images/tortilla-images/category.png',
        tags: ['Klasszikus']
      },
      {
        name: 'Görög',
        ingredients: ['Bárány', 'Tortilla', 'Hasábburgonya', 'Oliva', 'Paradicsom', 'Uborka', 'Tzatziki'],
        img:'assets/images/tortilla-images/greek.png',
        tags: ['Görög']
      },
      ];

      this.products.set(
        generateGyros('Gyros wrap', gyrosTortillaVariants, menu)
      );
    });
  }

  onAdd(item: Product) {
    this.cartService.addToCart(item);
  }
}
