import { Injectable, signal, computed } from '@angular/core';
import { Product } from '@models/product';

// This interface will represent an item in our cart.
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // A signal to hold the array of cart items.
  private cart = signal<CartItem[]>([]);

  // Readonly signals that components can subscribe to.
  cartItems = this.cart.asReadonly();
  totalItems = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));
  totalPrice = computed(() => this.cart().reduce((sum, item) => sum + (item.product.price! * item.quantity), 0));

  /**
   * Adds a product to the cart.
   * If the product already exists, it increases its quantity.
   * Note: For custom products, ensure they have a unique ID or a descriptive title
   * to differentiate them.
   */
  addToCart(productToAdd: Product): void {
    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === productToAdd.id);
      if (existingItem) {
        // If item exists, create a new array with the updated quantity
        return currentCart.map(item =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item is new, add it to the cart
        return [...currentCart, { product: productToAdd, quantity: 1 }];
      }
    });
  }

  /**
   * Removes an item completely from the cart.
   */
  removeFromCart(productId: number): void {
    this.cart.update(items => items.filter(item => item.product.id !== productId));
  }

  /**
   * Updates the quantity of a specific item in the cart.
   * If quantity drops to 0 or less, the item is removed.
   */
  updateItemQuantity(productId: number, newQuantity: number): void {
    this.cart.update(items => {
      if (newQuantity <= 0) {
        return items.filter(item => item.product.id !== productId);
      }
      return items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  }

  /**
   * Clears all items from the cart.
   */
  clearCart(): void {
    this.cart.set([]);
  }
}