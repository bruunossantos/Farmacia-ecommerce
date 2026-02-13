import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [],
  templateUrl: './single-product.html',
  styleUrl: './single-product.css',
})
export class SingleProduct implements OnInit{
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product = signal<any>(null);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      this.productService.getProductsBySlug(slug).subscribe(res => {
        this.product.set(res);
      });
    }
  }
}
