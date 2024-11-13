import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'src/app/shared/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {}

  search$(searchTerm: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`http://localhost:3000/products/${searchTerm}`)
  }

  buy$(cart: Product[]): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/buy`, cart)
  }
}
