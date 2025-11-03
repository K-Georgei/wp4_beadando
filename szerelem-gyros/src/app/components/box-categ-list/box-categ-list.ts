import { Component, signal, inject, OnInit } from '@angular/core';
import { Product, Menu } from '@models/product';
import { CartService } from '@core/cart-service';
import { generateGyros, GyrosVariant } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';
import { LoaderService } from '@app/core/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box-categ-list',
  standalone: true,
  imports: [ItemCard, CommonModule],
  templateUrl: './box-categ-list.html',
  styleUrl: './box-categ-list.css',
})
export class BoxCategListComponent implements OnInit {
  categoryBox = signal<Product[]>([]);
  private cartService = inject(CartService);
  private loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(menu => {
      const gyrosTálVariants: GyrosVariant[] = [
        { name: 'Klasszikus', ingredients: ['Csirke', 'Tál', 'Hasábburgonya', 'Paradicsom', 'Uborka', 'Lilahagyma', 'Tzatziki'], img:'assets/images/box-images/category.png' },
        { name: 'Görög', ingredients: ['Bárány', 'Hasábburgonya', 'Oliva', 'Paradicsom', 'Uborka', 'Tzatziki'], img:'assets/images/box-images/greek.png' },
        { name: 'Amerikai', ingredients: ['Marha', 'Hasábburgonya', 'Sajt', 'Sajtos', 'Bacon', 'Mac and Cheese'], img:'assets/images/box-images/american.png' },
        { name: 'Mexikói', ingredients: ['Csirke', 'Hasábburgonya', 'Csípős', 'Jalapeno', 'Vöröshagyma','Lilahagyma'], img:'assets/images/box-images/mexican.png' },
        { name: 'Ázsiai', ingredients: ['Sertés', 'Hasábburgonya', 'Csípős', 'Rizs', 'Uborka', 'Káposzta', 'Fokhagymás'], img:'assets/images/box-images/asian.png' },
      ];

      this.categoryBox.set(
        generateGyros('Gyros tál', gyrosTálVariants, menu, { img: 'assets/images/box-images/category.png' })
      );
    });
  }

  onAdd(item: Product) {
    this.cartService.addToCart(item);
    // You can add a visual confirmation here (e.g., a snackbar message)
  }
}
