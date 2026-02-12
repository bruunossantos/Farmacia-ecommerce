import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);

  loginData = { email: '', password: '' };

  onLogin() {
    const success = this.authService.login(this.loginData);

    if (success) {
      this.router.navigate(['/admin']);
    } else {
      alert('Credenciais inválidas! Tente admin@fitofarma.com e senha123');
    }
  }
}
