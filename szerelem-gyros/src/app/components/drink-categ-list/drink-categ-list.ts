import { Component, signal, inject, OnInit, Input } from '@angular/core';
import { Product, MenuItem } from '@models/product';
import { CartService } from '@core/cart-service';
import { LoaderService } from '@app/core/loader';
import { CommonModule } from '@angular/common';
import { ProductFilterPipe } from '@app/pipes/product-filter-pipe';
import { ItemCard } from '@app/components/item-card/item-card';

@Component({
  selector: 'app-drink-categ-list',
  standalone: true,
  imports: [CommonModule, ItemCard, ProductFilterPipe],
  templateUrl: './drink-categ-list.html',
  styleUrls: ['./drink-categ-list.css'],
})
export class DrinkCategListComponent implements OnInit {
  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private loaderService = inject(LoaderService);

  @Input() searchTerm: string = '';
  @Input() filters: string[] = [];

  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(menu => {
      if (!menu || !menu.drinks) return;

      // Helper to convert a MenuItem to a Product
      const toProduct = (item: MenuItem, tags: string[] = []): Product => ({
        title: item.name,
        price: item.price,
        img: `assets/images/drink-images/${item.name.toLowerCase().replace(/ /g, '-')}.jpg`, // e.g., coca-cola.jpg
        tags: [item.name, ...tags], // Tag with name and category
      });

      // Process both flat and carbonated drinks
      const flatDrinks = menu.drinks.flat.map(drink => toProduct(drink, ['Szénsavmentes', 'Üdítő']));
      const carbonatedDrinks = menu.drinks.carbonated.map(drink => toProduct(drink, ['Szénsavas', 'Üdítő']));

      this.products.set([...flatDrinks, ...carbonatedDrinks]);
    });
  }

  onAdd(item: Product) {
    this.cartService.addToCart(item);
  }
}
