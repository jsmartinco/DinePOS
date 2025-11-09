import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../service/api';
import { CartService } from '../service/cart';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {


  constructor(private api: Api, private cart: CartService, private chDetector: ChangeDetectorRef) {}

    categories: any[] = [];
    products: any[] = [];
    message: string = '';

    grouped: { category: any; products: any[] }[] = [];
    activeCatId: any['categoryID'] | null = null;

  ngOnInit(): void {
    
    this.getAllCategories();
    

  }

  groupCategories() {
    console.log('products:', this.products );
    this.grouped = this.categories.map(cat => ({
      category: cat,
      products: this.products.filter(p => p.categoryId === cat.ID)
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
  trackByCatId = (_: number, item: { category: any }) => item.category.ID;


  getAllCategories(): void {
    this.api.getAllCategories().subscribe({
      next: (response: any) => {
       
          this.categories = response.Data || [];
          this.getallProducts();
          
       
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  getallProducts(): void {
    this.api.getAllProducts().subscribe({
      next: (response:any) => {
        const products = response.Data || [];
        //console.log('Products fetched:', this.products);
        this.products = products;
        this.groupCategories();
        this.chDetector.detectChanges();
        
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  addToCart(p: any) {
    
    const cartProduct = {
      productID: p.productID,
      productName: p.productName,
      price: p.price,
      description: p.description,
      imageUrl: p.imageUrl,
      stockQuantity: p.stockQuantity,
      category: p.category
    };
    this.cart.addItem(cartProduct, 1);
  }

}
