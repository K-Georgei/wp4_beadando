import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu } from '@models/product';
import { Product } from '@models/product';
import { CategoryCard } from '@app/components/category-card/categorty-card';
import { BoxCategList } from '@components/box-categ-list/box-categ-list';
import { PitaCategList } from '@components/pita-categ-list/pita-categ-list';
import { TortillaCategList } from '@components/tortilla-categ-list/tortilla-categ-list';
import { SearchAndFilter } from '@app/components/search-and-filter/search-and-filter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CategoryCard,BoxCategList,PitaCategList,TortillaCategList,SearchAndFilter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  menu = signal<Menu | null>(null);
  
  categoryCardBox: Product={
    title: 'Gyros Tálak',
    img: 'assets/images/box-images/category.png',
  }
  categoryCardPita: Product={
    title: 'Gyros Pitában',
    img: 'assets/images/pita-images/category.png',
  }
  categoryCardTortilla: Product={
    title: 'Gyros Tortillában',
    img: 'assets/images/tortilla-images/category.png',
  }

  scrollTo(targetId?:string){
    if(!targetId) return;
    const el = document.getElementById(targetId);
    if(!el) return;
    const toolbarHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - toolbarHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }

}
