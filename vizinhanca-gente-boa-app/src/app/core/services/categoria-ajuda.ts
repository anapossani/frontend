import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Categoria {
  id: number;
  nome: string;
}

export interface CategoriaCreateDto {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaAjudaService {
  private apiUrl = `${environment.apiUrl}/categoriasajuda`;

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  createCategoria(data: CategoriaCreateDto): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, data);
  }
}