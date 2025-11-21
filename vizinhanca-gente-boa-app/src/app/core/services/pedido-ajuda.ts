import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PedidoAjuda, PedidoAjudaCreateDto, PedidoAjudaDto } from '@core/models/pedido-ajuda.model';
import { HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { StatusPedido } from '@core/enums/status-pedido.enum';
import { FiltroPedido } from '@core/models/filtro.model';
import { ComentarioService } from './comentario';

@Injectable({
  providedIn: 'root'
})
export class PedidoAjudaService {
  private apiUrl = `${environment.apiUrl}/pedidosajuda`;

  constructor(
    private http: HttpClient,
    private authService: AuthService

    ){ }

  getPedidoById(id: number): Observable<PedidoAjudaDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PedidoAjudaDto>(url);
  }

  createPedido(data: PedidoAjudaCreateDto): Observable<PedidoAjuda> {
    return this.http.post<PedidoAjuda>(this.apiUrl, data);
  }

  getPedidos(filtro: FiltroPedido): Observable<PedidoAjudaDto[]> {
    let params = new HttpParams();

    if (filtro.apenasDeOutrosUsuarios) {
      params = params.append('apenasDeOutrosUsuarios', 'true');
    }
    
    if (filtro.apenasMeusPedidos) {
      const meuUserId = this.authService.getUserId();
      if (meuUserId) {
        params = params.append('usuarioId', meuUserId.toString());
      }
    }

    if (filtro.apenasEmAberto) {
       params = params.append('status', StatusPedido.Aberto);
    } else if (filtro.apenasEmAndamento) {
      params = params.append('status', StatusPedido.EmAndamento);
    }
    
    //@Refactor: Refatorar para aceitar lista de status ou unificar no objeto de filtro

    if (filtro.apenasComParticipacao) {
       params = params.append('apenasComParticipacao', 'true')
    }

    return this.http.get<PedidoAjudaDto[]>(this.apiUrl, { params });
  }

  cancelarPedido(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}/cancelar`;
      return this.http.post<void>(url, {});
    }

  concluirPedido(id: number, comentario?: string): Observable<void> {
     const url = `${this.apiUrl}/${id}/concluir`;
     const body = {
        Comentario: comentario
     }

    return this.http.post<void>(url, body);
  }

}


