import { Routes } from '@angular/router';

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
  
  { path: '**', redirectTo: '' }
];