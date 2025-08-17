import { Component } from '@angular/core';
import { Api } from '../service/api';
import { Route } from '@angular/router';
import { CartService } from '../service/cart';
import { Product } from '../product/product';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {


  constructor(private api: Api, private cart: CartService) {}

    categories: any[] = [];
    products: any[] = [];

    grouped: { category: any; products: any[] }[] = [];
    activeCatId: any['categoryID'] | null = null;

  ngOnInit(): void {
    //this.getAllCategories();
    //this.getAllProducts();
    this.categories = [{categoryID: 1 , name: 'Food'}, {categoryID: 2, name: 'Drink'},{categoryID: 3, name: 'Dessert'},{categoryID: 4, name:'Other'}];
    this.products = [{productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                    {productID:1, name: 'Pizza', price: 10, description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg', stockQuantity: 5, category: 'Food', categoryID: 1 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:2, name: 'Coke', price: 2, description: 'Refreshing cola drink', imageUrl: 'coke.jpg', stockQuantity: 10, category: 'Drink', categoryID: 2 },
                     {productID:3, name: 'Ice Cream', price: 3, description: 'Creamy vanilla ice cream', imageUrl: 'icecream.jpg', stockQuantity: 8, category: 'Dessert', categoryID: 3 },
                     {productID:4, name: 'Salad', price: 5, description: 'Fresh garden salad', imageUrl: 'salad.jpg', stockQuantity: 6, category: 'Other', categoryID: 4 }]; 
  
  
  this.groupCategories();

  }

  private groupCategories() {
    this.grouped = this.categories.map(cat => ({
      category: cat,
      products: this.products.filter(p => p.categoryID === cat.categoryID)
    }));    
  }

  scrollTo(catId: any['categoryID'], ev: Event) {
    ev.preventDefault();
    const el = document.getElementById('cat-' + catId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeCatId = catId;
    }
  }

  trackByProductId = (_: number, item: any) => item.x;
  trackByCatId = (_: number, item: { category: any }) => item.category.id;


  getAllCategories(): void {
    this.api.getAllCategories().subscribe({
      next: (response: any) => {
        if(response.status === 200) {
          this.categories = response.categories;
        } else {
          window.alert('Error fetching categories');
        }
      },
      error: (error: any) => {
        window.alert('Error fetching categories');
        console.error('Error fetching categories:', error);
      }
    });
  }

  getallProducts(): void {
    this.api.getAllProducts().subscribe({
      next: (response: any) => {
        if(response.status === 200) {
          console.log('Products:', response.products);
        } else {
          window.alert('Error fetching products');
        }
      },
      error: (error: any) => {
        window.alert('Error fetching products');
        console.error('Error fetching products:', error);
      }
    });
  }

  addToCart(p: any) {
    
    const cartProduct = {
      productID: p.productID,
      name: p.name,
      price: p.price,
      description: p.description,
      imageUrl: p.imageUrl,
      stockQuantity: p.stockQuantity,
      category: p.category
    };
    this.cart.addItem(cartProduct, 1);
  }

}
