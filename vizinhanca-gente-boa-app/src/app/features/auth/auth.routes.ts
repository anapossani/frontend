import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import  {RegisterPage } from './pages/register-page/register-page';

const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPage
  },

  { 
    path: 'register',
    component: RegisterPage
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

export default AUTH_ROUTES;