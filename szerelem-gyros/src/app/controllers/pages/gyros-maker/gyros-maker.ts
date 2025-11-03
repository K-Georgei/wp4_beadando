import { Component } from '@angular/core';
import { Panels } from '@app/components/panels/panels';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gyros-maker',
  standalone: true,
  imports: [Panels, CommonModule],
  templateUrl: './gyros-maker.html',
  styleUrl: './gyros-maker.css',
})
export class GyrosMaker {
  totalPrice = 0;

  onPriceChanged(price: number): void {
    this.totalPrice = price;
  }
}
