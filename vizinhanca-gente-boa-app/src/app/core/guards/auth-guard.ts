import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; 

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID); 

  if (isPlatformBrowser(platformId)) {
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (isAuthenticated) {
      return true; 
    } else {
      router.navigate(['/']); 
      return false;
    }
  }

  return true; 
};