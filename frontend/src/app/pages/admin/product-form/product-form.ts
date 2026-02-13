import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit{
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  isEditMode = false;
  productId: string | null = null;

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

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = { ...data, promo_price: data.promotional_price, stock_quantity: data.stock };
        this.cdr.detectChanges(); 
      }
    });
  }

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

    // Edição ou Cadastro
    if (this.isEditMode && this.productId) {
      formData.append('_method', 'PUT'); 

      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/admin']);
        },
        error: (err: any) => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.productService.createProduct(formData).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.router.navigate(['/admin']);
        },
        error: (err: any) => console.error('Erro ao cadastrar:', err)
      });
    }
  }
}
