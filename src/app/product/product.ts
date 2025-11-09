import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../service/api';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

  constructor(private api: Api, private router: Router, private chDetector: ChangeDetectorRef) {}  

  products: any[] = [];
  message: string = '';
  currentPage: number = 1;
  itemsPerPage: number =50;
  totalPages: number = 1;
  allProducts: any[] = [];

  getProducts(): void {

    this.api.getAllProducts().subscribe({
      next: (response:any) => {
        const products = response.Data || [];
        this.allProducts = response.Data || [];
        this.products = [...this.allProducts];
        this.totalPages = Math.ceil(products.length / this.itemsPerPage);
        this.products = products.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        this.chDetector.detectChanges();
      },
      error: (error:any) => {
        this.message = 'Error fetching products';
        console.error('Error fetching products:', error);
      }
    })

    
    /*this.products = [
      { productID: '1', name: 'Product 1', price: 10, description: 'Description 1' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '2', name: 'Product 2', price: 20, description: 'Description 2' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '3', name: 'Product 3', price: 30, description: 'Description 3' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '4', name: 'Product 4', price: 40, description: 'Description 4' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '5', name: 'Product 5', price: 50, description: 'Description 5' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '6', name: 'Product 6', price: 60, description: 'Description 6' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '7', name: 'Product 7', price: 70, description: 'Description 7' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '8', name: 'Product 8', price: 80, description: 'Description 8' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '9', name: 'Product 9', price: 90, description: 'Description 9' , imageUrl : 'assets/images/chocorramo.jpg',stockQuantity: 10 , category: 'Food' },
      { productID: '10', name: 'Product 10', price: 100, description: 'Description 10', imageUrl: 'assets/images/chocorramo.jpg', stockQuantity: 10,  category: 'Food' },
    ];

    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.products = this.products.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
*/
  }

  ngOnInit(): void {
    this.getProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    //this.getProducts();
  }

  onDeleteProduct(productId: string): void {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.api.deleteProduct(productId).subscribe({
        next: (response: any) => {
          if(response.success) {
          this.message = 'Product deleted successfully';
          this.getProducts();
          }
        },
        error: (error:any) => {
          this.message = 'Error deleting product';
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  goToAddProduct(): void {
    this.router.navigate(['/app-a-e-product']);
  }

  goToEditProduct(productId: string): void {
    this.router.navigate(['/app-a-e-product', productId]);

  }

  searchTerm: string = '';

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    console.log('Searched term:', term);
    
    if (term) {
      this.products = this.allProducts.filter(p =>
        p.productName.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) 
      );
    } else {
      this.products = [...this.allProducts];
    }
  }

}
