import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class HomeComponent implements OnInit {
  protected productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      error: (err) => console.error('Erro ao carregar vitrine:', err)
    });
  }
}
