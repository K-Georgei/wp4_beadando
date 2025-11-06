import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '@models/product';
import { Popupcard } from '@app/components/popupcard/popupcard';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, MatDialogModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input() item?: Product;
  @Input() fallbackImg: string = 'assets/images/placeholder.jpg';

  @Output() add = new EventEmitter<Product | undefined>();

  private dialog = inject(MatDialog);

  onAdd() {
    this.add.emit(this.item);
  }

  openPopup(){
    const ref = this.dialog.open(Popupcard,{
      data: { item: this.item },
      width: '400px',
    });
  }

}
