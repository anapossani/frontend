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

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

    logout(): void {
      
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

   private getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }

  getUserId(): number | null {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) {
      return null;
    }
    const userId = decodedToken['nameid'];
    return userId ? +userId : null;
  }
}