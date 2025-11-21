import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Comentario, ComentarioCreateDto } from '@models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = `${environment.apiUrl}/comentarios`;

  constructor(private http: HttpClient) { }

  createComentario(data: ComentarioCreateDto): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, data);
  }
}