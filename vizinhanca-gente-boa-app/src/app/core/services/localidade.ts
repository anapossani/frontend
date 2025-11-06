import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Modelos para tipagem forte
export interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

export interface Municipio {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalidadeService {
  private readonly apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados`).pipe(
      map(estados => estados.sort((a, b) => a.nome.localeCompare(b.nome)))
    );
  }

  getMunicipios(estadoSigla: string): Observable<Municipio[]> {
    if (!estadoSigla) {
      return new Observable(subscriber => subscriber.next([]));
    }
    return this.http.get<Municipio[]>(`${this.apiUrl}/estados/${estadoSigla}/municipios`);
  }
}