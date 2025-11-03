import { ChangeDetectionStrategy, Component, signal, inject, OnInit } from '@angular/core';
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
  private loaderService = inject(LoaderService);
  private cartService = inject(CartService);

  // A signal to hold our menu data. It starts as null.
  readonly menuData = signal<Menu | null>(null);

  // Properties to hold the user's selections
  selectedMeat: MenuItem | null = null;
  selectedVeggies: { [key: string]: boolean } = {};
  selectedSauces: { [key: string]: boolean } = {};
  selectedServing: MenuItem | null = null;
  selectedSides: { [key: string]: boolean } = {};

  // The ngOnInit lifecycle hook is a great place to fetch initial data.
  ngOnInit(): void {
    this.loaderService.getMenu().subscribe(data => {
      // When the data arrives, we set the signal's value.
      this.menuData.set(data);
      // Initialize selection objects
      data.ingredients.vegetables.forEach(veg => this.selectedVeggies[veg.name] = false);
      data.ingredients.sauces.forEach(sauce => this.selectedSauces[sauce.name] = false);
      data.sides.forEach(side => this.selectedSides[side.name] = false);
    });
  }

  addToCart(): void {
    if (!this.selectedMeat || !this.selectedServing) {
      alert('Kérlek válassz húst és tálalást!');
      return;
    }

    const menu = this.menuData();
    if (!menu) return;

    let totalPrice = 0;
    const descriptionItems: string[] = [];

    // Add meat
    totalPrice += this.selectedMeat.price;
    descriptionItems.push(this.selectedMeat.name);

    // Add serving
    totalPrice += this.selectedServing.price;
    descriptionItems.push(this.selectedServing.name);

    // Add veggies
    menu.ingredients.vegetables
      .filter(veg => this.selectedVeggies[veg.name])
      .forEach(veg => {
        totalPrice += veg.price;
        descriptionItems.push(veg.name);
      });

    // Add sauces
    menu.ingredients.sauces
      .filter(sauce => this.selectedSauces[sauce.name])
      .forEach(sauce => {
        totalPrice += sauce.price;
        descriptionItems.push(sauce.name);
      });

    // Add sides
    menu.sides
      .filter(side => this.selectedSides[side.name])
      .forEach(side => {
        totalPrice += side.price;
        descriptionItems.push(side.name);
      });

    const customGyros: Product = {
      id: Date.now(), // Simple unique ID
      title: 'Összeállított gyros',
      description: descriptionItems.join(', '),
      price: totalPrice,
      img: 'assets/img/products/gyros-tanyer.jpg'
    };

    this.cartService.addToCart(customGyros);
    alert('Gyros a kosárba került!');
  }
}
