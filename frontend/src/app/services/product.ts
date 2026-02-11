import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/products';

  products = signal<any[]>([]);

  async getProducts() {
    const response = await firstValueFrom(this.http.get<any>(this.apiUrl));
    this.products.set(response.data);
  }
}
