import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
