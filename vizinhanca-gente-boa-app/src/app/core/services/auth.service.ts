import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto, TokenResponse } from '@core/models/auth.model';
import { Usuario, UsuarioCreateDto } from '@core/models/usuario.model';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; 
  private usersApiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  
  login(credentials: LoginDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials);
  }
   
     register(userData: UsuarioCreateDto): Observable   <Usuario> {
    return this.http.post<Usuario>(this.usersApiUrl, userData);
  }
   

   

  
}