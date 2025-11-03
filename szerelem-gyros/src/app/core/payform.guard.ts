import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from './cart-service';

export const canActivatePayform: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);

  if (cartService.cartItems().length > 0) {
    return true; // Allow access if the cart is not empty
  } else {
    // Redirect to the home page if the cart is empty
    return router.parseUrl('/');
  }
};