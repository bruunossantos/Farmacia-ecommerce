import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  public productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      error: (err) => console.error('Erro ao buscar produtos do banco Aiven:', err)
    });
  }

  editProduct(id: number) {
    this.router.navigate(['/admin/editar', id]);
  }

  deleteProduct(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto do banco Aiven?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Produto removido com sucesso!');
          // Atualiza a lista automaticamente após excluir
          this.productService.getProducts().subscribe();
        },
        error: (err: any) => console.error('Erro ao deletar:', err),
      });
    }
  }
}