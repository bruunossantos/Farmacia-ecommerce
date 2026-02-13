import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  searchQuery: string = '';

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/busca'], { queryParams: { q: this.searchQuery } });
    }
  }
}
