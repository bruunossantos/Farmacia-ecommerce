import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProductCard, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  
  results = signal<any[]>([]);
  query = signal<string>('');

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query.set(params['q'] || '');
      this.loadResults(this.query());
    });
  }

  loadResults(term: string) {
    if (term) {
      const safeTerm = encodeURIComponent(term.trim());
      this.productService.searchProducts(safeTerm).subscribe(data => {
        this.results.set(data);
      });
    }
  }
}