import { Routes } from '@angular/router';
import { GyrosMaker } from './controllers/pages/gyros-maker/gyros-maker';
import { Home } from './controllers/pages/home/home';
import { CartComponent } from './controllers/pages/cart/cart';
import { NotFoundError } from 'rxjs';

export const routes: Routes = [
    {path: '', component: Home, data: {title: 'Menük'}},
    {path: 'gyros-maker', component: GyrosMaker, data: {title: 'Gyros készítő'}},
    {path: 'cart', component: CartComponent, data: {title: 'Kosár'}},
    {path: '**', component: NotFoundError},
];
