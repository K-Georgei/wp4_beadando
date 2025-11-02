import { Routes } from '@angular/router';
import { GyrosMaker } from './controllers/pages/gyros-maker/gyros-maker';
import { Home } from './controllers/pages/home/home';
import { Cart } from './controllers/pages/cart/cart';
import { NotFoundError } from 'rxjs';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'gyros-maker', component: GyrosMaker},
    {path: 'cart', component: Cart},
    {path: '**', component: NotFoundError},
];
