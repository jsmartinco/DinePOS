import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  productID: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
  subtotal: number; // price * qty
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  // contadores derivados
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  addItem(product: Product, qty = 1): void {    

    const found = this.items.find(i => i.product.productID === product.productID);

    if (found) {
      found.qty += qty;
      found.subtotal = found.qty * found.product.price;
    } else {
      this.items.push({ product, qty, subtotal: product.price * qty });
    }
    this.emit();
  }

  updateQuantity(productId: Product['productID'], qty: number): void {
    const it = this.items.find(i => i.product.productID === productId);
    if (!it) return;
    it.qty = Math.max(1, qty);
    it.subtotal = it.qty * it.product.price;
    this.emit();
  }

  remove(productId: Product['productID']): void {
    this.items = this.items.filter(i => i.product.productID !== productId);
    this.emit();
  }

  clear(): void {
    this.items = [];
    this.emit();
  }

  private emit(): void {
    this.itemsSubject.next([...this.items]);
    const count = this.items.reduce((acc, i) => acc + i.qty, 0);
    const total = this.items.reduce((acc, i) => acc + i.subtotal, 0);
    this.countSubject.next(count);
    this.totalSubject.next(total);
  }
}
