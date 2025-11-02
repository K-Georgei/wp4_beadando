import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule, CommonModule, MatSidenav, RouterLink],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css'],
})
export class Navigation {
  @ViewChild('drawer') drawer?: MatSidenav;

  toggle() {
    this.drawer?.toggle();
  }
}
