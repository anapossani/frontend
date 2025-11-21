import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PedidoAjudaService } from '@core/services/pedido-ajuda';
import { PedidoAjudaDto } from '@models/pedido-ajuda.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetalhePedidoPage } from '../detalhe-pedido-page/detalhe-pedido-page';
import { ParticipacaoService } from '@core/services/participacao';
import { FiltroPedido } from '@core/models/filtro.model';

@Component({
  selector: 'app-listar-pedidos-page',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatDialogModule
],
  templateUrl: './listar-pedidos-page.html',
  styleUrl: './listar-pedidos-page.css'
})
export class ListarPedidosPage implements OnInit {  
  pedidos$!: Observable<PedidoAjudaDto[]>;
  isLoading$: Observable<boolean>

  constructor(
    private pedidoAjudaService: PedidoAjudaService,
    private  participacaoService: ParticipacaoService,
    public dialog: MatDialog
  ) {
      this.isLoading$ = this.participacaoService.isLoading$;
    }

  ngOnInit(): void {
    const filtro : FiltroPedido =  {
          //apenasMeusPedidos: true, 
          apenasDeOutrosUsuarios: true,
          apenasEmAberto: true
          //apenasEmAndamento: true          
        }
    this.pedidos$ = this.pedidoAjudaService.getPedidos(filtro);
  }
 abrirDetalhes(pedidoId: number): void {
    const dialogRef = this.dialog.open(DetalhePedidoPage, {
      width: '800px', 
      maxWidth: '90vw', 
      data: { id: pedidoId } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal de detalhes fechado. Resultado: ${result}`);
    });
  }

   onQueroAjudar(pedidoId: number): void {
     this.participacaoService.oferecerAjuda(pedidoId);
     }   

}