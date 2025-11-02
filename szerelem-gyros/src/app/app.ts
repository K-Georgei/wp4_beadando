import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Navigation} from './components/navigation/navigation';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Navigation],
  styleUrls: ['./app.css'],
})

export class App {
  protected readonly title = signal('szerelem-gyros');

}

