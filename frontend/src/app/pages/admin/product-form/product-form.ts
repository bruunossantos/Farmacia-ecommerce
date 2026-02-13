import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private productService = inject(ProductService);
  private router = inject(Router);

  product = {
    name: '',
    description: '',
    price: null,
    promo_price: null,
    category_id: '',
    stock_quantity: 0,
    main_photo: '',
  };

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveProduct() {
    const formData = new FormData();
  
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', (this.product.price ?? '').toString());
    formData.append('category_id', this.product.category_id);
    formData.append('stock', (this.product.stock_quantity ?? '0').toString());
    
    if (this.product.promo_price) {
      formData.append('promotional_price', String(this.product.promo_price));
    }

    if (this.selectedFile) {
      formData.append('main_photo', this.selectedFile);
    }

    this.productService.createProduct(formData).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.router.navigate(['/admin']);
      },
      error: (err: any) => console.error('Erro ao salvar:', err)
    });
  }
}
