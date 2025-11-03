import { Component, signal, inject, OnInit } from '@angular/core';
import { Product, Menu } from '@models/product';
import { CartService } from '@core/cart-service';
import { generateGyros, GyrosVariant } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';
import { LoaderService } from '@app/core/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pita-categ-list',
  standalone: true,
  imports: [ItemCard, CommonModule],
  templateUrl: './pita-categ-list.html',
  styleUrl: './pita-categ-list.css',
})
export class PitaCategListComponent implements OnInit {
  categoryPita = signal<Product[]>([]);
  private cartService = inject(CartService);
  private loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(menu => {
      const gyrosPitaVariants: GyrosVariant[] = [
        { name: 'Klasszikus', ingredients: ['Csirke', 'Pita', 'Hasábburgonya', 'Paradicsom', 'Uborka', 'Lilahagyma', 'Tzatziki'], img:'assets/images/pita-images/category.png' },
        { name: 'Görög', ingredients: ['Bárány', 'Pita', 'Oliva', 'Paradicsom', 'Uborka', 'Tzatziki'], img:'assets/images/pita-images/greek.png' },
        { name: 'Amerikai', ingredients: ['Marha', 'Pita', 'Sajt', 'Bacon', 'Mac and Cheese'], img:'assets/images/pita-images/american.png' },
      ];

      this.categoryPita.set(
        generateGyros('Pita', gyrosPitaVariants, menu, { img: 'assets/images/pita-images/category.png' })
      );
    });
  }

  onAdd(item: Product) {
    this.cartService.addToCart(item);
    // You can add a visual confirmation here (e.g., a snackbar message)
  }

}
