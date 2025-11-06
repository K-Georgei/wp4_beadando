import { Injectable, signal, computed, effect } from '@angular/core';
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
  private readonly CART_STORAGE_KEY = 'szerelem-gyros-cart';
  cart = signal<CartItem[]>(this.loadCartFromStorage()); 

  // Readonly signals that components can subscribe to.
  cartItems = this.cart.asReadonly();
  totalItems = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));
  totalPrice = computed(() => this.cart().reduce((sum, item) => sum + (item.product.price! * item.quantity), 0));

  constructor() {
    // Effect, ami minden változáskor elmenti a kosarat
    effect(() => {
      this.saveCartToStorage(this.cart());
    });
  }

  
  addToCart(productToAdd: Product): void {
    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === productToAdd.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, { product: productToAdd, quantity: 1 }];
      }
    });
  }


  removeFromCart(productId: number): void {
    this.cart.update(items => items.filter(item => item.product.id !== productId));
  }


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


  clearCart(): void {
    this.cart.set([]);
  }

  private saveCartToStorage(cartItems: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Hiba a kosár mentése közben:', e);
    }
  }

  private loadCartFromStorage(): CartItem[] {
    try {
      const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error('Hiba a kosár betöltése közben:', e);
      return []; // Hiba esetén üres kosárral tér vissza
    }
  }
}