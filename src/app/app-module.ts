import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { Product } from './product/product';
import { Category } from './category/category';
import { Pagination } from './pagination/pagination';
import { Login } from './login/login';
import { Sell } from './sell/sell';
import { Transaction } from './transaction/transaction';

@NgModule({
  declarations: [
    App,
    Dashboard,
    Profile,
    Product,
    Category,
    Pagination,
    Login,
    Sell,
    Transaction
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
