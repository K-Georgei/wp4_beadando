import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule, CommonModule, RouterLink],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css'],
})
export class Navigation {
  @ViewChild('drawer') drawer?: MatSidenav;
  currentPage: string = 'Oldal';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // initial
    this.currentPage = this.getTitleFromSnapshot(this.activatedRoute.snapshot) || 'Oldal';

    // frissítés navigációnál
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.currentPage = this.getTitleFromSnapshot(this.activatedRoute.snapshot) || 'Oldal';
    });
  }

  private getTitleFromSnapshot(snapshot: ActivatedRouteSnapshot): string | undefined {
    let s: ActivatedRouteSnapshot | null = snapshot;
    while (s && s.firstChild) {
      s = s.firstChild;
    }
    return s?.data?.['title'];
  }

  toggle() {
    this.drawer?.toggle();
  }
}
