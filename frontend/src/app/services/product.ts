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

  currentPage = signal<number>(1);
  lastPage = signal<number>(1);

  getProducts(page: number = 1) {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      tap((res) => {
        this.products.set(res.data);
        this.currentPage.set(res.current_page);
        this.lastPage.set(res.last_page);
      }),
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductsBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/slug/${slug}`);
  }
}
