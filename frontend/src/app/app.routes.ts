import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/login/login'
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard'
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: Login },
    { path: 'admin', component: AdminDashboard, canActivate: [authGuard]},
];
