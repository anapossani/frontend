import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';

const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPage
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

export default AUTH_ROUTES;