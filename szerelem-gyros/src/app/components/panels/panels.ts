import { ChangeDetectionStrategy, Component, signal, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Angular Material modules needed for the template
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

// Import the service and data model
import { LoaderService } from '@core/loader';
import { CartService } from '@core/cart-service';
import { Menu, Product, MenuItem } from '@models/product';

@Component({
  selector: 'app-panels',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './panels.html',
  styleUrl: './panels.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Panels implements OnInit {
  @Output() priceChanged = new EventEmitter<number>();

  private loaderService = inject(LoaderService);
  private cartService = inject(CartService);

  readonly menuData = signal<Menu | null>(null);

  selectedMeat: MenuItem | null = null;
  selectedVeggies: { [key: string]: boolean } = {};
  selectedSauces: { [key: string]: boolean } = {};
  selectedServing: MenuItem | null = null;
  selectedSides: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(data => {
      this.menuData.set(data);
      data.ingredients.vegetables.forEach(veg => this.selectedVeggies[veg.name] = false);
      data.ingredients.sauces.forEach(sauce => this.selectedSauces[sauce.name] = false);
      data.sides.forEach(side => this.selectedSides[side.name] = false);
    });
  }

  onSelectionChange(): void {
    this.priceChanged.emit(this.calculatePrice());
  }

  calculatePrice(): number {
    const menu = this.menuData();
    if (!menu) return 0;

    let totalPrice = 0;

    if (this.selectedMeat) {
      totalPrice += this.selectedMeat.price;
    }
    if (this.selectedServing) {
      totalPrice += this.selectedServing.price;
    }

    menu.ingredients.vegetables
      .filter(veg => this.selectedVeggies[veg.name])
      .forEach(veg => totalPrice += veg.price);

    menu.ingredients.sauces
      .filter(sauce => this.selectedSauces[sauce.name])
      .forEach(sauce => totalPrice += sauce.price);

    menu.sides
      .filter(side => this.selectedSides[side.name])
      .forEach(side => totalPrice += side.price);

    return totalPrice;
  }

  addToCart(): void {
    if (!this.selectedMeat || !this.selectedServing) {
      alert('Kérlek válassz húst és tálalást!');
      return;
    }

    const customGyros: Product = {
      id: Date.now(), // Simple unique ID
      title: 'Összeállított gyros',
      description: 'Custom built gyros',
      price: this.calculatePrice(),
      img: 'assets/img/products/gyros-tanyer.jpg'
    };

    this.cartService.addToCart(customGyros);
    alert('Gyros a kosárba került!');
  }
}
