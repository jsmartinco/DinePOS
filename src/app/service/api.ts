import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appendFile } from 'fs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private static BASE_URL = ''

  constructor(private http: HttpClient){

  }
  
  login(body: any): Observable<any> {
    return this.http.post(`${Api.BASE_URL}/auth/login`, body);
  }

  createCategory(body: any): Observable<any> {
    return this.http.post(`${Api.BASE_URL}/categories/add`,body);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${Api.BASE_URL}/categories/all`)

  }

  updateCategory(id: string, body: any): Observable<any> {
    return this.http.put(
      `${Api.BASE_URL}/categories/update/${id}`,
      body
    )
  }

  deleteCategory(id: string): Observable<any>{
    return this.http.delete(`${Api.BASE_URL}/categories/delete/${id}`)
  }

  addProduct(body: any): Observable<any>{
    return this.http.post(`${Api.BASE_URL}/products/add`,body)
  }

  updateProduct(id: string, body: any): Observable<any>{
    return this.http.put(`${Api.BASE_URL}/products/update/${id}`,body)
  }


  getAllProducts(): Observable<any> {
    return this.http.get(`${Api.BASE_URL}/products/all`)
  }

  getProductById(id: string): Observable<any>{
    return this.http.get(`${Api.BASE_URL}/products/${id}`)
  }

  deleteProduct(id: string): Observable<any>{
    return this.http.delete(`${Api.BASE_URL}/products/delete/${id}`)
  }

}
