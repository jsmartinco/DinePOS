import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  CryptoJs from "crypto-js"
EventEmitter


@Injectable({
  providedIn: 'root'
})
export class Api {

  private static BASE_URL = 'https://wdzcl0mq-4567.aue.devtunnels.ms';
  private static ENCRYPT_KEY = ""

  authStatus = new EventEmitter<void>();

  constructor(private http: HttpClient){

  }

  encryptstorage(key: string, value: string):void{
    const encryptValue = CryptoJs.AES.encrypt(value, Api.ENCRYPT_KEY).toString();
    localStorage.setItem(key, encryptValue);
  }

  private decryptStorage(key: string): string | null {
    try {
      const encryptValue = localStorage.getItem(key);
      if (!encryptValue) return null
      return CryptoJs.AES.decrypt(encryptValue, Api.ENCRYPT_KEY).toString(CryptoJs.enc.Utf8);
    } catch (error) {
      return null
    }
  }

  private clearAuth(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  logout():void{
    this.clearAuth();
  }

  isAuthenticated(): boolean{
    const token = this.decryptStorage("token");
    return !!token;
  }

  isAdmin(): boolean{
    const role = this.decryptStorage("role");
    return role === "ADMIN"
  }

  
  login(body: any): Observable<any> {
    const response = this.http.post(`${Api.BASE_URL}/auth/login`, body);
    console.log("Login response:", response);
    return response

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
