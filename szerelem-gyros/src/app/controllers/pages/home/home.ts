import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu, Product } from '@models/product';
import { CategoryCard } from '@app/components/category-card/categorty-card';
import { BoxCategListComponent } from '@components/box-categ-list/box-categ-list';
import { PitaCategListComponent } from '@components/pita-categ-list/pita-categ-list';
import { TortillaCategListComponent } from '@components/tortilla-categ-list/tortilla-categ-list';
import { SearchAndFilter } from '@app/components/search-and-filter/search-and-filter';
import { Landing } from '@app/components/landing/landing';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CategoryCard,
    BoxCategListComponent,
    PitaCategListComponent,
    TortillaCategListComponent,
    SearchAndFilter,
    Landing,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  menu = signal<Menu | null>(null);

  categoryCardBox: Product = {
    title: 'Gyros Tálak',
    img: 'assets/images/box-images/category.png',
  };

  categoryCardPita: Product = {
    title: 'Gyros Pitában',
    img: 'assets/images/pita-images/category.png',
  };

  categoryCardTortilla: Product = {
    title: 'Gyros Tortillában',
    img: 'assets/images/tortilla-images/category.png',
  };

  scrollTo(targetId?: string) {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) {
      console.warn('[Home] target element not found:', targetId);
      return;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
