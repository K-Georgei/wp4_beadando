import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './card-details.html',
  styleUrls: ['./card-details.css'],
})
export class CardDetailsComponent {
  @Input() form!: FormGroup;

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/\D/g, '').substring(0, 16);

    this.form.get('cardNumber')?.setValue(rawValue);

    const parts = rawValue.match(/.{1,4}/g);
    input.value = parts ? parts.join(' ') : rawValue;
  }

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove all non-digit characters
    value = value.substring(0, 4); // Limit to 4 digits (MMYY)
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    input.value = value;
    this.form.get('expiryDate')?.setValue(input.value);
  }
}
