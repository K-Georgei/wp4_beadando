import { Component, signal, inject, OnInit, Input } from '@angular/core';
import { Product, Menu, ProductVariant } from '@models/product'; // Import ProductVariant
import { CartService } from '@core/cart-service';
import { generateGyros } from '@controllers/pages/gyros-generator';
import { ItemCard } from '@app/components/item-card/item-card';
import { LoaderService } from '@app/core/loader';
import { CommonModule } from '@angular/common';
import { ProductFilterPipe } from '@app/pipes/product-filter-pipe';

@Component({
  selector: 'app-box-categ-list',
  standalone: true,
  imports: [ItemCard, CommonModule, ProductFilterPipe],
  templateUrl: './box-categ-list.html',
  styleUrls: ['./box-categ-list.css'],
})
export class BoxCategListComponent implements OnInit {
  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private loaderService = inject(LoaderService);

  // Inputs for search term and filters
  @Input() searchTerm: string = '';
  @Input() filters: string[] = [];


  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(menu => {
      // Define product "recipes" using the ProductVariant interface
      const gyrosTálVariants: ProductVariant[] = [
        { name: 'Klasszikus',
          ingredients: ['Csirke', 'Tál', 'Hasábburgonya', 'Paradicsom', 'Uborka', 'Lilahagyma', 'Tzatziki'],
          img:'assets/images/box-images/category.png',
          tags: ['Klasszikus']
        },
        { name: 'Görög',
          ingredients: ['Bárány', 'Tál', 'Hasábburgonya', 'Oliva', 'Paradicsom', 'Uborka', 'Tzatziki'],
          img:'assets/images/box-images/greek.png',
          tags: ['Görög']
        },
        { name: 'Amerikai',
          ingredients: ['Marha', 'Tál', 'Hasábburgonya', 'Sajt', 'Sajtos', 'Bacon'],
          img:'assets/images/box-images/american.png',
          tags: ['Amerikai'] 
        },
        { name: 'Mexikói',
          ingredients: ['Csirke', 'Tál', 'Hasábburgonya', 'Csípős', 'Jalapeno', 'Vöröshagyma','Lilahagyma'],
          img:'assets/images/box-images/mexican.png',
          tags: ['Mexikói'] 
        },
        { name: 'Ázsiai',
          ingredients: ['Sertés', 'Tál', 'Hasábburgonya', 'Csípős', 'Rizs', 'Uborka', 'Káposzta', 'Fokhagymás'],
          img:'assets/images/box-images/asian.png',
          tags: ['Ázsiai'] 
        },
      ];

      this.products.set(
        generateGyros('Gyros tál', gyrosTálVariants, menu)
      );
    });
  }

  onAdd(item: Product) {
    this.cartService.addToCart(item);
  }
}
