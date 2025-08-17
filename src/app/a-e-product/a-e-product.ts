import { Component } from '@angular/core';
import { Api } from '../service/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-a-e-product',
  standalone: false,
  templateUrl: './a-e-product.html',
  styleUrl: './a-e-product.css'
})
export class AEProduct {

  constructor(private api: Api, private route: ActivatedRoute, private router: Router
  ){}

  isEditMode: boolean = false;
  
  productId: string | null = null;
  name: string = '';
  price: number = 0;
  description: string = '';
  imageUrl: string = '';
  stockQuantity: number = 0;
  category = '';
  categories: string[] = ['Food', 'Drink', 'Dessert', 'Other'];

  file: File | null = null;


  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    if(this.productId) {
      this.isEditMode = true;
      this.getProductDetails(this.productId);
    }
  }

  getProductDetails(productId: string): void {

    this.name = this.route.snapshot.paramMap.get('name') || 'prueba';
    this.price = parseFloat(this.route.snapshot.paramMap.get('price') || '0');
    this.description = this.route.snapshot.paramMap.get('description') || ''; 
    this.imageUrl = this.route.snapshot.paramMap.get('imageUrl') || '';
    this.stockQuantity = parseInt(this.route.snapshot.paramMap.get('stockQuantity') || '0', 10);
    this.category = this.route.snapshot.paramMap.get('category') || '';



    /*this.api.getProductById(productId).subscribe({
      next: (response: any) => {
        if(response.status === 200) {
          const product = response.product;
          this.name = product.name;
          this.price = product.price;
          this.description = product.description;
          this.imageUrl = product.imageUrl;
          this.stockQuantity = product.stockQuantitive || 0;
          this.category = product.category;
        }else {
          window.alert('Product not found');
        }
      },
      error: (error: any) => {
        window.alert('Error fetching product details');
        console.error('Error fetching product details:', error);
      }
    });*/
  }

  onSubmit(event : Event): void {

    event.preventDefault();
    const form = new FormData();
    form.append('name', this.name);
    form.append('price', this.price.toString());
    form.append('description', this.description);
    form.append('imageUrl', this.imageUrl);
    form.append('stockQuantity', this.stockQuantity.toString());
    form.append('category', this.category);

    if(this.file) {
      form.append('file', this.file);
    }

    if(this.isEditMode) {
      form.append('productId', this.productId!);
      this.api.updateProduct(this.productId!, form).subscribe({
        next: (response: any) => {
          if(response.status === 200) {
            window.alert('Product updated successfully');
            this.router.navigate(['/products']);
          } else {
            window.alert('Error updating product');
          }
        },
        error: (error: any) => {
          window.alert('Error updating product');
          console.error('Error updating product:', error);
        }
      });
    } else {
      this.api.addProduct(form).subscribe({
        next: (response: any) => {
          if(response.status === "created") {
            window.alert('Product added successfully');
            this.router.navigate(['/products']);
          } else {
            window.alert('Error adding product');
          }
        },
        error: (error: any) => {
          window.alert('Error adding product');
          console.error('Error adding product:', error);
        }
      });
    }
  }

  getCategories(): void {
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

  imageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      }
      reader.readAsDataURL(this.file);
    }
  } 

}
 