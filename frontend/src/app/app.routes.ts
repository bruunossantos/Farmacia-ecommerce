import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { ProductForm } from './pages/admin/product-form/product-form';
import { SingleProduct } from './pages/single-product/single-product';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: Login },
    { path: 'admin', component: AdminDashboard, canActivate: [authGuard]},
    { path: 'admin/novo', component: ProductForm},
    { path: 'produto/:slug', component: SingleProduct },
];
