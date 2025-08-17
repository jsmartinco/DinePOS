import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Product } from './product/product';
import { Guard } from './service/guard';
import { Report } from './report/report';
import { Login } from './login/login';
import { AEProduct } from './a-e-product/a-e-product';
import { CartComponent } from './cart-component/cart-component';

const routes: Routes = [
  { path: 'menu', component: Menu },
  { path: 'login', component: Login },
  { path: 'products', component: Product/*, canActivate: [Guard], data: { requiresAdmin: true } */},
  { path: 'reports', component: Report, canActivate: [Guard], data: { requiresAdmin: true } },
  { path: 'app-a-e-product', component: AEProduct /*, canActivate: [Guard], data: { requiresAdmin: true } */ },
  { path: 'cart', component: CartComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'menu' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
