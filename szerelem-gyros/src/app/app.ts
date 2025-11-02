import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from './components/card/card';
import { Product } from './models/product';
import { CommonModule } from '@angular/common';
import { Loader } from './core/loader';
import { Menu } from './models/product';
import {Navigation} from './components/navigation/navigation';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, Card, CommonModule, Navigation],
  styleUrls: ['./app.css'],
})

export class App {
  protected readonly title = signal('szerelem-gyros');

  menu = signal<Menu | null>(null);


  product: Product = {
    id: 1,
    title: 'Gyros',
    description: 'Finom gyros, házi pitában.',
    img: 'assets/images/placeholder.jpg',
    price: 1290,
  };
  constructor(private loader: Loader) {
    this.loader.getMenu().subscribe(m => this.menu.set(m));
  }

  selectMeat(name: string){
    this.product = {
      id: Date.now(),
      title: name + ' gyros',
      description: 'Finom ' + name + ' gyros, házi pitában.',
      img: 'assets/images/placeholder.jpg',
      price: 1290,
    }
  }

  onAdd(p?: Product) {
    console.log('Kosárba:', p);
    // ide jön a kosárlogika
  }

  onView(p?: Product) {
    console.log('Megtekint:', p);
    // navigáció vagy modal
  }

}

