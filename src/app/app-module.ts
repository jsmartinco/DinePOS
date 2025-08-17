import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { Product } from './product/product';
import { Category } from './category/category';
import { Pagination } from './pagination/pagination';
import { Login } from './login/login';
import { Sell } from './sell/sell';
import { Transaction } from './transaction/transaction';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { Menu } from './menu/menu';
import { Report } from './report/report';
import { FormsModule } from '@angular/forms';
import { AEProduct } from './a-e-product/a-e-product';
import { CartComponent } from './cart-component/cart-component';


@NgModule({
  declarations: [
    App,
    Dashboard,
    Product,
    Category,
    Pagination,
    Login,
    Sell,
    Transaction,
    Menu,
    Report,
    AEProduct,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [App]
})
export class AppModule { }
