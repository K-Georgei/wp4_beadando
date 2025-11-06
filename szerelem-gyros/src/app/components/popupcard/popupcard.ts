import { Component, ChangeDetectionStrategy, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialog,
} from '@angular/material/dialog';
import { Product } from '@models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popupcard',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './popupcard.html',
  styleUrls: ['./popupcard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Popupcard {
  readonly data = inject<{ item?: Product }>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);

  close() {
    this.dialog.closeAll();
  }

  openDialog(){
    this.dialog.open(Popupcard);
  }

  goToCart(){
    this.router.navigate(['/cart']);
    this.close();
  }
}
