import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/products';

  products = signal<any[]>([]);

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  getProducts() {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((res) => {
        const productList = res.data ? res.data : res;
        this.products.set(productList);
      }),
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
