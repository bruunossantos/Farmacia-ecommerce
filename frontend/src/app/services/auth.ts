import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Controla se o usuário esta logado
  private platformId = inject(PLATFORM_ID);
  private isAuthenticated = signal<boolean>(false);

  login(credentials: any) {
    if (credentials.email === 'admin@fitofarma.com' && credentials.password === 'senha123') {
      this.isAuthenticated.set(true);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('isLoggedIn', 'true');
      }
      return true;
    }
    return false;
  }

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return this.isAuthenticated() || localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
    localStorage.removeItem('isLoggedIn');
  }
}
