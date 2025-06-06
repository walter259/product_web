import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl:String="/api/products/";
  constructor(private _httpClient:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this._httpClient.get<Product[]>(`${environment.apiUrl}${this.baseUrl}`);
  }

  createProduct(data:Product){
    return this._httpClient.post<Product>(`${environment.apiUrl}${this.baseUrl}`,data);
  }
  
  updateProduct(data:Product){
    return this._httpClient.put<Product>(`${environment.apiUrl}${this.baseUrl}${data.id}/`,data);
  }

  deleteProduct(id:Number){
    return this._httpClient.delete<Product>(`${environment.apiUrl}${this.baseUrl}${id}/`);
  }
}
