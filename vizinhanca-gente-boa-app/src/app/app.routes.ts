import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';
import { HomePage } from '@features/dashboard/pages/home-page/home-page'

export const routes: Routes = [
    {
    path: '',
    loadComponent: () => import('./features/home/pages/landing-page/landing-page')
                          .then(m => m.LandingPage)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
  },

  {
    path: 'dashboard', 
    component: HomePage, 
    canActivate: [authGuard] 
  },

    {
    path: 'pedidos',
    loadChildren: () => import('./features/pedidos/pedidos.routes'),
    canActivate: [authGuard] 
  },
  
  { path: '**', redirectTo: '' }
];