import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule, MatDivider],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
