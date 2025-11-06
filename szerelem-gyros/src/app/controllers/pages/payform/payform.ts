import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { CartService } from '@core/cart-service';
import { CardDetailsComponent } from '@app/components/card-details/card-details';
import { Subscription } from 'rxjs';

export function twoWordsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null; 
    }
    const words = value.trim().split(/\s+/);
    return words.length >= 2 ? null : { twoWords: true };
  };
}

@Component({
  selector: 'app-payform',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    CardDetailsComponent
  ],
  templateUrl: './payform.html',
  styleUrls: ['./payform.css']
})
export class PayformComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  public cartService = inject(CartService);
  private router = inject(Router);
  private paymentMethodSub?: Subscription;
  private cdr = inject(ChangeDetectorRef);

  paymentForm = this.fb.group({
    name: ['', [Validators.required, twoWordsValidator()]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    zip: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    houseNumber: ['', Validators.required],
    paymentMethod: ['cash', Validators.required],
    comment: [''],
    cardDetails: this.fb.group({
      cardNumber: [''],
      expiryDate: [''],
      cvc: ['']
    })
  });

  public get cardDetailsForm(): FormGroup {
    return this.paymentForm.get('cardDetails') as FormGroup;
  }

  constructor() {
    this.cardDetailsForm.disable();
  }

  ngOnInit(): void {
    const paymentMethodControl = this.paymentForm.get('paymentMethod');

    this.paymentMethodSub = paymentMethodControl!.valueChanges.subscribe(value => {
      this.updateValidators(value);
    });
  }

  private updateValidators(paymentMethod: string | null): void {
    const cardDetailsGroup = this.cardDetailsForm;

    if (paymentMethod === 'transfer') {
      cardDetailsGroup.enable();
      cardDetailsGroup.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      cardDetailsGroup.get('expiryDate')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
      cardDetailsGroup.get('cvc')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
    } else {
      cardDetailsGroup.reset();
      cardDetailsGroup.disable();
      cardDetailsGroup.get('cardNumber')?.clearValidators();
      cardDetailsGroup.get('expiryDate')?.clearValidators();
      cardDetailsGroup.get('cvc')?.clearValidators();
    }

    cardDetailsGroup.updateValueAndValidity();
    this.paymentForm.updateValueAndValidity();

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.paymentMethodSub?.unsubscribe();
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Order submitted:', this.paymentForm.value);
      alert('Rendelését sikeresen rögzítettük!');
      this.cartService.clearCart();
      this.router.navigate(['/']);
    } else {
      this.paymentForm.markAllAsTouched();
      alert('Kérjük, töltse ki az összes kötelező mezőt!');
    }
  }
}
