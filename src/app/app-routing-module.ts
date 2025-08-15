import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Product } from './product/product';
import { Guard } from './service/guard';
import { Report } from './report/report';
import { Login } from './login/login';

const routes: Routes = [
  { path: 'menu', component: Menu },
  { path: 'login', component: Login },
  { path: 'products', component: Product, canActivate: [Guard], data: { requiresAdmin: true } },
  { path: 'reports', component: Report, canActivate: [Guard], data: { requiresAdmin: true } },
  { path: '**', pathMatch: 'full', redirectTo: 'menu' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
