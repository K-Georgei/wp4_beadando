import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class Loader {
  private url = 'assets/data/szerelem-gyros.json';
  constructor(private http: HttpClient) {}
  
  getMenu(): Observable<Menu> {
    return this.http.get<Menu>(this.url);
  }
}
