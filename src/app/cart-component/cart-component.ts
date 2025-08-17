import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../service/cart';
import { Api } from '../service/api';

@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css'
})
export class CartComponent {

  items$: Observable<CartItem[]>;
  total$: Observable<number>;
  table: number | null = null;
  submitted: boolean = false;

  constructor(private cart: CartService, private api : Api) {

    this.items$ = this.cart.items$;
    this.total$ = this.cart.total$;
  }
  

  decrease(item: CartItem) { 
    this.cart.updateQuantity(item.product.productID, item.qty - 1); 
  }

  inccrease(item: CartItem) { 
    this.cart.updateQuantity(item.product.productID, item.qty + 1); 
  }
  
  remove(item: CartItem) { 
    this.cart.remove(item.product.productID); 
  }

  clear() { 
    this.cart.clear(); 
  }

  submit() {
    if (this.table === null) {
      window.alert('Please enter a table number');
      return;
    }
    this.submitted = true;
    this.items$.subscribe(items => {
      if (items.length === 0) {
        window.alert('Cart is empty');
        return;
      }
      const order = {
        table: this.table,
        items: items.map(i => ({
          productID: i.product.productID,
          qty: i.qty
        })),
        total: items.reduce((sum, item) => sum + item.subtotal, 0)
      };
      console.log('Order to submit:', order);
      
      this.api.createOrder(order).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            window.alert('Order submitted successfully');
            this.cart.clear();
            this.table = null;
            this.submitted = false;
          } else {
            window.alert('Error submitting order');
          }
        },
        error: (error: any) => {
          window.alert('Error submitting order');
          console.error('Error submitting order:', error);
        }
      });
    });
  }



}
