import { Component, signal, inject, OnInit } from '@angular/core';
import { Product, Menu } from '@models/product';
import { CartService } from '@core/cart-service';
import { generateGyros, GyrosVariant } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';
import { LoaderService } from '@app/core/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tortilla-categ-list',
  standalone: true,
  imports: [ItemCard, CommonModule],
  templateUrl: './tortilla-categ-list.html',
  styleUrl: './tortilla-categ-list.css',
})
export class TortillaCategListComponent implements OnInit {
  categoryTortilla = signal<Product[]>([]);
  private cartService = inject(CartService);
  private loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(menu => {
      const gyrosTortillaVariants: GyrosVariant[] = [
        { name: 'Klasszikus', ingredients: ['Csirke', 'Tortilla', 'Hasábburgonya', 'Paradicsom', 'Uborka', 'Lilahagyma', 'Tzatziki'], img:'assets/images/tortilla-images/classic.png' },
        { name: 'Görög', ingredients: ['Bárány', 'Tortilla', 'Oliva', 'Paradicsom', 'Uborka', 'Tzatziki'], img:'assets/images/tortilla-images/greek.png' },
      ];

      this.categoryTortilla.set(
        generateGyros('Tortilla', gyrosTortillaVariants, menu, { img: 'assets/images/tortilla-images/category.png' })
      );
    });
  }

  onAdd(item: Product) {
    this.cartService.addToCart(item);
    // You can add a visual confirmation here (e.g., a snackbar message)
  }

}
