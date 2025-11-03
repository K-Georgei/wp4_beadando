import { Component, inject } from '@angular/core';
import { CartService } from '@core/cart-service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  public cartService = inject(CartService);

  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal', 'actions'];

  onRemove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onQuantityChange(productId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    this.cartService.updateItemQuantity(productId, quantity);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
