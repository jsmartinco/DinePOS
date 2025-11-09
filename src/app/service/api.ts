import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import  CryptoJs from "crypto-js"

declare global {
  interface Window {
    google?: any;
    onGoogleLibraryLoad?: () => void;
  }
}

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class Api {
 

  private static BASE_URL = 'https://wdzcl0mq-4567.aue.devtunnels.ms';
  private static ENCRYPT_KEY = "SecretPassword987612345"

  authStatus = new EventEmitter<void>();

  constructor(private http: HttpClient){
    
  }

  encryptstorage(key: string, value: string):void{
    console.log("Encrypting value:", value);
    console.log("Using key:", Api.ENCRYPT_KEY);
    
    
    const encryptValue = CryptoJs.AES.encrypt(value, Api.ENCRYPT_KEY).toString();
    localStorage.setItem(key, encryptValue);

  }

  decryptStorage(key: string): string | null {
    try {
      const encryptValue = localStorage.getItem(key);
      if (!encryptValue) return null
      return CryptoJs.AES.decrypt(encryptValue, Api.ENCRYPT_KEY).toString(CryptoJs.enc.Utf8);
    } catch (error) {
      return null
    }
  }

  private clearAuth(){
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
  }

  logout():void{
    this.clearAuth();
  }

  isAuthenticated(): boolean{
    const token = this.decryptStorage("auth_token");
    return !!token;
  }

  isAdmin(): boolean{
    const role = this.decryptStorage("role");
    return role === "admin";
  }

  
  login(body: any): Observable<any> {
    const response = this.http.post(`${Api.BASE_URL}/auth/login`, body);
    return response
    
    

  }

  createCategory(body: any): Observable<any> {
    return this.http.post(`${Api.BASE_URL}/categories/add`,body);
  }

  getAllCategories(): Observable<any> {
    const token = this.decryptStorage("auth_token");
    return this.http.get(`${Api.BASE_URL}/category/all`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })

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
    return this.http.post(`${Api.BASE_URL}/product/add`,body, 
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.decryptStorage("auth_token")}`
        })
      }
    )
  }

  updateProduct(body: any): Observable<any>{
    return this.http.put(`${Api.BASE_URL}/product/update`,body,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.decryptStorage("auth_token")}`
        })
      }
    )
  }


  getAllProducts(): Observable<any> {
     const token = this.decryptStorage("auth_token");    
    return this.http.get(`${Api.BASE_URL}/product/all` ,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  getProductById(id: string): Observable<any>{
    return this.http.get(`${Api.BASE_URL}/products/${id}`)
  }

  deleteProduct(id: string): Observable<any>{
    return this.http.delete(`${Api.BASE_URL}/products/delete/${id}`, 
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.decryptStorage("auth_token")}`
        })
      }
    )
  }

   createOrder(order: { table: number | null; items: { productID: string; qty: number; }[]; }): Observable<any> {
    return this.http.post(`${Api.BASE_URL}/orders/create`, order);
  }



}



