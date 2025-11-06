import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';



import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(routes),

    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )  ,
    importProvidersFrom(MatSnackBarModule)   
    
  ]
};

